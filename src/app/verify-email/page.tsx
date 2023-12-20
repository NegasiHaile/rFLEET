'use client'

import { redirect, useRouter, useSearchParams } from 'next/navigation'

import ConfirmEmail from '@assets/icons/confirm-email.svg'
import planetEarth from '@assets/images/bg-planet-earth.jpeg'
import { Button } from '@components/ui/Button'
import FormMessages from '@components/ui/FormMessages'

type Props = {
  params?: {
    num?: string
  }
  searchParams: {
    email: string
  }
}
export const dynamic = 'force-dynamic'
export default function Index() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const email = searchParams.get('email')
  if (!email) return router.replace('/signup')
  return (
    <main className="relative flex" style={{ background: `url(${planetEarth.src}) no-repeat center / cover` }}>
      <div className="flex flex-1 bg-[#1a194990]">
        <div className="flex-1 flex justify-center items-center">
          <div className="text-center bg-gradient-blur-dialog backdrop-blur lg:px-[80px] px-[20px] lg:pt-[80px] pt-[60px] lg:pb-[80px] pb-[60px] flex flex-col lg:gap-[32px] gap-[24px] max-w-[720px] w-full">
            <div className="flex justify-center">
              <ConfirmEmail />
            </div>
            <h3 className="font-semibold">Verify your email</h3>
            <div>
              We have sent email to {email} to confirm the validity of your email address. After receiving the email
              follow the link provided to complete you registration.
            </div>
            <form action="/api/account/resend" method="post">
              <input type="hidden" name="email" defaultValue={email} />
              <Button full color="transparent">
                Resend email
              </Button>
              <FormMessages />
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
