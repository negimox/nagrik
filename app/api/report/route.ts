import { NextResponse } from "next/server";
//@ts-ignore
import clientPromise from "@/lib/mongodb";

interface UserObject {
  uid: string;
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  providerData: Array<{
    providerId: string;
    uid: string;
    displayName: string | null;
    email: string;
    phoneNumber: string | null;
    photoURL: string | null;
  }>;
  stsTokenManager: {
    refreshToken: string;
    accessToken: string;
    expirationTime: number;
  };
  createdAt: string;
  lastLoginAt: string;
  apiKey: string;
  appName: string;
  username?: string;
}

// Define Report interface
interface Report {
  _id?: string;
  id?: string;
  title: string;
  category: string;
  status: string;
  priority: string;
  date: string;
  time: string;
  location: string;
  coordinates: string | null;
  description: string;
  submittedBy: string;
  assignedTo: string | null;
  estimatedCompletion: string | null;
  images: string[];
  updates: Array<{
    date: string;
    time: string;
    status?: string;
    comment: string;
    by: string;
  }>;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  detectedObjects?: Array<{
    name: string;
    confidence: number;
  }>;
}

// Define UpdateEntry interface
interface UpdateEntry {
  date: string;
  time: string;
  by: string;
  comment: string;
  status?: string; // Make status optional
}

export async function GET(request: Request) {
  try {
    // Get the parameters from query parameters
    const { searchParams } = new URL(request.url);
    const uid = searchParams.get("uid");
    const location = searchParams.get("location");

    // Connect to MongoDB
    //@ts-ignore
    const client = await clientPromise;
    const db = client.db("nagrik");

    // Build the query object based on provided parameters
    let query = {};

    // If uid is provided, filter reports by the user's uid
    if (uid) {
      query = { createdBy: uid };
    }

    // First fetch all reports based on the current query
    let result = await db.collection("reports").find(query).toArray();

    // If location parameter is provided, filter the results client-side
    // to check if the report location contains the search term (case-insensitive)
    if (location) {
      const locationLower = location.toLowerCase();
      result = result.filter(
        (report: Report) =>
          report.location &&
          report.location.toLowerCase().includes(locationLower)
      );
    }

    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/report:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Validate required fields
    if (
      !data.title ||
      !data.category ||
      !data.description ||
      !data.location ||
      !data.createdBy
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Generate a unique report ID (you can use a more sophisticated method if needed)
    const reportId = `R-${new Date().getFullYear()}-${Math.floor(
      1000 + Math.random() * 9000
    )}`;

    // Get current date and time
    const now = new Date();
    const date = now.toISOString().split("T")[0];
    const time = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Format the report object
    const reportEntry = {
      id: reportId,
      title: data.title,
      category: data.category,
      status: "New", // Default status for new reports
      priority: data.severity || "Medium",
      date: date,
      time: time,
      location: data.location,
      coordinates: data.coordinates || null,
      description: data.description || data.details, // Support both field names
      submittedBy: data.submittedBy || "Anonymous",
      assignedTo: null,
      estimatedCompletion: null,
      images: data.images || [],
      updates: [
        {
          date: date,
          time: time,
          status: "New",
          comment: "Report submitted",
          by: "System",
        },
      ],
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
      createdBy: data.createdBy, // This should be the user's uid
      detectedObjects: data.detectedObjects || [], // Store AI-detected objects if available
    };

    // Connect to MongoDB
    //@ts-ignore
    const client = await clientPromise;
    const db = client.db("nagrik");

    // Insert the report into the database
    const result = await db.collection("reports").insertOne(reportEntry);

    if (result.acknowledged) {
      return NextResponse.json(
        {
          success: true,
          reportId: reportId,
          message: "Report created successfully",
        },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        {
          error: "Failed to create report",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error in POST /api/report:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.id && !data.reportId) {
      return NextResponse.json(
        { error: "Report ID is required" },
        { status: 400 }
      );
    }

    const reportId = data.id || data.reportId;
    const now = new Date();
    const date = now.toISOString().split("T")[0];
    const time = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Create update object with only fields that are provided
    const updateData: { [key: string]: any } = {
      updatedAt: now.toISOString(),
    };

    // Only include fields that are provided in the request
    if (data.status) updateData.status = data.status;
    if (data.assignedTo) updateData.assignedTo = data.assignedTo;
    if (data.priority) updateData.priority = data.priority;
    if (data.estimatedCompletion)
      updateData.estimatedCompletion = data.estimatedCompletion;

    // Create an update entry for the updates array
    const updateEntry: UpdateEntry = {
      date,
      time,
      by: data.updatedBy || "System",
      comment: data.comment || `Report updated`,
    };

    // If status is updated, add it to the update entry
    if (data.status) {
      updateEntry.status = data.status;
    }

    // Connect to MongoDB
    //@ts-ignore
    const client = await clientPromise;
    const db = client.db("nagrik");

    // Update the report in the database
    const result = await db.collection("reports").updateOne(
      { $or: [{ id: reportId }, { _id: reportId }] },
      {
        $set: updateData,
        $push: { updates: updateEntry },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        success: true,
        reportId: reportId,
        message: "Report updated successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in PUT /api/report:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
