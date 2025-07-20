import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import pool from "./config/db.js"
import helmet from "helmet"
import xss from "xss-clean"
import rateLimiter from "express-rate-limit"

dotenv.config()

const app = express()
const port = process.env.PORT || 5000


// Middleware
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(rateLimiter({
  windowMs: 15*60*1000, // 15 mins
  max: 100, // max num reqs per windowMs
}))

// Routes

// Error handling middleware

// Debug/testing
app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT current_database()")
    res.send(`DB name is: ${result.rows[0].current_database}`)
  } catch {
    res.send("Failed to connect to db")
  }
})

// Run Server
app.listen(port, () => {
    console.log(`http://localhost:${port}/`)
})