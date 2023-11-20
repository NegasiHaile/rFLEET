import React from 'react'
import { UseFormReturn } from 'react-hook-form'

import gradientCard from '@assets/images/gradient-card-cyan-indigo-to-r.png'
import { Radio } from '@components/ui/Radio'

interface Props {
  methods: UseFormReturn<any>
}

const additionalServicesOptionsPickup = [
  { value: 'Liftgate-Ground Pickup', label: 'Liftgate-Ground Pickup' },
  { value: 'Inside Pickup', label: 'Inside Pickup' },
  {
    value: 'Limited Access Pickup',
    label: 'Limited Access Pickup'
  },
  { value: 'Residential Pickup', label: 'Residential Pickup' },
  { value: 'Appointment for Pickup', label: 'Appointment for Pickup' },
  {
    value: 'Airport Pickup',
    label: 'Airport Pickup'
  },
  { value: 'Secure Shipment Divider', label: 'Secure Shipment Divider' },
  { value: 'Threshold Pickup', label: 'Threshold Pickup' },
  {
    value: 'Trade Show Pickup',
    label: 'Trade Show Pickup'
  }
]

const additionalServicesOptionsDelivery = [
  { value: 'Liftgate-Ground Delivery', label: 'Liftgate-Ground Delivery' },
  { value: 'Inside Delivery', label: 'Inside Delivery' },
  { value: 'Limited Access Delivery', label: 'Limited Access Delivery' },
  { value: 'Residential Delivery', label: 'Residential Delivery' },
  { value: 'Appointment for Pickup', label: 'Appointment for Pickup' },
  { value: 'Airport Pickup', label: 'Airport Pickup' },
  { value: 'Secure Shipment Divider', label: 'Secure Shipment Divider' },
  { value: 'Threshold Pickup', label: 'Threshold Pickup' },
  { value: 'Trade Show Pickup', label: 'Trade Show Pickup' }
]

const additionalServicesOptionsOthers = [
  { value: 'Do not Stack', label: 'Do not Stack' },
  { value: 'Stackable', label: 'Stackable' },
  { value: 'Flatbed Delivery', label: 'Flatbed Delivery' },
  { value: 'Arrival Notification', label: 'Arrival Notification' },
  { value: 'Customs Clearance', label: 'Customs Clearance' },
  { value: 'Freeze Protection', label: 'Freeze Protection' },
  { value: 'Pickup/Delivery at Port', label: 'Pickup/Delivery at Port' }
]
function AdditionalServices({ methods }: Props) {
  const {
    watch,
    setValue,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors },
    control
  } = methods
  return (
    <div className="flex flex-col gap-4">
      <div className="text-body-lg font-semibold">Additional Service Options</div>
      <GradientCard>
        <div className="grid grid-cols-3 w-full">
          <div className="items-start flex flex-col gap-4">
            <div className="uppercase">Pickup</div>

            <div className="flex flex-col gap-3">
              {additionalServicesOptionsPickup.map((obj) => {
                return (
                  <Radio
                    key={obj.value}
                    value={obj.value}
                    checked={watch('pickup') === obj.value}
                    onCheck={() => setValue('pickup', obj.value, { shouldValidate: true })}
                    label={obj.label}
                    error={errors.obj?.message as string}
                    labelClassName="font-light "
                    containerClassName="w-full "
                  />
                )
              })}
            </div>
          </div>

          <div className="flex flex-col items-start gap-4">
            <div className="uppercase">Delivery</div>

            <div className="flex flex-col gap-3">
              {additionalServicesOptionsDelivery.map((obj) => {
                return (
                  <Radio
                    key={obj.value}
                    value={obj.value}
                    checked={watch('delivery') === obj.value}
                    onCheck={() => setValue('delivery', obj.value, { shouldValidate: true })}
                    label={obj.label}
                    error={errors.obj?.message as string}
                    labelClassName="font-light "
                    containerClassName="w-full "
                  />
                )
              })}
            </div>
          </div>

          <div className="flex flex-col items-start gap-4">
            <div className="uppercase">Other</div>

            <div className="flex flex-col gap-3">
              {additionalServicesOptionsOthers.map((obj) => {
                return (
                  <Radio
                    key={obj.value}
                    value={obj.value}
                    checked={watch('others') === obj.value}
                    onCheck={() => setValue('others', obj.value, { shouldValidate: true })}
                    label={obj.label}
                    error={errors.obj?.message as string}
                    labelClassName="font-light "
                    containerClassName="w-full "
                  />
                )
              })}
            </div>
          </div>
        </div>
      </GradientCard>
    </div>
  )
}

export default AdditionalServices

export const GradientCard = ({ children }: { children: React.ReactNode }) => (
  <div
    className="text-center lg:px-[32px] px-[24px] lg:py-[30px] py-[22px] lg:mb-[12px] mb-[8px] rounded-md"
    style={{ background: `url(${gradientCard.src})`, backgroundSize: '100% 100%' }}
  >
    {children}
  </div>
)
