import connectMongo from "@/utils/connectMongo";
import UserModel from "../../../../models/registerModel";
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    // Parse the request body to extract username and password
    const { username, password } = await req.json();

    // Connect to MongoDB
    await connectMongo();

    // Find the user by username and password (this assumes both are required)
    const user = await UserModel.findOne({ username,password });

    if (!user) {
      // Return error if credentials do not match
      return Response.json({ message: "Invalid credentials" }, { status: 401 });
    }

    // If credentials are valid, return the user data
    return Response.json(user, {message:"User Logged"} ,{ status: 200 });

  } catch (error) {
    // Return error message if something goes wrong
    return Response.json({ message: error.message }, { status: 500 });
  }
}
