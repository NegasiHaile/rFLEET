// useShipping.ts
import { useEffect, useState } from 'react'

import { handleButtonClick, handleSubmit } from './ShippingSteps'

export const useShipping = (data: any) => {
  const [isDisplayRate, setDisplayRate] = useState(false)
  const [rates, setRates] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const [selected, setSelected] = useState<number | null>(null)

  useEffect(() => {
    setSelected(0)
  }, [])

  const handleClick = (index: number) => {
    setSelected(index)
  }

  function Searching(e: React.MouseEvent) {
    setIsLoading(true)
    handleButtonClick(e, data, setRates, setIsLoading)
    setDisplayRate(true)
  }

  return {
    isDisplayRate,
    setDisplayRate,
    rates,
    isLoading,
    selected,
    handleClick,
    Searching
  }
}
