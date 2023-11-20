'use client'

import { useState } from 'react'
import { ParallaxBanner } from 'react-scroll-parallax'

import dynamic from 'next/dynamic'

import ChatbotIcon from '@assets/icons/chatbot.svg'
import bgEarth from '@assets/images/bg-earth.jpeg'
import { Modal } from '@components/ui/Modal'
import { Title } from '@components/ui/Typography'

import { Airplane } from './Airplane'
import Botframework from './Botframework'
import { Chatbot } from './Chatbot'
import { SearchInput } from './SearchInput'

const DynamicBotframework = dynamic(() => import('./Botframework'), { ssr: false })

export const SearchSection = () => {
  const [openChatbotModal, setOpenChatbotModal] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const handleModalOpen = () => {
    setOpenChatbotModal(true)
  }

  return (
    <section id="search-section">
      <ParallaxBanner className="parallax-banner xl:h-[750px]" layers={[{ image: bgEarth.src, speed: -20 }]}>
        <div
          className="absolute w-full h-full"
          style={{ backdropFilter: 'blur(12.5px)', opacity: 0.6, backgroundColor: 'rgba(0,0,0,0.3)' }}
        ></div>
        <div className="relative flex flex-col h-full">
          <div className="h-[100px] shrink-0 bg-gradient-secondary-fade-in-to-top" />

          <div className="relative container flex flex-col flex-1 justify-center items-center text-center lg:gap-[32px] gap-[24px] lg:py-0 py-[45px]">
            <div>
              <Title>SEARCH ENGINE & OPTIMIZATION</Title>
              <div className="text-body-lg">What do you want to look for today?</div>
            </div>
            <div className="w-full flex flex-col items-center">
              <SearchInput onSearchChange={setSearchValue} onSearch={handleModalOpen} value={searchValue} />
              <div className="text-white">
                Tip: ask me any questions or tasks relating to transportation and logistics
              </div>
            </div>
            <div className="flex flex-col gap-[15px] items-center">
              <Prompt onClick={() => setSearchValue('Quote 2 pallets from Cleveland, OH to Los Angeles, CA?')}>
                Quote 2 pallets from Cleveland, OH to Los Angeles, CA?
              </Prompt>
              <Prompt
                onClick={() =>
                  setSearchValue('How long is the estimated transit time from Atlanta, GA to Seattle, WA?')
                }
              >
                How long is the estimated transit time from Atlanta, GA to Seattle, WA?
              </Prompt>
              <Prompt onClick={() => setSearchValue('Take me to my dashboard.')}>
                Take me to my dashboard, or New Quote
              </Prompt>
            </div>
            {!openChatbotModal && (
              <div className="absolute right-0 bottom-0">
                <button className="transition duration-200 hover:scale-105" onClick={() => setOpenChatbotModal(true)}>
                  <ChatbotIcon className="lg:w-[102px] w-[60px] lg:h-[80px] h-[50px]" />
                </button>
              </div>
            )}
          </div>
          <div className="h-[100px] shrink-0 bg-gradient-secondary-fade-in-to-bottom" />
        </div>
      </ParallaxBanner>
      <Airplane />
      <Modal
        open={openChatbotModal}
        onClose={() => setOpenChatbotModal(false)}
        className="lg:max-w-[810px] w-full border border-white lg:rounded-[10px] rounded-[8px] bg-[rgba(249,249,249,0.05)] shadow-[0px,4px,4px,0px,rgba(0,0,0,0.25)] backdrop-blur-[25px]"
      >
        <DynamicBotframework searchValue={searchValue} />
      </Modal>
    </section>
  )
}

const Prompt = ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => (
  <div
    className="text-input px-[15px] py-[8px] lg:px-[20px] lg:py-[10px] bg-blur hover-bg-white-glow"
    style={{ cursor: 'pointer' }}
    onClick={onClick}
  >
    {children}
  </div>
)
