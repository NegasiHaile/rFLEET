'use client'

import { useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import Link from 'next/link'
import { redirect, useRouter, useSearchParams } from 'next/navigation'

import * as yup from 'yup'

import { yupResolver } from '@hookform/resolvers/yup'

import planetEarth from '@assets/images/bg-planet-earth.jpeg'
import { Button } from '@components/ui/Button'
import { Check } from '@components/ui/Check'
import FormMessages from '@components/ui/FormMessages'
import { Input } from '@components/ui/Input'
import { Option, Select, findOption } from '@components/ui/Select'
import { Title } from '@components/ui/Typography'

import { useUserContext } from '../../providers/UserProvider'

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

const signupSchema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  profileType: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required()
})

type signupInputs = yup.InferType<typeof signupSchema>

export default function Index() {
  const { user } = useUserContext()
  if (user) redirect('/')
  const searchParams = useSearchParams()
  const router = useRouter()

  const defaultProfileType = searchParams.get('type')
  const {
    watch,
    setValue,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors },
    control
  } = useForm<signupInputs>({
    mode: 'onChange',
    resolver: yupResolver(signupSchema),
    defaultValues: {
      profileType: defaultProfileType || undefined
    }
  })

  const onSubmitForm: SubmitHandler<signupInputs> = async (data) => {
    const response = await fetch('/api/account/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    if (response.ok) router.replace(`/verify-email?email=${data.email}`)
    else {
      const error = await response.json()
      router.replace(`/signup?type=${defaultProfileType}&error=${error}`)
    }
  }

  return (
    <main className="relative flex" style={{ background: `url(${planetEarth.src}) no-repeat center / cover` }}>
      <div className="flex flex-1 bg-[#1a194990]">
        <div className="flex-1 flex justify-center items-center">
          <form onSubmit={handleSubmit(onSubmitForm)}>
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
                  <Controller
                    name="firstName"
                    control={control}
                    render={({ field }) => (
                      <Input
                        label="First Name"
                        placeholder="Enter your first name"
                        error={errors.firstName?.message}
                        {...field}
                      />
                    )}
                  />
                  <Controller
                    name="lastName"
                    control={control}
                    render={({ field }) => (
                      <Input
                        label="Last Name"
                        placeholder="Enter your last name"
                        error={errors.lastName?.message}
                        {...field}
                      />
                    )}
                  />
                </div>
                <Controller
                  name="profileType"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Select
                      disabled={defaultProfileType != null}
                      label="Type of Profile"
                      placeholder="Select a type of your profile"
                      options={profileTypes}
                      error={errors.profileType?.message}
                      {...field}
                      value={findOption(profileTypes, watch('profileType'))}
                      onChange={({ value }) => setValue('profileType', value, { shouldValidate: true })}
                    />
                  )}
                />
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      label="Email"
                      placeholder="Enter your email address"
                      leftIcon="email"
                      error={errors.email?.message}
                      {...field}
                    />
                  )}
                />
                <div>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="password"
                        label="Password"
                        placeholder="Enter your email password"
                        leftIcon="lock"
                        containerClassName="lg:mb-[12px] mb-[8px]"
                        error={errors.password?.message}
                        {...field}
                      />
                    )}
                  />

                  <div className="text-caption text-gray-100">
                    Must be 8+ Characters and cannot be a commonly used password
                  </div>
                </div>
                <div className="flex justify-between">
                  <Check label="I agree to all the Term and Condition and Privacy Policy" />
                </div>
                <Button type="submit" full>
                  Get Started
                </Button>
              </div>
              <div className="flex justify-center gap-[8px]">
                <div className="text-gray-400">Already have a account?</div>
                <Link href="/signin">Log in</Link>
              </div>

              <FormMessages />
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
