import connectMongo from "@/utils/connectMongo";
import UserModel from "../../../../../models/registerModel";

export async function PUT(request, { params }) {
  const { id } = await params;
  const { friend } = await request.json(); // Expecting a single friend object with necessary details

  await connectMongo();

  try {
    const user = await UserModel.findById(id);

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
    }

    // Check if friend already exists based on a unique identifier (e.g., friend's email or username or any unique field)
    const existingFriendIndex = user.friends.findIndex((f) => f.name === friend.name);

    if (existingFriendIndex > -1) {
      // Update the existing friend's details
      user.friends[existingFriendIndex] = { ...user.friends[existingFriendIndex], ...friend };
    } else {
      // If friend does not exist, add new friend to the array
      user.friends.push(friend);
    }

    const updatedUser = await user.save();

    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (error) {
    console.error("Error updating friend:", error);
    return new Response(JSON.stringify({ message: error.message }), { status: 500 });
  }
}
  



  export async function GET(request, { params }) {
    const { id } = await params; 
  
    try {
      // Connect to MongoDB database
      await connectMongo();
  
      // Find the user by ID, including their friends
      const user = await UserModel.findById(id);
  
      // If the user is not found
      if (!user) {
        return new Response(
          JSON.stringify({ message: "User not found" }),
          { status: 404 }
        );
      }
  
      // Return the user data (including the friends list)
      return new Response(JSON.stringify(user), { status: 200 });
    } catch (error) {
      // Handle any error that occurs during the process
      console.error('Error fetching user:', error);
      return new Response(
        JSON.stringify({ message: error.message }),
        { status: 500 }
      );
    }
  }