import { shipEngineController } from '@controllers/shipEngine'

import { apiHandler } from '@lib/api'

/**
 * @swagger
 * /api/shipengine/carriers:
 *   get:
 *     description: Carriers List
 *     responses:
 *       200:
 *         description:  Successful
 */

module.exports = apiHandler({
  GET: getAll
})

async function getAll() {
  const response = await shipEngineController.listCarriers()

  return { response }
}
