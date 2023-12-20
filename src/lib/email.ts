import nodemailer from 'nodemailer'

const emailConfig = {
  service: 'Gmail', // Change to your email service provider
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASSWORD // Your email password or app password
  }
}

const transporter = nodemailer.createTransport(emailConfig)

export default transporter
