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
  combinedScore?: number // Added for sorting purpose
}

export type RatesObject = {
  rateResponse?: {
    rates?: Rate[]
  }
  bestRates?: Rate[]
}

const normalize = (value: number, min: number, max: number): number => {
  return (value - min) / (max - min)
}

export const addBestValueRates = (rates: RatesObject) => {
  if (rates?.rateResponse?.rates) {
    // Extract delivery times and costs
    const deliveryTimes = rates.rateResponse.rates.map((rate) =>
      rate.estimatedDeliveryDate ? new Date(rate.estimatedDeliveryDate).getTime() : Infinity
    )
    const costs = rates.rateResponse.rates.map((rate) => rate.shippingAmount?.amount || Infinity)

    // Determine max and min for normalization
    const maxTime = Math.max(...deliveryTimes)
    const minTime = Math.min(...deliveryTimes)
    const maxCost = Math.max(...costs)
    const minCost = Math.min(...costs)

    // Normalize and compute combined score
    rates.rateResponse.rates.forEach((rate, index) => {
      const normalizedTime = normalize(deliveryTimes[index], minTime, maxTime)
      const normalizedCost = normalize(costs[index], minCost, maxCost)
      rate.combinedScore = normalizedTime + normalizedCost // Lower is better
    })

    // Sort based on combined score
    rates.bestRates = [...rates.rateResponse.rates].sort((a, b) => a.combinedScore! - b.combinedScore!) // Using the non-null assertion (!) since we know combinedScore is set
  }
}

// export const addBestValueRates = (rates: RatesObject) => {
//   if (rates?.rateResponse?.rates) {
//     // Extract delivery dates and amounts to compute medians
//     const deliveryDates = rates.rateResponse.rates
//       .map((rate) => rate.estimatedDeliveryDate)
//       .filter((date) => date !== undefined)
//       .map((date) => new Date(date).getTime())

//     const amounts = rates.rateResponse.rates
//       .map((rate) => rate.shippingAmount?.amount)
//       .filter((amount) => amount !== undefined) as number[]

//     // Sort arrays to find median values
//     deliveryDates.sort((a, b) => a - b)
//     amounts.sort((a, b) => a - b)

//     // Compute median values
//     const medianDate = deliveryDates.length
//       ? deliveryDates[Math.floor(deliveryDates.length / 2)]
//       : new Date('9999-12-31').getTime()
//     const medianAmount = amounts.length ? amounts[Math.floor(amounts.length / 2)] : Infinity

//     console.log('medianDate', medianDate)
//     console.log('medianAmount', medianAmount)

//     // Sort rates based on the distance from the medians
//     const speedWeight = 1 // 60%
//     const costWeight = 0 // 40%

//     const sortedRates = [...rates.rateResponse.rates].sort((a, b) => {
//       const dateA = new Date(a.estimatedDeliveryDate || '9999-12-31')
//       const dateB = new Date(b.estimatedDeliveryDate || '9999-12-31')
//       const amountA = a.shippingAmount?.amount || Infinity
//       const amountB = b.shippingAmount?.amount || Infinity

//       const distanceA =
//         speedWeight * Math.abs(dateA.getTime() - medianDate) + costWeight * Math.abs(amountA - medianAmount)
//       const distanceB =
//         speedWeight * Math.abs(dateB.getTime() - medianDate) + costWeight * Math.abs(amountB - medianAmount)

//       return distanceA - distanceB
//     })

//     console.log('sortedRates', sortedRates)

//     rates.bestRates = sortedRates
//   }
// }
