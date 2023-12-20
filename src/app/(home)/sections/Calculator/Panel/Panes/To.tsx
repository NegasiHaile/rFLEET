'use client'

import { SubmitHandler, UseFormReturn } from 'react-hook-form'

import ArrowRight from '@assets/icons/arrow-right.svg'
import BusinessAddress from '@assets/icons/business-address.svg'
import ConsolidationStation from '@assets/icons/consolidation-station.svg'
import FactoryWarehouse from '@assets/icons/factory_warehouse.svg'
import FulfillmentCenter from '@assets/icons/fulfillment-center.svg'
import PortAirport from '@assets/icons/port_airport.svg'
import ResidentialAddress from '@assets/icons/residential-address.svg'
import User from '@assets/icons/user.svg'
import { Button } from '@components/ui/Button'
import { CountrySelect, countryOptions } from '@components/ui/CountrySelect'
import { GradientHR } from '@components/ui/GradientHR'
import { Input } from '@components/ui/Input'
import { Select, findOption } from '@components/ui/Select'

import { ToInputs } from '../types-schemas-constants'

const toTypes = [
  {
    label: 'Port/Airport',
    value: 'Port/Airport',
    icon: <PortAirport />
  },
  {
    label: 'Factory/Warehouse',
    value: 'Factory/Warehouse',
    icon: <FactoryWarehouse />
  },
  {
    label: 'Business Address',
    value: 'Business Address',
    icon: <BusinessAddress />
  },
  {
    label: 'Residential Address',
    value: 'Residential Address',
    icon: <ResidentialAddress />
  },
  {
    label: 'Fulfillment Center',
    value: 'Fulfillment Center',
    icon: <FulfillmentCenter />
  },
  {
    label: 'Consolidation Station',
    value: 'Consolidation Station',
    icon: <ConsolidationStation />
  }
]

interface Props {
  methods: UseFormReturn<ToInputs>
  onSubmit: SubmitHandler<ToInputs>
}

export const To = ({ methods, onSubmit }: Props) => {
  const {
    watch,
    setValue,
    handleSubmit,
    formState: { errors }
  } = methods

  const handleValidation = async () => {
    const address = [
      {
        addressLine1: watch('toAddress'),
        cityLocality: watch('toCity'),
        postalCode: watch('toPostalCode'),
        countryCode: watch('toCountry'),
        name: watch('toName')
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
        setValue('toCountry', data[0].normalizedAddress.countryCode, { shouldValidate: true })
        setValue('toCity', data[0].normalizedAddress.cityLocality, { shouldValidate: true })
        setValue('toAddress', data[0].normalizedAddress.addressLine1, { shouldValidate: true })
        setValue('toPostalCode', data[0].normalizedAddress.postalCode, { shouldValidate: true })
        setValue('toState', data[0].normalizedAddress.stateProvince, { shouldValidate: true })
        setValue('toName', data[0].normalizedAddress.name, { shouldValidate: true })
        handleSubmit(onSubmit)()
      } else {
        alert('The address is not valid. Please check it and try again.')
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
      <div className="text-body-lg font-semibold">Where are you shipping to?</div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex lg:flex-row flex-col flex-1 gap-d-16">
        <div className="flex-1 lg:grid lg:grid-cols-3 flex flex-col gap-d-16">
          <div>
            <div className="text-input font-semibold text-gray-200 lg:mb-[8px] mb-[6px]">Type</div>
            <Select
              options={toTypes}
              value={findOption(toTypes, watch('toType'))}
              onChange={({ value }) => setValue('toType', value, { shouldValidate: true })}
              error={errors.toType?.message}
              placeholder="Tell us about your goods"
            />
          </div>
          <div>
            <div className="text-input font-semibold text-gray-200 lg:mb-[8px] mb-[6px]">Country</div>
            <CountrySelect
              searchable
              value={findOption(countryOptions, watch('toCountry'))}
              placeholder="Select a country"
              onChange={({ value }) => setValue('toCountry', value, { shouldValidate: true })}
              error={errors.toCountry?.message}
            />
          </div>

          <div>
            <div className="text-input font-semibold text-gray-200 lg:mb-[8px] mb-[6px]">City</div>
            <Input
              value={watch('toCity')}
              onChange={(value) => setValue('toCity', value, { shouldValidate: true })}
              placeholder="Enter the City"
              error={errors.toCity?.message}
            />
          </div>

          <div>
            <div className="text-input font-semibold text-gray-200 lg:mb-[8px] mb-[6px]">Postal Code</div>
            <Input
              value={watch('toPostalCode')}
              onChange={(value) => setValue('toPostalCode', value, { shouldValidate: true })}
              placeholder="Enter Postal Code"
              error={errors.toPostalCode?.message}
            />
          </div>

          <div className="col-span-2">
            <div className="text-input font-semibold text-gray-200 lg:mb-[8px] mb-[6px]">Address</div>
            <Input
              value={watch('toAddress')}
              onChange={(value) => setValue('toAddress', value, { shouldValidate: true })}
              placeholder="Enter Address or Zip/Postal Code"
              error={errors.toAddress?.message}
            />
          </div>

          <div>
            <div className="text-input font-semibold text-gray-200 lg:mb-[8px] mb-[6px]">Name / Company (Optional)</div>
            <Input
              value={watch('toName')}
              onChange={(value) => setValue('toName', value, { shouldValidate: true })}
              placeholder="Enter Name"
              error={errors.toName?.message}
            />
          </div>
        </div>
        <div className="flex items-end lg:mt-0 mt-[20px]">
          <Button onClick={handleButtonClick} type="submit" size="sm" className="lg:py-[7px] py-[6px] lg:w-auto w-full">
            <ArrowRight />
          </Button>
        </div>
      </form>
      <GradientHR />
      <div className="flex flex-col lg:gap-[4px] gap-[3px]">
        <div className="text-input">My recent searches</div>
        <div className="flex items-center lg:gap-[8px] gap-[6px]">
          <User />
          <div className="text-body-lg">Login / Sign Up</div>
        </div>
        <div className="text-input">Access your searches on any devices</div>
      </div>
    </>
  )
}
