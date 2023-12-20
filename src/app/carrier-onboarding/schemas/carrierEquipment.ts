import * as yup from 'yup'

export const carrierEquipmentsSchema = yup.object().shape({
  equipments: yup.array().of(
    yup.object().shape({
      carrierType: yup.string().required(),
      licensePlateNumber: yup.string().required(),
      VINNumber: yup.string().required(),
      truckNumber: yup.string().required()
    })
  )
})

export type carrierEquipmentsInputs = yup.InferType<typeof carrierEquipmentsSchema>
