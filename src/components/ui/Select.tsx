'use client'

import * as React from 'react'
import { onlyText } from 'react-children-utilities'

import { string } from 'joi'

import ArrowDown from '@assets/icons/arrow-down.svg'
import { useOnClickOutside } from '@hooks/utils/useClickOutside'
import { cn } from '@lib/utils'

export interface Option {
  label: string | JSX.Element
  value: string
  icon?: any
  groupLabel?: boolean
  description?: string
}

interface Props {
  label?: string | JSX.Element
  value?: Option | string
  options: Option[]
  placeholder?: string
  error?: string | boolean
  searchable?: boolean
  full?: boolean
  containerClassName?: string
  labelClassName?: string
  disabled?: boolean
  onChange?: (newValue: Option) => void | Promise<void>
}

export const Select = React.forwardRef(
  (
    {
      containerClassName,
      labelClassName,
      full = false,
      options,
      value,
      onChange,
      placeholder,
      error = false,
      searchable = false,
      disabled = false,
      ...props
    }: Props,
    _
  ) => {
    const [selectOpen, setSelectOpen] = React.useState(false)
    const [keyword, setKeyword] = React.useState('')

    const _placeholder = 'Select...'
    const currentLabel = (typeof value == 'string' ? value : value?.label) || placeholder || _placeholder

    const selectNode = React.useRef<any>(null)
    const inputRef = React.useRef<any>(null)

    const filteredOptions = React.useMemo(
      () =>
        options.filter((option) =>
          (typeof option.label === 'string' ? option.label : onlyText(option.label))
            .toLowerCase()
            .includes(keyword.toLowerCase())
        ),
      [options, keyword]
    )

    useOnClickOutside(selectNode, () => {
      setSelectOpen(false)
    })

    const handleOptionClick = (option: Option) => {
      if (onChange) {
        onChange(option)
      }
      setSelectOpen(false)
    }

    React.useEffect(() => {
      if (selectOpen) {
        inputRef.current.focus()
      } else {
        setKeyword('')
        if (inputRef.current) {
          inputRef.current.blur()
        }
      }
    }, [selectOpen])

    return (
      <div className={cn(`relative text-input`, containerClassName, full ? 'w-full' : '')} ref={selectNode}>
        {props.label && (
          <label className={cn(`block lg:mb-[8px] mb-[6px] font-medium`, labelClassName)}>{props.label}</label>
        )}
        <div
          onClick={() => {
            disabled ? null : setSelectOpen(!selectOpen)
          }}
          className={cn(
            'flex justify-between items-center w-full border border-solid shadow-sm lg:rounded-lg rounded-md placeholder:text-white cursor-default',
            error ? 'border-red-600' : selectOpen ? 'border-primary' : 'border-gray-100 hover:border-gray-300'
          )}
        >
          {typeof value != 'string' && value?.icon && (
            <div className="flex justify-center items-center lg:pl-[12px] pl-[9px]">{value.icon}</div>
          )}
          <input
            type="text"
            autoComplete="off"
            placeholder={typeof currentLabel === 'string' ? currentLabel : onlyText(currentLabel)}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            readOnly={!searchable}
            ref={inputRef}
            className={cn(
              'flex flex-1 w-inherit placeholder:text-white bg-transparent cursor-default lg:px-[12px] px-[9px] lg:py-[10px] py-[8px]'
            )}
          />
          <ArrowDown className="shrink-0 lg:w-[24px] lg:h-[24px] w-[20px] h-[20px] lg:mr-[12px] mr-[9px]" />
        </div>
        {selectOpen && (
          <div className="absolute w-full z-[999] max-h-[354px] overflow-y-auto slick-scroll bg-gradient-blur-dialog backdrop-blur-md backdrop-opacity-100 flex flex-col lg:gap-[4px] gap-[3px] lg:mt-[8px] mt-[6px] lg:p-[8px] p-[6px] border border-solid sm:text-sm lg:rounded-lg rounded-md">
            {filteredOptions.length > 0 &&
              filteredOptions.map((option, index) =>
                option.groupLabel ? (
                  <div key={index}>
                    {option?.icon && (
                      <div className="flex justify-center items-center lg:pl-[12px] pl-[9px]">{option.icon}</div>
                    )}
                    <div className="font-bold lg:px-[10px] px-[6px] lg:py-[10px] py-[8px]">{option.label}</div>
                  </div>
                ) : (
                  <div
                    key={index}
                    className={cn(
                      'flex items-center rounded hover:bg-primary',
                      typeof value != 'string'
                        ? value?.value === option.value
                          ? 'bg-primary'
                          : 'cursor-pointer '
                        : value === option.value
                        ? 'bg-primary'
                        : 'cursor-pointer '
                    )}
                    onClick={() => handleOptionClick(option)}
                  >
                    {option?.icon && (
                      <div className="flex justify-center items-center lg:pl-[12px] pl-[9px]">{option.icon}</div>
                    )}
                    <div className="lg:px-[12px] px-[9px] lg:py-[10px] py-[8px]">{option.label}</div>
                  </div>
                )
              )}
            {filteredOptions.length === 0 && (
              <div
                className={cn(
                  'flex justify-center items-center lg:gap-[10px] gap-[7px] lg:px-[12px] px-[9px] lg:py-[10px] py-[8px]'
                )}
              >
                ---
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
)

export const findOption = (options: Option[], value: string) => {
  return options.find((option) => option.value === value)
}
