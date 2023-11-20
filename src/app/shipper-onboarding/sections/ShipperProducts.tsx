import { useState } from 'react'
import { SubmitHandler, UseFormReturn } from 'react-hook-form'
import { AiOutlineClose } from 'react-icons/ai'
import { BiSearch, BiUpload } from 'react-icons/bi'

import IconInfo from '@assets/icons/info.svg'
import QuoteRequest from '@assets/icons/quote-request.svg'
import { Button, TransparentButton } from '@components/ui/Button'
import { Check } from '@components/ui/Check'
import { GradientHR } from '@components/ui/GradientHR'
import { Input } from '@components/ui/Input'
import { Modal } from '@components/ui/Modal'
import { Option, Select, findOption } from '@components/ui/Select'

interface Props {
  onClose?: () => void
  onSubmit?: () => void
}
const packageTypes = [
  {
    label: 'Type 1',
    value: 'Type 1'
  },
  {
    label: 'Type 2',
    value: 'Type 2'
  },
  {
    label: 'Type 3',
    value: 'Type 3'
  }
]

const freightClasses = [
  {
    label: 'Class 1',
    value: 'Class 1'
  },
  {
    label: 'Class 2',
    value: 'Class 2'
  },
  {
    label: 'Class 3',
    value: 'Class 3'
  }
]

export const ShipperProducts = ({ onClose, onSubmit }: Props) => {
  const [describeItemModalOpen, setDescribeItemModalOpen] = useState<boolean>(false)
  const [packageType, setPackageType] = useState<Option>()
  const [freightClass, setFreightClass] = useState<Option>()
  const onSubmitForm = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.()
  }
  return (
    <div className="p-3 flex flex-col h-full">
      <form onSubmit={onSubmitForm} className="flex flex-col lg:gap-[24px] gap-[18px]">
        <div className="text-body-lg font-semibold">Import your products or import bellow</div>

        <div className="my-3 pr-3 max-h-[300px]  flex-grow overflow-auto scrollbar scrollbar-w-2 scrollbar-track-gray-100 scrollbar-thumb-blue-500">
          <div>
            <div className="flex justify-between lg:mb-[16px] mb-[12px]">
              <div className="font-semibold">What is the item?*</div>
            </div>
            <div className="flex lg:flex-row flex-col lg:items-center gap-d-16">
              <div className="grow flex items-center gap-d-16">
                <Button type="button" size="sm" className="grow">
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
          <div className="my-4">
            <GradientHR />
          </div>
          <div className="">
            <div className="grid grid-cols-3 gap-6">
              <Input label="Product Name" labelClassName="text-[15px]  " placeholder="Enter product name" />
              <Select
                containerClassName="w-full"
                labelClassName="text-[15px]  "
                label="Package Type"
                placeholder=""
                options={packageTypes}
                value={packageType}
                onChange={(newValue) => setPackageType(newValue)}
              />
              <Select
                containerClassName="w-full"
                labelClassName="text-[15px]  "
                label="Freight Class"
                placeholder=""
                options={freightClasses}
                value={freightClass}
                onChange={(newValue) => setFreightClass(newValue)}
              />
              <Input label="Weight per unit" labelClassName="text-[15px]  " placeholder="Enter product name" />
              <Input label="Additional Weight" labelClassName="text-[15px]  " placeholder="Enter product name" />
              <Input label="Value" labelClassName="text-[15px]  " placeholder="Enter product name" />
              <Input label="Length" labelClassName="text-[15px]  " placeholder="Enter product name" />
              <Input label="Width" labelClassName="text-[15px]  " placeholder="Enter product name" />
              <Input label="Height" labelClassName="text-[15px]  " placeholder="Enter product name" />
              <Input label="NMFC" labelClassName="text-[15px]  " placeholder="Enter product name" />
              <Input label="Stack Number" labelClassName="text-[15px]  " placeholder="Enter product name" />
              <Input label="SKU " labelClassName="text-[15px]  " placeholder="Enter product name" />
            </div>
          </div>
          <div className="flex gap-4 flex-wrap my-4">
            <Check labelClassName="text-[12px]" label="Pick/Pack" />
            <Check labelClassName="text-[12px]" label="Large Packages" />
            <Check labelClassName="text-[12px]" label="Inside Delivery" />
            <Check labelClassName="text-[12px]" label="Return Policy" />
            <Check labelClassName="text-[12px]" label="Provide picture of product" />
          </div>

          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="product-csv"
                className="flex flex-col gap-4 p-6 px-2 items-center justify-center w-full border rounded-lg cursor-pointer "
              >
                <BiUpload className="text-2xl" />
                <p className="font-light text-[10px] uppercase">Upload product via csv</p>

                <input id="product-csv" type="file" className="hidden" />
              </label>
            </div>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="import-sku"
                className="flex flex-col gap-4 p-5 px-2 items-center justify-center w-full border rounded-lg cursor-pointer "
              >
                <BiUpload className="text-2xl" />
                <p className="font-light text-[10px] uppercase text-center">Connect Marketplace - Import SKU/ASPN</p>

                <input id="import-sku" type="file" className="hidden" />
              </label>
            </div>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="integrate-wms"
                className="flex flex-col gap-4 p-6 px-2 items-center justify-center w-full border rounded-lg cursor-pointer "
              >
                <BiUpload className="text-2xl" />
                <p className="font-light text-[10px] uppercase">Integrate your WMS or ERP</p>

                <input id="integrate-wms" type="file" className="hidden" />
              </label>
            </div>
          </div>
        </div>
        <GradientHR />
        <div className="flex justify-end">
          <Button type="submit" className="lg:!px-[24px] !px-[18px]">
            Save
          </Button>
        </div>

        <Modal
          open={describeItemModalOpen}
          onClose={() => setDescribeItemModalOpen(false)}
          className="  my-auto p-2 lg:max-w-[810px]  w-full lg:rounded-[10px] rounded-[8px] bg-[#1a194990] border border-[#1a1949] shadow-[0px,4px,4px,0px,rgba(0,0,0,0.25)] backdrop-blur-[25px] z-999"
        >
          <DescribeItem onClose={() => setDescribeItemModalOpen(false)} />
        </Modal>
      </form>
    </div>
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
            <GradientHR />
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
            <GradientHR />
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
