'use client'

import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import Link from 'next/link'
import { redirect, useRouter } from 'next/navigation'

import * as yup from 'yup'

import { yupResolver } from '@hookform/resolvers/yup'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

import Google from '@assets/icons/google.svg'
import Linkedin from '@assets/icons/linkedin.svg'
import planetEarth from '@assets/images/bg-planet-earth.jpeg'
import { Button } from '@components/ui/Button'
import { Check } from '@components/ui/Check'
import FormMessages from '@components/ui/FormMessages'
import { Input } from '@components/ui/Input'
import { Title } from '@components/ui/Typography'

import { useUserContext } from '../../providers/UserProvider'

const signinSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required()
})

type signinInputs = yup.InferType<typeof signinSchema>

export default function Index() {
  const { user } = useUserContext()
  if (user) redirect('/')
  const router = useRouter()

  const {
    watch,
    setValue,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors },
    control
  } = useForm<signinInputs>({
    mode: 'onChange',
    resolver: yupResolver(signinSchema),
    defaultValues: {}
  })
  const supabase = createClientComponentClient()
  const loginWithGoogle = () => {
    supabase.auth.signInWithOAuth({ provider: 'google' })
  }

  const loginWithLinkedin = () => {
    supabase.auth.signInWithOAuth({ provider: 'linkedin_oidc' })
  }
  const onSubmitForm: SubmitHandler<signinInputs> = async (data) => {
    const response = await fetch('/api/account/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    if (response.ok) router.replace(`/`)
    else {
      const error = await response.json()
      router.replace(`/signin?error=${error}`)
    }
  }
  return (
    <main className="relative flex" style={{ background: `url(${planetEarth.src}) no-repeat center / cover` }}>
      <div className="flex flex-1 bg-[#1a194990]">
        <div className="flex-1 flex justify-center items-center">
          <form onSubmit={handleSubmit(onSubmitForm)}>
            <div className="bg-gradient-blur-dialog backdrop-blur lg:px-[80px] px-[20px] lg:pt-[80px] pt-[60px] lg:pb-[40px] pb-[30px] flex flex-col gap-d-36 max-w-[720px] w-full">
              <Link href="/">
                <Title className="text-5xl font-semibold">SHIPPING SIMPLIFIED</Title>
              </Link>
              <div>
                <h6 className="font-semibold">LOGIN</h6>
                <div className="text-input text-gray-400">Welcome back. Let&apos;s get you into your account.</div>
              </div>
              <div className="flex flex-col gap-d-24">
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

                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="password"
                      label="Password"
                      placeholder="Enter your email password"
                      leftIcon="lock"
                      rightIcon="invisible"
                      containerClassName="lg:mb-[12px] mb-[8px]"
                      error={errors.password?.message}
                      {...field}
                    />
                  )}
                />
                <div>
                  <div className="flex justify-between">
                    <Check label="Remember me" />
                    <Link href="/forgot-password">
                      <div className="text-input">Forgot Password?</div>
                    </Link>
                  </div>
                </div>
                <Button full>Login</Button>
                <FormMessages />
              </div>
              <div className="flex lg:gap-[8px] gap-[6px] items-center">
                <div className="grow h-[1px] bg-[linear-gradient(90deg,rgba(105,234,203,1)0%,rgba(234,204,248,1)100%)]" />
                <div className="text-body-sm">OR</div>
                <div className="grow h-[1px] bg-[linear-gradient(90deg,rgba(234,204,248,1)0%,rgba(102,84,241,1)100%)]" />
              </div>
              <div className="flex gap-d-16">
                <Button type="button" full color="transparent" onClick={loginWithGoogle}>
                  <div className="flex items-center gap-d-10">
                    <Google />
                    Google
                  </div>
                </Button>
                <Button type="button" full color="transparent" onClick={loginWithLinkedin}>
                  <div className="flex items-center gap-d-10">
                    <Linkedin />
                    Linkedin
                  </div>
                </Button>
              </div>
              <div className="flex justify-center gap-[8px]">
                <div className="text-gray-400">Don&apos;t have an account?</div>
                <Link href="/signup">Sign up</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
