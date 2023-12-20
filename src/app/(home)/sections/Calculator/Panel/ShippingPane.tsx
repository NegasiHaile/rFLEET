'use client'

import { Pane } from '@components/ui/TabPane'

interface ShippingPane {
  id: string
  children: React.ReactNode
}

export const ShippingPane = ({ id, children }: ShippingPane) => {
  return (
    <Pane
      id={id}
      className="absolute lg:mt-[-56px] mt-[10px] flex flex-col gap-d-16 z-10 lg:p-[24px] p-[18px] rounded-d-8 border border-[#FFFFFF30] bg-gradient-blur-dialog backdrop-blur-[12px] w-full"
    >
      {children}
    </Pane>
  )
}
