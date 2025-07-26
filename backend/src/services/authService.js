const bcrypt = require('bcrypt')
const userModel = require('../models/User')

const register = async (username, password, dob) => {
  const existingUsers = await userModel.getUserByUsername(username);
  if (existingUsers.length > 0) throw new Error('Username already taken');
  if (username.length === 0) throw new Error("Invalid Username");
  if (password.length < 5) throw new Error("Password must be 5+ characters");
  if (dob.length === 0) throw new Error("Invalid date of birth");
  const hashedPassword = await bcrypt.hash(password, 12);
  const newUser = await userModel.createUser(username, hashedPassword, dob);

  return newUser;
};

const login = async (username, password) => {
  const users = await userModel.getUserByUsername(username);
  if (users.length === 0) throw new Error("Invalid username or password");
  const user = users[0]
  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid username or password");

  return user;
};

module.exports = {
  register,
  login,
};
