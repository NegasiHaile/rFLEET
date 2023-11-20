import joi from 'joi'
import { GetRatesWithShipmentDetailsTypes } from 'shipengine/esm/get-rates-with-shipment-details'

import { shipEngineController } from '@controllers/shipEngine'

import { apiHandler } from '@lib/api'

/**
 * @swagger
 * /api/shipengine/rates/estimate:
 *   post:
 *     description: Get Rates With Shipment Details
 *     requestBody:
 *       description: Rates Estimate Request
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/RatesEstimateRequest'
 *     responses:
 *       200:
 *         description:  Successful
 *         content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/RatesEstimateResponse'
 */

module.exports = apiHandler({
  POST: getRateEstimates
})

async function getRateEstimates(req: Request) {
  const body = await req.json()

  const { rateOptions, shipmentId, shipment } = body

  const response = await shipEngineController.getRateEstimates({
    rateOptions,
    shipmentId,
    shipment
  } as GetRatesWithShipmentDetailsTypes.Params)

  return { response }
}

// getRateEstimates.schema = joi.object({
//     rateOptions: joi.object({
//         carrierIds: joi.array().required()
//     }).required(),
//     shipmentId: joi.string(),
//     shipment: joi.object({
//         shipTo: joi.object().required(),
//         packages: joi.array().required()
//     })
// })
