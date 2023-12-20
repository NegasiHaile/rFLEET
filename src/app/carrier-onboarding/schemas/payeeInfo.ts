import * as yup from 'yup'

export const payeeInfoSchema = yup.object({
  sameAsCompanyInfo: yup.boolean().optional(),
  submitToFactoringCompany: yup.boolean().optional(),
  companyName: yup.string().required(),
  quickPay: yup.string().optional(),
  accountPayableContact: yup.string().required(),
  useDbaName: yup.boolean().optional(),
  dbaName: yup.string().optional(),
  phone: yup.string().required(),
  addressOne: yup.string().required(),
  addressTwo: yup.string().required(),
  phoneExtension: yup.string().optional(),
  cellPhone: yup.string().optional(),
  city: yup.string().required(),
  fax: yup.string().optional(),
  state: yup.string().required(),
  zipCode: yup.string().required(),
  SSN: yup.string().optional(),
  payInDays: yup.string().optional(),
  emailSettlementReport: yup.boolean().optional(),
  remitPaymentByDefault: yup.boolean().optional(),
  factoringCompany: yup.string().optional()
})

export type payeeInfoInputs = yup.InferType<typeof payeeInfoSchema>
