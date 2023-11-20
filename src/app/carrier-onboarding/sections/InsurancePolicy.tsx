import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { BiEdit, BiPlus, BiTrash } from 'react-icons/bi'

import { Button, TransparentButton } from '@components/ui/Button'
import { GradientHR } from '@components/ui/GradientHR'
import { Modal } from '@components/ui/Modal'

import { InsurancePolicyForm } from './InsurancePolicyForm'

type Props = {
  onClose?: () => void
  onSubmit?: () => void
}
export const InsurancePolicy = ({ onClose, onSubmit }: Props) => {
  const [insuranceFormModalOpen, setInsuranceFormModalOpen] = useState<boolean>(false)

  const handleNewInsuranceSubmit = () => {
    // ...
    // other logic
    // ...

    setInsuranceFormModalOpen(false)
  }
  return (
    <div className="p-3 flex flex-col gap-4 h-full">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="font-semibold">Insurance Policies</div>
          <AiOutlineClose onClick={onClose} className=" cursor-pointer" />
        </div>

        <GradientHR />
        <div className="flex justify-end my-3">
          <Button className="h-10 flex" onClick={() => setInsuranceFormModalOpen(true)}>
            <BiPlus /> Insurance
          </Button>
        </div>
      </div>
      <div className="max-h-[300px]  flex-grow overflow-auto scrollbar scrollbar-w-2 scrollbar-track-gray-100 scrollbar-thumb-blue-500">
        <div className="p-3 lg:rounded-[10px] rounded-[8px] bg-[#1a194990] border border-[#282774] shadow-[0px,4px,4px,0px,rgba(0,0,0,0.25)] backdrop-blur-[25px]">
          <table className="w-full border-collapse">
            <thead className="text-sm font-light border-b w-full">
              <tr className="text-left">
                <th className="px-2 py-4">Type</th>
                <th className="px-2 py-4">*Amount</th>
                <th className="px-2 py-4">*Effective Date</th>
                <th className="px-2 py-4">*Expiration Date</th>
                <th className="px-2 py-4">Email</th>
                <th className="px-2 py-4"></th>
              </tr>
            </thead>
            <tbody>
              <tr className="font-light text-sm">
                <td className="px-2 py-4 flex gap-1">Auto Liability</td>
                <td className="px-2 py-4">$1,000,000</td>
                <td className="px-2 py-4">02/20/2021</td>
                <td className="px-2 py-4">02/20/2021</td>
                <td className="px-2 py-4">customers@1express.com</td>
                <td className="px-2 py-4 flex gap-2">
                  <BiEdit /> <BiTrash />
                </td>
              </tr>

              <tr className="font-light text-sm">
                <td className="px-2 py-4 flex gap-1">Cargo</td>
                <td className="px-2 py-4">$1,000,000</td>
                <td className="px-2 py-4">02/20/2021</td>
                <td className="px-2 py-4">02/20/2021</td>
                <td className="px-2 py-4">customers@sexpress.com</td>
                <td className="px-2 py-4 flex gap-2">
                  <BiEdit /> <BiTrash />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="my-4">
        <GradientHR />
      </div>
      <div className="flex justify-between ">
        <div>
          <TransparentButton onClick={onClose} type="button">
            Cancel
          </TransparentButton>
        </div>
        <div className="flex gap-2">
          <Button type="button" onClick={onSubmit}>
            Send Request
          </Button>
        </div>
      </div>
      <Modal
        open={insuranceFormModalOpen}
        onClose={() => setInsuranceFormModalOpen(false)}
        className="max-h-[96vh]  my-auto p-4 lg:max-w-[810px]  w-full lg:rounded-[10px] rounded-[8px] bg-[#1a194990] border border-[#1a1949] shadow-[0px,4px,4px,0px,rgba(0,0,0,0.25)] backdrop-blur-[25px] z-999"
      >
        <InsurancePolicyForm onClose={() => setInsuranceFormModalOpen(false)} onSubmit={handleNewInsuranceSubmit} />
      </Modal>
    </div>
  )
}
