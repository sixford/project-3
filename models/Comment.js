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

commentSchema.virtual('popUser', {
    ref: 'User',
    localField: 'owner',
    foreignField: '_id'
})

export default mongoose.model('Comment', commentSchema)