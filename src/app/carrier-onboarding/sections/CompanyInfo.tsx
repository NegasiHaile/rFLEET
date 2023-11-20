import React, { useState } from 'react'
import { Controller, SubmitHandler, UseFormReturn, useForm } from 'react-hook-form'
import { AiOutlineClose } from 'react-icons/ai'
import { BiSolidInfoCircle } from 'react-icons/bi'

import { yupResolver } from '@hookform/resolvers/yup'

import { Button, TransparentButton } from '@components/ui/Button'
import { Check } from '@components/ui/Check'
import { GradientHR } from '@components/ui/GradientHR'
import { Input } from '@components/ui/Input'
import { Option, Select, findOption } from '@components/ui/Select'
import allStates from '@json/usaStates.json'

import { companyInfoInputs, companyInfoSchema } from '../schemas/companyInfo'

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
  form: UseFormReturn<companyInfoInputs>
}
export const CompanyInfo = ({ onClose, onSubmit, form }: Props) => {
  const {
    watch,
    setValue,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors },
    control
  } = form
  const onSubmitForm: SubmitHandler<companyInfoInputs> = (data) => {
    console.log(data)
    onSubmit?.()
  }
  return (
    <div className="p-2 flex flex-col h-full">
      <form onSubmit={handleSubmit(onSubmitForm)}>
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
              <Controller
                name="isCarrier"
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <Check
                    label={
                      <div className="font-semibold flex gap-2 items-center">
                        Carrier <BiSolidInfoCircle className="text-lg" />
                      </div>
                    }
                    {...field}
                    checked={watch('isCarrier')}
                  />
                )}
              />
            </div>
            <div className="">
              <Controller
                name="companyType"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select
                    label="Company Type*"
                    placeholder="Select Company Type"
                    options={companyTypes}
                    error={errors.companyType?.message}
                    {...field}
                    value={findOption(companyTypes, watch('companyType'))}
                    onChange={({ value }) => setValue('companyType', value, { shouldValidate: true })}
                  />
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-8">
            <div className="flex flex-col ">
              <Controller
                name="dateEstablished"
                control={control}
                render={({ field }) => (
                  <Input
                    type="date"
                    label="Date Established On*"
                    labelClassName="text-[15px]  mt-[8px]"
                    placeholder="MM-DD-YYYY"
                    error={errors.dateEstablished?.message}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="flex flex-col ">
              <Controller
                name="companyMC"
                control={control}
                render={({ field }) => (
                  <Input
                    label={
                      <Controller
                        name="hasCompanyMC"
                        control={control}
                        render={({ field: field1 }) => (
                          <Check
                            label={<div className="">Company MC#</div>}
                            {...field1}
                            checked={watch('hasCompanyMC')}
                          />
                        )}
                      />
                    }
                    error={errors.companyMC?.message}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="flex flex-col ">
              <Controller
                name="companyDOT"
                control={control}
                render={({ field }) => (
                  <Input
                    label={
                      <Controller
                        name="hasCompanyDOT"
                        control={control}
                        render={({ field: field1 }) => (
                          <Check
                            label={<div className="">Company DTO#</div>}
                            {...field1}
                            checked={watch('hasCompanyDOT')}
                          />
                        )}
                      />
                    }
                    error={errors.companyDOT?.message}
                    {...field}
                  />
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-8">
            <div className="flex flex-col ">
              <Controller
                name="companyName"
                control={control}
                render={({ field }) => (
                  <Input
                    label="Company Name*"
                    labelClassName="text-[15px]  mt-[8px]"
                    placeholder=""
                    error={errors.companyName?.message}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="flex flex-col ">
              <Controller
                name="ownerName"
                control={control}
                render={({ field }) => (
                  <Input
                    label="Owner Name/Managing Member*"
                    labelClassName="text-[15px]  mt-[8px]"
                    placeholder=""
                    error={errors.ownerName?.message}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="flex flex-col ">
              <Controller
                name="dbaName"
                control={control}
                render={({ field }) => (
                  <Input
                    label={
                      <div className="flex items-center justify-between">
                        <span> DBA name (doing business as) </span>
                        <Controller
                          name="useDbaName"
                          control={control}
                          render={({ field }) => (
                            <Check
                              label={<div className="font-light text-sm mt-1">Use DBA</div>}
                              {...field}
                              checked={watch('useDbaName')}
                            />
                          )}
                        />
                      </div>
                    }
                    labelClassName="text-[15px]  mt-[8px] p-0 m-0 "
                    containerClassName="gap-1"
                    placeholder=""
                    error={errors.dbaName?.message}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="flex flex-col ">
              <Controller
                name="companyPhone"
                control={control}
                render={({ field }) => (
                  <Input
                    label="Company's Phone*"
                    labelClassName="text-[15px]  mt-[8px]"
                    placeholder=""
                    error={errors.companyPhone?.message}
                    {...field}
                  />
                )}
              />
            </div>

            <div className="flex flex-col ">
              <Controller
                name="addressOne"
                control={control}
                render={({ field }) => (
                  <Input
                    label="* Address 1"
                    labelClassName="text-[15px]  mt-[8px]"
                    placeholder=""
                    error={errors.addressOne?.message}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="flex flex-col ">
              <Controller
                name="phoneExtension"
                control={control}
                render={({ field }) => (
                  <Input
                    label="Phone Extension"
                    labelClassName="text-[15px]  mt-[8px]"
                    placeholder=""
                    error={errors.phoneExtension?.message}
                    {...field}
                  />
                )}
              />
            </div>

            <div className="flex flex-col ">
              <Controller
                name="addressTwo"
                control={control}
                render={({ field }) => (
                  <Input
                    label="* Address 2"
                    labelClassName="text-[15px]  mt-[8px]"
                    placeholder=""
                    error={errors.addressTwo?.message}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="flex flex-col ">
              <Controller
                name="cellPhone"
                control={control}
                render={({ field }) => (
                  <Input
                    label="Cell Phone"
                    labelClassName="text-[15px]  mt-[8px]"
                    placeholder=""
                    error={errors.cellPhone?.message}
                    {...field}
                  />
                )}
              />
            </div>

            <div className="flex flex-col ">
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <Input
                    label="* City"
                    labelClassName="text-[15px]  mt-[8px]"
                    placeholder=""
                    error={errors.city?.message}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="flex flex-col ">
              <Controller
                name="fax"
                control={control}
                render={({ field }) => (
                  <Input
                    label="Fax"
                    labelClassName="text-[15px]  mt-[8px]"
                    placeholder=""
                    error={errors.fax?.message}
                    {...field}
                  />
                )}
              />
            </div>

            <div className="flex z-[100]">
              <Controller
                name="state"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select
                    label="State/Province*"
                    placeholder="Select"
                    containerClassName="w-full z-[100]"
                    labelClassName="text-[15px]  mt-[8px]"
                    options={usaStates}
                    error={errors.state?.message}
                    {...field}
                    value={findOption(usaStates, watch('state'))}
                    onChange={({ value }) => setValue('state', value, { shouldValidate: true })}
                  />
                )}
              />
            </div>

            <div className="flex flex-col ">
              <Controller
                name="website"
                control={control}
                render={({ field }) => (
                  <Input
                    label="Website"
                    labelClassName="text-[15px]  mt-[8px]"
                    placeholder=""
                    error={errors.website?.message}
                    {...field}
                  />
                )}
              />
            </div>

            <div className="">
              <Controller
                name="zipCode"
                control={control}
                render={({ field }) => (
                  <Input
                    label="* Zip Code"
                    labelClassName="text-[15px]  mt-[8px]"
                    placeholder=""
                    error={errors.zipCode?.message}
                    {...field}
                  />
                )}
              />
            </div>

            <div className="flex flex-col ">
              <Controller
                name="companyEmail"
                control={control}
                render={({ field }) => (
                  <Input
                    label="Company Email"
                    labelClassName="text-[15px]  mt-[8px]"
                    placeholder=""
                    error={errors.companyEmail?.message}
                    {...field}
                  />
                )}
              />
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
