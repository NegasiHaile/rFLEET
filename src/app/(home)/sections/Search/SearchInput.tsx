import { useRef } from 'react'

import SearchIcon from '@assets/icons/search.svg'
import { Button } from '@components/ui/Button'

export const SearchInput = ({
  onSearchChange,
  onSearch,
  value
}: {
  onSearchChange: (value: string) => void
  onSearch: () => void
  value: string
}) => {
  const ref = useRef<HTMLInputElement>(null)

  const handleSearch = async () => {
    const input = ref.current?.value
    console.log('Input: ', input)
    onSearchChange(input || '')
    onSearch()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="flex flex-wrap items-stretch relative mb-[12px] lg:mb-[16px] w-full max-w-[900px]">
      <input
        ref={ref}
        value={value}
        onChange={(e) => onSearchChange(e.target.value)}
        type="text"
        onKeyDown={handleKeyDown}
        className="relative m-0 -mr-0.5 block min-w-0 flex-auto rounded-l-lg border border-solid border-white bg-clip-padding lg:px-[24px] px-[18px] lg:py-[12px] py-[6px] font-semibold leading-[20px] text-white outline-none transition duration-200 ease-in-out focus:z-[3] focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none focus:bg-gradient-blur-dialog bg-transparent focus:bg-opacity-40 placeholder:text-white focus:placeholder:text-transparent"
        placeholder="Hello, how can I help you today?"
      />
      <Button
        glossy
        className="h-[36px] lg:h-[48px] px-[45px] lg:px-[60px] rounded-l-none rounded-r-lg"
        onClick={handleSearch}
      >
        <SearchIcon className="lg:w-[24px] w-[18px] lg:h-[24px] h-[18px]" />
      </Button>
    </div>
  )
}
