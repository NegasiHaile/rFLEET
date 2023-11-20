import mongoose from 'mongoose'

const shipDetailSchema = new mongoose.Schema({
  company_name: {
    type: String
  },
  name: {
    type: String
  },
  phone: {
    type: String
  },
  address_line1: {
    type: String
  },
  address_line2: {
    type: String
  },
  city_locality: {
    type: String
  },
  state_province: {
    type: String
  },
  postal_code: {
    type: String
  },
  country_code: {
    type: String
  },
  address_residential_indicator: {
    type: String,
    lowercase: true,
    enum: ['yes', 'no']
  }
})

const ShipDetail = mongoose.model('ShipDetail', shipDetailSchema)

export default ShipDetail
