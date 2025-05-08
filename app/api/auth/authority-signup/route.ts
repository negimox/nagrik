import { NextResponse } from "next/server";
//@ts-ignore
import clientPromise from "@/lib/mongodb";

// Define a type for the structured authority user object
interface AuthorityUserObject {
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
  identificationId?: string; // Authority-specific field
  status?: string; // For tracking approval status
}

export async function POST(request: Request) {
  try {
    // Parse the request body
    const authorityData = (await request.json()) as AuthorityUserObject;

    // Validate the required fields
    if (
      !authorityData.uid ||
      !authorityData.email ||
      !authorityData.identificationId
    ) {
      return NextResponse.json(
        { error: "Missing required authority user data" },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    //@ts-ignore
    const client = await clientPromise;
    const db = client.db("nagrik");

    // Check if authority user already exists
    const existingAuthority = await db
      .collection("authority")
      .findOne({ uid: authorityData.uid });
    if (existingAuthority) {
      return NextResponse.json(
        { error: "Authority user already exists", user: existingAuthority },
        { status: 409 }
      );
    }

    // Add timestamp and pending status for database tracking
    const authorityToSave = {
      ...authorityData,
      status: "pending", // New authorities start with pending status until approved
      createdInDb: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Insert the authority user into the database
    const result = await db.collection("authority").insertOne(authorityToSave);

    return NextResponse.json(
      {
        success: true,
        userId: result.insertedId,
        message:
          "Authority registration submitted successfully. Pending approval.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error during authority signup:", error);
    return NextResponse.json(
      {
        error: "Failed to create authority account",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
