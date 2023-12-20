import * as yup from 'yup'

export type StandardTL = {
  truckType: string
  truckSize: string
  noOfTrucks: string
  weight: string
  weightUnit: string
  includesPackaging: boolean
}

export type HazmatTL = {
  truckType: string
  truckSize: string
  noOfTrucks: string
  weight: string
  weightUnit: string
  includesPackaging: boolean
  incoterm: string
}

export type Drayage = {
  loadType: string
  loadSize: string
  noOfTrucks: string
  weight: string
  weightUnit: string
  addExtraPickups: boolean
  incoterm: string
}

export type OversizeTL = {
  loadType: string
  loadSize: string
  noOfTrucks: string
  weight: string
  weightUnit: string
  addExtraPickups: boolean
  incoterm: string
}

export const initialStandardTL: StandardTL = {
  truckType: 'Dry Van',
  truckSize: '',
  noOfTrucks: '',
  weight: '',
  weightUnit: 'in',
  includesPackaging: false
}

export const initialHazmatTL: HazmatTL = {
  truckType: 'Dry Van',
  truckSize: '',
  noOfTrucks: '',
  weight: '',
  weightUnit: 'in',
  includesPackaging: false,
  incoterm: ''
}

export const initialDrayage: Drayage = {
  loadType: '',
  loadSize: '',
  noOfTrucks: '',
  weight: '',
  weightUnit: 'in',
  addExtraPickups: false,
  incoterm: ''
}

export const initialOversizeTL: OversizeTL = {
  loadType: '',
  loadSize: '',
  noOfTrucks: '',
  weight: '',
  weightUnit: 'in',
  addExtraPickups: false,
  incoterm: ''
}

export const ftlLoadTypeSchema = yup.object().shape({
  containerLoadType: yup.string().required(),
  standardTL: yup.array().of(
    yup.object().shape({
      truckType: yup.string().required(),
      truckSize: yup.string().required(),
      noOfTrucks: yup.string().required(),
      weight: yup.string().required(),
      weightUnit: yup.string().required(),
      includesPackaging: yup.boolean()
    })
  ),

  hazmatTL: yup.array().of(
    yup.object().shape({
      truckType: yup.string().required(),
      truckSize: yup.string().required(),
      noOfTrucks: yup.string().required(),
      weight: yup.string().required(),
      weightUnit: yup.string().required(),
      includesPackaging: yup.boolean()
    })
  ),

  drayage: yup.array().of(
    yup.object().shape({
      loadType: yup.string().required(),
      loadSize: yup.string().required(),
      noOfTrucks: yup.string().required(),
      weight: yup.string().required(),
      weightUnit: yup.string().required(),
      addExtraPickups: yup.boolean()
    })
  ),

  oversizeTL: yup.array().of(
    yup.object().shape({
      loadType: yup.string().required(),
      loadSize: yup.string().required(),
      noOfTrucks: yup.string().required(),
      weight: yup.string().required(),
      weightUnit: yup.string().required(),
      addExtraPickups: yup.boolean()
    })
  ),
  incoterm: yup.string().required(),
  containsAlcohol: yup.boolean(),
  alcoholRecipientType: yup.string().optional(),
  containsDryIce: yup.boolean(),
  dryIceWeight: yup.string().optional(),
  containsLithium: yup.boolean()
})

export type FtlLoadTypeInputs = yup.InferType<typeof ftlLoadTypeSchema>
