import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

import { Button, TransparentButton } from '@components/ui/Button'
import { Check } from '@components/ui/Check'
import { GradientHR } from '@components/ui/GradientHR'
import { Input } from '@components/ui/Input'

type Props = {
  onClose?: () => void
  onSubmit?: () => void
}
export const ContactForm = ({ onClose, onSubmit }: Props) => {
  const onSubmitForm = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.()
  }
  return (
    <div className="p-3 flex flex-col h-full">
      <form onSubmit={onSubmitForm}>
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="font-semibold ">New Contact</div>
            <AiOutlineClose onClick={onClose} className=" cursor-pointer" />
          </div>

          <div className="my-4">
            <GradientHR />
          </div>
        </div>
        <div className="pr-3 max-h-[300px]  flex-grow overflow-auto scrollbar scrollbar-w-2 scrollbar-track-gray-100 scrollbar-thumb-blue-500">
          <div className="grid grid-cols-2 gap-4 my-4">
            <div className="flex flex-col col-span-2">
              <Input label="*Name" labelClassName="text-[15px]  mt-[8px]" placeholder="" />
            </div>
            <div className="flex flex-col">
              <Input label="Title" labelClassName="text-[15px]  mt-[8px]" placeholder="" />
            </div>
            <div className="flex flex-col">
              <Input label="Department" labelClassName="text-[15px]  mt-[8px]" placeholder="" />
            </div>
            <div className="flex flex-col">
              <Input label="Phone" labelClassName="text-[15px]  mt-[8px]" placeholder="" />
            </div>

            <div className="flex flex-col">
              <Input label="Phone Extension" labelClassName="text-[15px]  mt-[8px]" placeholder="" />
            </div>

            <div className="flex flex-col">
              <Input label="*Email" labelClassName="text-[15px]  mt-[8px]" placeholder="" />
            </div>

            <div className="flex flex-col">
              <Input label="Fax" labelClassName="text-[15px]  mt-[8px]" placeholder="" />
            </div>
            <div className="flex flex-col">
              <Input label="Address 1" labelClassName="text-[15px]  mt-[8px]" placeholder="" />
            </div>
            <div className="flex flex-col">
              <Input label="Address 2" labelClassName="text-[15px]  mt-[8px]" placeholder="" />
            </div>
            <div className="flex flex-col">
              <Input label="City" labelClassName="text-[15px]  mt-[8px]" placeholder="" />
            </div>

            <div className="flex flex-col">
              <Input label="State" labelClassName="text-[15px]  mt-[8px]" placeholder="" />
            </div>

            <div className="flex flex-col">
              <Input label="Country" labelClassName="text-[15px]  mt-[8px]" placeholder="" />
            </div>

            <div className="flex flex-col">
              <Input label="Zip Code 1" labelClassName="text-[15px]  mt-[8px]" placeholder="" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 my-3">
            <Check label="Primary Contact" />
            <Check label="Payee Contact" />
            <Check label="Bid Request" />
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
              <Button type="submit">Save</Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
