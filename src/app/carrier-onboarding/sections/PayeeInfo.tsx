import React, { useState } from 'react'
import { Controller, SubmitHandler, UseFormReturn, useForm } from 'react-hook-form'
import { AiOutlineClose } from 'react-icons/ai'
import { BiSolidInfoCircle } from 'react-icons/bi'

import { yupResolver } from '@hookform/resolvers/yup'

import { Button, TransparentButton } from '@components/ui/Button'
import { Check } from '@components/ui/Check'
import { GradientHR } from '@components/ui/GradientHR'
import { Input } from '@components/ui/Input'
import { Modal } from '@components/ui/Modal'
import { Option, Select, findOption } from '@components/ui/Select'
import allStates from '@json/usaStates.json'

import { companyInfoInputs } from '../schemas/companyInfo'
import { payeeInfoInputs, payeeInfoSchema } from '../schemas/payeeInfo'

const usaStates: Option[] = allStates.map((obj) => {
  return { value: obj.id, label: obj.name }
})
const quickPayOptions = [
  {
    label: '1 day QP at 3%',
    value: '1 day QP at 3%'
  },
  {
    label: '7-Day QP at 2.5%',
    value: '7-Day QP at 2.5%'
  },

  {
    label: '15-Day QP at 2%',
    value: '15-Day QP at 2%'
  },

  {
    label: 'Pay My Factoring Company',
    value: 'Pay My Factoring Company'
  }
]

