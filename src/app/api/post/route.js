import connectMongo from "@/utils/connectMongo";
import postModel from "../../../../models/postModel";
import { NextResponse } from "next/server";

// GET method to fetch all posts
export async function GET() {
  try {
    await connectMongo();
    const posts = await postModel.find({});
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// POST method to create a new post
export async function POST(req) {
  try {
    await connectMongo();

    const body = await req.json();
    const { name, image, post } = body;

    const newPost = new postModel({
      name,
      image,
      post,
    });

    await newPost.save();

    return NextResponse.json(
      { message: "Post Created", post: newPost },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
