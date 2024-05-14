import Post from '../models/Post.js'
import { Error } from 'mongoose'
//! import error handlers here
import { sendError } from '../lib/common.js'

//Get All Posts
// export const getPosts = async (req, res) => {
//   try {
//     console.log('Hit Get All Post Endpoint')
//   } catch (error) {
//     console.log(error)
//   }
// }

//Get all posts 

export const getPosts = async (req, res) => {
  try {
    const foundPosts = await Post.find()
    return res.json(foundPosts)
  } catch (error) {
    sendError(error, res)
  }
}

//Create Post ✅
export const createPost = async (req, res) => {
  try {

    req.body.owner = req.currentUser._id
    const createdPost = await Post.create(req.body)
    return res.status(201).json(createdPost)
  } catch (error) {
    console.log(error)
    //added this line -viv
    res.status(400).json({ message: 'Validation failed', errors: error.errors })
  }
}

//Single Post (Read) - Populate users posts ✅
export const getPost = async (req, res) => {
  try {
    const { postId } = req.params

    let foundPost = await Post.findById(postId).populate('owner').populate('comments').populate({ path: 'comments', populate: { path: 'owner' } })

    if (!foundPost) throw new Error.DocumentNotFoundError('Post Not Found')

    // return user id to check like and follow
    foundPost = { ...foundPost, currentUser: req.currentUser._id }

    return res.json(foundPost)
  } catch (error) {
    sendError(error, res)
  }
}


//Update Post ✅
export const updatePost = async (req, res) => {
  try {
    const { postId } = req.params

    const postDocument = await Post.findById(postId)

    if (!postDocument)
      return res.status(404).json({ message: 'Post Not Found' })

    Object.assign(postDocument, req.body)

    await postDocument.save()

    return res.json(postDocument)
  } catch (error) {
    sendError(error, res)
  }
}

//Delete Post ✅
export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params

    const deletedPost = await Post.findByIdAndDelete(postId)

    if (!deletedPost)
      return res.status(404).json({ message: 'Post Not Found' })

    return res.sendStatus(204)
  } catch (error) {
    sendError(error, res)
  }
}

export const handleLike = async (req, res) => {
  try {
    const currentUser = req.currentUser

    // wants 'postId' property passed in req.body
    const postToLike = await Post.findById(req.body.postId)

    // If already liked:
    console.log(currentUser)
    if (postToLike.likes.includes(currentUser._id)) {
      // Remove from likes for both
      currentUser.likes.splice(currentUser.likes.findIndex((id) => id === postToLike._id), 1)
      postToLike.likes.splice(postToLike.likes.findIndex((id) => id === currentUser._id), 1)
    } else {
      // Add each object id into each likes array
      postToLike.likes.push(req.currentUser._id)
      // req.currentUser.likes.push(postToLike._id)
    }
    // save documents
    currentUser.save()
    postToLike.save()

    // respond with updated user
    return res.sendStatus(204)

  } catch (error) {
    sendError(error, res)
  }
}