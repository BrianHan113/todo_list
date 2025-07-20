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

module.exports = {
  getUserByUsername
}