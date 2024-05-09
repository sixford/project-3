import mongoose from 'mongoose'
import 'dotenv/config'
import User from '../models/User.js'
import userData from './data/users.js'
import carsData from './data/cars.js'

async function seedData() {

  try {
    
    // Establish a connection to MongoDB
    await mongoose.connect(process.env.CONNECTION_STRING)
    console.log('Database connection established.')

    // Remove existing users
    const deletedUsers = await User.deleteMany()
    console.log(`${deletedUsers.deletedCount} users deleted.`)

    // Add new users and include the cars data in here aswell
    const createdUsers = await User.create(
      userData.map(user => ({
        ...user, 
        cars: [carsData[Math.floor(Math.random() * carsData.length)]],
      }))
    )

    console.log(`${createdUsers.length} users created.And Cars data added`)
    await mongoose.connection.close()
    console.log('Connection close.')
  } catch (error) {

    console.log(error)

    await mongoose.connection.close()
    console.log('Connection closed')
  }
}
seedData()
