'use client'

import { BiLock } from 'react-icons/bi'

import { cn } from '@lib/utils'

interface Option {
  label: React.ReactNode
  labelInternal?: React.ReactNode
  value: string
  locked?: boolean
}

interface Props {
  label?: string | JSX.Element
  value?: Option
  options: Option[]
  full?: boolean
  containerClassName?: string
  onChange?: (newValue: any) => void
}

export const ButtonSelect = ({ options, value, onChange, full = false, containerClassName }: Props) => {
  var isBox = false
  if (options[0].value === 'Box or Tube') {
    isBox = true
  }

  return (
    <div
      className={cn(
        'flex lg:flex-row flex-col justify-between lg:gap-[16px] gap-[12px]',
        containerClassName,
        full ? 'w-full' : ''
      )}
    >
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => onChange?.(option)}
          disabled={option.locked || option.value === value?.value}
          className={cn(
            'relative flex grow items-center justify-center before:absolute before:inset-0 before:rounded-md before:transition before:duration-300 active:duration-75 lg:h-[48px] h-[36px] lg:px-[32px] px-[24px hover:enabled:before:opacity-30 active:before:scale-[0.97] hover:after:blur-md active:after:blur-none active:after:bg-transparent',
            option.value === value?.value ? 'before:bg-primary text-white' : 'border border-solid rounded-md',
            full ? 'lg:flex-1' : 'lg:max-w-[282px]'
          )}
        >
          <span
            className={cn(
              'flex items-center justify-center gap-2 relative z-[2] text-input whitespace-pre',
              option.value === value?.value ? 'text-white' : 'text-black'
            )}
          >
            {isBox ? (
              <div>
                {option.value === value?.value ? (
                  <div className="mb-5 text-white">
                    {option.locked && <BiLock className="h-5 w-5" />} {option.label}
                  </div>
                ) : (
                  <div className="mb-5 text-black">
                    {option.locked && <BiLock className="h-5 w-5" />} {option.labelInternal}
                  </div>
                )}
              </div>
            ) : (
              <>
                {option.locked && <BiLock className="h-5 w-5" />} {option.label}
              </>
            )}
          </span>
        </button>
      ))}
    </div>
  )
}
