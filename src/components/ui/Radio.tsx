import { useEffect, useState } from 'react'

import { cn } from '@lib/utils'

interface Props {
  label?: JSX.Element | string
  checked?: boolean
  value?: string
  placeholder?: string
  searchable?: boolean
  containerClassName?: string
  labelClassName?: string
  error?: boolean | string
  onCheck?: () => void | Promise<void>
}

export const Radio = (props: Props) => {
  const [id, setId] = useState('')

  useEffect(() => {
    setId(`radio-${Math.random().toString(36).substring(2, 20)}`)
  }, [])

  return (
    <div className={cn('inline-flex items-center', props.containerClassName)}>
      <label
        className="relative flex cursor-pointer items-center rounded-full mr-[8px]"
        htmlFor={id}
        data-ripple-dark="true"
      >
        <input
          id={id}
          type="radio"
          checked={props.checked}
          value={props.value}
          onChange={(e) => (props.onCheck && e.target.checked ? props.onCheck() : false)}
          className={cn(
            "before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border-2 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:opacity-0 before:transition-opacity hover:before:opacity-10",
            props.error
              ? 'text-red-600 border-red-600 before:text-red-600 before:bg-red-600 checked:border-red-600 checked:before:bg-red-600'
              : 'text-primary border-gray-200 before:text-primary before:bg-gray-500 checked:border-primary checked:before:bg-primary'
          )}
        />
        <div
          className={cn(
            'pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 opacity-0 transition-opacity peer-checked:opacity-100',
            props.error ? 'text-red-600' : 'text-primary'
          )}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-[10px] w-[10px]" viewBox="0 0 12 12" fill="currentColor">
            <circle data-name="ellipse" cx={6} cy={6} r={6} />
          </svg>
        </div>
      </label>
      {props.label && (
        <label className={cn('mt-px cursor-pointer select-none', props.labelClassName)} htmlFor={id}>
          {props.label}
        </label>
      )}
    </div>
  )
}
