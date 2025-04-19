import connectMongo from "@/utils/connectMongo";
import UserModel from "../../../../models/registerModel";

export async function GET() {

   try {
    await connectMongo();
    const Users = await UserModel.find({});
    return Response.json(Users);
    
   } catch (error) {
    return Response.json({message: error.message})
   }
}


export async function POST(req) {
    try {
      await connectMongo();
  
      const { name, email, username, password, image,friends } = await req.json(); // Use `await req.json()` to parse the request body
  
      // Validate required fields
      if (!name || !email || !username || !password) {
        return Response.json({ message: "All fields are required" }, { status: 400 });
      }
  
      // Check if the username or email already exists
      const existingUser = await UserModel.findOne({
        $or: [{ email }, { username }],
      });
  
      if (existingUser) {
        return Response.json(
          { message: "Username or email already exists" },
          { status: 400 }
        );
      }
  
      // Create a new user
      const newUser = new UserModel({
        name,
        email,
        username,
        password,
        image,
        friends
      });
  
      // Save the new user in the database
      await newUser.save();
  
      // Return a success response
      return Response.json(
        { message: "User created successfully", user: newUser },
        { status: 201 }
      );
    } catch (error) {
      // Handle any errors
      return Response.json({ message: error.message }, { status: 500 });
    }
  }


  export async function PUT(request, { params }) {
    const { id } = params;
    const { friends } = await request.json();
  
    await connectToDB();
  
    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { friends },
      { new: true }
    );
  
    return new Response(JSON.stringify(updatedUser), { status: 200 });
  }
  