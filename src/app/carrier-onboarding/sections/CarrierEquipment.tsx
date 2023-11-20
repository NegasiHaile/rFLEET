import React, { useState } from 'react'
import { Control, Controller, SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { AiOutlineClose } from 'react-icons/ai'
import { BiMinus, BiPlus, BiTrash, BiUpload } from 'react-icons/bi'
import { ImAttachment } from 'react-icons/im'

import * as yup from 'yup'

import { yupResolver } from '@hookform/resolvers/yup'

import { Button, TransparentButton } from '@components/ui/Button'
import { GradientHR } from '@components/ui/GradientHR'
import { Input } from '@components/ui/Input'
import { Modal } from '@components/ui/Modal'
import { Option, Select } from '@components/ui/Select'

import { carrierEquipmentsInputs, carrierEquipmentsSchema } from '../schemas/carrierEquipment'

type carrierEquipmentType = {
  carrierType: string
  licensePlateNumber: string
  VINNumber: string
  truckNumber: string
  attachment?: File
}

const carrierTypes = [
  {
    label: 'Auto Carrier',
    value: 'Auto Carrier'
  },
  {
    label: 'Conestoga FB',
    value: 'Conestoga FB'
  },
  {
    label: 'Dump Trailer',
    value: 'Dump Trailer'
  },
  {
    label: 'Flatbed or Step Deck',
    value: 'Flatbed or Step Deck'
  }
]
type Props = {
  onClose?: () => void
  onSubmit?: () => void
}
export const CarrierEquipment = ({ onClose, onSubmit }: Props) => {
  const [carrierType, setCarrierType] = useState<Option>()
  const [carrierEquipments, setCarrierEquipments] = useState<carrierEquipmentType[]>([])

  const removeEquipment1 = (equipment: carrierEquipmentType) => {
    const filteredEquipments = carrierEquipments.filter((obj) => obj != equipment)
    setCarrierEquipments(filteredEquipments)
  }

  const {
    watch,
    setValue,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors },
    control
  } = useForm<carrierEquipmentsInputs>({
    mode: 'onChange',
    resolver: yupResolver(carrierEquipmentsSchema),
    defaultValues: {}
  })

  const {
    fields: equipments,
    append: addEquipment,
    remove: removeEquipment
  } = useFieldArray({
    control,
    name: 'equipments'
  })

  const addNewEquipment = (newCarrier: Option) => {
    // setCarrierType(newCarrier)
    const newEquipment: carrierEquipmentType = {
      carrierType: newCarrier.value,
      licensePlateNumber: '',
      truckNumber: '',
      VINNumber: ''
    }
    addEquipment(newEquipment)
  }
  const onSubmitForm: SubmitHandler<carrierEquipmentsInputs> = (data) => {
    console.log(data)
    onSubmit?.()
  }
  return (
    <div className="p-3 flex flex-col h-full">
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className="font-semibold text-lg">Add Carrier Truck and Trailer Equipment</div>
              <div className="font-extralight text-[10px]">Select the carrier equipment supported by this carrier</div>
            </div>
            <AiOutlineClose onClick={onClose} className=" cursor-pointer" />
          </div>
          <div className="my-4">
            <GradientHR />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {equipments.map((equipment, index) => {
            return (
              <EquipmentAccordion
                control={control}
                index={index}
                onDelete={removeEquipment}
                equipment={equipment}
                key={index}
              />
            )
          })}

          <Select
            containerClassName="w-full"
            placeholder="Select carrier"
            options={carrierTypes}
            value={carrierType}
            onChange={addNewEquipment}
          />
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
    </div>
  )
}

