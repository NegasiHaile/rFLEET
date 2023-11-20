import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { BiUpload } from 'react-icons/bi'

import { Button, TransparentButton } from '@components/ui/Button'
import { Check } from '@components/ui/Check'
import { GradientHR } from '@components/ui/GradientHR'
import { Input } from '@components/ui/Input'

type Props = {
  onClose?: () => void
  onSubmit?: () => void
}
export const CompanyUploads = ({ onClose, onSubmit }: Props) => {
  const onSubmitForm = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.()
  }
  return (
    <div className="p-3 flex flex-col h-full">
      <form onSubmit={onSubmitForm}>
        <div>
          <div className="flex items-center justify-between">
            <div className="font-semibold ">Company Uploads</div>
            <AiOutlineClose onClick={onClose} className=" cursor-pointer" />
          </div>

          <div className="my-4">
            <GradientHR />
          </div>

          <div className=" p-1 border-2 rounded-md mb-6">
            <div className="p-2 rounded-sm text-center bg-primary text-white">Company Uploads</div>
          </div>
        </div>
        <div className="pr-3 max-h-[300px]  flex-grow overflow-auto scrollbar scrollbar-w-2 scrollbar-track-gray-100 scrollbar-thumb-blue-500">
          <div className="flex flex-col gap-3">
            <div className="font-bold">Upload Document</div>
            <div className="grid grid-cols-3 gap-3">
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="trade-licenses"
                  className="flex flex-col gap-4 p-6 items-center justify-center w-full border rounded-lg cursor-pointer "
                >
                  <BiUpload className="text-2xl" />
                  <p className="font-light text-xs">Trade Licenses</p>

                  <input id="trade-licenses" type="file" className="hidden" />
                </label>
              </div>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="incorporate-certeficates"
                  className="flex flex-col gap-4 p-6 items-center justify-center w-full border rounded-lg cursor-pointer "
                >
                  <BiUpload className="text-2xl" />
                  <p className="font-light text-xs">Incorporate Certeficates</p>

                  <input id="incorporate-certeficates" type="file" className="hidden" />
                </label>
              </div>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="owner-validation"
                  className="flex flex-col gap-4 p-6 items-center justify-center w-full border rounded-lg cursor-pointer "
                >
                  <BiUpload className="text-2xl" />
                  <p className="font-light text-xs">Tax Information</p>

                  <input id="owner-validation" type="file" className="hidden" />
                </label>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 my-4">
            <Check label="Certificate of Good Standing*" labelClassName="font-light text-[13px]" />
            <Check label="Hazmat License" labelClassName="font-light text-[13px]" />
            <Check label="EIN Letter*" labelClassName="font-light text-[13px]" />
            <Check label="Surety Bond" labelClassName="font-light text-[13px]" />
            <Check label="Dun & Bradsteet#" labelClassName="font-light text-[13px]" />
            <Check label="Credit References" labelClassName="font-light text-[13px]" />
            <Check label="Distribution Agreement" labelClassName="font-light text-[13px]" />
            <Check label="Reseller Agreement" labelClassName="font-light text-[13px]" />
          </div>

          <div className="w-full h-[2px] bg-gradient-to-br from-cyan-900 to-indigo-900  my-6"></div>

          <div className="grid grid-cols-2 gap-3 mt-6">
            <div className="col-span-2 font-bold ">Licenses & Certificates</div>

            <div className="flex flex-col ">
              <Input label="EIN#" labelClassName="text-[15px]  mt-[8px]" placeholder="" />
            </div>
            <div className="flex flex-col ">
              <Input label="D&B" labelClassName="text-[15px]  mt-[8px]" placeholder="" />
            </div>
            <div className="flex flex-col ">
              <Input label="MC#" labelClassName="text-[15px]  mt-[8px]" placeholder="" />
            </div>
            <div className="flex flex-col ">
              <Input label="DOT#" labelClassName="text-[15px]  mt-[8px]" placeholder="" />
            </div>

            <div className="flex flex-col ">
              <Input label="HAZMAT#" labelClassName="text-[15px]  mt-[8px]" placeholder="" />
            </div>
            <div className="flex flex-col ">
              <Input label="SCAC#" labelClassName="text-[15px]  mt-[8px]" placeholder="" />
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
              <Button type="submit">Next</Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
