import connectMongo from "@/utils/connectMongo";
import UserModel from "../../../../../models/registerModel";
import { NextResponse } from "next/server";

// Update friend or add new friend
export async function PUT(request, { params }) {
  const { id } = params;
  const { friend } = await request.json();

  await connectMongo();

  try {
    const user = await UserModel.findById(id);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const existingFriendIndex = user.friends.findIndex(
      (f) => f.name === friend.name
    );

    if (existingFriendIndex > -1) {
      user.friends[existingFriendIndex] = {
        ...user.friends[existingFriendIndex],
        ...friend,
      };
    } else {
      user.friends.push(friend);
    }

    const updatedUser = await user.save();

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Error updating friend:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// Get user with their friends
export async function GET(request, { params }) {
  const { id } = params;

  try {
    await connectMongo();

    const user = await UserModel.findById(id);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
