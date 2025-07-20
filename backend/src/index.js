const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const pool = require('./config/db')
const helmet = require('helmet')
const rateLimiter = require('express-rate-limit')
const authRouter = require('./routes/authRoutes')

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 100,
}))

app.use('/api/v1/auth', authRouter)

app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT current_database()')
    res.send(`DB name is: ${result.rows[0].current_database}`)
  } catch {
    res.send('Failed to connect to db')
  }
})

app.listen(port, () => {
  console.log(`http://localhost:${port}/`)
})
