import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

import { Button, TransparentButton } from '@components/ui/Button'
import { Check } from '@components/ui/Check'
import { GradientHR } from '@components/ui/GradientHR'
import { Input } from '@components/ui/Input'
import { Radio } from '@components/ui/Radio'

type Props = {
  onClose?: () => void
  onSubmit?: () => void
}
export const DriverForm = ({ onClose, onSubmit }: Props) => {
  const onSubmitForm = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.()
  }
  return (
    <div className="p-3 flex flex-col h-full">
      <form onSubmit={onSubmitForm}>
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="font-semibold ">Add Driver</div>
            <AiOutlineClose onClick={onClose} className=" cursor-pointer" />
          </div>

          <div className="my-4">
            <GradientHR />
          </div>
        </div>
        <div className="pr-3 max-h-[300px]  flex-grow overflow-auto scrollbar scrollbar-w-2 scrollbar-track-gray-100 scrollbar-thumb-blue-500">
          <div className="grid grid-cols-4 gap-4 my-4">
            <div className="flex flex-col col-span-2">
              <Input label="*Name" labelClassName="text-[15px]  mt-[8px]" placeholder="Enter driver name" />
            </div>
            <div className="flex flex-col col-span-2">
              <Input label="Cell Phone" labelClassName="text-[15px]  mt-[8px]" placeholder="Enter driver name" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 my-4">
            <div className="flex flex-col ">
              <Input label="Truck#" labelClassName="text-[15px]  mt-[8px]" placeholder="Enter driver truck number" />
            </div>
            <div className="flex flex-col justify-end ">
              <Input label="" labelClassName="text-[15px]  mt-[8px]" placeholder="Enter VIN number" />
            </div>
            <div className="flex flex-col justify-end">
              <Input label="" labelClassName="text-[15px]  mt-[8px]" placeholder="Enter license plate number" />
            </div>

            <div className="flex flex-col ">
              <Input
                label="Trailer#"
                labelClassName="text-[15px]  mt-[8px]"
                placeholder="Enter driver trailer number"
              />
            </div>
            <div className="flex flex-col justify-end">
              <Input label="" labelClassName="text-[15px]  mt-[8px]" placeholder="Enter VIN number" />
            </div>
            <div className="flex flex-col justify-end">
              <Input label="" labelClassName="text-[15px]  mt-[8px]" placeholder="Enter license plate number" />
            </div>
            <div className="flex flex-col col-span-3">
              <Input
                label="Email"
                type="email"
                labelClassName="text-[15px]  mt-[8px]"
                placeholder="Enter driver name"
              />
            </div>
          </div>
          <div className="grid grid-cols-4">
            <Check label="Active" labelClassName="font-light " />
            <Check label="Flagged" labelClassName="font-light " />
            <Radio label="Email Instructions" />
            <Radio label="Text Instructions" />
          </div>
          <div className="flex flex-col gap-2 my-6">
            <label htmlFor="notes">Notes</label>
            <textarea className="rounded-md bg-transparent border" rows={5} id="notes" />
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
              <Button type="submit">Add</Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
