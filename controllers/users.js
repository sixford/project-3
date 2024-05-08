import User from '../models/User.js'
import { sendError, sendUnauthorized } from '../lib/common.js'
import { Error } from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config.js'


//controller to view  user profile ✅
export const getProfile = async (req, res) => {
  try {
    console.log(req.currentUser._id)
    const profile = await User.findById(req.currentUser._id)
    return res.json(profile)
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

//Controller to Delete user profile
export const deleteProfile = async (req, res) => {
  try {
    const userId = req.currentUser._id

    const deletedUser = await User.findById(userId)

    if (!deletedUser) throw new Error.DocumentNotFoundError('User not Found')

    return res.status(200).json({ message: 'User profile deleted successfully' })

  } catch (error) {
    console.log(error, res)
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
    if (!foundUser) {
      return sendUnauthorized(res)
    }
    if (!bcrypt.compareSync(req.body.password, foundUser.password)) {
      return sendUnauthorized(res)
    }
    const token = jwt.sign({ sub: foundUser._id }, process.env.SECRET, { expiresIn: '24h' })
    return res.json({
      message: `Welcome back, ${foundUser.username}`,
      token: token,
    })
  } catch (error) {
    sendError(error, res)
  }
}


//controller for user register
export const register = async (req, res) => {
  try {
    const registeredUser = await User.create(req.body)
    return res.json({ message: `Welcome, ${registeredUser.username}` })
  } catch (error) {
    sendError(error, res)
    console.log(error)
  }
}

//Controller to Add a User Car
export const addCar = async (req, res) => {
  try {
    console.log('Hit Create car endpoint')
    const userId = req.currentUser._id
    const carData = req.body
    const user = await User.findById(userId)
    user.cars.push(carData)
    await user.save()
    return res.status(201).json('Car added!')
  } catch (error) {
    sendError(error, res)
    console.log(error)
  }
}


//Controller to Delete a user Car
export const deleteCar = async (req, res) => {
  try {
    const { carId } = req.params
    const userId = req.currentUser._id
    const user = await User.findById(userId)
    if (!carId) throw new Error.DocumentNotFoundError('Car not Found')
    const carToDelete = user.cars.id(carId)
    carToDelete.deleteOne()
    await user.save()
    return res.sendStatus(204)
  } catch (error) {
    console.log(error)

  }
}
