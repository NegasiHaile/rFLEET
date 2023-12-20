import { ValidateAddressesTypes } from 'shipengine'

import { shipEngineController } from '@controllers/shipEngine'

import { apiHandler } from '@lib/api'

/**
 * @swagger
 * /api/shipengine/validate-addresses:
 *   post:
 *     description: Validate Addresses
 *     requestBody:
 *       description: Validate Addresses Request
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/ValidateAddressesRequest'
 *     responses:
 *       200:
 *         description:  Successful
 */

module.exports = apiHandler({
  POST: validateAddresses
})

async function validateAddresses(req: Request) {
  const body = await req.json()

  const response = await shipEngineController.validateAddresses(body as ValidateAddressesTypes.Params)

  return { response }
}
