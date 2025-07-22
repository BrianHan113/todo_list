const { StatusCodes } = require("http-status-codes")
const userModel = require("../models/User") // Simple functionality, no need for userService layer

const getUser = async (req, res) => {
  try {
    const { user_id } = req.user;
    const userRows = await userModel.getUserByUserID(user_id);
    const user = userRows[0]

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: "User not found" });
    }

    res.status(StatusCodes.OK).json({ user });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Server error" });
  }
}

module.exports = {
  getUser
}
