import mongoose from 'mongoose'
import 'dotenv/config'

import User from '../models/User.js'
import userData from './data/users.js'
import Cars from './data/cars.js'
import carsData from '/data/cars.js'

async function seedData(){

  try {

    await mongoose.connect(process.env.CONNECTION_STRING)
    console.log('Database connection established.')

    const deletedUsers = await User.deleteMany()
    console.log(`${deletedUsers.deletedCount} users deleted.`)

    const createdUsers = await User.create(userData)
    console.log(`${createdUsers.length} users created.`)

    const deletedCars = await Cars.deleteMany()
    console.log(`${deletedCars.deletedCount} cars deleted.`)

    const carsWithOwners = carsData.map(car => {
      const userId = createdUsers[Math.floor(Math.random() * createdUsers.length)]._id
      return { ...car, owner: userId }
    })

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