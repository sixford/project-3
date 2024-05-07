import mongoose from "mongoose";
//imported commentSchema
import commentSchema from "./Comment.js";

const postSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        image: { type: String, required: true },
        //Made correction here to fix endpoints. Slight syntax error
        comments: [{type: commentSchema}],
        likes: { type: [mongoose.ObjectId], ref: 'User' },
        owner: { type: mongoose.ObjectId, ref: 'User' }
    },
    {
        timestamps: true,
    }
)

export default postSchema