import { model, models, Schema } from "mongoose";

const userSchema = new Schema({
  name: String,
  email: String,
  username: String,
  password: String,
  image: String, 
  friends: [
    {
      id: { type: Schema.Types.ObjectId, ref: "User" },  // Reference to the User model
      name: String,
      requestStatus: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' }, // Status of the friend request
      image:String
    }
  ]
});

const UserModel = models.User || model("User", userSchema);

export default UserModel;
