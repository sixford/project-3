import { sendUnauthorized } from './common.js'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import User from '../models/User.js'

export default async (req, res, next) => {
  try {
    //console.log(req.headers)

    if (!req.headers.authorization) throw new Error()

    const token = req.headers.authorization.replace('Bearer ', '')

    const payload = jwt.verify(token, process.env.SECRET)

    const foundUser = await User.findById(payload.sub)

    if (!foundUser) throw new Error()

    req.currentUser = foundUser

    next()
  } catch (error) {
    console.log(error)
    return sendUnauthorized(res)
  }
}