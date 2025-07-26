const pool = require('../config/db')

const getUserByUsername = async (username) => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [username])
    return result.rows
  } catch (err) {
    console.error("Error getting user:", err)
    throw err
  }
}

const getUserByUserID = async (user_id) => {
  try {
    const result = await pool.query("SELECT user_id, username, dob FROM users WHERE user_id = $1", [user_id])
    return result.rows
  } catch (err) {
    console.error("Error getting user:", err)
    throw err
  }
}

const createUser = async (username, hashedPassword, dob) => {
  try {
    const result = await pool.query(
      "INSERT INTO users (username, password, dob) VALUES ($1, $2, $3) RETURNING user_id, username, dob",
      [username, hashedPassword, dob]
    )
    return result.rows[0]

  } catch (err) {
    console.error("Error creating user:", err)
    throw err
  }
}

module.exports = {
  getUserByUsername,
  getUserByUserID,
  createUser
}