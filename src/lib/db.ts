import mongoose, { ConnectOptions } from 'mongoose'

const { MONGODB_URI, MONGODB_DB } = process.env

if (!MONGODB_URI || !MONGODB_DB) {
  throw new Error('Please define MONGODB_URI and MONGODB_DB in your environment variables')
}

// Define MongoDB connection options (optional)
const options: ConnectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: MONGODB_DB
} as any

let isConnected = false

export const connectToDatabase = () => {
  // Create a MongoDB connection
  mongoose.connect(MONGODB_URI, options)

  // Get the default connection
  const db = mongoose.connection

  // Event handling for successful connection
  db.on('connected', () => {
    isConnected = true
    console.log(`Connected to MongoDB: ${MONGODB_URI}`)
  })

  // Event handling for connection errors
  db.on('error', (err) => {
    isConnected = false
    console.error('MongoDB connection error:', err)
  })

  // Event handling for disconnection
  db.on('disconnected', () => {
    isConnected = false
    console.log('MongoDB disconnected')
  })
}

export const isDatabaseConnected = () => isConnected
