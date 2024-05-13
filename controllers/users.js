import User from '../models/User.js'
import { sendError, sendUnauthorized } from '../lib/common.js'
import { Error } from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config.js'
import Post from '../models/Post.js'

//controller to view  user profile ✅
export const getProfile = async (req, res) => {
  try {
    console.log(req.currentUser._id)
    const profile = await User.findById(req.currentUser._id).populate('posts').populate('following')
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
    console.log('Hit DELETE endpoint')
    // console.log(req)
  } catch (error) {
    console.log(error)
  }
}

//controller to view  others profile
export const getOtherProfile = async (req, res) => {
  try {
    const { userId } = req.params

    let foundUser = await User.findById(userId).populate('posts')
    if (!foundUser) throw new Error.DocumentNotFoundError('User not found')

    // Add logged in user id to check if following
    foundUser = { ...foundUser, userId: req.currentUser._id }
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


//controller for user register ✅
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

// Generate a list of all posts from followers
export const getHomeFeed = async (req, res) => {
  try {

    // Get following list, find each user and populate posts, appending posts to  array
    const following = req.currentUser.following
    let posts = []

    if (following.length === 0) {
      posts = await Post.find({})
    } else {
      for (let i = 0; i < following.length; i++) {
        const followingWithPosts = await User.findById(following[i]).populate('posts')
        posts.push(...followingWithPosts.posts)
      }
    }
    // Return array of all posts of users followed
    return res.json(posts)
  } catch (error) {
    sendError(error, res)
  }
}

// Follow a User endpoint
export const handleFollow = async (req, res) => {
  try {

    // Disallow following yourself -> this needs an error message handler in sendError
    if (req.body.toFollow == req.currentUser._id) throw new Error(`You cant follow yourself User ${req.currentUser._id}`)

    // retrieve user and userToFollow documents
    const newFollow = req.body.toFollow
    const follow = await User.findById(newFollow)
    if (!follow) throw new DocumentNotFoundError('Not a user Id')

    const currentUser = req.currentUser
    // If already following

    if (currentUser.following.includes(follow._id)) {
      // remove eachother from their respective followers/following arrays

      follow.followers = follow.followers.filter(id => !id.equals(currentUser._id))

      currentUser.following = currentUser.following.filter(id => !id.equals(follow._id))

      // follow.followers.splice(follow.followers.findIndex((element) => element === currentUser._id), 1)
      // currentUser.following.splice(currentUser.following.findIndex((element) => element === req.body.toFollow), 1)
    } else {
      // If a new follower: push into eachother's following/followers arrays
      currentUser.following.push(follow._id)
      follow.followers.push(currentUser._id)
    }
    // save the documents
    currentUser.save()
    follow.save()

    // return a response
    return res.sendStatus(204)

  } catch (error) {
    sendError(error, res)
  }
}