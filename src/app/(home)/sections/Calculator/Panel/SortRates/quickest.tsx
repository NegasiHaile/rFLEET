// ratesUtils.ts

type ShippingAmount = {
  currency: string
  amount?: number
}

type Rate = {
  carrierCode?: string
  carrierDeliveryDays?: string
  carrierFriendlyName?: string
  carrierId?: string
  carrierNickname?: string
  confirmationAmount?: ShippingAmount
  deliveryDays?: number
  errorMessages?: string[]
  estimatedDeliveryDate?: string
  guaranteedService?: boolean
  insuranceAmount?: ShippingAmount
  negotiatedRate?: boolean
  otherAmount?: ShippingAmount
  packageType?: any
  rateId?: string
  rateType?: string
  serviceCode?: string
  serviceType?: string
  shipDate?: string
  shippingAmount?: ShippingAmount
  taxAmount?: any
  trackable?: boolean
  validationStatus?: string
  warningMessages?: string[]
  zone?: any
}

export type RatesObject = {
  rateResponse?: {
    rates?: Rate[]
  }
  quickestRates?: Rate[]
}

export const addQuickestShippingAmounts = (rates: RatesObject) => {
  if (rates?.rateResponse?.rates) {
    // Sort the rates based on the estimated delivery date
    const sortedRates = [...rates.rateResponse.rates].sort((a, b) => {
      const dateA = new Date(a.estimatedDeliveryDate || '9999-12-31') // Default far future date
      const dateB = new Date(b.estimatedDeliveryDate || '9999-12-31') // Default far future date
      return dateA.getTime() - dateB.getTime()
    })
    rates.quickestRates = sortedRates
  }
}
