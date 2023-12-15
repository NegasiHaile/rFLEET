'use client'

import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import Link from 'next/link'

import * as yup from 'yup'

import { yupResolver } from '@hookform/resolvers/yup'

import planetEarth from '@assets/images/bg-planet-earth.jpeg'
import { Button } from '@components/ui/Button'
import FormMessages from '@components/ui/FormMessages'
import { Input } from '@components/ui/Input'
import { Title } from '@components/ui/Typography'

const forgotPasswordSchema = yup.object({
  email: yup.string().required()
})

type forgotPasswordInputs = yup.InferType<typeof forgotPasswordSchema>
export default function Index() {
  const {
    handleSubmit,
    formState: { errors },
    control
  } = useForm<forgotPasswordInputs>({
    mode: 'onChange',
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues: { email: '' }
  })

  const onSubmitForm: SubmitHandler<forgotPasswordInputs> = async (data) => {
    const response = await fetch('/api/account/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  }
  return (
    <main className="relative flex" style={{ background: `url(${planetEarth.src}) no-repeat center / cover` }}>
      <div className="flex flex-1 bg-[#1a194990]">
        <div className="flex-1 flex justify-center items-center">
          <form onSubmit={handleSubmit(onSubmitForm)}>
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
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      label="Email"
                      type="email"
                      placeholder="Enter your email address"
                      leftIcon="email"
                      error={errors.email?.message}
                      {...field}
                      required
                    />
                  )}
                />
                <Button full>Request reset link</Button>
              </div>
              <FormMessages />

              <Link href="/signin">
                <div className="text-center">Back to Login</div>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
