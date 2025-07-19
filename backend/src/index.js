import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import pool from "./config/db.js"

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

// Middleware
app.use(express.json())
app.use(cors())

// Routes

// Error handling middleware

// Debug/testing
app.get("/", async (req, res) => {
    const result = await pool.query("SELECT current_database()")
    res.send(`DB name is: ${result.rows[0].current_database}`)
})

// Run Server
app.listen(port, () => {
    console.log(`http://localhost:${port}/`)
})