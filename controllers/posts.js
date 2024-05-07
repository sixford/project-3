import Post from '../models/Post.js'
import { Error } from 'mongoose'
//! import error handlers here

//Get All Posts
export const getPosts = async (req, res) => {
  try {
    console.log('Hit Get All Post Endpoint')
  } catch (error) {
    console.log(error)
  }
}

//Create Post
export const createPost = async (req, res) => {
  try {
    console.log('Hit Create Post Endpoint')
  } catch (error) {
    console.log(error)
  }
}

//Single Post
export const getPost = async (req, res) => {
  try {
    console.log('Hit View Single Post Endpoint')
  } catch (error) {
    console.log(error)
  }
}



//Update Post
export const updatePost = async (req, res) => {
  try {
    console.log('Hit Update Post Endpoint')
  } catch (error) {
    console.log(error)
  }
}

//Delete Post
export const deletePost = async (req, res) => {
  try {
    console.log('Hit Delete Post Endpoint')
  } catch (error) {
    console.log(error)
  }
}


