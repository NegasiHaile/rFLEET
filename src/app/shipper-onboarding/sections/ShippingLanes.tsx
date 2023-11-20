import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { BiMinus, BiPlus, BiSolidInfoCircle, BiTrash } from 'react-icons/bi'
import { ImAttachment } from 'react-icons/im'

import { Button, TransparentButton } from '@components/ui/Button'
import { Check } from '@components/ui/Check'
import { CountrySelect, countryOptions } from '@components/ui/CountrySelect'
import { GradientHR } from '@components/ui/GradientHR'
import { Input } from '@components/ui/Input'
import { Option, Select, findOption } from '@components/ui/Select'
import allStates from '@json/usaStates.json'

import StatesMap from './StatesMap'

const usaStates: Option[] = allStates.map((obj) => {
  return { value: obj.name, label: obj.name }
})
type Props = {
  onClose?: () => void
  onSubmit?: () => void
}

export const ShippingLanes = ({ onClose, onSubmit }: Props) => {
  const [selectedCountry, setSelectedCountry] = useState<string>('')

  const [selectedStates, setSelectedStates] = useState<string[]>([])
  const onSubmitForm = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.()
  }

  const updateSelectedStates = (newValue: string) => {
    const indexOfValue = selectedStates.indexOf(newValue)
    if (indexOfValue == -1) setSelectedStates([...selectedStates, newValue])
    else
      setSelectedStates((prev) => {
        let items = [...prev]
        items.splice(indexOfValue, 1)
        return items
      })
  }
  return (
    <div className="p-3 flex flex-col h-full">
      <form onSubmit={onSubmitForm}>
        <div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className="font-semibold text-lg">Facilities, Warehouses, and Customers</div>
              <div className="font-extralight text-[10px]">Select the geographical areas to build your network.</div>
            </div>
            <AiOutlineClose onClick={onClose} className=" cursor-pointer" />
          </div>

          <div className="my-4">
            <GradientHR />
          </div>
        </div>
        <div className="pr-3 min-h-[250px] max-h-[350px]  flex-grow overflow-auto scrollbar scrollbar-w-2 scrollbar-track-gray-100 scrollbar-thumb-blue-500">
          <div className="flex flex-wrap gap-3 my-2 ">
            {selectedStates.map((cState) => (
              <div key={cState} className="p-1 px-3 border rounded-lg flex items-center gap-2">
                {cState}
                <button type="button" onClick={() => updateSelectedStates(cState)}>
                  <AiOutlineClose />
                </button>
              </div>
            ))}
          </div>
          <GradientHR />
          <div className="my-3">
            <div className="text-input font-semibold text-gray-200 lg:mb-[8px] mb-[6px]">Select Country</div>
            <CountrySelect
              className="z-[100]"
              searchable
              value={findOption(countryOptions, selectedCountry)}
              placeholder="Select a country"
              onChange={({ value }) => setSelectedCountry(value)}
            />
          </div>
          <div className="flex items-center justify-center ">
            <div className="w-[400px]">
              <StatesMap selectedStates={selectedStates} onClick={(value: string) => updateSelectedStates(value)} />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {usaStates.map((cState) => (
              <Check
                key={cState.value}
                checked={selectedStates.indexOf(cState.value) != -1}
                onChange={() => updateSelectedStates(cState.value)}
                label={<div className="font-light mt-1">{cState.label}</div>}
              />
            ))}
          </div>
        </div>
        <div>
          <div className="my-4">
            <GradientHR />
          </div>

          <div className="flex justify-between">
            <div>
              <TransparentButton onClick={onClose} type="button">
                Decline
              </TransparentButton>
            </div>
            <div className="flex gap-2">
              <Button type="submit">Accept</Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
