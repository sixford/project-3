import mongoose from 'mongoose'

// Subject to change (Simon); carSchema already nested inside user model/userSchema.

const carSchema = new mongoose.Schema(
  {
    make: { type: String, required: true },
    model: { type: String, required: true },
    image: { type: String },
    mileage: { type: String, required: true },
    year: { type: Number },
    owner: { type: mongoose.ObjectId, ref: 'User', required: true },
  }

)

export default mongoose.model('Car', carSchema);



