import { useState } from 'react'
import { SubmitHandler, UseFormReturn } from 'react-hook-form'
import { AiOutlineClose } from 'react-icons/ai'
import { BiSearch } from 'react-icons/bi'

import IconInfo from '@assets/icons/info.svg'
import QuoteRequest from '@assets/icons/quote-request.svg'
import { Button, TransparentButton } from '@components/ui/ButtonInternal'
import { Check } from '@components/ui/CheckInternal'
import { GradientHR } from '@components/ui/GradientHR'
import { Input } from '@components/ui/InputInternal'
import { Modal } from '@components/ui/Modal'
import { Select, findOption } from '@components/ui/SelectInternal'

import { currencies, packageUnits } from '../options'
import { GoodsCommodityInputs } from '../types-schemas-constants'

interface Props {
  methods: UseFormReturn<GoodsCommodityInputs>
  onSubmit: SubmitHandler<GoodsCommodityInputs>
}

export const GoodsCommodity = ({ methods, onSubmit }: Props) => {
  const [describeItemModalOpen, setDescribeItemModalOpen] = useState<boolean>(false)
  const [comoditySearchModalOpen, setComoditySearchModalOpen] = useState<boolean>(false)
  const {
    watch,
    setValue,
    handleSubmit,
    formState: { errors }
  } = methods

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col lg:gap-[24px] gap-[18px]">
      <div className="text-body-lg font-semibold">Provide Product Details</div>
      <div>
        <div className="flex justify-between lg:mb-[16px] mb-[12px]">
          <div className="font-semibold">What is the item?*</div>
          <div className="text-caption">Quick Guide for Describing items</div>
        </div>
        <div className="flex lg:flex-row flex-col lg:items-center gap-d-16">
          <div className="grow flex items-center gap-d-16">
            <Button onClick={() => setDescribeItemModalOpen(true)} type="button" size="sm" className="grow">
              <div className="flex items-center gap-d-10">
                Create Description
                <QuoteRequest />
              </div>
            </Button>
          </div>
          <div className="font-semibold shrink-0">OR</div>
          <Input containerClassName="grow" placeholder="Enter your item descriptions (170 Character Maximum)" />
        </div>
      </div>
      <hr></hr>
      <div className="flex lg:flex-row flex-col gap-d-16">
        <Input
          value={watch('quantity')}
          onChange={(value) => setValue('quantity', value, { shouldValidate: true })}
          error={errors.quantity?.message}
          label="Quantity*"
          placeholder="#"
          containerClassName="lg:w-[80px] w-full"
          type="number"
        />
        <Input
          label="SKU*"
          placeholder="SKU"
          value={watch('sku')}
          onChange={(value) => setValue('sku', value, { shouldValidate: true })}
          error={errors.sku?.message}
          containerClassName="lg:w-[194px] w-full"
          type="number"
        />
        <Select
          containerClassName="lg:w-[300px] w-full"
          label={
            <div className="flex items-center">
              Unit*&nbsp;<div className="text-caption text-gray">(How the item is packaged)</div>
            </div>
          }
          options={packageUnits}
          value={findOption(packageUnits, watch('packageUnit'))}
          onChange={({ value }) => setValue('packageUnit', value, { shouldValidate: true })}
          error={errors.packageUnit?.message}
        />
        <Input
          containerClassName="lg:w-[160px] w-full"
          label={
            <div className="flex items-center">
              Value*&nbsp;<div className="text-caption text-gray">(Per Item)</div>
            </div>
          }
          // options={currencies}
          onChange={(value) => setValue('value', value, { shouldValidate: true })}
          placeholder="Value"
          error={errors.value?.message}
        />
        <Select
          containerClassName="lg:w-[94px] w-full"
          label="Currency"
          placeholder=" "
          options={currencies}
          value={findOption(currencies, watch('currency') || '')}
          onChange={({ value }) => setValue('currency', value, { shouldValidate: true })}
        />
        <Input
          type="number"
          label={
            <div className="relative flex items-center">
              Weight*&nbsp;<div className="text-caption text-gray">(Per Item)</div>
              <IconInfo className="absolute lg:w-[24px] w-[18px] lg:h-[24px] h-[18px] lg:left-[120px] left-[90px]" />
            </div>
          }
          value={watch('weight')}
          onChange={(value) => setValue('weight', value, { shouldValidate: true })}
          placeholder="Weight"
          error={errors.weight?.message}
        />
      </div>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-d-16">
        <Input
          containerClassName="grow"
          label={
            <div className="relative flex items-center">
              Where was the item made?**
              <IconInfo className="absolute lg:w-[24px] w-[18px] lg:h-[24px] h-[18px] lg:left-[180px] left-[140px]" />
            </div>
          }
          value={watch('madeWhere')}
          onChange={(value) => setValue('madeWhere', value, { shouldValidate: true })}
          placeholder="Made Where"
          error={errors.madeWhere?.message}
        />
        {/* <Input
          value={watch('scheduleB')}
          onChange={(value) => setValue('scheduleB', value, { shouldValidate: true })}
          error={errors.scheduleB?.message}
          containerClassName="grow"
          label="Schedule B"
        /> */}
        <div className="flex flex-col gap-1">
          <div>Schedule B</div>
          <div className="flex items-center border rounded-md ">
            <div className="p-2 px-3 flex-grow text-[grey]">--------/-------/--------</div>
            <Button
              onClick={() => setComoditySearchModalOpen(true)}
              className=" h-10 w-16  bg-transparent border-0 border-l bg-primary rounded-sm"
            >
              <div className="px-3 p-2">
                <BiSearch className="h-6 w-6" />
              </div>
            </Button>
          </div>
        </div>
      </div>
      <Check label="Add on insurance for goods valued over $100" />
      <hr></hr>
      <div className="flex justify-end">
        <Button type="submit" className="lg:!px-[24px] !px-[18px]">
          Save
        </Button>
      </div>

      <Modal
        open={describeItemModalOpen}
        onClose={() => setDescribeItemModalOpen(false)}
        className="  my-auto p-2 lg:max-w-[810px]  w-full lg:rounded-[10px] rounded-[8px] bg-[white] text-black border border-white shadow-[0px,4px,4px,0px,rgba(0,0,0,0.25)] backdrop-blur-[25px] z-999"
      >
        <DescribeItem onClose={() => setDescribeItemModalOpen(false)} />
      </Modal>

      <Modal
        open={comoditySearchModalOpen}
        onClose={() => setComoditySearchModalOpen(false)}
        className="  my-auto p-2 lg:max-w-[680px]  w-full lg:rounded-[10px] rounded-[8px] bg-[white] text-black border border-white shadow-[0px,4px,4px,0px,rgba(0,0,0,0.25)] backdrop-blur-[25px] z-999"
      >
        <ComoditySearch onClose={() => setComoditySearchModalOpen(false)} />
      </Modal>
    </form>
  )
}

