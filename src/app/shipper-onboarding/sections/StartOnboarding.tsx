import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { BiSolidInfoCircle } from 'react-icons/bi'

import { Button, TransparentButton } from '@components/ui/Button'
import { Check } from '@components/ui/Check'
import { CountrySelect, countryOptions } from '@components/ui/CountrySelect'
import { GradientHR } from '@components/ui/GradientHR'
import { Input } from '@components/ui/Input'
import { Option, Select, findOption } from '@components/ui/Select'
import allStates from '@json/usaStates.json'

const usaStates: Option[] = allStates.map((obj) => {
  return { value: obj.id, label: obj.name }
})
const companyTypes = [
  {
    label: 'Sole Proprietor',
    value: 'Sole Proprietor'
  },
  {
    label: 'LLC',
    value: 'LLC'
  },
  {
    label: 'S-Corp',
    value: 'S-Corp'
  },
  {
    label: 'C-Corp',
    value: 'C-Corp'
  },
  {
    label: 'Non-Profit',
    value: 'Non-Profit'
  },
  {
    label: "Gov't",
    value: "Gov't"
  }
]
type Props = {
  onClose?: () => void
  onSubmit?: () => void
}
export const StartOnboarding = ({ onClose, onSubmit }: Props) => {
  const [companyType, setCompanyType] = useState<Option>()
  const [selectedCountry, setSelectedCountry] = useState<string>('')
  const [province, setProvince] = useState<Option>()

  const onSubmitForm = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.()
  }
  return (
    <div className="p-2 flex flex-col h-full">
      <form onSubmit={onSubmitForm}>
        <div>
          <div className="flex items-center justify-between">
            <div className="font-semibold ">Shipper/Vendor Onboarding</div>
            <AiOutlineClose onClick={onClose} className=" cursor-pointer" />
          </div>
          <div className="my-4">
            <GradientHR />
          </div>
        </div>
        <div className="pr-3 max-h-[300px]  flex-grow overflow-auto scrollbar scrollbar-w-2 scrollbar-track-gray-100 scrollbar-thumb-blue-500">
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="flex flex-col ">
              <Input label="Name*" labelClassName="text-[15px]  mt-[8px]" placeholder="" />
            </div>
            <div className="flex flex-col ">
              <Input label="Company*" labelClassName="text-[15px]  mt-[8px]" placeholder="" />
            </div>
            <div className="flex flex-col ">
              <Input label="Email*" labelClassName="text-[15px]  mt-[8px]" placeholder="" />
            </div>

            <div className="flex flex-col ">
              <Input label="Phone*" labelClassName="text-[15px]  mt-[8px]" placeholder="" />
            </div>
            <div className="col-span-2">
              <CountrySelect
                className="z-[100]"
                searchable
                label="Country"
                value={findOption(countryOptions, selectedCountry)}
                placeholder="Select"
                onChange={({ value }) => setSelectedCountry(value)}
              />
            </div>

            <div className="col-span-2 ">
              <Input label="Street Address*" labelClassName="text-[15px]  mt-[8px]" placeholder="" />
            </div>
            <div className="flex flex-col ">
              <Input label="Street Address (Line 2)" labelClassName="text-[15px]  mt-[8px]" placeholder="" />
            </div>
            <div className="flex flex-col ">
              <Input label="City*" labelClassName="text-[15px]  mt-[8px]" placeholder="" />
            </div>

            <Select
              label="State.Province*"
              placeholder="Select"
              options={usaStates}
              value={province}
              onChange={(newValue) => setProvince(newValue)}
              containerClassName="z-[100]"
            />

            <div className="flex flex-col ">
              <Input label="Postal Code/Zip Code*" labelClassName="text-[15px]  " placeholder="15211-1445" />
            </div>
            <div className="col-span-2">
              <Check label="Save to Address Book" />
              <Check label="Use as return address" />
            </div>
          </div>
        </div>

        <div>
          <div className="my-4">
            <GradientHR />
          </div>

          <div className="flex justify-between">
            <TransparentButton type="reset" className="border-0">
              Clear
            </TransparentButton>
            <div className="flex gap-2">
              <TransparentButton type="button" onClick={onClose}>
                Cancel
              </TransparentButton>
              <Button type="submit">Apply</Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
