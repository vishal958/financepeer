import mongoose from "mongoose";
const connectDB = (handler) => async (req, res) => {
  if (mongoose.connections[0].readyState) {
    return handler(req, res);
  }
  const username = encodeURIComponent(process.env.mongouname);
  const password = encodeURIComponent(process.env.mongopass);
  // Use new db connection
  mongoose
    .connect(
      `mongodb+srv://${username}:${password}@cluster0.7qpcy.mongodb.net/mern-auth?retryWrites=true&w=majority`,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }
    )
    .then(() => {
      console.log("Connected to Mongo");
    })
    .catch((err) => console.log("Error", err.message));
  return handler(req, res);
};
export default connectDB;
