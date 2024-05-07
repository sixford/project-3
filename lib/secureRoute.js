import { sendUnauthorized } from "./common.js";
import '.env/config'
import User from "../models/User.js";


export default async (req, res,next)=> {
    try {
        console.log('TO DO')
    } catch (error) {
        return(sendUnauthorized(res))
    }
}