import { NextResponse } from "next/server";
//@ts-ignore
import clientPromise from "@/lib/mongodb";

// Define a type for the structured user object
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

export async function POST(request: Request) {
  try {
    // Parse the request body
    const userData = (await request.json()) as UserObject;

    // Validate the required fields
    if (!userData.uid || !userData.email) {
      return NextResponse.json(
        { error: "Missing required user data" },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    //@ts-ignore
    const client = await clientPromise;
    const db = client.db("nagrik");

    // Check if user already exists
    const existingUser = await db
      .collection("users")
      .findOne({ uid: userData.uid });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists", user: existingUser },
        { status: 409 }
      );
    }

    // Add timestamp for database tracking
    const userToSave = {
      ...userData,
      createdInDb: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Insert the user into the database
    const result = await db.collection("users").insertOne(userToSave);

    return NextResponse.json(
      {
        success: true,
        userId: result.insertedId,
        message: "User registered successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error during user signup:", error);
    return NextResponse.json(
      {
        error: "Failed to create user account",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
