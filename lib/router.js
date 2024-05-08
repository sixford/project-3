import { Router } from 'express'
import { getProfile, deleteProfile, getOtherProfile, login, register, profileIndex } from '../controllers/users.js'
import { getPosts, createPost, getPost, updatePost, deletePost } from '../controllers/posts.js'
import { getComments, createComment, getComment, updateComment, deleteComment } from '../controllers/comments.js'
import secureRoute from './secureRoute.js'

//! Import secureRoute


const router = Router()


//* USER
router.route('/profile')
  .get(secureRoute, getProfile)
  .get(profileIndex)
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
  .get(getComments)
  .post(createComment)

router.route('/posts/:postId/comments/:commentId')
  .get(getComment)
  .put(updateComment)
  .delete(deleteComment)


export default router