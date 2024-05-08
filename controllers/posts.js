import Post from '../models/Post.js'
import { Error } from 'mongoose'
//! import error handlers here
import { sendError, sendUnauthorized } from '../lib/common.js'

//Get All Posts
export const getPosts = async (req, res) => {
  try {
    console.log('Hit Get All Post Endpoint')
  } catch (error) {
    console.log(error)
  }
}

//Create Post ✅
export const createPost = async (req, res) => {
  try {
    req.body.owner = req.currentUser._id
    // console.log(req.body)
    const createdPost = await Post.create(req.body)
    return res.status(201).json(createdPost)
  } catch (error) {
    console.log(error)
  }
}

//Single Post (Read) - Populate users posts ✅
export const getPost = async (req, res) => {
  try {
    const { postId } = req.params
    console.log(req.params)

    const foundPost = await Post.findById(postId)
    // .populate('owner').populate('posts')

    if (!foundPost) throw new Error.DocumentNotFoundError('Post Not Found')
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

