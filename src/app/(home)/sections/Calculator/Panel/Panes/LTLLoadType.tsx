import React, { useState } from 'react'
import { Controller, SubmitHandler, UseFormReturn, useFieldArray } from 'react-hook-form'
import { BiEdit, BiPencil, BiPlus } from 'react-icons/bi'
import { ImPencil } from 'react-icons/im'

import Link from 'next/link'

import X from '@assets/icons/x.svg'
import gradientCard from '@assets/images/gradient-card-cyan-indigo-to-r.png'
import { Button, TransparentButton } from '@components/ui/Button'
import { Check } from '@components/ui/Check'
import { GradientHR } from '@components/ui/GradientHR'
import { Input } from '@components/ui/Input'
import { Radio } from '@components/ui/Radio'
import { Select, findOption } from '@components/ui/Select'

import { dimensionUnits, handlingUnits } from '../options'
import { LTLField, LtlLoadTypeInputs, initialLTLField } from '../types-schemas-constants'
import AdditionalServices from './AdditionalServices'

interface Props {
  methods: UseFormReturn<LtlLoadTypeInputs>
  onSubmit: SubmitHandler<LtlLoadTypeInputs>
}

type DensityResultType = {
  estimatedDensity?: number
  totalCubicFeet?: number
  averageShipingClass?: number
}

