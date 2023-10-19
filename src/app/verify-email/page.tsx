'use client'

import ConfirmEmail from '@assets/icons/confirm-email.svg'
import planetEarth from '@assets/images/bg-planet-earth.jpeg'
import { Button } from '@components/ui/Button'

export default function Index() {
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
              We have sent email to testmail@gmail.com to confirm the validity of your email address. After receiving
              the email follow the link provided to complete you registration.
            </div>
            <Button full color="transparent">
              Resend email
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
