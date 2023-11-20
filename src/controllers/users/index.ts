import { headers } from 'next/headers'

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '@db/models/User'

export const usersController = {
  authenticate,
  getAll,
  getById,
  getCurrent,
  create,
  update,
  delete: _delete,
  generateEmailVerificationLink,
  verifyEmailVerificationLink
}

async function authenticate({ username, password }: { username: string; password: string }) {
  const user = await User.findOne({ username })

  if (!(user && bcrypt.compareSync(password, user.hash))) {
    throw 'Username or password is incorrect'
  }

  // create a jwt token that is valid for 7 days
  const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET!, { expiresIn: '7d' })

  return {
    user: user.toJSON(),
    token
  }
}

function generateEmailVerificationLink(userId: string) {
  const token = jwt.sign({ sub: userId }, process.env.JWT_SECRET!, { expiresIn: '5m' })

  return `${process.env.BASE_URL}/api/account/verify?code=${token}`
}

async function verifyEmailVerificationLink(code: string) {
  if (!code) throw 'This link is invalid'
  try {
    const decoded = jwt.verify(code, process.env.JWT_SECRET!)

    const id = decoded.sub as string

    await update(id, { isVerified: true })
  } catch (error) {
    throw 'This link is invalid or expired'
  }
}

async function getAll() {
  return await User.find()
}

async function getById(id: string) {
  try {
    return await User.findById(id)
  } catch {
    throw 'User Not Found'
  }
}

async function getCurrent() {
  try {
    const currentUserId = headers().get('userId')
    return await User.findById(currentUserId)
  } catch {
    throw 'Current User Not Found'
  }
}

async function create(params: any) {
  // validate
  if (await User.findOne({ username: params.username })) {
    throw 'Username "' + params.username + '" is already taken'
  }

  const user = new User(params)

  // hash password
  if (params.password) {
    user.hash = bcrypt.hashSync(params.password, 10)
  }

  // save user
  await user.save()

  return user.toJSON()
}

async function update(id: string, params: any) {
  const user = await User.findById(id)

  // validate
  if (!user) throw 'User not found'
  if (user.username !== params.username && (await User.findOne({ username: params.username }))) {
    throw 'Username "' + params.username + '" is already taken'
  }

  // hash password if it was entered
  if (params.password) {
    params.hash = bcrypt.hashSync(params.password, 10)
  }

  // copy params properties to user
  Object.assign(user, params)

  await user.save()
}

async function _delete(id: string) {
  await User.findByIdAndRemove(id)
}
