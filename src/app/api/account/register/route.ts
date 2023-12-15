import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { emailController } from '@controllers/email'
import { usersController } from '@controllers/users'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const requestUrl = new URL(request.url)
  const formData = await request.json()

  const { email, password, firstName, lastName, profileType } = formData
  const supabase = createRouteHandlerClient({ cookies })

  const { error, data } = await supabase.auth.signUp({
    email,
    password,

    options: {
      emailRedirectTo: `${requestUrl.origin}/api/account/callback`,
      data: {
        first_name: firstName,
        last_name: lastName,
        profile_type: profileType
      }
    }
  })

  if (error) {
    console.log(error)
    return NextResponse.json(`${error.message}`, {
      status: 400
    })
  }

  return NextResponse.json(`Success! Check your email`, {
    status: 201
  })
}
