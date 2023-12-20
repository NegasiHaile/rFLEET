import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const requestUrl = new URL(request.url)
  const formData = await request.formData()
  const email = String(formData.get('email'))
  const supabase = createRouteHandlerClient({ cookies })
  console.log(email)
  const { error } = await supabase.auth.resend({
    email,
    type: 'signup',
    options: {
      emailRedirectTo: `${requestUrl.origin}/api/account/callback`
    }
  })

  if (error) {
    return NextResponse.redirect(
      `${requestUrl.origin}/verify-email?email=${email}&error=Could not resend verification link`,
      {
        // a 301 status is required to redirect from a POST to a GET route
        status: 301
      }
    )
  }

  return NextResponse.redirect(
    `${requestUrl.origin}/verify-email?email=${email}&message=Verification Link has been sent. Please check your email.`,
    {
      // a 301 status is required to redirect from a POST to a GET route
      status: 301
    }
  )
}
