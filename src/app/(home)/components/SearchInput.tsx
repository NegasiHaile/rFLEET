import SearchIcon from '@assets/icons/search.svg'
import { Button } from '@components/ui/Button'

export const SearchInput = () => {
  return (
    <div className="flex flex-wrap items-stretch relative mb-[24px] lg:mb-[34px] w-full max-w-[900px]">
      <input
        type="text"
        className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l-lg border border-solid border-white bg-clip-padding pl-[30px] pr-[26px] py-[14px] lg:pl-[40px] lg:pr-[68px] lg:py-[18px] text-[15px] lg:text-[20px] font-semibold leading-[1.6] text-white outline-none transition duration-200 ease-in-out focus:z-[3] focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none focus:bg-primary bg-transparent focus:bg-opacity-40 placeholder:text-white"
        placeholder="Hello, how can I help you today?"
        aria-label="Recipient's username"
        aria-describedby="button-addon2"
      />
      <Button
        glossy
        className="!h-[56px] lg:!h-[72px] !px-[10px] lg:!px-[50px] before:rounded-l-none before:rounded-r-lg"
      >
        <SearchIcon />
      </Button>
    </div>
  )
}
