import joi from 'joi'

import { usersController } from '@controllers/users'

import { apiHandler } from '@lib/api'

module.exports = apiHandler({
  GET: getAll,
  POST: create
})

async function getAll() {
  return await usersController.getAll()
}

async function create(req: Request) {
  const body = await req.json()
  await usersController.create(body)
}

create.schema = joi.object({
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  username: joi.string().required(),
  password: joi.string().min(6).required()
})
