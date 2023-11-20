import { usersController } from '@controllers/users'

import { apiHandler } from '@lib/api'

module.exports = apiHandler({
  GET: getCurrent
})

async function getCurrent() {
  return await usersController.getCurrent()
}
