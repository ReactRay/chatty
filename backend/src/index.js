import express from 'express'
import authRoutes from './routes/auth.route.js'
import dotenv from 'dotenv'
import { connectDB } from './lib/db.js'

dotenv.config()

const PORT = process.env.PORT || 5001

const app = express()

app.use('/api/auth', authRoutes)

app.listen(5001, () => {
  console.log(`server is running on port ${PORT}`)
  connectDB()
})
