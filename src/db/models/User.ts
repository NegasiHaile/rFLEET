import mongoose from 'mongoose'

// import validator from 'validator';

const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      unique: true,
      required: true
    },
    hash: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: true
      // validate: [validator.isEmail, 'Invalid Email address'],
      // required: "Please enter an email address!"
    },
    userType: { type: Number, required: true },
    isVerified: { type: Boolean, require: true }
  },
  { timestamps: true }
)

userSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id
    delete ret.hash
  }
})

const User = mongoose.models.User || mongoose.model('User', userSchema)

export default User
