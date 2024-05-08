import User from '../models/User.js'
import { sendError, sendUnauthorized } from '../lib/common.js'
import { Error } from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config.js'


//controller to view  user profile ✅
export const getProfile = async (req, res) => {
  try {
    // console.log('Hit view profile endpoint!!')
    console.log(req.currentUser._id)
    const profile = await User.findById(req.currentUser._id)
    return res.json(profile)
    //*requires currentUser._id
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
}

//PView All Profiles(for development testing)
export const profileIndex = async (req, res) => {
  try {
    const allUsers = await User.find()
    return res.json(allUsers)
  } catch (error) {
    console.log(error, res)
  }
}

//Controller to Delete user profile ✅
export const deleteProfile = async (req, res) => {
  try {
    console.log('Hit DELETE endpoint')
    // console.log(req)
    //*requires req.params i think?
  } catch (error) {
    console.log(error)
  }
}

//controller to view  others profile
export const getOtherProfile = async (req, res) => {
  try {
    const { userId } = req.params
    //Was attempting to populate the cars on line below
    const foundUser = await User.findById(userId).populate('cars')
    if (!foundUser) throw new Error.DocumentNotFoundError('User not found')
    return res.json(foundUser)
  } catch (error) {
    console.log(error)
  }
}


//controller for user login ✅
export const login = async (req, res) => {
  try {
    const foundUser = await User.findOne({ email: req.body.email })
    // console.log(foundUser)
    if (!foundUser) {
      // console.log('Hit LOGIN endpoint')
      return sendUnauthorized(res)
    }

    if (!bcrypt.compareSync(req.body.password, foundUser.password)) {
      return sendUnauthorized(res)
    }
    // console.log(foundUser._id)
    const token = jwt.sign({ sub: foundUser._id }, process.env.SECRET, { expiresIn: '24h' })
    // console.log(token)

    return res.json({
      message: `Welcome back, ${foundUser.username}`,
      token: token,
    })
    //*requires req.body(email)
  } catch (error) {
    sendError(error, res)
  }
}


//controller for user register ✅
export const register = async (req, res) => {
  try {
    const registeredUser = await User.create(req.body)
    return res.json({ message: `Welcome, ${registeredUser.username}` })
    // console.log('Hit REGISTER endpoint')
    // console.log(req)
    //*requires req.body
  } catch (error) {
    sendError(error, res)
    console.log(error)
  }
}

