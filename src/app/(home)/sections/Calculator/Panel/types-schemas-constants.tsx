import * as yup from 'yup'

export type Field = {
  carrierProvider: string
  carrierSize: string
  length: string
  width: string
  height: string
  dimensionUnit: string
  weight: string
  weightUnit: string
  identicalUnitsCount: number
  containsAlcohol: boolean
  alcoholRecipientType: 'License' | 'Consumer' | ''
  containsDryIce: boolean
  dryIceWeight: string
  createsReturnLabel: boolean
  returnLabel: ''
  noOfUnits: string
  handlingUnit: string
  containsLithium: boolean
}

export type Dimensions = {
  length: string
  width: string
  height: string
  unit: string
}

export type LTLField = {
  handlingUnit: string
  length: string
  width: string
  height: string
  dimensionUnit: string
  noOfUnits: string
  weight: string
}
export type OcenanField = {
  handlingUnit: string
  length: string
  width: string
  height: string
  dimensionUnit: string
  noOfUnits: string
  weight: string
  weightUnit: string
  includesPackaging: boolean
}

export type OcenanFclField = {
  containerType: string

  noOfUnits: string
  weight: string
  weightUnit: string
  weightType: string
  addExtraPickups: boolean
}

export type AirField = {
  handlingUnit: string
  length: string
  width: string
  height: string
  dimensionUnit: string
  noOfUnits: string
  weight: string
  weightUnit: string
  includesPackaging: boolean
}

export const initialLTLField: LTLField = {
  dimensionUnit: 'in',
  handlingUnit: 'Pallet(s)',
  height: '',
  length: '',
  noOfUnits: '',
  weight: '',
  width: ''
}

export const initialOceanField: OcenanField = {
  dimensionUnit: 'in',
  handlingUnit: 'Pallet(s)',
  height: '',
  length: '',
  noOfUnits: '',
  weight: '',
  width: '',
  weightUnit: 'in',
  includesPackaging: false
}

export const initialOceanFclField: OcenanFclField = {
  containerType: "20' Dry Standard",
  noOfUnits: '',
  weight: '',
  weightUnit: 'in',
  weightType: 'Overweight',
  addExtraPickups: false
}

export const initialAirField: AirField = {
  dimensionUnit: 'in',
  handlingUnit: 'Pallet(s)',
  height: '',
  length: '',
  noOfUnits: '',
  weight: '',
  width: '',
  weightUnit: 'in',
  includesPackaging: false
}

export const initialField: Field = {
  carrierProvider: '',
  carrierSize: '',
  length: '',
  width: '',
  height: '',
  dimensionUnit: '',
  weight: '',
  weightUnit: '',
  identicalUnitsCount: 0,
  containsAlcohol: false,
  alcoholRecipientType: '',
  containsDryIce: false,
  dryIceWeight: '',
  createsReturnLabel: false,
  returnLabel: '',
  containsLithium: false,
  noOfUnits: '',
  handlingUnit: ''
}

export const fromSchema = yup.object({
  fromType: yup.string().required(),
  fromCountry: yup.string().required(),
  fromAddress: yup.string().required(),
  fromCity: yup.string().required(),
  fromPostalCode: yup.string().required(),
  fromState: yup.string().required(),
  fromName: yup.string()
})

export const toSchema = yup.object({
  toType: yup.string().required(),
  toCountry: yup.string().required(),
  toAddress: yup.string().required(),
  toCity: yup.string().required(),
  toPostalCode: yup.string().required(),
  toState: yup.string().required(),
  toName: yup.string()
})

