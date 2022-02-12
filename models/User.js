import mongoose from "mongoose";
const Schema = mongoose.Schema;
const user = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  since: {
    type: Date,
    default: Date.now,
  },
});
mongoose.models = {};
const User = mongoose.model("users", user);
export default User;
