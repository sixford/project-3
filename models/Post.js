import mongoose from 'mongoose'
import Comment from './Comment.js'

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
    comments: [{ type: mongoose.ObjectId, ref: 'Comment' }],
    likes: [{ type: mongoose.ObjectId, ref: 'User' }],
    owner: { type: mongoose.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  }
)


export default mongoose.model('Post', postSchema)