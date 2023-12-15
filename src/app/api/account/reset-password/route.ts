import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const requestUrl = new URL(request.url)
  const formData = await request.formData()
  const password = String(formData.get('password'))
  const supabase = createRouteHandlerClient({ cookies })

  const { error } = await supabase.auth.updateUser({ password })

  if (error) {
    return NextResponse.redirect(`${requestUrl.origin}/reset-password?error=Could not update password`, {
      // a 301 status is required to redirect from a POST to a GET route
      status: 301
    })
  }

  return NextResponse.redirect(`${requestUrl.origin}/signin?message=Password update successfully`, {
    // a 301 status is required to redirect from a POST to a GET route
    status: 301
  })
}
