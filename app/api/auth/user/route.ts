import { NextRequest, NextResponse } from "next/server";
//@ts-ignore
import clientPromise from "@/lib/mongodb";

export async function GET(request: NextRequest) {
  try {
    // Get uid from query string
    const { searchParams } = new URL(request.url);
    const uid = searchParams.get("uid");
    const userType = searchParams.get("userType") || "citizen";

    if (!uid) {
      return NextResponse.json(
        { error: "UID parameter is required" },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    //@ts-ignore
    const client = await clientPromise;
    const db = client.db("nagrik");

    // Determine which collection to look in based on userType
    const collection = userType === "authority" ? "authority" : "users";
    console.log(`Looking for user with uid ${uid} in ${collection} collection`);

    // Find the user in the appropriate collection
    let user = await db.collection(collection).findOne({ uid });

    // If not found in the primary collection and userType wasn't explicitly specified,
    // try the other collection as a fallback
    if (!user && !searchParams.get("userType")) {
      const fallbackCollection =
        collection === "authority" ? "users" : "authority";
      console.log(
        `User not found in ${collection}, trying ${fallbackCollection} collection`
      );
      user = await db.collection(fallbackCollection).findOne({ uid });

      // If found in fallback collection, adjust the userType
      if (user) {
        user.userType =
          fallbackCollection === "authority" ? "authority" : "citizen";
        console.log(`Found user in fallback ${fallbackCollection} collection`);
      }
    }

    if (!user) {
      return NextResponse.json(
        { error: `User not found in ${collection} collection` },
        { status: 404 }
      );
    }

    // Return user data
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch user data",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
