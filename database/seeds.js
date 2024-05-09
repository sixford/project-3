import mongoose from 'mongoose'
import 'dotenv/config'
import User from '../models/User.js'
import userData from './data/users.js'
import carsData from './data/cars.js'
import { Post, Comment } from '../models/Post.js'
import postData from './data/posts.js'
import commentData from './data/comments.js'

async function seedData() {

  try {

    // Establish a connection to MongoDB
    await mongoose.connect(process.env.CONNECTION_STRING)
    console.log('Database connection established.')

    // Remove existing users
    const deletedUsers = await User.deleteMany()
    console.log(`${deletedUsers.deletedCount} users deleted.`)

    // Add new users and include the cars data in here aswell
    const createdUsers = await User.create(
      userData.map(user => ({
        ...user,
        cars: [carsData[Math.floor(Math.random() * carsData.length)]],
      }))
    )

    console.log(`${createdUsers.length} users created. And Cars data added`)

    // Create comments, adding owners 

    const createdComments = commentData.map(comment => {
      return ({ ...comment, owner: createdUsers[Math.floor(Math.random() * createdUsers.length)]._id })
    })
    console.log(`We created ${createdComments.length} comments`)
    console.log('Example -> ', createdComments[0])
    // Add randomly either 2 or three random comments to posts
    const randomComments = () => {
      // Chooses one random comment
      const randomComment = () => { return createdComments[Math.floor(Math.random() * createdComments.length)] }
      return (
        Math.floor(Math.random() * 2) ? [randomComment(), randomComment()] : [randomComment(), randomComment(), randomComment()]
      )
    }
    // Create posts and add comments
    // Delete
    const deletedPosts = await Post.deleteMany()
    console.log(`${deletedPosts.deletedCount} posts deleted`)
    // Add owner and comments
    const updatedPosts = postData.map(post => {
      const randOwnerId = createdUsers[Math.floor(Math.random() * createdUsers.length)]._id
      const newPost = { ...post, owner: randOwnerId, comments: randomComments() }
      return (newPost)
    })

    // Create posts
    const createdPosts = await Post.create(updatedPosts)

    // Count comments
    let totalComments = 0
    createdPosts.forEach(post => {
      totalComments += post.comments.length
    })

    console.log(`${createdPosts.length} posts created and ${totalComments} comments`)

    await mongoose.connection.close()
    console.log('Connection closed.')
  } catch (error) {

    console.log(error)

    await mongoose.connection.close()
    console.log('Connection closed')
  }
}
seedData()
