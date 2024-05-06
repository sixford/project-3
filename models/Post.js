import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        image: { type: String, required: true },
        comments: [commentSchema],
        likes: { type: [mongoose.ObjectId], ref: 'User' },
        owner: { type: mongoose.ObjectId, ref: 'User' }

    },
    {
        timestamps: true
    }
)

export default postSchema