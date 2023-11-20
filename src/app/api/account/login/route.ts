import { cookies } from 'next/headers'

import joi from 'joi'

import { usersController } from '@controllers/users'

import { apiHandler } from '@lib/api'
import { connectToDatabase, isDatabaseConnected } from '@lib/db'

/**
 * @swagger
 * /api/account/login:
 *   post:
 *     requestBody:
 *       description: Login
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/LoginRequest'
 *     description: Login
 *     responses:
 *       200:
 *         description: Login Successful
 *         content:
 *           application/json:
 *              schema:
 *                  $ref: '#/components/schemas/LoginResponse'
 */

module.exports = apiHandler({
  POST: login
})

async function login(req: Request) {
  if (!isDatabaseConnected()) await connectToDatabase()

  const body = await req.json()
  const { user, token } = await usersController.authenticate(body)

  // return jwt token in http only cookie
  cookies().set('authorization', token, { httpOnly: true })

  return { response: { ...user } }
}

login.schema = joi.object({
  username: joi.string().required(),
  password: joi.string().required()
})
