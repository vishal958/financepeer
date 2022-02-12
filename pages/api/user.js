import connectDB from "../../middleware/mongodb";
import bcrypt from "bcryptjs";
import User from "../../models/User";
const handler = (req, res) => {
  if (req.method === "POST") {
    const { name, email, password } = req.body;
    if (name && email && password) {
      // Hash password to store it in DB
      const user = new User({
        name,
        email,
        password,
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
          if (err) throw err;
          user.password = hash;
          user
            .save()
            .then((usr) =>
              res.json({
                success: true,
                message: "Account created successfully",
              })
            )
            .catch((err) => {
              console.log(err);
            });
        });
      });
    } else {
      res.status(422).send("data_incomplete");
    }
  } else {
    res.status(422).send("req_method_not_supported");
  }
};
export default connectDB(handler);
