'use client'

import { useEffect, useState } from 'react'
import { SubmitHandler, UseFormReturn } from 'react-hook-form'

import { set } from 'mongoose'

import ArrowRight from '@assets/icons/arrow-right.svg'
import BusinessAddressInternal from '@assets/icons/business-address-internal.svg'
import BusinessAddress from '@assets/icons/business-address.svg'
import ConsolidationStationInternal from '@assets/icons/consolidation-station-internal.svg'
import ConsolidationStation from '@assets/icons/consolidation-station.svg'
import FactoryWarehouseInternal from '@assets/icons/factory_warehouse-internal.svg'
import FactoryWarehouse from '@assets/icons/factory_warehouse.svg'
import FulfillmentCenterInternal from '@assets/icons/fulfillment-center-internal.svg'
import FulfillmentCenter from '@assets/icons/fulfillment-center.svg'
import PortAirportInternal from '@assets/icons/port_airport-internal.svg'
import PortAirport from '@assets/icons/port_airport.svg'
import ResidentialAddressInternal from '@assets/icons/residential-address-internal.svg'
import ResidentialAddress from '@assets/icons/residential-address.svg'
import User from '@assets/icons/user.svg'
import { Button } from '@components/ui/ButtonInternal'
import { CountrySelect, countryOptions } from '@components/ui/CountrySelectInternal'
import { GradientHR } from '@components/ui/GradientHR'
import { Input } from '@components/ui/InputInternal'
import { Select, findOption } from '@components/ui/SelectInternal'

import { AllInputs } from '../types-schemas-constants'

const fromTypes = [
  {
    label: 'Port/Airport',
    value: 'Port/Airport',
    icon: <PortAirport />,
    iconInternal: <PortAirportInternal />
  },
  {
    label: 'Factory/Warehouse',
    value: 'Factory/Warehouse',
    icon: <FactoryWarehouse />,
    iconInternal: <FactoryWarehouseInternal />
  },
  {
    label: 'Business Address',
    value: 'Business Address',
    icon: <BusinessAddress />,
    iconInternal: <BusinessAddressInternal />
  },
  {
    label: 'Residential Address',
    value: 'Residential Address',
    icon: <ResidentialAddress />,
    iconInternal: <ResidentialAddressInternal />
  }
]

const toTypes = [
  {
    label: 'Port/Airport',
    value: 'Port/Airport',
    icon: <PortAirport />,
    iconInternal: <PortAirportInternal />
  },
  {
    label: 'Factory/Warehouse',
    value: 'Factory/Warehouse',
    icon: <FactoryWarehouse />,
    iconInternal: <FactoryWarehouseInternal />
  },
  {
    label: 'Business Address',
    value: 'Business Address',
    icon: <BusinessAddress />,
    iconInternal: <BusinessAddressInternal />
  },
  {
    label: 'Residential Address',
    value: 'Residential Address',
    icon: <ResidentialAddress />,
    iconInternal: <ResidentialAddressInternal />
  },
  {
    label: 'Fulfillment Center',
    value: 'Fulfillment Center',
    icon: <FulfillmentCenter />,
    iconInternal: <FulfillmentCenterInternal />
  },
  {
    label: 'Consolidation Station',
    value: 'Consolidation Station',
    icon: <ConsolidationStation />,
    iconInternal: <ConsolidationStationInternal />
  }
]

interface Props {
  methods: UseFormReturn<AllInputs>
  onSubmit: SubmitHandler<AllInputs>
}

