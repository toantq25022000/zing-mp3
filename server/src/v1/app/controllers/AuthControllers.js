const User = require("../models/User");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
class AuthController {
  //@route POST /v1/api/auth/check-exists?field=email&value=....@gmail.com
  //@desc check exists email
  //@access public

  async checkExists(req, res) {
    const { value } = req.query;

    try {
      const user = await User.findOne({ email: value });

      return res.status(200).json({ is_exists: !!user });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }

  //@route POST /v1/api/auth/signup-with-email
  //@desc signup with email
  //@access public
  async signUpWithEmail(req, res) {
    const { email, password, full_name } = req.body;

    if (!email || !password || !full_name)
      return res.status(400).json({
        success: false,
        message: "Missing email or password or fullname",
      });
    const splitFullName = full_name.trim().split(" ");
    const first_name = splitFullName[0];
    const last_name = splitFullName.slice(1).join(" ");

    try {
      //All good
      const hashedPassword = await argon2.hash(password);
      const newUser = new User({
        email,
        password: hashedPassword,
        full_name,
        first_name,
        last_name,
      });

      await newUser.save();
      // Return token
      const accessToken = jwt.sign(
        { userId: newUser._id },
        process.env.ACCESS_TOKEN_SECRET
      );
      res.json({
        success: true,
        message: "Register account successfully",
        accessToken,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }

  //@route POST /v1/api/auth/login
  //@desc Login user
  //@access public

  async loginWithEmail(req, res) {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, message: "Missing email or password" });
    try {
      //Check for  exist user
      const user = await User.findOne({ email });
      if (!user)
        return res
          .status(400)
          .json({ success: false, message: "Incorrect email or password" });
      const passwordValid = await argon2.verify(user.password, password);
      if (!passwordValid) {
        return res
          .status(400)
          .json({ success: false, message: "Incorrect email or password" });
      }
      // Return token
      const accessToken = jwt.sign(
        { userId: user._id },
        process.env.ACCESS_TOKEN_SECRET
      );
      res.json({ success: true, message: "Login successfully", accessToken });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
}

module.exports = new AuthController();
