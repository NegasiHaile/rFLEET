'use client'

import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'

import { ButtonSelect } from '@components/ui/ButtonSelectInternal'
import { TabPane } from '@components/ui/TabPane'

import { AirLoadType } from './Panes/AirLoadType'
import { All } from './Panes/All'
import { FTLLoadType } from './Panes/FTLLoadType'
import { From } from './Panes/From'
import { GoodsCommodity } from './Panes/GoodsCommodity'
import { LTLLoadType } from './Panes/LTLLoadType'
import { LoadType } from './Panes/LoadType'
import { OceanLoadType } from './Panes/OceanLoadType'
import { PaymentTerms } from './Panes/PaymentTerms'
import { To } from './Panes/To'
import { ShippingPane } from './ShippingPane'
import { ShippingSteps } from './ShippingSteps'
import { FtlLoadTypeInputs, initialDrayage, initialHazmatTL, initialOversizeTL, initialStandardTL } from './ftl-schemas'
import { parcelShapes, shippingMethods } from './options'
import {
  AirLoadTypeInputs,
  AllInputs,
  AllSchema,
  FromInputs,
  GoodsCommodityInputs,
  LoadTypeInputs,
  LtlLoadTypeInputs,
  OceanLoadTypeInputs,
  ToInputs,
  airLoadTypeSchema,
  fromSchema,
  goodsCommoditySchema,
  initialField,
  initialLTLField,
  initialOceanFclField,
  initialOceanField,
  loadTypeSchema,
  ltlLoadTypeSchema,
  oceanLoadTypeSchema,
  toSchema
} from './types-schemas-constants'

type shippingMethodType = { label: string; value: string }

