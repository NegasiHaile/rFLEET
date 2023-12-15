import type { Metadata } from 'next'

import '@styles/globals.css'

import { UserProvider } from '../providers/UserProvider'

export const metadata: Metadata = {
  title: 'rFleet.ai',
  description: ''
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <UserProvider> {children}</UserProvider>
      </body>
    </html>
  )
}
