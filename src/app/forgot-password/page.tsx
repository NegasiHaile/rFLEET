'use client'

import Link from 'next/link'

import planetEarth from '@assets/images/bg-planet-earth.jpeg'
import { Button } from '@components/ui/Button'
import { Input } from '@components/ui/Input'
import { Title } from '@components/ui/Typography'

export default function Index() {
  return (
    <main className="relative flex" style={{ background: `url(${planetEarth.src}) no-repeat center / cover` }}>
      <div className="flex flex-1 bg-[#1a194990]">
        <div className="flex-1 flex justify-center items-center">
          <div className="bg-gradient-blur-dialog backdrop-blur lg:px-[80px] px-[20px] lg:pt-[80px] pt-[60px] lg:pb-[40px] pb-[30px] flex flex-col gap-d-36 max-w-[720px] w-full">
            <div>
              <Link href="/">
                <Title className="text-5xl font-semibold lg:mb-[80px] mb-[60px]">SHIPPING SIMPLIFIED</Title>
              </Link>
              <h6 className="font-semibold">RESET YOUR PASSWORD</h6>
              <div className="text-body-small text-gray-400">
                Please enter the email address you&apos;d like your password reset information sent to.
              </div>
            </div>
            <div className="flex flex-col gap-d-24">
              <Input label="Email" placeholder="Enter your email address" leftIcon="email" />
              <Button full>Request reset link</Button>
            </div>
            <Link href="/signin">
              <div className="text-center">Back to Login</div>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
