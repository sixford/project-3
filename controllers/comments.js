// import Comment from '../models/Comment.js'
import { Error } from 'mongoose'
import Post from '../models/Post.js'

//GET ALL COMMENTS
export const getComments = async (req, res) => {
  try {
    console.log('Hit ALL COMMENTS endpoint')
  } catch (error) {
    console.log(error)
  }
}

//CREATE NEW COMMENT
export const createComment = async (req, res) => {
  try {
    console.log('Hit CREATE COMMENT endpoint')
  } catch (error) {
    console.log(error)
  }
}

//GET SINGLE COMMENT
export const getComment = async (req, res) => {
  try {
    console.log('Hit SINBGLE COMMENT endpoint')
  } catch (error) {
    console.log(error)
  }
}

//UPDATE COMMENT
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
    console.log('Hit DELETE COMMENT endpoint')
  } catch (error) {
    console.log(error)
  }
}


