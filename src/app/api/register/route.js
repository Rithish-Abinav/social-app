import connectMongo from "@/utils/connectMongo";
import UserModel from "../../../../models/registerModel";
import { NextResponse } from "next/server";

// GET all users
export async function GET() {
  try {
    await connectMongo();
    const users = await UserModel.find({});
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// Create a new user
export async function POST(req) {
  try {
    await connectMongo();

    const { name, email, username, password, image, friends } = await req.json();

    if (!name || !email || !username || !password) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const existingUser = await UserModel.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Username or email already exists" },
        { status: 400 }
      );
    }

    const newUser = new UserModel({
      name,
      email,
      username,
      password,
      image,
      friends,
    });

    await newUser.save();

    return NextResponse.json(
      { message: "User created successfully", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
