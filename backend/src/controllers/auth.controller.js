import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'

export async function signup(req, res) {
  const { fullName, email, password } = req.body

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

    if (newUSer) {
    } else {
      res.status(400).json({ message: 'invalid user data' })
    }
  } catch (error) {}
}

export function login(req, res) {
  res.send('login')
}

export function logout(req, res) {
  res.send('logout')
}
