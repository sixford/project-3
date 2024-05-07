import User from '../models/User.js'
//! import error handlers here
//! import jwt here
import 'dotenv/config.js'
//! import bcrypt here


//controller to view  user profile
export const getProfile = async (req,res) => {
    try {
        console.log("Hit view profile endpoint!!")
        // console.log(req)
        //*requires currentUser._id
    } catch (error) {
        console.log(error)
    }
}

//Controller to Delete user profile
export const deleteProfile = async (req,res) => {
    try {
        console.log('Hit DELETE endpoint')
        // console.log(req)
        //*requires req.params i think?
    } catch (error) {
        console.log(error)
    }
}

//controller to view  others profile
export const getOtherProfile = async (req,res) => {
    try {
        console.log("Hit VIEW OTHER PROFILE endpoint!!")
        // console.log(req)
        //*requires currentUser._id
    } catch (error) {
        console.log(error)
    }
}


//controller for user login
export const login = async (req,res) => {
    try {
        console.log('Hit LOGIN endpoint')
        // console.log(req)
        //*requires req.body(email)
    } catch (error) {
        console.log(error)
    }
}


//controller for user register
export const register = async (req,res) => {
    try {
        console.log('Hit REGISTER endpoint')
        // console.log(req)
        //*requires req.body
    } catch (error) {
        console.log(error)
    }
}

