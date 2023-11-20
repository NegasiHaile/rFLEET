import React, { useState } from 'react'
import { AiFillWarning, AiOutlineClose } from 'react-icons/ai'

import { Button, TransparentButton } from '@components/ui/Button'
import { GradientHR } from '@components/ui/GradientHR'
import { Input } from '@components/ui/Input'
import { Modal } from '@components/ui/Modal'
import { Option, Select } from '@components/ui/Select'

const insuranceTypes = [
  {
    label: 'General Liability',
    value: 'General Liability'
  },
  {
    label: 'Auto Liability',
    value: 'Auto Liability'
  },
  {
    label: 'Cargo',
    value: 'Cargo'
  }
]

type Props = {
  onClose?: () => void
  onSubmit?: () => void
}
export const InsurancePolicyForm = ({ onClose, onSubmit }: Props) => {
  const [insuranceType, setInsuranceType] = useState<Option>()
  const [confirmModalOpen, setConfirmModalOpen] = useState(false)
  const onSubmitForm = (e: React.FormEvent) => {
    e.preventDefault()
    setConfirmModalOpen(true)
  }

  const onConfirmModal = () => {
    setConfirmModalOpen(false)
    onSubmit?.()
  }
  return (
    <div className="p-3 flex flex-col h-full">
      <form onSubmit={onSubmitForm}>
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="font-semibold ">New Insurance Policy Details</div>
            <AiOutlineClose onClick={onClose} className=" cursor-pointer" />
          </div>

          <div className="my-4">
            <GradientHR />
          </div>
        </div>
        <div className="pr-3 max-h-[300px]  flex-grow overflow-auto scrollbar scrollbar-w-2 scrollbar-track-gray-100 scrollbar-thumb-blue-500">
          <div className="grid grid-cols-4 gap-4 my-4">
            <div className="flex flex-col col-span-2">
              <Select
                label="*Type"
                containerClassName="w-full"
                labelClassName="text-[15px]  mt-[8px]"
                placeholder=""
                options={insuranceTypes}
                value={insuranceType}
                onChange={(newValue) => setInsuranceType(newValue)}
              />
            </div>
            <div className="flex flex-col col-span-2">
              <Input label="Insurer" labelClassName="text-[15px]  mt-[8px]" placeholder="" />
            </div>
            <div className="flex flex-col col-span-2">
              <Input label="*Amount" labelClassName="text-[15px]  mt-[8px]" placeholder="" />
            </div>
            <div className="flex flex-col col-span-2">
              <Input label="Policy#" labelClassName="text-[15px]  mt-[8px]" placeholder="" />
            </div>

            <div className="flex flex-col col-span-2">
              <Input label="*Effective Date" type="date" labelClassName="text-[15px]  mt-[8px]" placeholder="" />
            </div>

            <div className="flex flex-col col-span-2">
              <Input label="*Expiration Date" type="date" labelClassName="text-[15px]  mt-[8px]" placeholder="" />
            </div>

            <div className="flex flex-col col-span-2">
              <Input label="Phone" labelClassName="text-[15px]  mt-[8px]" placeholder="" />
            </div>
            <div className="flex flex-col col-span-2">
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
              <Button type="submit">Add</Button>
            </div>
          </div>
        </div>
      </form>
      <ConfirmModal open={confirmModalOpen} onClose={() => setConfirmModalOpen(false)} onSubmit={onConfirmModal} />
    </div>
  )
}

type ConfirmProps = {
  open: boolean
  onClose?: any
  onSubmit?: () => void
}
export const ConfirmModal = ({ open, onClose, onSubmit }: ConfirmProps) => {
  const onSubmitForm = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.()
  }
  return (
    <Modal
      open={open}
      onClose={onClose}
      className=" my-auto p-4 lg:max-w-[600px]  w-full lg:rounded-[10px] rounded-[8px] bg-[#1a194990] border border-[#1a1949] shadow-[0px,4px,4px,0px,rgba(0,0,0,0.25)] backdrop-blur-[25px] z-999"
    >
      <div className="p-3 flex flex-col h-full">
        <form onSubmit={onSubmitForm}>
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 font-semibold uppercase">
                <AiFillWarning className="text-red-500 h-8 w-8" /> Alert
              </div>
              <AiOutlineClose onClick={onClose} className=" cursor-pointer" />
            </div>
          </div>
          <div className="pr-3 my-8 max-h-[300px] text-justify text-sm  flex-grow overflow-auto scrollbar scrollbar-w-2 scrollbar-track-gray-100 scrollbar-thumb-blue-500">
            <p>
              If you choose to proceed we will send a request to your insurance company for Certificate of Insurance.
              Additional instructions will be emailed over to carriers email
            </p>
          </div>

          <div>
            <div className="flex justify-end gap-6 mt-4">
              <div>
                <TransparentButton onClick={onClose} type="button">
                  Cancel
                </TransparentButton>
              </div>
              <Button className="h-12" type="submit">
                Confirm
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  )
}
