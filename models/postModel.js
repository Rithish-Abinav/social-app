import { model, models, Schema } from "mongoose";

const formatDate = () => {
  const now = new Date();

  const options = {
    month: 'short', // e.g. "Apr"
    day: 'numeric', // e.g. "20"
    hour: '2-digit',
    minute: '2-digit',
    hour12: true, // shows AM/PM
    timeZone: 'Asia/Kolkata', // use your preferred timezone
  };

  const formatted = now.toLocaleString('en-US', options);

  // Output like: "Apr 20, 09:45 PM"
  const [monthDay, time] = formatted.split(', ');
  return `${monthDay} | ${time}`;
};


const postSchema = new Schema({
  name: String,
  image: String,
  post: String,
  date: {
    type: String,
    default: formatDate,
  },
});


const postModel = models.Post || model("Post", postSchema);

export default postModel;
