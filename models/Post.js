import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
    //Made correction here to fix endpoints. Slight syntax error
    comments: [commentSchema],
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