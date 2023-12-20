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
  cheapestRates?: Rate[]
}

export const addCheapestShippingAmounts = (rates: RatesObject) => {
  if (rates?.rateResponse?.rates) {
    // Sort the rates based on the shipping amount
    const sortedRates = [...rates.rateResponse.rates].sort(
      (a, b) => (a.shippingAmount?.amount || Infinity) - (b.shippingAmount?.amount || Infinity)
    )
    rates.cheapestRates = sortedRates
  }
}
