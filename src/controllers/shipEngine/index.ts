import ShipEngine, { ValidateAddressesTypes } from 'shipengine'
import { CreateLabelFromRateTypes } from 'shipengine/esm/create-label-from-rate'
import { CreateLabelFromShipmentDetailsTypes } from 'shipengine/esm/create-label-from-shipment-details'
import { GetRatesWithShipmentDetailsTypes } from 'shipengine/esm/get-rates-with-shipment-details'

export const shipEngineController = {
  listCarriers,
  getRateEstimates,
  createLabelFromRate,
  createLabelFromShipmentDetails,
  validateAddresses
}

const shipengine = new ShipEngine(process.env.SHIPENGINE_API_KEY || '')

async function listCarriers() {
  return shipengine.listCarriers()
}

async function getRateEstimates(params: GetRatesWithShipmentDetailsTypes.Params) {
  try {
    const result = await shipengine.getRatesWithShipmentDetails(params)

    return result
  } catch (e: any) {
    throw 'Error creating rates: ' + e.message
  }
}

async function createLabelFromRate(params: CreateLabelFromRateTypes.Params) {
  try {
    const result = await shipengine.createLabelFromRate(params)
    return result
  } catch (e: any) {
    throw 'Error creating label: ' + e.message
  }
}

async function createLabelFromShipmentDetails(params: CreateLabelFromShipmentDetailsTypes.Params) {
  try {
    const result = await shipengine.createLabelFromShipmentDetails(params)
    return result
  } catch (e: any) {
    throw 'Error creating label: ' + e.message
  }
}

async function validateAddresses(params: ValidateAddressesTypes.Params) {
  try {
    const result = await shipengine.validateAddresses(params)

    if (result[0].status === 'verified') {
      // Success! Print the formatted address
    } else {
      // Bad address. Print the warning & error messages
    }
    return result
  } catch (e: any) {
    throw 'Error validating address: ' + e.message
  }
}
