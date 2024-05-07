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

export default mongoose.model('Comment',commentSchema)