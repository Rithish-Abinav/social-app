import { model, models, Schema } from "mongoose";

// Custom function to format date as "Apr 26 | 11.23"
const formatDate = () => {
  const now = new Date();
  const month = now.toLocaleString('en-US', { month: 'short' }); // e.g. "Apr"
  const day = now.getDate(); // e.g. 26
  const hours = String(now.getHours()).padStart(2, '0'); // e.g. "11"
  const minutes = String(now.getMinutes()).padStart(2, '0'); // e.g. "23"

  return `${month} ${day} | ${hours}.${minutes}`;
};

const postSchema = new Schema({
  name: String,
  image:String,
  post: String,
  date: {
    type: String,
    default: formatDate
  }
});

const postModel = models.Post || model("Post", postSchema);

export default postModel;