type DescribeItemProps = {
  onClose?: () => void
  onSubmit?: () => void
}
export const DescribeItem = ({ onClose, onSubmit }: DescribeItemProps) => {
  const onSubmitForm = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.()
  }
  return (
    <div className="p-2 flex flex-col h-full">
      <form onSubmit={onSubmitForm}>
        <div>
          <div className="">
            <div className="flex items-center justify-between">
              <div className="font-semibold text-lg">Describe your Items</div>
              <AiOutlineClose onClick={onClose} className="self-start cursor-pointer" />
            </div>
            <div className="font-extralight text-[13px]">
              Be sure to accurately describe with precise details, Accurate descriptions are used to evaluate each
              shipment for transits and can help keep your shipment moving!
            </div>
          </div>
          <div className="my-4">
            <hr></hr>
          </div>{' '}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Input label="What is the item?" labelClassName="text-[15px]  " placeholder="Shirts" />
          <Input
            label="Brand or Manufacture"
            labelClassName="text-[15px]  "
            placeholder="What is the brand name or the company that provide the item?"
          />
          <Input
            label="Which type, style or model is it?"
            labelClassName="text-[15px]  "
            placeholder="Example: M597U"
          />
          <Input
            label="What is made of?"
            labelClassName="text-[15px]  "
            placeholder="Example: Plastic, Alumminium, wood"
          />
          <Input
            label="How will it be used?"
            labelClassName="text-[15px]  "
            placeholder="Example: Athletic activity or children's play"
          />
          <Input
            label="Item Description?"
            containerClassName="col-span-2"
            labelClassName="text-[15px]  "
            placeholder="Shirts"
          />
          <Check label="6/70" />
        </div>
        <div>
          <div className="my-4">
            <hr></hr>
          </div>

          <div className="flex justify-between">
            <TransparentButton className="border-0" type="reset">
              Clear
            </TransparentButton>
            <div className="flex gap-2 ">
              <TransparentButton className="w-fit border rounded-md px-4" onClick={onClose} type="button">
                Cancel
              </TransparentButton>
              <Button onClick={onClose} type="submit" className="w-fit">
                Use this description
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

type ComoditySearchProps = {
  onClose?: () => void
  onSubmit?: () => void
}
const categories = [
  {
    value: 'Business and Industrial',
    label: 'Business and Industrial'
  }
]

const subCategories = [
  {
    value: 'Healthcare, Laboratory and Life sciences',
    label: 'Healthcare, Laboratory and Life sciences'
  },
  {
    value: 'Bomb Calorimeters',
    label: 'Bomb Calorimeters'
  }
]
export const ComoditySearch = ({ onClose, onSubmit }: ComoditySearchProps) => {
  const [category, setCategory] = useState<string>('')
  const [subCategory, setSubCategory] = useState<string>('')
  const [subCategory2, setSubCategory2] = useState<string>('')
  const onSubmitForm = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.()
  }
  return (
    <div className="p-2 flex flex-col h-full">
      <form onSubmit={onSubmitForm}>
        <div>
          <div className="">
            <div className="flex items-center justify-between">
              <div className="font-semibold text-lg">Comodity code Search</div>
              <AiOutlineClose onClick={onClose} className="self-start cursor-pointer" />
            </div>
          </div>
          <div className="my-4">
            <hr></hr>
          </div>{' '}
        </div>
        <div className="grid grid-cols-1 gap-3">
          <Input label="Description" labelClassName="text-[15px]  " placeholder="Fish Food" />
          <Select
            containerClassName="w-full"
            labelClassName="text-[15px] "
            label="Category"
            placeholder=""
            options={categories}
            value={category}
            onChange={(newValue) => setCategory(newValue.value)}
          />

          <Select
            containerClassName="w-full"
            labelClassName="text-[15px]  "
            label="Sub Category"
            placeholder=""
            options={subCategories}
            value={subCategory}
            onChange={(newValue) => setSubCategory(newValue.value)}
          />

          <Select
            containerClassName="w-full"
            labelClassName="text-[15px]  "
            label="Sub Category 2"
            placeholder=""
            options={subCategories}
            value={subCategory2}
            onChange={(newValue) => setSubCategory2(newValue.value)}
          />

          <div className="flex flex-col gap-2">
            <div className="flex gap-3 font-bold p-2">
              <div className="basis-3/12">Comodity Code</div>
              <div className="basis-9/12">Description</div>
            </div>
            <div className="flex gap-3 font-light rounded-md p-3 bg-[grey] bg-opacity-10 backdrop-blur-[40px]  ">
              <div className="basis-3/12">9026 80 0000</div>
              <div className="basis-9/12 text-sm">
                Instruments and apparatus for measuring or checking the flow, level, pressure or other variablesof
                liquids or gases (for example, flow meters, level gauges, manometers, heat meters), excluding
                instruments and apparatus of headings 9014, 9015, 9028 or 9032; parts and accessories thereof, Other
                instruments or apparatus
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="my-4">
            <hr></hr>
          </div>

          <div className="flex justify-between">
            <TransparentButton className="border-0" type="reset">
              Clear
            </TransparentButton>
            <div className="flex gap-2 ">
              <TransparentButton className="w-fit border rounded-md px-4" onClick={onClose} type="button">
                Cancel
              </TransparentButton>
              <Button onClick={onClose} type="submit" className="w-fit">
                Save
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
