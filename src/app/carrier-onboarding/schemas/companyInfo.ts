import * as yup from 'yup'

export const companyInfoSchema = yup.object({
  isCarrier: yup.boolean().optional(),
  companyType: yup.string().required(),
  dateEstablished: yup.string().required(),
  hasCompanyMC: yup.boolean().optional(),
  companyMC: yup.string().optional(),
  hasCompanyDOT: yup.boolean().optional(),
  companyDOT: yup.string().optional(),
  companyName: yup.string().required(),
  ownerName: yup.string().required(),
  useDbaName: yup.boolean().optional(),
  dbaName: yup.string().optional(),
  companyPhone: yup.string().required(),
  addressOne: yup.string().required(),
  addressTwo: yup.string().required(),
  phoneExtension: yup.string().optional(),
  cellPhone: yup.string().optional(),
  city: yup.string().required(),
  fax: yup.string().optional(),
  state: yup.string().required(),
  website: yup.string().optional(),
  zipCode: yup.string().required(),
  companyEmail: yup.string().optional()
})

export type companyInfoInputs = yup.InferType<typeof companyInfoSchema>
