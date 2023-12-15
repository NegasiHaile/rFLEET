'use client'

import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

import { ButtonSelect } from '@components/ui/ButtonSelect'
import { TabPane } from '@components/ui/TabPane'

import { useUserContext } from '../../../../../providers/UserProvider'
import { AirLoadType } from './Panes/AirLoadType'
import { FTLLoadType } from './Panes/FTLLoadType'
import { From } from './Panes/From'
import { GoodsCommodity } from './Panes/GoodsCommodity'
import { LTLLoadType } from './Panes/LTLLoadType'
import { LoadType } from './Panes/LoadType'
import { OceanLoadType } from './Panes/OceanLoadType'
import { To } from './Panes/To'
import { ShippingPane } from './ShippingPane'
import { ShippingSteps } from './ShippingSteps'
import { FtlLoadTypeInputs, initialDrayage, initialHazmatTL, initialOversizeTL, initialStandardTL } from './ftl-schemas'
import { parcelShapes, shippingMethods } from './options'
import {
  AirLoadTypeInputs,
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
  const { user } = useUserContext()

  console.log('some data', data)

  // unlock shipment methods tabs if user is signed in
  const protectedShippingMethods = shippingMethods.map((obj) => {
    return {
      ...obj,
      locked: user?.id ? false : obj.locked
    }
  })

  const fromFormMethods = useForm<FromInputs>({
    mode: 'onChange',
    resolver: yupResolver(fromSchema),
    defaultValues: {
      fromType: '',
      fromCountry: '',
      fromAddress: '',
      fromCity: '',
      fromPostalCode: '',
      fromState: '',
      fromName: ''
    }
  })

  const toFormMethods = useForm<ToInputs>({
    mode: 'onChange',
    resolver: yupResolver(toSchema),
    defaultValues: {
      toType: '',
      toCountry: '',
      toAddress: '',
      toCity: '',
      toPostalCode: '',
      toName: '',
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

  const onFromFormSubmit: SubmitHandler<FromInputs> = (data) => {
    setData((prev) => {
      console.log('From Previous data:', prev)
      return { ...prev, ...data }
    })

    console.log('From Data: ', data)
    setShippingStepId('tab-ship-destination')
  }

  const onToFormSubmit: SubmitHandler<ToInputs> = (data) => {
    setData((prev) => {
      console.log('To Previous data:', prev)
      return { ...prev, ...data }
    })

    console.log('To Data: ', data)
    setShippingStepId('tab-ship-load-type')
  }

  const onLoadTypeFormSubmit: SubmitHandler<LoadTypeInputs> = (data) => {
    setData((prev) => {
      console.log('Load Previous data:', prev)
      return { ...prev, ...data }
    })

    console.log('Load Type Data: ', data)
    setShippingStepId('tab-ship-goods-commodity')
  }

  const onLtlLoadTypeFormSubmit: SubmitHandler<LtlLoadTypeInputs> = (data) => {
    setData((prev) => {
      console.log('LTL Previous data:', prev)
      return { ...prev, ...data }
    })

    console.log('LTL Load Type Data: ', data)
    setShippingStepId('tab-ship-goods-commodity')
  }

  const onOceanLoadTypeFormSubmit: SubmitHandler<OceanLoadTypeInputs> = (data) => {
    setData((prev) => ({ ...prev, ...data }))
    setShippingStepId('tab-ship-goods-commodity')
  }

  const onAirLoadTypeFormSubmit: SubmitHandler<OceanLoadTypeInputs> = (data) => {
    setData((prev) => ({ ...prev, ...data }))
    setShippingStepId('tab-ship-goods-commodity')
  }

  const onFtlLoadTypeFormSubmit: SubmitHandler<FtlLoadTypeInputs> = (data) => {
    setData((prev) => ({ ...prev, ...data }))
    setShippingStepId('tab-ship-goods-commodity')
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
    Parcel: <LoadType methods={loadTypeFormMethods} onSubmit={onLoadTypeFormSubmit} />,
    'LTL & Partials': <LTLLoadType methods={ltlLoadTypeFormMethods} onSubmit={onLtlLoadTypeFormSubmit} />,
    'Ocean Shipping': <OceanLoadType methods={oceanLoadTypeFormMethods} onSubmit={onOceanLoadTypeFormSubmit} />,
    'Air Cargo': <AirLoadType methods={airLoadTypeFormMethods} onSubmit={onAirLoadTypeFormSubmit} />,
    FTL: <FTLLoadType methods={ftlLoadTypeFormMethods} onSubmit={onFtlLoadTypeFormSubmit} />
  }

  return (
    <div className="relative border bg-gradient-blur-dialog border-solid border-[#ffffff30] lg:p-[24px] rounded-[20px]">
      {/* {bg-gradient-blur-dialog backdrop-blur-[12px]} */}
      <ButtonSelect
        options={protectedShippingMethods}
        value={shippingMethod}
        onChange={setShippingMethod}
        containerClassName="lg:mb-[24px] mb-[18px]"
      />
      <TabPane className="relative" activeTab={shippingStepId} onTabChange={(id) => setShippingStepId(id)}>
        <ShippingSteps shippingStepId={shippingStepId} data={data} />
        <div>
          <ShippingPane id="tab-ship-origin">
            <From methods={fromFormMethods} onSubmit={onFromFormSubmit} />
          </ShippingPane>
          <ShippingPane id="tab-ship-destination">
            <To methods={toFormMethods} onSubmit={onToFormSubmit} />
          </ShippingPane>
          <ShippingPane id="tab-ship-load-type">{shippingMethodLoadTypes[shippingMethod.value]}</ShippingPane>
          <ShippingPane id="tab-ship-goods-commodity">
            <GoodsCommodity methods={goodsCommodityFormMethods} onSubmit={onGoodsCommodityFormSubmit} />
          </ShippingPane>
        </div>
      </TabPane>
    </div>
  )
}
