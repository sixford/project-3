import {Router} from 'express'
import {getProfile} from '../controllers/users.js'

const router = Router()

router.route('/profile')
    .get(getProfile)


export default router