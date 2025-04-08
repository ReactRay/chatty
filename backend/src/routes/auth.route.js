// src/routes/auth.route.js
import express from 'express'
import {
  signup,
  login,
  logout,
  checkAuth,
  updateProfile,
} from '../controllers/auth.controller.js'
import { protectRoute } from '../middleware/auth.middleware.js'

const router = express.Router() // 🔄 use Router() instead of express()

router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)
router.put('/update-profile', protectRoute, updateProfile)
router.get('/check', protectRoute, checkAuth)

export default router
