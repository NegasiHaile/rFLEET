'use client'

import { useState } from 'react'

import { Button } from '@components/ui/Button'
import { ButtonSelect } from '@components/ui/ButtonSelect'
import { Check } from '@components/ui/Check'
import { Pane, Tab, TabPane } from '@components/ui/TabPane'
import { cn } from '@lib/utils'

import { From } from './Panes/From'

const types = [
  { label: 'Parcel', value: 'Parcel' },
  { label: 'LTL & Partials', value: 'LTL & Partials' },
  { label: 'Ocean Shipping', value: 'Ocean Shipping' },
  { label: 'Air Cargo', value: 'Air Cargo' },
  {
    label: 'FTL, Power Only, Drayage,\nor Oversize & Overweight',
    value: 'FTL, Power Only, Drayage, or Oversize & Overweight'
  }
]

export const Panel = () => {
  const [type, setType] = useState(types[0])
  const [category, setCategory] = useState('')

  return (
    <div className="relative bg-gradient-blur-dialog border border-solid border-[#ffffff30] p-[26px] lg:p-[36px] rounded-[20px]">
      <ButtonSelect options={types} value={type} onChange={setType} className="mb-[28px]" />
      <TabPane className="relative" autoDismiss onTabChanged={(id) => setCategory(id)}>
        <div className="lg:grid lg:grid-cols-4 lg:gap-[16px] flex flex-col gap-[30px] lg:mb-[34px] mb-[26px]">
          <div>
            <CategoryTab target="1" label="Origin" className="mb-6" category={category}>
              Where are you shipping from?
            </CategoryTab>
            <Check label="Add Extra Pickups" />
          </div>
          <div>
            <CategoryTab target="2" label="Destination" className="mb-6" category={category}>
              Where are you shipping to?
            </CategoryTab>
            <Check label="Add Extra Drops" />
          </div>
          <div>
            <CategoryTab target="3" label="Load Type" className="mb-6" category={category}>
              What are you shipping?
            </CategoryTab>
          </div>
          <div>
            <CategoryTab target="4" label="Goods/Commodity" className="mb-6" category={category}>
              Goods/Commodity
            </CategoryTab>
            <Check label="Add More Goods/Commodities" />
          </div>
        </div>
        <div>
          <CategoryPane id="1">
            <From />
          </CategoryPane>
          <Pane id="2" className="absolute">
            Pane 2
          </Pane>
          <Pane id="3" className="absolute">
            Pane 2
          </Pane>
          <Pane id="4" className="absolute">
            Pane 2
          </Pane>
        </div>
      </TabPane>
      <div className="flex justify-center">
        <Button glossy>SEARCH</Button>
      </div>
    </div>
  )
}

interface CategoryTabProps extends React.HTMLAttributes<HTMLDivElement> {
  target: string
  label: string
  category: string
  children: React.ReactNode
}

const CategoryTab = ({ target, label, className, children, category }: CategoryTabProps) => {
  return (
    <>
      <div className={cn('font-semibold mb-4', target === category ? 'text-white' : 'text-gray')}>{label}</div>
      <Tab
        target={target}
        className={cn(
          'block w-full lg:py-[20px] py-[15px] border-2 border-solid sm:text-sm shadow-sm lg:rounded-lg rounded-md bg-transparent   lg:pl-[16px] pl-[12px] lg:pr-[16px] pr-[12px]',
          className,
          target === category
            ? 'text-white border-white hover:text-white'
            : 'text-gray border-gray hover:text-primary hover:border-primary'
        )}
      >
        {children}
      </Tab>
    </>
  )
}

interface CategoryPane {
  id: string
  children: React.ReactNode
}

const CategoryPane = ({ id, children }: CategoryPane) => {
  return (
    <Pane
      id={id}
      className="absolute lg:mt-[-76px] flex flex-col lg:gap-[32px] gap-[24px] z-10 lg:p-[38px] p-[28px] lg:rounded-[8px] rounded-[6px] border border-[#FFFFFF30] bg-gradient-blur-dialog backdrop-blur-[12px] w-full"
    >
      {children}
    </Pane>
  )
}
