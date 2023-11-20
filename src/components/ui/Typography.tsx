'use client'

import { cn } from '@lib/utils'

export const Title = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <h4 className={cn('font-bold lg:mb-[16px] mb-[12px] text-gradient bg-gradient-primary-to-r', className)} {...props}>
    {children}
  </h4>
)
