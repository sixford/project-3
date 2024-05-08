import { Error } from 'mongoose'
import Post from '../models/Post.js'


//GET ALL COMMENTS
export const getComments = async (req, res) => {
  try {
    console.log('Hit ALL COMMENTS endpoint')
    const { postId } = req.params
    const foundPost = await Post.findById(postId).populate('comments')

    if (!foundPost) throw new Error.DocumentNotFoundError('Post Not Found')

    return res.json(post.comments)
  } catch (error) {
    console.log(error, res)
  }
}

//CREATE NEW COMMENT
export const createComment = async (req, res) => {
  try {
    const { postId } = req.params
    const foundPost = await Post.findById(postId)

    if (!foundPost) throw new Error.DocumentNotFoundError('Post not found.')

    console.log(foundPost)

    req.body.owner = req.currentUser._id

    foundPost.comments.push(req.body)

    await foundPost.save()

    return res.json(foundPost)
  } catch (error) {
    console.log(error)
  }
}

//?GET SINGLE COMMENT PURPOSE?? /Not necessary
export const getComment = async (req, res) => {
  try {
    console.log('Hit SINBGLE COMMENT endpoint')
  } catch (error) {
    console.log(error)
  }
}

//?UPDATE COMMENT Not Necessary
export const updateComment = async (req, res) => {
  try {
    console.log('Hit UPDATE COMMENT endpoint')
  } catch (error) {
    console.log(error)
  }
}

//DELETE COMMENT
export const deleteComment = async (req, res) => {
  try {
    // console.log('Hit DELETE COMMENT endpoint')
    const { postId, commentId } = req.params
    console.log( postId, commentId)
    const foundPost = await Post.findById(postId)

    if (!foundPost) throw new Error('Post not found.')

    const foundComment = foundPost.comments.id(commentId)

    if (!foundComment) throw new Error('Comment not Found')

    foundComment.deleteOne()

    await foundPost.save()

    return res.status(200).json({ message: 'Comment deleted successfully.' })

  } catch (error) {
    console.log(error)
  }
}


