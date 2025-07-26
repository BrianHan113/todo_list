const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const cors = require('cors')
const pool = require('./config/db')
const helmet = require('helmet')
const rateLimiter = require('express-rate-limit')
const authRouter = require('./routes/authRoutes')
const authMiddleware = require('./middleware/authMiddleware')
const tasksRouter = require('./routes/taskRoutes')
const userRouter = require('./routes/userRoutes')
const cookieParser = require('cookie-parser');

const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 100,
}))

app.use(cookieParser());
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/tasks', authMiddleware, tasksRouter)
app.use('/api/v1/user', authMiddleware, userRouter)

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
