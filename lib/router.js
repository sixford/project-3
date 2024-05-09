import { Router } from 'express'
import { getProfile, deleteProfile, getOtherProfile, login, register, profileIndex, addCar ,deleteCar} from '../controllers/users.js'
import { getPosts, createPost, getPost, updatePost, deletePost } from '../controllers/posts.js'
import { getComments, createComment, getComment, updateComment, deleteComment } from '../controllers/comments.js'
import secureRoute from './secureRoute.js'

//! Import secureRoute


const router = Router()


//* USER
router.route('/profile')
  .get(profileIndex)
  .get(secureRoute, getProfile)
  .delete(secureRoute, deleteProfile)

//* INDEX
router.route('/profile/:userId')
  .get(getOtherProfile)

//* LOGIN
router.route('/login')
  .post(login)

//* REGISTER
router.route('/register')
  .post(register)

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
  .get(getPosts)
  .post(secureRoute, createPost)

router.route('/posts/:postId')
  .get(getPost)
  .put(updatePost)
  .delete(deletePost)

//*COMMENTS
router.route('/posts/:postId/comments')
  .get(secureRoute, getComments)
  .post(secureRoute, createComment)

router.route('/posts/:postId/comments/:commentId')
  .get(secureRoute, getComment)
  .put(secureRoute, updateComment)
  .delete(secureRoute, deleteComment)

export default router