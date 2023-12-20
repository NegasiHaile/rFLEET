'use client'

import { ColumnDef } from '@tanstack/react-table'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  type: string
  load: string
  status: string
  customer: string
  carrier: string
  shipping: string
  date: string
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'load',
    header: 'Load'
  },
  {
    accessorKey: 'type',
    header: 'Type'
  },
  {
    accessorKey: 'status',
    header: 'Status'
  },
  {
    accessorKey: 'customer',
    header: 'Customer'
  },
  {
    accessorKey: 'carrier',
    header: 'Carrier'
  },
  {
    accessorKey: 'shipping',
    header: 'Shipping from / Shipping to'
  },
  {
    accessorKey: 'date',
    header: 'Date/Time'
  }
]
