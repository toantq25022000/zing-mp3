const User = require("../models/User");
class UserController {
  async getCurrentUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.userId }).select(
        "username first_name last_name email -_id"
      );

      if (!user) return res.status(404).send("User not found");
      return res.status(200).json({ success: true, data: user });
    } catch (error) {
      console.log(err);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
}

module.exports = new UserController();
