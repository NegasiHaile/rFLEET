import mongoose from 'mongoose'

const weightSchema = new mongoose.Schema({
  unit: {
    type: String,
    required: true,
    lowercase: true,
    enum: ['ounce', 'pound', 'gram', 'kilogram'],
    default: 'ounce'
  },
  value: {
    type: Number,
    required: true
  }
})

const Weight = mongoose.model('Weight', weightSchema)

export default Weight
