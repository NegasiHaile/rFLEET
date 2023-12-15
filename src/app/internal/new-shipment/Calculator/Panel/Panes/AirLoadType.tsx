import React, { useState } from 'react'
import { Controller, SubmitHandler, UseFormReturn, useFieldArray } from 'react-hook-form'
import { BiEdit, BiPencil, BiPlus } from 'react-icons/bi'
import { ImPencil } from 'react-icons/im'

import Link from 'next/link'

import X from '@assets/icons/x.svg'
import gradientCard from '@assets/images/gradient-card-cyan-indigo-to-r.png'
import { Button, TransparentButton } from '@components/ui/ButtonInternal'
import { Check } from '@components/ui/CheckInternal'
import { GradientHR } from '@components/ui/GradientHR'
import { Input } from '@components/ui/Input'
import { Radio } from '@components/ui/Radio'
import { Option, Select, findOption } from '@components/ui/SelectInternal'

import { containerTypes, dimensionUnits, handlingUnits, incotermOptions, weightTypes, weightUnits } from '../options'
import { AirLoadTypeInputs, LTLField, initialAirField } from '../types-schemas-constants'
import AdditionalServices from './AdditionalServices'

interface Props {
  methods: UseFormReturn<AirLoadTypeInputs>
  onSubmit: SubmitHandler<AirLoadTypeInputs>
}

