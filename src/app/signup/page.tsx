'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

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
    label: 'Commercial Truck Drivers',
    value: 'Commercial Truck Drivers'
  }
]

const onboardingPages: any = {
  'Truck Company / Owner-Operator': '/carrier-onboarding',
  'Vendors and Services': '/shipper-onboarding'
}

export default function Index() {
  const [profileType, setProfileType] = useState<Option>()
  const searchParams = useSearchParams()

  const defaultProfileType = searchParams.get('type')

  useEffect(() => {
    if (defaultProfileType) setProfileType({ value: defaultProfileType, label: defaultProfileType })
  }, [defaultProfileType])

  return (
    <main className="relative flex" style={{ background: `url(${planetEarth.src}) no-repeat center / cover` }}>
      <div className="flex flex-1 bg-[#1a194990]">
        <div className="flex-1 flex justify-center items-center">
          <div className="bg-gradient-blur-dialog backdrop-blur lg:px-[80px] px-[20px] lg:pt-[80px] pt-[60px] lg:pb-[40px] pb-[30px] flex flex-col gap-d-24 max-w-[720px] w-full">
            <Link href="/">
              <Title className="text-5xl font-semibold">SHIPPING SIMPLIFIED</Title>
            </Link>
            <div>
              <h6 className="font-semibold">CREATE ACCOUNT</h6>
              <div className="text-input text-gray-400">Let&apos;s get you into your account.</div>
            </div>
            <div className="flex flex-col gap-d-24">
              <div className="lg:grid grid-cols-2 lg:gap-[16px] gap-[18px]">
                <Input label="First Name" placeholder="Enter your first name" />
                <Input label="Last Name" placeholder="Enter your last name" />
              </div>
              <Select
                disabled={defaultProfileType != null}
                label="Type of Profile"
                placeholder="Select a type of your profile"
                options={profileTypes}
                value={profileType}
                onChange={(newValue) => setProfileType(newValue)}
              />
              <Input label="Email" placeholder="Enter your email address" leftIcon="email" />
              <div>
                <Input
                  type="password"
                  label="Password"
                  placeholder="Enter your email password"
                  leftIcon="lock"
                  containerClassName="lg:mb-[12px] mb-[8px]"
                />
                <div className="text-caption text-gray-100">
                  Must be 8+ Characters and cannot be a commonly used password
                </div>
              </div>
              <div className="flex justify-between">
                <Check label="I agree to all the Term and Condition and Privacy Policy" />
              </div>
              <Link href={profileType?.value ? onboardingPages[profileType?.value] : '/verify-email'}>
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
