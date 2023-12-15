import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

import Sidebar from './components/Sidebar'

export default async function Layout({ children }: { children: React.ReactNode }) {
  const supabase = createServerComponentClient({
    cookies
  })

  const {
    data: { session }
  } = await supabase.auth.getSession()

  if (!session) {
    // this is a protected route - only users who are signed in can view this route
    redirect('/')
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-[20%] w-[80%] ">{children}</div>
    </div>
  )
}
