import transporter from '@lib/email'

interface EmailOptions {
  to: string
  subject: string
  text: string
  html?: string
}

const sendEmail = async (options: EmailOptions) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER, // Sender's email address
      ...options
    })
    console.log(`Email sent: ${info.response}`)
  } catch (error) {
    console.error('Email error:', error)
    throw error
  }
}

export const emailController = {
  sendEmail
}