const EquipmentAccordion = ({
  equipment,
  index,
  onDelete,
  control
}: {
  equipment: any
  onDelete: (index: number) => void
  index: number
  control: Control<carrierEquipmentsInputs>
}) => {
  const [open, setOpen] = useState(false)
  const [fileUploadOpen, setFileUploadOpen] = useState(false)
  return (
    <>
      <div className="p-3 lg:rounded-[10px] rounded-[8px] bg-[#1a194990] border border-[#282774] shadow-[0px,4px,4px,0px,rgba(0,0,0,0.25)] backdrop-blur-[25px] z-999">
        <div className="flex items-center">
          <div className="text-sm">{equipment.carrierType}</div>
          {!open && (
            <div className="flex justify-evenly">
              <span>{equipment.license_plate}</span>
              <span>{equipment.vin_number}</span>
              <span>{equipment.truck_number}</span>
            </div>
          )}
          <div className="flex gap-2 items-center ml-auto">
            {!open && <ImAttachment />}
            <BiTrash className="cursor-pointer" onClick={() => onDelete(index)} />
            {open ? (
              <BiMinus className="cursor-pointer" onClick={() => setOpen(false)} />
            ) : (
              <BiPlus className="cursor-pointer" onClick={() => setOpen(true)} />
            )}
          </div>
        </div>
        {open && (
          <div className="grid grid-cols-4 gap-2 my-4">
            <Controller
              name={`equipments.${index}.licensePlateNumber`}
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input labelClassName="text-[15px]  mt-[8px]" placeholder="License Plate#" {...field} />
              )}
            />

            <Controller
              name={`equipments.${index}.VINNumber`}
              control={control}
              defaultValue=""
              render={({ field }) => <Input labelClassName="text-[15px]  mt-[8px]" placeholder="VIN#" {...field} />}
            />
            <Controller
              name={`equipments.${index}.truckNumber`}
              control={control}
              defaultValue=""
              render={({ field }) => <Input labelClassName="text-[15px]  mt-[8px]" placeholder="Truck#" {...field} />}
            />

            <div className="flex items-center justify-center w-full">
              <Button
                type="button"
                onClick={() => setFileUploadOpen(true)}
                className="flex gap-4 h-11  py-0 bg-transparent items-center w-full border border-gray-400 rounded-lg cursor-pointer"
              >
                <BiPlus className="text-2xl" />
                <p className="font-light text-[15px]">Upload</p>
              </Button>
            </div>
          </div>
        )}
      </div>
      <FileUploadModal open={fileUploadOpen} onClose={() => setFileUploadOpen(false)} />
    </>
  )
}

const fileUploadSchema = yup.object().shape({
  file: yup
    .mixed()

    .test('fileSize', 'The file is too large', (value) => {
      if (!value || !Array.isArray(value) || value.length === 0) {
        return false
      }

      const file = value[0]

      if (file.size > 1024 * 1024) {
        return false
      }

      return true
    })
    .test('fileType', 'Invalid file type', (value) => {
      if (!value || !Array.isArray(value) || value.length === 0) {
        return false
      }

      const file = value[0]

      if (!['image/gif', 'image/png'].includes(file.type)) {
        return false // Invalid file type
      }

      return true
    })
})

const FileUploadModal = ({ open = false, onClose }: { open: boolean; onClose: () => void }) => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(fileUploadSchema)
  })
  const onSubmit = (data: any) => {
    console.log(data)
    onClose()
  }
  return (
    <Modal
      open={open}
      onClose={onClose}
      className=" my-auto p-4 lg:max-w-[550px]  w-full lg:rounded-[10px] rounded-[8px] bg-[#1a194990] border border-[#1a1949] shadow-[0px,4px,4px,0px,rgba(0,0,0,0.25)] backdrop-blur-[25px] z-999"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className="font-semibold text-lg">Upload Profile Image</div>
            </div>
            <AiOutlineClose onClick={onClose} className=" cursor-pointer" />
          </div>
          <div className="my-4">
            <GradientHR />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="my-3 rounded-[8px] bg-[#1a194990] border border-[#403e8d] p-4 py-16">
            <div className="flex flex-col items-center justify-center gap-5">
              <BiUpload className="text-4xl" />
              <div className="text-center text-sm">
                Browse or drag and drop image here
                <br />
                JPG, PNG, SVG, GIF or WEBP, file size no more than 5 MB
              </div>
              <div className="flex items-center justify-center ">
                <label
                  htmlFor="upload"
                  className="flex gap-4 p-2 px-6 items-center w-full border rounded-lg cursor-pointer "
                >
                  <p className="font-light text-[15px]">Select Image</p>

                  <Controller
                    name="file"
                    control={control}
                    render={({ field }) => (
                      <>
                        <input
                          id="upload"
                          accept="image/*"
                          onChange={(e) => {
                            field.onChange(e.target.files)
                          }}
                          size={500000}
                          type="file"
                          className="hidden"
                        />
                      </>
                    )}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="my-4">
            <GradientHR />
          </div>

          <div className="flex justify-end">
            <div className="flex gap-2">
              <TransparentButton onClick={onClose} type="button">
                Cancel
              </TransparentButton>
              <Button type="submit">Upload</Button>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  )
}
