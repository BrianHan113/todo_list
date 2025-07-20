const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userModel = require('../models/User')

const register = async ({ username, password, dob }) => {
  const existingUsers = await userModel.getUserByUsername(username);
  if (existingUsers.length > 0) throw new Error('Username already taken');

  const hashedPassword = await bcrypt.hash(password, 12);
  const newUser = await userModel.createUser({ username, password: hashedPassword, dob });

  // Generate token right away for register and login functionality
  const token = jwt.sign(
    { id: newUser.id, username: newUser.username },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );

  return { user: newUser, token };
};

const login = async (username, password) => {
  const users = await userModel.getUserByUsername(username)
  if (users.length === 0) throw new Error('User not found')

  const user = users[0]
  const match = await bcrypt.compare(password, user.password)
  if (!match) throw new Error('Invalid credentials')

  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  )

  const userWithoutPassword = { ...user };
  delete userWithoutPassword.password;

  // Token should be attatched to every subsequent req in the auth header by frontend
  return { user: userWithoutPassword, token };
}

module.exports = {
  register,
  login,
}