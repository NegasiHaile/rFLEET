'use client'

import * as React from 'react'

import IconEmail from '@assets/icons/email.svg'
import IconInvisible from '@assets/icons/eye-invisible.svg'
import IconLock from '@assets/icons/lock-white.svg'
import { cn } from '@lib/utils'

type Icon = 'email' | 'invisible' | 'lock'

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  label?: string
  transparent?: boolean
  index?: number
  siblings?: number
  leftIcon?: Icon
  rightIcon?: Icon
  onChange?: (v: string) => void | Promise<void>
  onLeftIconClick?: () => void | Promise<void>
  onRightIconClick?: () => void | Promise<void>
}

const INPUT_GROUP = 'INPUT_GROUP'

const icons = {
  email: IconEmail,
  invisible: IconInvisible,
  lock: IconLock
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      index,
      transparent,
      siblings,
      leftIcon,
      rightIcon,
      onChange,
      onLeftIconClick,
      onRightIconClick,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn('w-full', className)}>
        {props.label!! && (
          <label htmlFor="email" className={`block lg:mb-[12px] mb-[8px] font-medium`}>
            {props.label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div
              onClick={onLeftIconClick}
              className={cn(
                'absolute left-0 top-0 bottom-0 w-[54px] flex justify-center items-center',
                onLeftIconClick ? 'cursor-pointer' : ''
              )}
            >
              {React.createElement(icons[leftIcon], { className: 'ml-[4px]' })}
            </div>
          )}
          <input
            ref={ref}
            onChange={(e) => (onChange ? onChange(e.target.value) : false)}
            className={cn(
              'block w-full lg:py-[20px] py-[15px] border border-solid sm:text-sm shadow-sm lg:rounded-lg rounded-md bg-transparent text-white border-gray-100 hover:border-gray-300 focus:ring-primary focus:border-primary placeholder:text-white',
              leftIcon ? 'pl-[54px]' : 'lg:pl-[16px] pl-[12px]',
              rightIcon ? 'pr-[54px]' : 'lg:pr-[16px] pr-[12px]'
            )}
            {...props}
          />
          {rightIcon && (
            <div
              onClick={onRightIconClick}
              className={cn(
                'absolute right-0 top-0 bottom-0 w-[54px] flex justify-center items-center',
                onRightIconClick ? 'cursor-pointer' : ''
              )}
            >
              {React.createElement(icons[rightIcon], { className: 'mr-[4px]' })}
            </div>
          )}
        </div>
      </div>
    )
  }
)

interface InputGroupProps {
  children: React.ReactNode
  rounded?: boolean
}

const InputGroupContext = React.createContext<string | null>(null)

export const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(({ children, rounded }, ref) => {
  const childrenComponents = React.Children.map(children, (child: React.ReactNode, index) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child as React.ReactElement<InputProps>, {
        index,
        siblings: React.Children.count(children)
      })
    }
  })

  return (
    <InputGroupContext.Provider value={INPUT_GROUP}>
      <div className="flex" ref={ref}>
        {childrenComponents}
      </div>
    </InputGroupContext.Provider>
  )
})
