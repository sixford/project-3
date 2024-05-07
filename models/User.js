import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const carSchema = new mongoose.Schema({
    make: String,
    model: String,
    Image: String,
    Mileage: String,
    Year: Number
})

// Followrs, Following, Likes and Cars are arrays, the rest are strings
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: String,
    followers: { type: [mongoose.ObjectId], ref: 'User' },
    following: { type: [mongoose.ObjectId], ref: 'User' },
    likes: { type: [mongoose.ObjectId], ref: 'Post' },
    cars: [carSchema],
})


// Set virtual password confirmation property
userSchema
    .virtual('passwordConfirmation')
    .set(function (value) {
        this._passwordConfirmation = value
    })

// Validate password confirmation or reject
userSchema.pre('validate', function (next) {
    // Only do this check if we are modifying password
    if (this.isModified('password') && this.password !== this._passwordConfirmation) {
        this.invalidate('passwordConfirmation', 'Ensure passwords are matching')
    }

    next()
})

// Hash and store password
userSchema.pre('save', function (next) {
    // Only if we are updating password
    if (this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(12))
    }
    next()
})

// Delete password when sending user data
userSchema.set('toJSON', {
    virtuals: true,
    transform(doc, json) {
        delete json.password
    }
})


// Virtuals to populate posts and comments by matching user id to owner field
userSchema.virtual('posts', {
    ref: 'Post',
    localField: '_id',
    foreignField: 'owner',
})

userSchema.virtual('comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'owner'
})

//! Logic to add cars to user schema


export default mongoose.model('User', userSchema)
