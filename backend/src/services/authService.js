const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userModel = require('../models/User')

const register = async (username, password, dob) => {
  const existingUsers = await userModel.getUserByUsername(username);
  if (existingUsers.length > 0) throw new Error('Username already taken');
  if (password.length < 5) throw new Error("Password must be 5+ characters");

  const hashedPassword = await bcrypt.hash(password, 12);
  const newUser = await userModel.createUser(username, hashedPassword, dob);

  // Generate token right away for register and login functionality
  const token = jwt.sign(
    { user_id: newUser.user_id, username: newUser.username, dob: newUser.dob },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || "12h" }
  );

  return { token };
};

const login = async (username, password) => {
  const users = await userModel.getUserByUsername(username)
  if (users.length === 0) throw new Error("Invalid username or password")

  const user = users[0]
  const match = await bcrypt.compare(password, user.password)
  if (!match) throw new Error("Invalid username or password")

  const token = jwt.sign(
    { user_id: user.user_id, username: user.username, dob: user.dob },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || "12h" }
  )

  // Token should be attatched to every subsequent req in the auth header by frontend
  return { token };
}

module.exports = {
  register,
  login,
}