export const Panel = () => {
  const [shippingMethod, setShippingMethod] = useState<shippingMethodType>(shippingMethods[0])
  const [shippingStepId, setShippingStepId] = useState('')
  const [data, setData] = useState({})

  useEffect(() => {
    console.log('Updated Data:', data)
  }, [data])

  const AllMethods = useForm<AllInputs>({
    mode: 'onChange',
    resolver: yupResolver(AllSchema),
    defaultValues: {
      fromCountry: '',
      fromAddress: '',
      fromCity: '',
      fromPostalCode: '',
      fromState: '',
      fromName: '',
      fromPhone: '',
      toCountry: '',
      toAddress: '',
      toCity: '',
      toPostalCode: '',
      toName: '',
      toPhone: '',
      toState: ''
    }
  })

  const loadTypeFormMethods = useForm<LoadTypeInputs>({
    mode: 'onChange',
    resolver: yupResolver(loadTypeSchema),
    defaultValues: {
      parcelType: 'Enter Custom Dimensions',
      parcelShape: parcelShapes[0].value,
      fields: [initialField]
    }
  })

  //LTL Load Type
  const ltlLoadTypeFormMethods = useForm<LtlLoadTypeInputs>({
    mode: 'onChange',
    resolver: yupResolver(ltlLoadTypeSchema),
    defaultValues: {
      ltlType: 'LTL',
      fields: [{ ...initialLTLField }]
    }
  })

  //Ocean Load Type
  const oceanLoadTypeFormMethods = useForm<OceanLoadTypeInputs>({
    mode: 'onChange',
    resolver: yupResolver(oceanLoadTypeSchema),
    defaultValues: {
      containerLoadType: 'LCL',
      fields: [{ ...initialOceanField }],
      fclFields: [{ ...initialOceanFclField }]
    }
  })

  //Air Load Type
  const airLoadTypeFormMethods = useForm<AirLoadTypeInputs>({
    mode: 'onChange',
    resolver: yupResolver(airLoadTypeSchema),
    defaultValues: {
      containerLoadType: 'Air Cargo',
      fields: [{ ...initialOceanField }]
    }
  })

  //FTL Load Type
  const ftlLoadTypeFormMethods = useForm<FtlLoadTypeInputs>({
    mode: 'onChange',
    resolver: yupResolver(airLoadTypeSchema),
    defaultValues: {
      containerLoadType: 'Standard TL',
      standardTL: [{ ...initialStandardTL }],
      hazmatTL: [{ ...initialHazmatTL }],
      drayage: [{ ...initialDrayage }],
      oversizeTL: [{ ...initialOversizeTL }]
    }
  })

  const goodsCommodityFormMethods = useForm<GoodsCommodityInputs>({
    mode: 'onChange',
    resolver: yupResolver(goodsCommoditySchema),
    defaultValues: {
      quantity: '',
      sku: '',
      packageUnit: '',
      value: '',
      currency: '',
      weight: '',
      madeWhere: '',
      scheduleB: ''
    }
  })

  const onAllSubmit: SubmitHandler<AllInputs> = (data) => {
    setData((prev) => {
      console.log('From Previous data:', prev)
      return { ...prev, ...data }
    })

    console.log('From Data: ', data)
  }

  const onLoadTypeFormSubmit: SubmitHandler<LoadTypeInputs> = (data) => {
    setData((prev) => {
      console.log('Load Previous data:', prev)
      return { ...prev, ...data }
    })

    console.log('Load Type Data: ', data)
  }

  const onLtlLoadTypeFormSubmit: SubmitHandler<LtlLoadTypeInputs> = (data) => {
    setData((prev) => {
      console.log('LTL Previous data:', prev)
      return { ...prev, ...data }
    })

    console.log('LTL Load Type Data: ', data)
  }

  const onOceanLoadTypeFormSubmit: SubmitHandler<OceanLoadTypeInputs> = (data) => {
    setData((prev) => ({ ...prev, ...data }))
  }

  const onAirLoadTypeFormSubmit: SubmitHandler<OceanLoadTypeInputs> = (data) => {
    setData((prev) => ({ ...prev, ...data }))
  }

  const onFtlLoadTypeFormSubmit: SubmitHandler<FtlLoadTypeInputs> = (data) => {
    setData((prev) => ({ ...prev, ...data }))
  }

  const onGoodsCommodityFormSubmit: SubmitHandler<GoodsCommodityInputs> = (data) => {
    setData((prev) => {
      console.log('Goods Previous data:', prev)
      return { ...prev, ...data }
    })
    console.log('Goods Commodity Data: ', data)
    setShippingStepId('')
  }

  const shippingMethodLoadTypes: any = {
    Parcel: <LoadType methods={loadTypeFormMethods} onSubmit={onLoadTypeFormSubmit} data={data} />,
    'LTL & Partials': <LTLLoadType methods={ltlLoadTypeFormMethods} onSubmit={onLtlLoadTypeFormSubmit} />,
    'Ocean Shipping': <OceanLoadType methods={oceanLoadTypeFormMethods} onSubmit={onOceanLoadTypeFormSubmit} />,
    'Air Cargo': <AirLoadType methods={airLoadTypeFormMethods} onSubmit={onAirLoadTypeFormSubmit} />,
    FTL: <FTLLoadType methods={ftlLoadTypeFormMethods} onSubmit={onFtlLoadTypeFormSubmit} />
  }

  return (
    <div className="relative border bg-white rounded-lg border-solid border-[#ffffff30] lg:p-[24px]">
      <ButtonSelect
        options={shippingMethods}
        value={shippingMethod}
        onChange={setShippingMethod}
        containerClassName="lg:mb-[24px] mb-[18px]"
      />

      <TabPane className="relative" activeTab={shippingStepId} onTabChange={(id) => setShippingStepId(id)}>
        <div>
          <ShippingPane id="">
            <All methods={AllMethods} onSubmit={onAllSubmit} />

            <PaymentTerms />

            {shippingMethodLoadTypes[shippingMethod.value]}

            <GoodsCommodity methods={goodsCommodityFormMethods} onSubmit={onGoodsCommodityFormSubmit} />
          </ShippingPane>
        </div>
        <div className="absolute right-0 top-20">
          <ShippingSteps shippingStepId={shippingStepId} data={data} />
        </div>

        <ShippingSteps shippingStepId={shippingStepId} data={data} />
      </TabPane>
    </div>
  )
}