const ContainerLoadTypes = [
  {
    value: 'Air Cargo',
    title: 'Air Cargo'
  }
]
export const AirLoadType = ({ methods, onSubmit }: Props) => {
  const [incoterm, setIncoterm] = useState<Option>()

  const {
    watch,
    setValue,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors },
    control
  } = methods

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'fields'
  })

  const onAdd = async () => {
    const validated = await trigger('fields')
    if (validated) {
      append({ ...initialAirField })
    }
    return
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col lg:gap-[24px] gap-[18px]">
      <div className="text-body-lg font-semibold">What are you shipping?</div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {ContainerLoadTypes.map((loadType) => (
          <Radio
            key={loadType.value}
            value={loadType.value}
            checked={watch('containerLoadType') === loadType.value}
            onCheck={() => setValue('containerLoadType', loadType.value, { shouldValidate: true })}
            label={
              <div className="flex items-center">
                <div className="">{loadType.title}</div>
              </div>
            }
            error={errors.containerLoadType?.message}
            labelClassName="text-heading w-full"
            containerClassName="w-full border-2 rounded-md p-2"
          />
        ))}
      </div>

      <GradientHR />
      <div className="relative rounded-d-8 p-3 border border-[#FFFFFF30]   w-full ">
        <div>
          {fields.map((item, index) => (
            <div key={index} className="grid lg:grid-cols-12 grid-cols-1  gap-4 my-4">
              <div className="col-span-2 flex flex-col gap-2">
                <div className="text-sm">Handling Unit </div>
                <Controller
                  name={`fields.${index}.handlingUnit`}
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Select
                      placeholder=""
                      options={handlingUnits}
                      error={errors.fields && errors.fields[index]?.handlingUnit?.message}
                      containerClassName="w-full"
                      {...field}
                      value={findOption(handlingUnits, watch(`fields.${index}.handlingUnit`))}
                      onChange={({ value }) =>
                        setValue(`fields.${index}.handlingUnit`, value, { shouldValidate: true })
                      }
                    />
                  )}
                />
              </div>
              <div className="col-span-5 flex flex-col gap-2">
                <div className="text-sm">
                  Dimensions <span className="text-xs font-light">Enter dimensions of package</span>{' '}
                </div>

                <div className="flex gap-2 items-center">
                  <Controller
                    name={`fields.${index}.length`}
                    control={control}
                    render={({ field }) => (
                      <Input
                        placeholder="L"
                        error={errors.fields && errors.fields[index]?.length?.message}
                        containerClassName="lg:w-[90px]"
                        {...field}
                      />
                    )}
                  />

                  <div className="flex items-center flex-1">
                    <X />
                  </div>

                  <Controller
                    name={`fields.${index}.width`}
                    control={control}
                    render={({ field }) => (
                      <Input
                        placeholder="W"
                        error={errors.fields && errors.fields[index]?.width?.message}
                        containerClassName="lg:w-[90px]"
                        {...field}
                      />
                    )}
                  />
                  <div className="flex items-center flex-1">
                    <X />
                  </div>
                  <Controller
                    name={`fields.${index}.height`}
                    control={control}
                    render={({ field }) => (
                      <Input
                        placeholder="H"
                        error={errors.fields && errors.fields[index]?.height?.message}
                        containerClassName="lg:w-[90px]"
                        {...field}
                      />
                    )}
                  />

                  <Controller
                    name={`fields.${index}.dimensionUnit`}
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Select
                        placeholder=""
                        options={dimensionUnits}
                        error={errors.fields && errors.fields[index]?.dimensionUnit?.message}
                        containerClassName="lg:w-[100px]"
                        {...field}
                        value={findOption(dimensionUnits, watch(`fields.${index}.dimensionUnit`))}
                        onChange={({ value }) =>
                          setValue(`fields.${index}.dimensionUnit`, value, { shouldValidate: true })
                        }
                      />
                    )}
                  />
                </div>
              </div>
              <div className="col-span-5 flex gap-2">
                <div className="flex flex-col gap-1">
                  <div className="text-sm flex items-center gap-5 ">
                    Weight per unit
                    <Check
                      label="Inclides packaging"
                      labelClassName="text-xs my-auto"
                      checked={watch(`fields.${index}.includesPackaging`)}
                      onChange={(checked) => setValue(`fields.${index}.includesPackaging`, checked)}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Controller
                      name={`fields.${index}.weight`}
                      control={control}
                      render={({ field }) => (
                        <Input
                          placeholder="Weight"
                          labelClassName="text-xs"
                          error={errors.fields && errors.fields[index]?.weight?.message}
                          containerClassName="lg:w-[150px]"
                          {...field}
                        />
                      )}
                    />
                    <Controller
                      name={`fields.${index}.weightUnit`}
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <Select
                          placeholder="Select"
                          options={weightUnits}
                          error={errors.fields && errors.fields[index]?.weightUnit?.message}
                          containerClassName="lg:w-[110px]"
                          {...field}
                          value={findOption(weightUnits, watch(`fields.${index}.weightUnit`))}
                          onChange={({ value }) =>
                            setValue(`fields.${index}.weightUnit`, value, { shouldValidate: true })
                          }
                        />
                      )}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="text-sm"># of units </div>

                  <Controller
                    name={`fields.${index}.noOfUnits`}
                    control={control}
                    render={({ field }) => (
                      <Input
                        placeholder=""
                        error={errors.fields && errors.fields[index]?.noOfUnits?.message}
                        containerClassName="lg:w-[100px]"
                        {...field}
                      />
                    )}
                  />
                </div>
                <Button className="h-fit self-end p-0 " size="sm" onClick={() => remove(index)}>
                  x
                </Button>
              </div>
            </div>
          ))}
          <div className="flex justify-between items-center w-full">
            <div className="col-span-2 flex flex-col gap-2">
              <div className="text-sm">Select Incoterm </div>
              <Controller
                name={`incoterm`}
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select
                    placeholder=""
                    options={incotermOptions}
                    error={errors.incoterm?.message}
                    containerClassName=""
                    {...field}
                    value={findOption(incotermOptions, watch(`incoterm`))}
                    onChange={({ value, label, description }) => {
                      setIncoterm({ label, value, description })
                      setValue(`incoterm`, value, { shouldValidate: true })
                    }}
                  />
                )}
              />
            </div>

            <div className=" flex items-center justify-end mt-6 gap-4">
              <Button type="button" onClick={onAdd} size="sm" className="lg:w-auto w-full h-fit  ">
                <BiPlus className="lg:w-[20px] w-[15px] lg:h-[20px] h-[15px]" />
                Add Another Field
              </Button>
            </div>
          </div>
        </div>
      </div>
      {incoterm?.value && (
        <div className="flex flex-col gap-2">
          <div className="flex gap-3 font-bold p-2">
            <div className="basis-2/12">Incoterm</div>
            <div className="basis-10/12">Description</div>
          </div>
          <div className="flex gap-3 font-light rounded-md p-3 bg-[rgba(249,249,249,0.1)] bg-opacity-10 backdrop-blur-[40px]  ">
            <div className="basis-2/12">{incoterm?.label}</div>
            <div className="basis-10/12 text-sm">{incoterm?.description}</div>
          </div>
        </div>
      )}
      <GradientHR />
      <AdditionalServices methods={methods} />
      <div className="flex flex-col gap-d-16 mt-0">
        <Controller
          name="containsAlcohol"
          control={control}
          render={({ field }) => <Check label="Shipment contains alcohol" {...field} />}
        />

        {watch('containsAlcohol') && (
          <div className="flex flex-col gap-d-16 lg:pl-[28px] pl-[21px]">
            <div>Alcohol recipient type</div>
            <div className="flex gap-d-24">
              <Controller
                name="alcoholRecipientType"
                control={control}
                render={({ field }) => (
                  <>
                    <Radio
                      label="License"
                      {...field}
                      value="License"
                      onCheck={() => setValue('alcoholRecipientType', 'License')}
                      checked={watch('alcoholRecipientType') === 'License'}
                      error={errors.alcoholRecipientType?.message}
                    />
                  </>
                )}
              />

              <Controller
                name="alcoholRecipientType"
                control={control}
                render={({ field }) => (
                  <>
                    <Radio
                      label="Consumer"
                      {...field}
                      value="Consumer"
                      onCheck={() => setValue('alcoholRecipientType', 'Consumer')}
                      checked={watch('alcoholRecipientType') === 'Consumer'}
                      error={errors.alcoholRecipientType?.message}
                    />
                  </>
                )}
              />
            </div>
            <div className="text-caption lg:flex">
              <div className="text-gray">Complaint account with UPS and FedEx is required. For more info,&nbsp;</div>
              <Link href="#">visit our FAQ.</Link>
            </div>
          </div>
        )}
        <Check
          label="Shipment contains dry ice"
          checked={watch('containsDryIce')}
          onChange={(checked) => setValue('containsDryIce', checked)}
        />
        {watch('containsDryIce') && (
          <Input
            placeholder="e.g.0.1"
            label="Dry ice weight (lb)*"
            value={watch('dryIceWeight')}
            error={errors.dryIceWeight?.message}
            onChange={(value) => setValue('dryIceWeight', value)}
            containerClassName="lg:w-[180px]"
          />
        )}

        <Check
          checked={watch('containsLithium')}
          onChange={(checked) => setValue('containsLithium', checked)}
          label="Shipment contains lithium batteries (hazardous material) only available for select services. Learn More"
          containerClassName="lg:max-w-[500px]"
        />
      </div>

      <GradientHR />
      <div className="flex lg:flex-row flex-col gap-d-16 justify-end">
        <Button type="reset" color="transparent">
          <div className="flex gap-d-10">Clear</div>
        </Button>
        <Button type="submit">Confirm</Button>
      </div>
    </form>
  )
}

export const GradientCard = ({ children }: { children: React.ReactNode }) => (
  <div
    className="text-center lg:px-[32px] px-[24px] lg:py-[30px] py-[22px] lg:mb-[12px] mb-[8px] rounded-md"
    style={{ background: `url(${gradientCard.src})`, backgroundSize: '100% 100%' }}
  >
    {children}
  </div>
)
