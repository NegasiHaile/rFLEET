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
export const BillingInfo = ({ onClose, onSubmit }: Props) => {
  const [companyType, setCompanyType] = useState<Option>()
  const onSubmitForm = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.()
  }
  return (
    <div className="p-3 flex flex-col h-full">
      <form onSubmit={onSubmitForm}>
        <div>
          <div className="flex items-center justify-between">
            <div className="font-semibold ">Account Payable Information</div>
            <AiOutlineClose onClick={onClose} className=" cursor-pointer" />
          </div>

          <div className="my-4">
            <GradientHR />
          </div>

          <div className=" p-1 border-2 rounded-md mb-6">
            <div className="p-2 rounded-sm text-center bg-primary text-white">Billing Information</div>
          </div>
        </div>
        <div className="pr-3 max-h-[300px]  flex-grow overflow-auto scrollbar scrollbar-w-2 scrollbar-track-gray-100 scrollbar-thumb-blue-500">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Check
                label={
                  <div className="font-light text-sm flex gap-2 items-center">
                    Billing Information Same as Company Info <BiSolidInfoCircle className="text-lg" />
                  </div>
                }
              />
            </div>

            <div className="flex flex-col ">
              <Input label="*Company" labelClassName="text-[15px]  mt-[8px]" placeholder="" />
            </div>
            <div className="flex flex-col ">
              <Input label="Account Payable Contact*" labelClassName="text-[15px]  mt-[8px]" placeholder="" />
            </div>
            <div className="flex flex-col ">
              <Input
                label={
                  <div className="flex items-baseline justify-between">
                    Payee DBA name
                    <Check label={<div className="text-gray-400 text-xs mt-1">Use payee DBA Name</div>} />
                  </div>
                }
                labelClassName="text-[15px]  mt-[8px]"
                placeholder=""
              />
            </div>
            <div className="flex flex-col ">
              <Input label="Phone*" labelClassName="text-[15px]  mt-[16px]" placeholder="" />
            </div>

            <div className="flex flex-col ">
              <Input label="*Address 1" labelClassName="text-[15px]  mt-[8px]" placeholder="" />
            </div>
            <div className="flex flex-col">
              <Input label="Phone Extension" labelClassName="text-[15px]  mt-[8px]" placeholder="" />
            </div>

            <div className="flex flex-col">
              <Input label="*Address 2" labelClassName="text-[15px]  mt-[8px]" placeholder="" />
            </div>
            <div className="flex flex-col">
              <Input label="Cell Phone" labelClassName="text-[15px]  mt-[8px]" placeholder="" />
            </div>

            <div className="flex flex-col">
              <Input label="*City" labelClassName="text-[15px]  mt-[8px]" placeholder="" />
            </div>
            <div className="flex flex-col">
              <Input label="Email" labelClassName="text-[15px]  mt-[8px]" placeholder="" />
            </div>
          </div>
        </div>

        <div>
          <div className="my-4">
            <GradientHR />
          </div>
          <div className="flex justify-between">
            <TransparentButton className="border-0" type="reset">
              Clear
            </TransparentButton>
            <div className="flex gap-2">
              <TransparentButton onClick={onClose} type="button">
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
