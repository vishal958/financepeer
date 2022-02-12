import connectDB from "../../middleware/mongodb";
import Blog from "../../models/blog";

const handler = (req, res) => {
  if (req.method === "POST") {
    const { data } = req.body;
    console.log(data);
    const blog = new Blog({
      blogs: data,
    });
    blog
      .save()
      .then((blog) => res.status(200).json({ succcess: true }))
      .catch((err) => console.error(err));
  }
};
export default connectDB(handler);
