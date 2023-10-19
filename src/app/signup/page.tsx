'use client'

import { useState } from 'react'

import Link from 'next/link'

import planetEarth from '@assets/images/bg-planet-earth.jpeg'
import { Button } from '@components/ui/Button'
import { Check } from '@components/ui/Check'
import { Input } from '@components/ui/Input'
import { Option, Select } from '@components/ui/Select'
import { Title } from '@components/ui/Typography'

const profileTypes = [
  {
    label: 'Shipping Company and/or Employee',
    value: 'Shipping Company and/or Employee'
  },
  {
    label: 'Truck Company / Owner-Operator',
    value: 'Truck Company / Owner-Operator'
  },
  {
    label: 'Vendors and Services',
    value: 'Vendors and Services'
  },
  {
    label: 'Passenger Vehicle Drivers (local)',
    value: 'Passenger Vehicle Drivers (local)'
  },
  {
    label: 'Agents, Brokers, and Freight Forwarders',
    value: 'Agents, Brokers, and Freight Forwarders'
  }
]

export default function Index() {
  const [profileType, setProfileType] = useState<Option>()

  return (
    <main className="relative flex" style={{ background: `url(${planetEarth.src}) no-repeat center / cover` }}>
      <div className="flex flex-1 bg-[#1a194990]">
        <div className="flex-1 flex justify-center items-center">
          <div className="bg-gradient-blur-dialog backdrop-blur lg:px-[80px] px-[20px] lg:pt-[80px] pt-[60px] lg:pb-[40px] pb-[30px] flex flex-col lg:gap-[36px] gap-[27px] max-w-[720px] w-full">
            <div>
              <Link href="/">
                <Title className="text-5xl font-semibold lg:mb-[36px] mb-[27px]">SHIPPING SIMPLIFIED</Title>
              </Link>
              <h6 className="font-semibold">CREATE ACCOUNT</h6>
              <div className="text-body-small text-gray-400">Let&apos;s get you into your account.</div>
            </div>
            <div className="flex flex-col lg:gap-[24px] gap-[18px]">
              <div className="lg:grid grid-cols-2 lg:gap-[16px] gap-[18px]">
                <Input label="First Name" placeholder="Enter your first name" />
                <Input label="Last Name" placeholder="Enter your last name" />
              </div>
              <Select
                label="Type of Profile"
                placeholder="Select a type of your profile"
                options={profileTypes}
                value={profileType}
                onChange={(newValue) => setProfileType(newValue)}
              />
              <Input label="Email" placeholder="Enter your email address" leftIcon="email" />
              <div>
                <Input
                  label="Password"
                  placeholder="Enter your email password"
                  leftIcon="lock"
                  className="lg:mb-[12px] mb-[8px]"
                />
                <div className="text-caption-xs text-gray-100">
                  Must be 8+ Characters and cannot be a commonly used password
                </div>
              </div>
              <div className="flex justify-between">
                <Check label="I agree to all the Term and Condition and Privacy Policy" />
              </div>
              <Link href="/verify-email">
                <Button full>Get Started</Button>
              </Link>
            </div>
            <div className="flex justify-center gap-[8px]">
              <div className="text-gray-400">Already have a account?</div>
              <Link href="/signin">Log in</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
