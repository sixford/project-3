import { Router } from 'express'
import { getProfile, deleteProfile, getOtherProfile, login, register, profileIndex, addCar, deleteCar, getHomeFeed, handleFollow } from '../controllers/users.js'
import { getPosts, createPost, getPost, updatePost, deletePost } from '../controllers/posts.js'
import { getComments, createComment, getComment, updateComment, deleteComment } from '../controllers/comments.js'
import secureRoute from './secureRoute.js'

//! Import secureRoute


const router = Router()


//* USER
router.route('/profile')
  .get(secureRoute, getProfile)
  .delete(secureRoute, deleteProfile)

//* INDEX

router.route('/profile/:userId')
  .get(getOtherProfile)

// All Profiles
router.route('/profile/all')
  .get(profileIndex)

//* LOGIN
router.route('/login')
  .post(login)

//* REGISTER
router.route('/register')
  .post(register)

// Generate array of posts for the Home Feed
router.route('/homefeed')
  .get(secureRoute, getHomeFeed)

//* CARS
//Create
router.route('/profile/cars')
  .post(secureRoute, addCar)

//Delete
router.route('/profile/cars/:carId')
  .delete(secureRoute, deleteCar)

//*POSTS
router.route('/posts')
  //Get all user posts
  .get(secureRoute, getPosts)
  .post(secureRoute, createPost)

router.route('/posts/:postId')
  //get single post
  .get(getPost)
  //update post
  .put(updatePost)
  //update post
  .delete(deletePost)

//*COMMENTS
router.route('/posts/:postId/comments')
  .get(secureRoute, getComments)
  .post(secureRoute, createComment)

router.route('/posts/:postId/comments/:commentId')
  .get(secureRoute, getComment)
  .put(secureRoute, updateComment)
  .delete(secureRoute, deleteComment)

// FOLLOW A USER
router.route('/follow')
  .post(secureRoute, handleFollow)

export default router