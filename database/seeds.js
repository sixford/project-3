import mongoose from 'mongoose'
import 'dotenv/config'
import User from '../models/User.js'
import userData from './data/users.js'
import carsData from './data/cars.js'
import Post from '../models/Post.js'
import postData from './data/posts.js'
import commentData from './data/comments.js'
import Comment from '../models/Comment.js'

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
    const admin = await User.findOne({ username: "admin" })
    console.log("FOUND ADMIN:", admin)

    createdUsers.forEach(user => admin.following.push(user._id))
    admin.save()
    // Deletet, Create comments, adding owners 
    const deletedComments = await Comment.deleteMany()
    console.log(`${deletedComments.deletedCount} comments deleted`)

    const createdComments = await Comment.create(
      commentData.map(comment => {
        return ({ ...comment, owner: createdUsers[Math.floor(Math.random() * createdUsers.length)]._id })
      }))
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


    // Add owner and comments and count
    let totalComments = 0
    const updatedPosts = postData.map(post => {
      const randOwnerId = createdUsers[Math.floor(Math.random() * createdUsers.length)]._id
      const newPost = { ...post, owner: randOwnerId, comments: randomComments() }
      // for counting
      totalComments += newPost.comments.length

      return (newPost)
    })

    console.log("created_post_1: ", updatedPosts[0])

    // Create posts
    const createdPosts = await Post.create(updatedPosts)
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