const factoringCompanies = [
  {
    value: 'Factoring Company 1',
    label: 'Factoring Company 1'
  },
  {
    value: 'Factoring Company 2',
    label: 'Factoring Company 2'
  }
]
type Props = {
  onClose?: () => void
  onSubmit?: () => void
  form: UseFormReturn<payeeInfoInputs>
  companyInfoForm: UseFormReturn<companyInfoInputs>
}
export const PayeeInfo = ({ onClose, onSubmit, form, companyInfoForm }: Props) => {
  const [factoringCompanyModalOpen, setFactoringCompanyModalOpen] = useState(false)
  const {
    watch,
    setValue,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors },
    control
  } = form

  const {
    watch: watchCompanyValue,
    setValue: setCompanyValue,
    getValues: getCompanyValues,
    getFieldState
  } = companyInfoForm

  const populateCompanyInfo = (value: boolean) => {
    if (value) {
      setValue('companyName', watchCompanyValue('companyName'))
      setValue('dbaName', watchCompanyValue('dbaName'))
      setValue('useDbaName', watchCompanyValue('useDbaName'))
      setValue('phone', watchCompanyValue('companyPhone'))
      setValue('addressOne', watchCompanyValue('addressOne'))
      setValue('phoneExtension', watchCompanyValue('phoneExtension'))
      setValue('addressTwo', watchCompanyValue('addressTwo'))
      setValue('cellPhone', watchCompanyValue('cellPhone'))
      setValue('city', watchCompanyValue('city'))
      setValue('fax', watchCompanyValue('fax'))
      setValue('state', watchCompanyValue('state'))
      setValue('zipCode', watchCompanyValue('zipCode'))
    }

    setValue('sameAsCompanyInfo', value)
  }

  const openFactoringCompanyModal = (value: boolean) => {
    if (value) {
      setFactoringCompanyModalOpen(true)
    }
    setValue('submitToFactoringCompany', value)
  }
  const handleFactoringCompanyChange = ({ value }: { value: string }) => {
    setValue('factoringCompany', value, { shouldValidate: true })
    setValue('remitPaymentByDefault', true, { shouldValidate: true })
  }
  const onSubmitForm: SubmitHandler<payeeInfoInputs> = (data) => {
    console.log(data)
    onSubmit?.()
  }
  return (
    <div className="p-3 flex flex-col h-full">
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <div>
          <div className="flex items-center justify-between">
            <div className="font-semibold ">Payee Information</div>
            <AiOutlineClose onClick={onClose} className=" cursor-pointer" />
          </div>

          <div className="my-4">
            <GradientHR />
          </div>

          <div className=" p-1 border-2 rounded-md mb-6">
            <div className="p-2 rounded-sm text-center bg-primary text-white">Payee Information</div>
          </div>
        </div>
        <div className="pr-3 max-h-[300px]  flex-grow overflow-auto scrollbar scrollbar-w-2 scrollbar-track-gray-100 scrollbar-thumb-blue-500">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <Controller
                name="sameAsCompanyInfo"
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <Check
                    label={
                      <div className="font-light text-sm flex gap-2 items-center">
                        Billing Information Same as Company Info <BiSolidInfoCircle className="text-lg" />
                      </div>
                    }
                    {...field}
                    checked={watch('sameAsCompanyInfo')}
                    onChange={populateCompanyInfo}
                  />
                )}
              />
            </div>
            <div className="flex">
              <Controller
                name="submitToFactoringCompany"
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <Check
                    label={
                      <div className="font-light text-sm flex gap-2 items-center">
                        Submit Payment to Factoring Company <BiSolidInfoCircle className="text-lg" />
                      </div>
                    }
                    {...field}
                    checked={watch('submitToFactoringCompany')}
                    onChange={openFactoringCompanyModal}
                  />
                )}
              />
            </div>

            <div className="flex flex-col ">
              <Controller
                name="companyName"
                control={control}
                render={({ field }) => (
                  <Input
                    label="*Company"
                    labelClassName="text-[15px]  mt-[8px]"
                    error={errors.companyName?.message}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="">
              <Controller
                name="quickPay"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select
                    label="rFleet Offers QuickPay options. Select Box below to Opt-in for Approval."
                    placeholder="Select"
                    labelClassName="md:text-[11px] mt-[8px]"
                    options={quickPayOptions}
                    error={errors.quickPay?.message}
                    {...field}
                    value={findOption(quickPayOptions, watch('quickPay') || '')}
                    onChange={({ value }) => setValue('quickPay', value, { shouldValidate: true })}
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
                        <span> Payee DBA name</span>
                        <Controller
                          name="useDbaName"
                          control={control}
                          render={({ field }) => (
                            <Check
                              label={<div className="font-light text-sm mt-1">Use Payee DBA Name</div>}
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
                name="accountPayableContact"
                control={control}
                render={({ field }) => (
                  <Input
                    label="Account Payable Contact*"
                    labelClassName="text-[15px]  mt-[8px]"
                    placeholder=""
                    error={errors.accountPayableContact?.message}
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
                name="phone"
                control={control}
                render={({ field }) => (
                  <Input
                    label="Phone*"
                    labelClassName="text-[15px]  mt-[8px]"
                    placeholder=""
                    error={errors.phone?.message}
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

            <div className="">
              <Controller
                name="zipCode"
                control={control}
                render={({ field }) => (
                  <Input
                    label="Zip Code*"
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
                name="SSN"
                control={control}
                render={({ field }) => (
                  <Input
                    label="Federal EIN or Tax ID#(SSN)"
                    labelClassName="text-[15px]  mt-[8px]"
                    placeholder=""
                    error={errors.SSN?.message}
                    {...field}
                  />
                )}
              />
            </div>

            {/* <div className="flex flex-col ">
              <Controller
                name="payInDays"
                control={control}
                render={({ field }) => (
                  <Input
                    label="Pay in Days"
                    labelClassName="text-[15px]  mt-[8px]"
                    placeholder=""
                    error={errors.payInDays?.message}
                    {...field}
                  />
                )}
              />
            </div> */}

            <div>
              <Controller
                name="emailSettlementReport"
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <Check
                    label={<div className="font-light mt-1">Email Settlement Report after payment</div>}
                    {...field}
                    checked={watch('emailSettlementReport')}
                  />
                )}
              />
            </div>
          </div>
          <div>
            <div className="my-2">
              <GradientHR />
            </div>

            <Controller
              name="factoringCompany"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select
                  label="Factoring Company"
                  placeholder="Select"
                  containerClassName="w-full z-[100] mb-2"
                  labelClassName="text-[15px]  mt-[8px]"
                  options={factoringCompanies}
                  error={errors.factoringCompany?.message}
                  {...field}
                  value={findOption(factoringCompanies, watch('factoringCompany') || '')}
                  onChange={({ value }) => setValue('factoringCompany', value, { shouldValidate: true })}
                />
              )}
            />
            <Controller
              name="remitPaymentByDefault"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <Check
                  label={<div className="font-light mt-1">Remit Payment to Factoring company by default</div>}
                  {...field}
                  checked={watch('remitPaymentByDefault')}
                />
              )}
            />
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

      <div className="">
        <form>
          <Modal
            open={factoringCompanyModalOpen}
            onClose={() => setFactoringCompanyModalOpen(false)}
            className=" max-h-[96vh]  my-auto p-4 lg:max-w-[810px]  w-full lg:rounded-[10px] rounded-[8px] bg-[#1a194990] border border-[#1a1949] shadow-[0px,4px,4px,0px,rgba(0,0,0,0.25)] backdrop-blur-[25px] z-999"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="font-semibold ">Select Factoring Company</div>
                <AiOutlineClose onClick={() => setFactoringCompanyModalOpen(false)} className=" cursor-pointer" />
              </div>

              <div className="my-4">
                <GradientHR />
              </div>
              <Controller
                name="factoringCompany"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select
                    label="Factoring Company"
                    placeholder="Select"
                    containerClassName="w-full z-[100] mb-2"
                    labelClassName="text-[15px]  mt-[8px]"
                    options={factoringCompanies}
                    error={errors.factoringCompany?.message}
                    {...field}
                    value={findOption(factoringCompanies, watch('factoringCompany') || '')}
                    onChange={handleFactoringCompanyChange}
                  />
                )}
              />

              <div>
                <div className="my-4">
                  <GradientHR />
                </div>
                <div className="flex justify-between">
                  <TransparentButton className="border-0" type="reset">
                    Clear
                  </TransparentButton>
                  <div className="flex gap-2">
                    <TransparentButton onClick={() => setFactoringCompanyModalOpen(false)} type="button">
                      Cancel
                    </TransparentButton>
                    <Button type="button" onClick={() => setFactoringCompanyModalOpen(false)}>
                      Apply
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        </form>
      </div>
    </div>
  )
}
