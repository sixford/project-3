import mongoose from 'mongoose'
//imported commentSchema
import commentSchema from './Comment.js'

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
    //Made correction here to fix endpoints. Slight syntax error
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    // likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    // owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    likes: [{ type: mongoose.ObjectId, ref: 'User' }],
    owner: { type: mongoose.ObjectId, ref: 'User' },

  },
  {
    timestamps: true,
  }
)

export default mongoose.model('Post',postSchema)