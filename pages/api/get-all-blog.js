import connectDB from "../../middleware/mongodb";
import Blog from "../../models/blog";

const handler = (req, res) => {
  Blog.find({}, function (err, blogs) {
    const finalResult = [];
    blogs.forEach(function (blogsArr) {
      blogsArr.blogs.forEach(function (blog) {
        finalResult.push(blog);
      });
    });
    res.status(200).json(finalResult);
  });
};
export default connectDB(handler);
