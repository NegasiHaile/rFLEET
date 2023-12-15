import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { BiSolidInfoCircle } from 'react-icons/bi'

import { Button, TransparentButton } from '@components/ui/Button'
import { Check } from '@components/ui/Check'
import { GradientHR } from '@components/ui/GradientHR'
import { Input } from '@components/ui/Input'
import { Option, Select } from '@components/ui/Select'

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
export const CompanyInfo = ({ onClose, onSubmit }: Props) => {
  const [companyType, setCompanyType] = useState<Option>()

  const onSubmitForm = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.()
  }
  return (
    <div className="p-2 flex flex-col h-full">
      <form onSubmit={onSubmitForm}>
        <div>
          <div className="flex items-center justify-between">
            <div className="font-semibold ">Owner and Company Information?</div>
            <AiOutlineClose onClick={onClose} className=" cursor-pointer" />
          </div>
          <div className="my-4">
            <GradientHR />
          </div>

          <div className=" p-1 border-2 rounded-md mb-6">
            <div className="p-2 rounded-sm text-center bg-primary text-white">Company Information</div>
          </div>
        </div>
        <div className="pr-3 max-h-[300px]  flex-grow overflow-auto scrollbar scrollbar-w-2 scrollbar-track-gray-100 scrollbar-thumb-blue-500">
          <div className="grid grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="font-semibold" htmlFor="">
                Company
              </label>
              <Check
                label={
                  <div className="font-semibold flex gap-2 items-center">
                    Shipper / Manufacturer / Vender
                    <BiSolidInfoCircle className="text-lg" />
                  </div>
                }
                checked={true}
              />
            </div>
            <Select
              label="Company Type*"
              placeholder="Select Company Type"
              options={companyTypes}
              value={companyType}
              onChange={(newValue) => setCompanyType(newValue)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3 mt-8">
            <div className="flex flex-col ">
              <Input label="Date Established on*" labelClassName="text-[15px]  mt-[8px]" placeholder="" />
            </div>
            <div className="flex flex-col ">
              <Input label={<Check label="Company EIN#" />} labelClassName="text-[15px]" placeholder="" />
            </div>

            <div className="flex flex-col ">
              <Input label="Company Name*" labelClassName="text-[15px]  mt-[8px]" placeholder="" />
            </div>
            <div className="flex flex-col ">
              <Input label="Owner Name/Managing Member*" labelClassName="text-[15px]  mt-[8px]" placeholder="" />
            </div>
            <div className="flex flex-col ">
              <Input label="DBA/Trade name (doing business as)" labelClassName="text-[15px]  mt-[8px]" placeholder="" />
            </div>
            <div className="flex flex-col ">
              <Input label="Company's Phone*" labelClassName="text-[15px]  mt-[8px]" placeholder="" />
            </div>

            <div className="flex flex-col ">
              <Input label="* Address 1" labelClassName="text-[15px]  mt-[8px]" placeholder="" />
            </div>
            <div className="flex flex-col ">
              <Input label="Phone Extension" labelClassName="text-[15px]  mt-[8px]" placeholder="" />
            </div>

            <div className="flex flex-col ">
              <Input label="* Address 2" labelClassName="text-[15px]  mt-[8px]" placeholder="" />
            </div>
            <div className="flex flex-col ">
              <Input label="Cell Phone" labelClassName="text-[15px]  mt-[8px]" placeholder="" />
            </div>

            <div className="flex flex-col ">
              <Input label="* City" labelClassName="text-[15px]  mt-[8px]" placeholder="" />
            </div>
            <div className="flex flex-col ">
              <Input label="Fax" labelClassName="text-[15px]  mt-[8px]" placeholder="" />
            </div>

            <div className="flex z-[100]">
              <Select
                containerClassName="w-full"
                labelClassName="text-[15px]  mt-[8px]"
                label="State/Province"
                placeholder=""
                options={companyTypes}
                value={companyType}
                onChange={(newValue) => setCompanyType(newValue)}
              />
            </div>

            <div className="flex flex-col ">
              <Input label="Website" labelClassName="text-[15px]  mt-[8px]" placeholder="" />
            </div>

            <div className="flex flex-col">
              <Input label="Zip Code" labelClassName="text-[15px]  mt-[8px]" placeholder="" />
            </div>

            <div className="flex flex-col ">
              <Input label="Company Email" labelClassName="text-[15px]  mt-[8px]" placeholder="" />
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
