import type { Metadata } from 'next'

import '@styles/globals.css'

export const metadata: Metadata = {
  title: 'rFleet.ai',
  description: ''
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
