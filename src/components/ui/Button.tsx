'use client'

import React from 'react'

import { cn } from '@lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
  full?: boolean
  color?: 'primary' | 'light' | 'red' | 'transparent'
  size?: 'sm' | 'md'
  glossy?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, disabled, glossy = false, color = 'primary', size = 'md', full = false, ...props }, ref) => {
    const colorConfig = {
      primary: {
        bgColor: 'before:bg-primary',
        textColor: 'text-white'
      },
      light: {
        bgColor: 'before:bg-primary/10',
        textColor: 'text-primary'
      },
      red: {
        bgColor: 'before:bg-red-400',
        textColor: 'text-white'
      },
      green: {
        bgColor: 'before:bg-green-400',
        textColor: 'text-white'
      },
      blue: {
        bgColor: 'before:bg-blue-400',
        textColor: 'text-white'
      },
      yellow: {
        bgColor: 'before:bg-yellow-400',
        textColor: 'text-white'
      },
      transparent: {
        bgColor: 'before:bg-transparent before:border-2 before:border-solid before:border-white',
        textColor: 'text-white'
      }
    }

    const sizeConfig = {
      sm: { padding: 'px-[24px] py-[14px] lg:px-[32px] lg:py-[18px]', font: 'text-[15px]' },
      md: { padding: 'px-[36px] h-[46px] lg:px-[50px] lg:h-[62px]', font: 'text-lg' }
    }

    const { bgColor, textColor } = colorConfig[color]
    const { padding, font } = sizeConfig[size]

    const width = full ? 'w-full' : ''
    const hoverActive = disabled
      ? ''
      : 'hover:before:scale-[1.03] active:before:scale-[0.97] hover:after:blur-md active:after:blur-none active:after:bg-transparent'

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          'relative flex items-center justify-center before:absolute before:inset-0 before:rounded-md before:transition before:duration-300 active:duration-75 font-semibold',
          className,
          width,
          bgColor,
          padding,
          hoverActive,
          glossy
            ? 'before:z-[1] before:border-2 before:border-solid before:border-primary-green after:z-0 after:bg-primary-green after:blur-sm after:absolute after:inset-0 after:rounded-md after:transition after:duration-300'
            : '',
          disabled ? 'opacity-50' : ''
        )}
        {...props}
      >
        <span className={cn('relative z-[2]', textColor, font)}>{children}</span>
      </button>
    )
  }
)

export const TransparentButton = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  (props, ref) => (
    <button
      ref={ref}
      className="hover-bg-green-glow w-full lg:px-[30px] px-[26px] lg:py-[15px] py-[12px] border border-solid border-gray-200 lg:text-[20px] text-[15px] font-semi rounded-md hover:bg-[#ffffff20] transition duration-300 font-semibold"
      {...props}
    >
      {props.children}
    </button>
  )
)