const LTLTypes = [
  {
    value: 'LTL',
    title: '1 to 5 units',
    description: '*not exceeding 11 ft.'
  },
  {
    value: 'Volume LTL',
    title: '6 to 10 units',
    description: '*not exceeding 16 ft.'
  },
  {
    value: 'Partial LTL',
    title: '11 to 14 units',
    description: '*not exceeding 26 ft.'
  }
]
export const LTLLoadType = ({ methods, onSubmit }: Props) => {
  const [densityResult, setDensityResult] = useState<DensityResultType>({})
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
    const validated = await trigger()
    if (validated) {
      append({ ...initialLTLField })
    }
    return
  }

  const calculateDensity = async () => {
    const validated = await trigger('fields', { shouldFocus: true })
    if (validated) {
      const fieldsValues = getValues('fields')
      let totalCubicFeet = 0
      let estimatedDensity = 0
      let averageShipingClass = 0
      let totalWeight = 0
      if (fieldsValues && fieldsValues.length > 0) {
        totalCubicFeet = fieldsValues.reduce((total, fieldValue) => total + calculateCubicInches(fieldValue), 0) / 1728
        totalWeight = fieldsValues.reduce((total, fieldValue) => total + Number(fieldValue.weight), 0)
        estimatedDensity = totalWeight / totalCubicFeet
        averageShipingClass = findAverageShippingClass(estimatedDensity)
        setDensityResult({ averageShipingClass, estimatedDensity, totalCubicFeet })
      }
    }
  }

  // Function to calculate cubic feet for a field
  const calculateCubicInches = (fieldValue: any) => {
    let length, width, height
    if (fieldValue.dimensionUnit === 'inch') {
      length = parseFloat(fieldValue.length)
      width = parseFloat(fieldValue.width)
      height = parseFloat(fieldValue.height)
    } else if (fieldValue.dimensionUnit === 'centimeter') {
      length = parseFloat(fieldValue.length) / 2.54
      width = parseFloat(fieldValue.width) / 2.54
      height = parseFloat(fieldValue.height) / 2.54
    } else {
      console.error('Unsupported dimension unit: ' + fieldValue.dimensionUnit)
      return 0
    }

    return length * width * height
  }

  const findAverageShippingClass = (val: number) => {
    return val < 1
      ? 400
      : val < 2
      ? 300
      : val < 4
      ? 250
      : val < 6
      ? 175
      : val < 8
      ? 125
      : val < 10
      ? 100
      : val < 12
      ? 92.5
      : val < 15
      ? 85
      : val < 22.5
      ? 70
      : val < 30
      ? 65
      : 60
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col lg:gap-[24px] gap-[18px]">
      <div className="text-body-lg font-semibold">What are you shipping?</div>

      <div className="grid grid-cols-3 gap-3">
        {LTLTypes.map((ltlType) => (
          <Radio
            key={ltlType.value}
            value={ltlType.value}
            checked={watch('ltlType') === ltlType.value}
            onCheck={() => setValue('ltlType', ltlType.value, { shouldValidate: true })}
            label={
              <div className="flex items-center gap-3">
                <div className="text-sm font-bold">{ltlType.value}</div>{' '}
                <div className="text-xs font-light">{ltlType.title}</div>
                <div className="text-xs font-light">{ltlType.description}</div>
              </div>
            }
            error={errors.ltlType?.message}
            labelClassName="text-heading w-full"
            containerClassName="w-full border-2 rounded-md p-2"
          />
        ))}
      </div>

      <GradientHR />
      <div>
        {fields.map((item, index) => (
          <div key={index} className="flex lg:flex-row flex-col gap-8 my-4">
            <div className="flex flex-col gap-2">
              <div className="text-sm">Handling Unit </div>
              <Controller
                name={`fields.${index}.handlingUnit`}
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select
                    placeholder=""
                    searchable
                    options={handlingUnits}
                    error={errors.fields && errors.fields[index]?.handlingUnit?.message}
                    containerClassName="lg:w-[140px]"
                    {...field}
                    value={findOption(handlingUnits, watch(`fields.${index}.handlingUnit`))}
                    onChange={({ value }) => setValue(`fields.${index}.handlingUnit`, value, { shouldValidate: true })}
                  />
                )}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-sm">
                Dimensions <span className="text-xs font-light">Enter dimensions of package</span>{' '}
              </div>

              <div className="flex gap-d-16 items-center">
                <Controller
                  name={`fields.${index}.length`}
                  control={control}
                  render={({ field }) => (
                    <Input
                      placeholder="L"
                      error={errors.fields && errors.fields[index]?.length?.message}
                      containerClassName="lg:w-[80px]"
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
                      containerClassName="lg:w-[80px]"
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
                      containerClassName="lg:w-[80px]"
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
                      containerClassName="lg:w-[90px]"
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

            <div className="flex flex-col gap-2">
              <div className="text-sm"># of units </div>

              <Controller
                name={`fields.${index}.noOfUnits`}
                control={control}
                render={({ field }) => (
                  <Input
                    placeholder=""
                    error={errors.fields && errors.fields[index]?.noOfUnits?.message}
                    containerClassName="lg:w-[140px]"
                    {...field}
                  />
                )}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-sm">Package Weight </div>

              <Controller
                name={`fields.${index}.weight`}
                control={control}
                render={({ field }) => (
                  <Input
                    placeholder="Weight"
                    error={errors.fields && errors.fields[index]?.weight?.message}
                    containerClassName="lg:w-[150px]"
                    {...field}
                  />
                )}
              />
            </div>
            <Button
              type="button"
              onClick={() => remove(index)}
              size="sm"
              glossy
              className="lg:w-auto w-full h-fit self-end justify-self-end border-b "
            >
              <ImPencil />
            </Button>
          </div>
        ))}
        <div className="flex items-center w-full justify-end mt-6 gap-4">
          <Button
            size="sm"
            type="button"
            onClick={calculateDensity}
            color="transparent"
            className="lg:w-auto w-full h-fit  "
          >
            Calculate
          </Button>
          <Button type="button" onClick={onAdd} size="sm" className="lg:w-auto w-full h-fit  ">
            <BiPlus className="lg:w-[20px] w-[15px] lg:h-[20px] h-[15px]" />
            Add Another Field
          </Button>
        </div>
      </div>

      <div className="rounded-d-8 border border-[#FFFFFF30] bg-gradient-blur-dialog backdrop-blur-[12px] w-full ">
        <div className="p-3 flex ">
          <div className="basis-1/5 flex flex-col gap-4">
            Estimated Density <div>{densityResult.estimatedDensity?.toFixed(2)}</div>
          </div>
          <div className="basis-2/5 flex flex-col gap-4">
            Total Cubic Feet <div>{densityResult.totalCubicFeet?.toFixed(8)}</div>
          </div>
          <div className="basis-2/5 flex flex-col gap-4">
            Average Shipping Class <div>{densityResult.averageShipingClass}</div>
          </div>
        </div>
      </div>

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
