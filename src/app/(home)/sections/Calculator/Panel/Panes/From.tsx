'use client'

import { useState } from 'react'

import ArrowRight from '@assets/icons/arrow-right.svg'
import BusinessAddress from '@assets/icons/business-address.svg'
import FactoryWarehouse from '@assets/icons/factory_warehouse.svg'
import FlagAbk from '@assets/icons/flag-abk.svg'
import PortAirport from '@assets/icons/port_airport.svg'
import ResidentialAddress from '@assets/icons/residential-address.svg'
import User from '@assets/icons/user.svg'
import { Button } from '@components/ui/Button'
import { Input } from '@components/ui/Input'
import { Option, Select } from '@components/ui/Select'

const fromTypes = [
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
  }
]

const countries = [
  {
    label: 'Abkhazia',
    value: 'Abkhazia',
    icon: <FlagAbk />
  }
]

export const From = () => {
  const [fromType, setFromType] = useState<Option>()
  const [fromCountry, setFromCountry] = useState<Option>()

  return (
    <>
      <h4 className="font-semibold">Where are you shipping from?</h4>
      <div className="flex lg:flex-row flex-col flex-1 lg:gap-[24px] gap-[18px]">
        <div className="flex-1 lg:grid lg:grid-cols-3 flex flex-col lg:gap-[16px] gap-[12px]">
          <div>
            <div className="font-semibold text-gray-200 lg:mb-[12px] mb-[8px]">Type</div>
            <Select
              options={fromTypes}
              value={fromType}
              placeholder="Tell us about your goods"
              onChange={setFromType}
            />
          </div>
          <div>
            <div className="font-semibold text-gray-200 lg:mb-[12px] mb-[8px]">Country</div>
            <Select
              searchable
              options={countries}
              value={fromCountry}
              placeholder="Select a country"
              onChange={setFromCountry}
            />
          </div>
          <div>
            <div className="font-semibold text-gray-200 lg:mb-[12px] mb-[8px]">Address</div>
            <Input placeholder="Enter Address or Zip/Postal Code" />
          </div>
        </div>
        <div className="flex items-end">
          <Button className="lg:!px-[24px] !px-[18px]">
            <ArrowRight />
          </Button>
        </div>
      </div>
      <div className="w-full h-[2px] opacity-70 bg-gradient-to-r-from-green-to-violet" />
      <div className="flex flex-col lg:gap-[4px] gap-[3px]">
        <div className="text-caption-sm">My recent searches</div>
        <div className="flex items-center lg:gap-[8px] gap-[6px]">
          <User />
          <h6>Login / Sign Up</h6>
        </div>
        <div className="text-caption-sm">Access your searches on any devices</div>
      </div>
    </>
  )
}
