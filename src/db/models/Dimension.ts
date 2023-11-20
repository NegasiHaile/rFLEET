import mongoose from 'mongoose'

const dimensionSchema = new mongoose.Schema({
  unit: {
    type: String,
    required: true,
    lowercase: true,
    enum: ['inch', 'centimeter'],
    default: 'inch'
  },
  length: {
    type: Number,
    required: true
  },
  width: {
    type: Number,
    required: true
  },
  height: {
    type: Number,
    required: true
  }
})

const Dimension = mongoose.model('Dimension', dimensionSchema)

export default Dimension
