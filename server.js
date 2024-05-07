import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import 'dotenv/config'

const app = express()
const { PORT, CONNECTION_STRING } = process.env

app.use(morgan('dev'))
app.use(express.json())

// Router goes here //

async function startServers() {
    try {
        await mongoose.connect(CONNECTION_STRING)
        console.log('💾 Database connection established')

        app.listen(PORT, () => console.log(`✅Server up and running on port ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}

startServers()