export const All = ({ methods, onSubmit }: Props) => {
  const {
    watch,
    setValue,
    handleSubmit,
    formState: { errors }
  } = methods

  const handleValidation = async () => {
    const address = [
      {
        addressLine1: watch('fromAddress'),
        cityLocality: watch('fromCity'),
        postalCode: watch('fromPostalCode'),
        countryCode: watch('fromCountry'),
        name: watch('fromName')
      }
    ]

    try {
      const response = await fetch('/api/shipengine/validate-addresses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(address)
      })

      const data = await response.json()

      if (data[0].status === 'verified') {
        setValue('fromCountry', data[0].normalizedAddress.countryCode, { shouldValidate: true })
        setValue('fromCity', data[0].normalizedAddress.cityLocality, { shouldValidate: true })
        setValue('fromAddress', data[0].normalizedAddress.addressLine1, { shouldValidate: true })
        setValue('fromPostalCode', data[0].normalizedAddress.postalCode, { shouldValidate: true })
        setValue('fromState', data[0].normalizedAddress.stateProvince, { shouldValidate: true })
        setValue('fromName', data[0].normalizedAddress.name, { shouldValidate: true })
        handleSubmit(onSubmit)()
      } else {
        alert('The from address is not valid. Please check it and try again.')
      }

      const toAddress = [
        {
          addressLine1: watch('toAddress'),
          cityLocality: watch('toCity'),
          postalCode: watch('toPostalCode'),
          countryCode: watch('toCountry'),
          name: watch('toName')
        }
      ]

      const responseTo = await fetch('/api/shipengine/validate-addresses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(toAddress)
      })

      const dataTo = await responseTo.json()

      if (dataTo[0].status === 'verified') {
        setValue('toCountry', dataTo[0].normalizedAddress.countryCode, { shouldValidate: true })
        setValue('toCity', dataTo[0].normalizedAddress.cityLocality, { shouldValidate: true })
        setValue('toAddress', dataTo[0].normalizedAddress.addressLine1, { shouldValidate: true })
        setValue('toPostalCode', dataTo[0].normalizedAddress.postalCode, { shouldValidate: true })
        setValue('toState', dataTo[0].normalizedAddress.stateProvince, { shouldValidate: true })
        setValue('toName', dataTo[0].normalizedAddress.name, { shouldValidate: true })
        handleSubmit(onSubmit)()
      } else {
        alert('The to address is not valid. Please check it and try again.')
      }
    } catch (error) {
      alert('The address is not valid. Please check it and try again.')
    }
  }

  const handleButtonClick = (e: { preventDefault: () => void }) => {
    e.preventDefault()

    handleValidation()
  }

  return (
    <>
      <div className="text-body-lg font-semibold">Date</div>
      <div>
        <div className="text-input font-semibold text-black lg:mb-2 mb-1.5">Expected Departure Date</div>
        <input type="date" className="text-input border p-2 rounded-lg" />
      </div>
      <div className="text-body-lg font-semibold">Where are you shipping from and to?</div>
      <hr></hr>
      <div className="text-body-lg font-semibold">Route</div>
      <div className="flex justify-center space-x-4">
        <div className="w-1/2">
          <div className="text-body-lg font-normal mb-2">From</div>
          <form onSubmit={handleSubmit(onSubmit)} className="flex lg:flex-row flex-col flex-1 gap-d-16">
            <div className="flex-1 lg:grid lg:grid-cols-2 flex flex-col gap-d-16">
              <div>
                <div className="text-input font-semibold text-black lg:mb-[8px] mb-[6px]">Country</div>
                <CountrySelect
                  searchable
                  value={findOption(countryOptions, watch('fromCountry'))}
                  placeholder="Select a country"
                  onChange={({ value }) => setValue('fromCountry', value, { shouldValidate: true })}
                  error={errors.fromCountry?.message}
                />
              </div>
              <div>
                <div className="text-input font-semibold text-black lg:mb-[8px] mb-[6px]">Postal Code</div>
                <Input
                  value={watch('fromPostalCode')}
                  onChange={(value) => setValue('fromPostalCode', value, { shouldValidate: true })}
                  placeholder="Enter Postal Code"
                  error={errors.fromPostalCode?.message}
                />
              </div>

              <div>
                <div className="text-input font-semibold text-black lg:mb-[8px] mb-[6px]">Name / Company</div>
                <Input
                  value={watch('fromName')}
                  onChange={(value) => setValue('fromName', value, { shouldValidate: true })}
                  placeholder="Enter the Name or Company"
                  error={errors.fromName?.message}
                />
              </div>

              <div>
                <div className="text-input font-semibold text-black lg:mb-[8px] mb-[6px]">Phone</div>
                <Input
                  value={watch('fromPhone')}
                  onChange={(value) => setValue('fromPhone', value, { shouldValidate: true })}
                  placeholder="Enter the Phone Number"
                  error={errors.fromPhone?.message}
                />
              </div>

              <div className="col-span-2">
                <div className="text-input font-semibold text-black lg:mb-[8px] mb-[6px]">Address</div>
                <Input
                  value={watch('fromAddress')}
                  onChange={(value) => setValue('fromAddress', value, { shouldValidate: true })}
                  placeholder="Enter Address"
                  error={errors.fromAddress?.message}
                />
              </div>
            </div>
          </form>
        </div>
        <div className="w-1/2">
          <div className="text-body-lg font-normal mb-2">To</div>
          <form onSubmit={handleSubmit(onSubmit)} className="flex lg:flex-row flex-col flex-1 gap-d-16">
            <div className="flex-1 lg:grid lg:grid-cols-2 flex flex-col gap-d-16">
              <div>
                <div className="text-input font-semibold text-black lg:mb-[8px] mb-[6px]">Country</div>
                <CountrySelect
                  searchable
                  value={findOption(countryOptions, watch('toCountry'))}
                  placeholder="Select a country"
                  onChange={({ value }) => setValue('toCountry', value, { shouldValidate: true })}
                  error={errors.toCountry?.message}
                />
              </div>
              <div>
                <div className="text-input font-semibold text-black lg:mb-[8px] mb-[6px]">Postal Code</div>
                <Input
                  value={watch('toPostalCode')}
                  onChange={(value) => setValue('toPostalCode', value, { shouldValidate: true })}
                  placeholder="Enter Postal Code"
                  error={errors.toPostalCode?.message}
                />
              </div>

              <div>
                <div className="text-input font-semibold text-black lg:mb-[8px] mb-[6px]">Name / Company</div>
                <Input
                  value={watch('toName')}
                  onChange={(value) => setValue('toName', value, { shouldValidate: true })}
                  placeholder="Enter the Name or Company"
                  error={errors.toName?.message}
                />
              </div>

              <div>
                <div className="text-input font-semibold text-black lg:mb-[8px] mb-[6px]">Phone</div>
                <Input
                  value={watch('toPhone')}
                  onChange={(value) => setValue('toPhone', value, { shouldValidate: true })}
                  placeholder="Enter the Phone Number"
                  error={errors.toPhone?.message}
                />
              </div>

              <div className="col-span-2">
                <div className="text-input font-semibold text-black lg:mb-[8px] mb-[6px]">Address</div>
                <Input
                  value={watch('toAddress')}
                  onChange={(value) => setValue('toAddress', value, { shouldValidate: true })}
                  placeholder="Enter the Street Address"
                  error={errors.toAddress?.message}
                />
              </div>
            </div>
          </form>
        </div>
      </div>

      <Button onClick={handleButtonClick} type="submit" size="sm" className="lg:py-[7px] py-[6px] my-4 w-full">
        Submit Addresses
      </Button>
    </>
  )
}
