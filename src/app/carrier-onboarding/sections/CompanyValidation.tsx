import React, { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { AiOutlineClose } from 'react-icons/ai'
import { BiUpload } from 'react-icons/bi'

import { yupResolver } from '@hookform/resolvers/yup'

import { Button, TransparentButton } from '@components/ui/Button'
import { Check } from '@components/ui/Check'
import { GradientHR } from '@components/ui/GradientHR'
import { Input } from '@components/ui/Input'

import { companyValidationInputs, companyValidationSchema } from '../schemas/companyValidation'

type Props = {
  onClose?: () => void
  onSubmit?: () => void
}

const tradeLicenses = [
  {
    name: 'carrierAuthority',
    label: 'Carrier Authority*'
  },
  {
    name: 'EINLetter',
    label: 'EIN Letter*'
  },
  {
    name: 'hazmatLicense',
    label: 'Hazmat License'
  },
  {
    name: 'CARB',
    label: 'Clean Air Compliant(CARB)'
  },
  {
    name: 'bondedCarrierStatus',
    label: 'Bonded Carrier Status'
  }
]

const incorporateCertificates = [
  {
    name: 'certificateOfGoodStanding',
    label: 'Certificate of Good Standing*'
  },
  {
    name: 'SCACLetter',
    label: 'SCAC Letter*'
  },
  {
    name: 'smartWayCertified',
    label: 'Smart Way Certified'
  },
  {
    name: 'STACardDriver',
    label: 'STA CArd Driver'
  },
  {
    name: 'TWICCardDriver',
    label: 'TWIC Card Driver'
  }
]

const taxValidations = [
  {
    name: 'w9',
    label: 'W9*',
    sampleFile: 'w9_sample.pdf'
  },
  {
    name: 'voidedCheck',
    label: 'Voided Check*'
  },
  {
    name: 'deliveryOfFunds',
    label: 'Delivery of Funds',
    sampleFile: 'w9_sample.pdf'
  },
  {
    name: 'danAndBradsteetNumber',
    label: 'Dan & Bradsteet#'
  }
]
export const CompanyValidation = ({ onClose, onSubmit }: Props) => {
  const {
    watch,
    setValue,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors },
    control
  } = useForm<companyValidationInputs>({
    mode: 'onChange',
    resolver: yupResolver(companyValidationSchema),
    defaultValues: {}
  })
  const onSubmitForm: SubmitHandler<companyValidationInputs> = (data) => {
    console.log(data)
    onSubmit?.()
  }
  return (
    <div className="p-3 flex flex-col h-full">
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <div>
          <div className="flex items-center justify-between">
            <div className="font-semibold ">Company Validation</div>
            <AiOutlineClose onClick={onClose} className=" cursor-pointer" />
          </div>

          <div className="my-4">
            <GradientHR />
          </div>

          <div className=" p-1 border-2 rounded-md mb-6">
            <div className="p-2 rounded-sm text-center bg-primary text-white">Upload Company Documents</div>
          </div>
        </div>
        <div className="pr-3 max-h-[300px]  flex-grow overflow-auto scrollbar scrollbar-w-2 scrollbar-track-gray-100 scrollbar-thumb-blue-500">
          <div className="flex flex-col gap-3">
            <div className="font-bold">Document Center</div>
            <div className="grid grid-cols-3 gap-3">
              <div className="flex flex-col gap-3">
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
                <div className="flex flex-col gap-3">
                  {tradeLicenses.map((tradeLicense) => (
                    <Controller
                      key={tradeLicense.name}
                      name={tradeLicense.name as any}
                      control={control}
                      defaultValue={false}
                      render={({ field }) => (
                        <Check
                          label={tradeLicense.label}
                          labelClassName="font-light text-[13px]"
                          {...field}
                          checked={watch(tradeLicense.name as any)}
                        />
                      )}
                    />
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="incorporate-certificates"
                    className="flex flex-col gap-4 p-6 items-center justify-center w-full border rounded-lg cursor-pointer "
                  >
                    <BiUpload className="text-2xl" />
                    <p className="font-light text-xs">Incorporate Certificates</p>

                    <input id="incorporate-certificates" type="file" className="hidden" />
                  </label>
                </div>
                <div className="flex flex-col gap-3">
                  {incorporateCertificates.map((incorpCertificate) => (
                    <Controller
                      key={incorpCertificate.name}
                      name={incorpCertificate.name as any}
                      control={control}
                      defaultValue={false}
                      render={({ field }) => (
                        <Check
                          label={incorpCertificate.label}
                          labelClassName="font-light text-[13px]"
                          {...field}
                          checked={watch(incorpCertificate.name as any)}
                        />
                      )}
                    />
                  ))}{' '}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="owner-validation"
                    className="flex flex-col gap-4 p-6 items-center justify-center w-full border rounded-lg cursor-pointer "
                  >
                    <BiUpload className="text-2xl" />
                    <p className="font-light text-xs">Owner/Tax Validation</p>

                    <input id="owner-validation" type="file" className="hidden" />
                  </label>
                </div>
                <div className="flex flex-col gap-3">
                  {taxValidations.map((taxValidation) => (
                    <Controller
                      key={taxValidation.name}
                      name={taxValidation.name as any}
                      control={control}
                      defaultValue={false}
                      render={({ field }) => (
                        <Check
                          label={
                            taxValidation.sampleFile ? (
                              <a href={taxValidation.sampleFile} target="_blank">
                                {taxValidation.label}
                              </a>
                            ) : (
                              taxValidation.label
                            )
                          }
                          labelClassName="font-light text-[13px]"
                          {...field}
                          checked={watch(taxValidation.name as any)}
                        />
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-[2px] bg-gradient-to-br from-cyan-900 to-indigo-900  my-6"></div>

          <div className="grid grid-cols-2 gap-3 mt-6">
            <div className="col-span-2 font-bold ">Licenses & Certificates</div>
            <Controller
              name="EINNumber"
              control={control}
              render={({ field }) => (
                <Input
                  label="EIN#*"
                  labelClassName="text-[15px]  mt-[8px]"
                  placeholder=""
                  error={errors.EINNumber?.message}
                  {...field}
                />
              )}
            />
            <Controller
              name="DAndB"
              control={control}
              render={({ field }) => (
                <Input
                  label="D&B*"
                  labelClassName="text-[15px]  mt-[8px]"
                  placeholder=""
                  error={errors.DAndB?.message}
                  {...field}
                />
              )}
            />
            <Controller
              name="MCNumber"
              control={control}
              render={({ field }) => (
                <Input
                  label="MC#"
                  labelClassName="text-[15px]  mt-[8px]"
                  placeholder=""
                  error={errors.MCNumber?.message}
                  {...field}
                />
              )}
            />
            <Controller
              name="DOTNumber"
              control={control}
              render={({ field }) => (
                <Input
                  label="DOT#*"
                  labelClassName="text-[15px]  mt-[8px]"
                  placeholder=""
                  error={errors.DOTNumber?.message}
                  {...field}
                />
              )}
            />
            <Controller
              name="hazmatNumber"
              control={control}
              render={({ field }) => (
                <Input
                  label="HAZMAT#"
                  labelClassName="text-[15px]  mt-[8px]"
                  placeholder=""
                  error={errors.hazmatNumber?.message}
                  {...field}
                />
              )}
            />
            <Controller
              name="SCACNumber"
              control={control}
              render={({ field }) => (
                <Input
                  label="SCAC#*"
                  labelClassName="text-[15px]  mt-[8px]"
                  placeholder=""
                  error={errors.SCACNumber?.message}
                  {...field}
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
              <Button type="submit">Next</Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
