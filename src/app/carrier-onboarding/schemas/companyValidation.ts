import * as yup from 'yup'

export const companyValidationSchema = yup.object({
  carrierAuthority: yup.boolean().required(),
  EINLetter: yup.boolean().required(),
  hazmatLicense: yup.boolean().optional(),
  CARB: yup.boolean().optional(),
  bondedCarrierStatus: yup.boolean().optional(),
  certificateOfGoodStanding: yup.boolean().required(),
  SCACLetter: yup.boolean().required(),
  smartWayCertified: yup.boolean().optional(),
  STACardDriver: yup.boolean().optional(),
  TWICCardDriver: yup.boolean().optional(),
  w9: yup.boolean().required(),
  voidedCheck: yup.boolean().required(),
  deliveryOfFunds: yup.boolean().optional(),
  danAndBradsteetNumber: yup.boolean().optional(),

  EINNumber: yup.string().required(),
  DAndB: yup.string().required(),
  MCNumber: yup.string().optional(),
  DOTNumber: yup.string().required(),
  hazmatNumber: yup.string().optional(),
  SCACNumber: yup.string().required()
})

export type companyValidationInputs = yup.InferType<typeof companyValidationSchema>
