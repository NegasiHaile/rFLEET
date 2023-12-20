import { cookies } from 'next/headers'

import joi from 'joi'

import { usersController } from '@controllers/users'

import { apiHandler } from '@lib/api'

module.exports = apiHandler({
  GET: getById,
  PUT: update,
  DELETE: _delete
})

async function getById(req: Request, { params: { id } }: any) {
  return await usersController.getById(id)
}

async function update(req: Request, { params: { id } }: any) {
  const body = await req.json()
  await usersController.update(id, body)
}

update.schema = joi.object({
  firstName: joi.string(),
  lastName: joi.string(),
  username: joi.string(),
  password: joi.string().min(6).allow('')
})

async function _delete(req: Request, { params: { id } }: any) {
  await usersController.delete(id)

  // auto logout if deleted self
  if (id === req.headers.get('userId')) {
    cookies().delete('authorization')
    return { deletedSelf: true }
  }
}
