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
      className=" flex flex-col gap-d-16 z-10 rounded-d-8 border-1 border-black text-black  bg-white backdrop-blur-[12px] w-full"
    >
      <hr></hr>
      {children}
    </Pane>
  )
}
