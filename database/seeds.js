import mongoose from 'mongoose'
import 'dotenv/config'

import User from '../models/User.js'
import userData from './data/users2.js'
import Cars from '../models/cars.js'
import carsData from './data/cars.js'

async function seedData() {

  try {
    // Establish a connection to MongoDB
    await mongoose.connect(process.env.CONNECTION_STRING)
    console.log('Database connection established.')
    // Remove existing users
    const deletedUsers = await User.deleteMany()
    console.log(`${deletedUsers.deletedCount} users deleted.`)
    // Add new users
    const createdUsers = await User.create(userData)
    console.log(`${createdUsers.length} users created.`)
    // Remove existing cars
    const deletedCars = await Cars.deleteMany()
    console.log(`${deletedCars.deletedCount} cars deleted.`)
    // Add random user id to a new owner field for each car to create
    const carsWithOwners = carsData.map(car => {
      const userId = createdUsers[Math.floor(Math.random() * createdUsers.length)]._id
      return { ...car, owner: userId }
    })
    // Add seed data into the database as new documents
    const createdCars = await Cars.create(carsWithOwners)
    console.log(`${createdCars.length} cars added. `)

    await mongoose.connection.close()
    console.log('Connection close.')
  } catch (error) {
    console.log(error)

    await mongoose.connection.close()
    console.log('Connection closed')
  }
}
seedData()