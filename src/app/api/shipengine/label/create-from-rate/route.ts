import { CreateLabelFromRateTypes } from 'shipengine/esm/create-label-from-rate'

import { shipEngineController } from '@controllers/shipEngine'

import { apiHandler } from '@lib/api'

/**
 * @swagger
 * /api/shipengine/label/create-from-rate:
 *   post:
 *     description: Create Label From Rate
 *     requestBody:
 *       description: Rates Estimate Request
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateLabelFromRateRequest'
 *     responses:
 *       200:
 *         description:  Successful
 */

module.exports = apiHandler({
  POST: createLabelFromRate
})

async function createLabelFromRate(req: Request) {
  const body = await req.json()

  const { validateAddress, labelLayout, labelFormat, labelDownloadType, displayScheme, rateId } = body

  const response = await shipEngineController.createLabelFromRate({
    rateId,
    validateAddress,
    labelLayout,
    labelFormat,
    labelDownloadType,
    displayScheme
  } as CreateLabelFromRateTypes.Params)

  return { response }
}
