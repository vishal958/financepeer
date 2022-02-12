import mongoose from "mongoose";
const Schema = mongoose.Schema;
const blog = new Schema({
  blogs: [
    {
      userId: {
        type: Number,
        required: true,
      },
      body: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
    },
  ],
});
mongoose.models = {};
const Blog = mongoose.model("blogs", blog);
export default Blog;
