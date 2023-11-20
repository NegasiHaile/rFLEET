import countries from '@json/countries.json'

import { Select } from './Select'

export interface Option {
  label: string | JSX.Element
  value: string
  icon?: any
}

interface Props {
  label?: string
  value?: Option
  placeholder?: string
  searchable?: boolean
  error?: string | boolean
  className?: string
  labelClassName?: string
  onChange?: (newValue: Option) => void | Promise<void>
}

export const countryOptions = countries.map((country) => ({
  label: country.country || '',
  value: country.code || '',
  icon: <img src={country.flag} className="w-[24px] h-[24px]" /> || <></>
}))

export const CountrySelect = (props: Props) => {
  return <Select options={countryOptions} {...props} />
}
