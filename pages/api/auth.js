import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectDB from "../../middleware/mongodb";
import Users from "../../models/user";

const handler = (req, res) => {
  const { email, password } = req.body;
  Users.findOne({ email: email }).then((user) => {
    if (!user) {
      return res.status(400).json({ status: "error", error: "User Not Found" });
    }
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name,
        };
        jwt.sign(
          payload,
          process.env.jwtsecret,
          { expiresIn: 86400 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ status: "error", error: "Password incorrect" });
      }
    });
  });
};
export default connectDB(handler);
