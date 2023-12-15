'use client'

import { useEffect, useState } from 'react'
import { SubmitHandler, UseFormReturn } from 'react-hook-form'

import { set } from 'mongoose'

import ArrowRight from '@assets/icons/arrow-right.svg'
import { Button } from '@components/ui/ButtonInternal'
import { CountrySelect, countryOptions } from '@components/ui/CountrySelectInternal'
import { GradientHR } from '@components/ui/GradientHR'
import { Input } from '@components/ui/InputInternal'
import { Select, findOption } from '@components/ui/SelectInternal'

import { FromInputs } from '../types-schemas-constants'

// interface Props {
//   methods: UseFormReturn<FromInputs>
//   onSubmit: SubmitHandler<FromInputs>
// }

export const PaymentTerms = () => {
  //   const {
  //     watch,
  //     setValue,
  //     handleSubmit,
  //     formState: { errors }
  //   } = methods

  const handleButtonClick = (e: { preventDefault: () => void }) => {
    e.preventDefault()
  }

  return (
    <>
      <hr></hr>
      <div className="text-body-lg font-semibold">Payment Terms</div>
      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-1 border rounded-lg p-3 py-6">
          <div className="font-semibold text-[14px] leading-5">Prepaid</div>
          <div className="text-[#848382] text-[14px]">Freight Billed to Shipper/Origin</div>
        </div>
        <div className="col-span-1 border rounded-lg p-3 py-6">
          <div className="font-semibold text-[14px] leading-5">Collect</div>
          <div className="text-[#848382] text-[14px]">Freight Billed to Consignee/Destination</div>
        </div>
        <div className="col-span-1 border rounded-lg p-3 py-6">
          <div className="font-semibold text-[14px] leading-5">Third Party</div>
          <div className="text-[#848382] text-[14px]">Billed to Third Party</div>
        </div>
      </div>

      <div className="border rounded-lg grid grid-cols-2 py-4">
        <div className="col-span-1 p-3">
          <div className="font-semibold pb-1">Payment Terms</div>
          <Input placeholder="Select Payer Account or Enter Email to Notify Party" />
        </div>
        <div className="col-span-1 p-3">
          <div className="font-semibold pb-1">Select Incoterm</div>
          <Input placeholder="EXW (EX works)" />
        </div>
      </div>

      <div className="font-semibold mt-2">Customs Clearance</div>

      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-1 border rounded-lg p-3 py-6">
          <div className="font-semibold text-[14px] leading-5">Prepaid</div>
          <div className="text-[#848382] text-[14px]">Freight Billed to Shipper/Origin</div>
        </div>
        <div className="col-span-1 border rounded-lg p-3 py-6">
          <div className="font-semibold text-[14px] leading-5">Collect</div>
          <div className="text-[#848382] text-[14px]">Freight Billed to Consignee/Destination</div>
        </div>
        <div className="col-span-1 border rounded-lg p-3 py-6">
          <div className="font-semibold text-[14px] leading-5">Third Party</div>
          <div className="text-[#848382] text-[14px]">Billed to Third Party</div>
        </div>
      </div>

      <div className="border rounded-lg grid grid-cols-2 mb-6">
        <div className="col-span-1 p-3 py-4">
          <div className="font-semibold pb-1">Payment Terms</div>
          <Input placeholder="Select Payer Account or Enter Email to Notify Party" />
        </div>
      </div>
    </>
  )
}
