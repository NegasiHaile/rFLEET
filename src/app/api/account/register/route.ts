import joi from 'joi'

import { emailController } from '@controllers/email'
import { usersController } from '@controllers/users'

import { apiHandler } from '@lib/api'
import { connectToDatabase, isDatabaseConnected } from '@lib/db'
import { CreateUser } from '@lib/types/User'

/**
 * @swagger
 * /api/account/register:
 *   post:
 *     requestBody:
 *       description: Register a new User
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateUserRequest'
 *     description: Register new user
 *     responses:
 *       201:
 *         description: Register Successful
 *       400:
 *         description: Bad Request
 */

module.exports = apiHandler({
  POST: register
})

async function register(req: Request) {
  if (!isDatabaseConnected()) await connectToDatabase()

  const body = await req.json()
  const { username, email, password, firstName, lastName, userType } = body
  const user = await usersController.create({
    username,
    email,
    password,
    firstName,
    lastName,
    userType,
    isVerified: false
  } as CreateUser)

  const link = usersController.generateEmailVerificationLink(user.id)

  await emailController.sendEmail({
    to: email,
    subject: 'Verify Your Account',
    text: link
  })

  return { response: { message: 'Success' }, status: 201 }
}

register.schema = joi.object({
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  username: joi.string().required(),
  email: joi.string().required(),
  password: joi.string().min(8).required(),
  userType: joi.number().required()
})