export const loadTypeSchema: any & { fields: Field[] } = yup.object({
  parcelType: yup.string().required(),
  parcelShape: yup.string().required(),
  fields: yup.array().test({
    message: '',
    test: (fields: Field[] | undefined, context) => {
      const errors: any = {}
      const { fields: _, ...others } = context.parent

      if (fields && fields.length > 0) {
        const field = fields[fields.length - 1]

        if (others.parcelType === 'Enter Custom Dimensions') {
          if (others.parcelShape === 'Box or Tube') {
            if (isNaN(Number(field.length)) || Number(field.length) <= 0) {
              errors.length = 'Length must be a positive number'
            }

            if (isNaN(Number(field.width)) || Number(field.width) <= 0) {
              errors.width = 'Width must be a positive number'
            }

            if (isNaN(Number(field.height)) || Number(field.height) <= 0) {
              errors.height = 'Height must be a positive number'
            }

            if (isNaN(Number(field.weight)) || Number(field.weight) <= 0) {
              errors.weight = 'Weight must be a positive number'
            }

            if (isNaN(Number(field.identicalUnitsCount)) || Number(field.identicalUnitsCount) <= 0) {
              errors.identicalUnitsCount = 'Identical units must be a positive number'
            }

            if (!field.dimensionUnit) {
              errors.dimensionUnit = 'Dimension unit must be chosen'
            }

            if (!field.weightUnit) {
              errors.weightUnit = 'Weight unit must be chosen'
            }
          }

          if (others.parcelShape === 'Poly Mailer/Satchel') {
            if (isNaN(Number(field.length)) || Number(field.length) <= 0) {
              errors.length = 'Length must be a positive number'
            }

            if (isNaN(Number(field.width)) || Number(field.width) <= 0) {
              errors.width = 'Width must be a positive number'
            }

            if (isNaN(Number(field.identicalUnitsCount)) || Number(field.identicalUnitsCount) <= 0) {
              errors.identicalUnitsCount = 'Identical units must be a positive number'
            }

            if (isNaN(Number(field.weight)) || Number(field.weight) <= 0) {
              errors.weight = 'Weight must be a positive number'
            }

            if (!field.dimensionUnit) {
              errors.dimensionUnit = 'Dimension unit must be chosen'
            }

            if (!field.weightUnit) {
              errors.weightUnit = 'Weight unit must be chosen'
            }
          }
        }

        if (others.parcelType === 'Carrier Provided Parcel') {
          if (!field.carrierProvider) {
            errors.carrierProvider = 'Carrier provider must be chosen'
          }

          if (!field.carrierSize) {
            errors.carrierSize = 'Carrier size must be chosen'
          }

          if (isNaN(Number(field.weight)) || Number(field.weight) <= 0) {
            errors.weight = 'Weight must be a positive number'
          }

          if (!field.weightUnit) {
            errors.weightUnit = 'Weight unit must be chosen'
          }

          if (isNaN(Number(field.identicalUnitsCount)) || Number(field.identicalUnitsCount) <= 0) {
            errors.identicalUnitsCount = 'Identical units must be a positive number'
          }
        }

        if (field.containsAlcohol) {
          if (!field.alcoholRecipientType) {
            errors.alcoholRecipientType = 'Alcohol recipient type must be chosen'
          }
        }

        if (field.containsDryIce) {
          if (isNaN(Number(field.dryIceWeight)) || Number(field.dryIceWeight) <= 0) {
            errors.dryIceWeight = 'Dry ice weight must be a positive number'
          }
        }

        if (field.createsReturnLabel) {
          if (!field.returnLabel) {
            errors.returnLabel = 'Return label must be chosen'
          }
        }

        // Collect and apply errors
        if (Object.keys(errors).length > 0) {
          return new yup.ValidationError(errors, null, 'fields')
        }

        return true
      }

      return false
    }
  })
})

export const ltlLoadTypeSchema = yup.object().shape({
  ltlType: yup.string().required(),
  fields: yup.array().of(
    yup.object().shape({
      handlingUnit: yup.string().required(),
      length: yup.string().required('Length is required'),
      width: yup.string().required('Width is required'),
      height: yup.string().required('Height is required'),
      dimensionUnit: yup.string().required(),
      noOfUnits: yup.string().required(),

      weight: yup.string().required('Weight is required')
    })
  ),
  containsAlcohol: yup.boolean(),
  alcoholRecipientType: yup.string().optional(),
  containsDryIce: yup.boolean(),
  dryIceWeight: yup.string().optional(),
  containsLithium: yup.boolean()
})

export const oceanLoadTypeSchema = yup.object().shape({
  containerLoadType: yup.string().required(),
  fields: yup.array().of(
    yup.object().shape({
      handlingUnit: yup.string().required(),
      length: yup.string().required('Length is required'),
      width: yup.string().required('Width is required'),
      height: yup.string().required('Height is required'),
      dimensionUnit: yup.string().required(),
      noOfUnits: yup.string().required(),

      weight: yup.string().required('Weight is required'),
      weightUnit: yup.string().required(),
      includesPackaging: yup.boolean()
    })
  ),
  fclFields: yup.array().of(
    yup.object().shape({
      containerType: yup.string().required(),
      noOfUnits: yup.string().required(),
      weight: yup.string().required(),
      weightUnit: yup.string().required(),
      weightType: yup.string().required(),
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

export const airLoadTypeSchema = yup.object().shape({
  containerLoadType: yup.string().required(),
  fields: yup.array().of(
    yup.object().shape({
      handlingUnit: yup.string().required(),
      length: yup.string().required('Length is required'),
      width: yup.string().required('Width is required'),
      height: yup.string().required('Height is required'),
      dimensionUnit: yup.string().required(),
      noOfUnits: yup.string().required(),

      weight: yup.string().required('Height is required'),
      weightUnit: yup.string().required(),
      includesPackaging: yup.boolean()
    })
  ),
  incoterm: yup.string().required(),
  containsAlcohol: yup.boolean(),
  alcoholRecipientType: yup.string().optional(),
  containsDryIce: yup.boolean(),
  dryIceWeight: yup.string().optional(),
  containsLithium: yup.boolean()
})

export const goodsCommoditySchema = yup.object({
  quantity: yup.string().required(),
  sku: yup.string().required(),
  packageUnit: yup.string().required(),
  value: yup.string().required(),
  currency: yup.string(),
  weight: yup.string().required(),
  madeWhere: yup.string().required(),
  scheduleB: yup.string()
})

export type FromInputs = yup.InferType<typeof fromSchema>
export type ToInputs = yup.InferType<typeof toSchema>
export type LoadTypeInputs = yup.InferType<typeof loadTypeSchema>
export type LtlLoadTypeInputs = yup.InferType<typeof ltlLoadTypeSchema>

export type OceanLoadTypeInputs = yup.InferType<typeof oceanLoadTypeSchema>
export type AirLoadTypeInputs = yup.InferType<typeof airLoadTypeSchema>

export type GoodsCommodityInputs = yup.InferType<typeof goodsCommoditySchema>
