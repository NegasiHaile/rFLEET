'use client'

import Link from 'next/link'

export const Logo = () => {
  return (
    <Link href="/" aria-label="logo" className="flex items-center gap-1 space-x-2 hover:text-inherit">
      <div className="flex text-4xl font-bold text-white text-gradient bg-gradient-primary-to-br">rFleet.ai</div>
    </Link>
  )
}
