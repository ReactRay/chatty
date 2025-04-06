import { generateToken } from '../lib/utils.js'
import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'

export async function signup(req, res) {
  const { fullName, email, password } = req.body

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  try {
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: 'password must be atleast 6 digits' })
    }

    const user = await User.findOne({ email })

    if (user) return res.status(400).json({ message: 'email already exists' })

    const salt = await bcrypt.genSalt(10)

    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    })

    if (newUser) {
      generateToken(newUser._id, res)
      await newUser.save()

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      })
    } else {
      res.status(400).json({ message: 'invalid user data' })
    }
  } catch (error) {
    console.log('Error in signup controller', error.message)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export async function login(req, res) {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ message: 'invalid credintials' })
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'invalid credintials' })
    }

    generateToken(user._id, res)

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    })
  } catch (error) {
    console.log('error in login controller', error.message)
  }
}

export function logout(req, res) {
  try {
    res.cookie('jwt', '', { maxAge: 0 })
    res.status(200).json({ message: 'logged out successfully' })
  } catch (error) {
    console.log('Error in checkAuth controller', error.message)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export async function updateProfile(req, res) {}
