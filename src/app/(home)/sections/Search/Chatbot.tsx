'use client'

import BotAvatar from '@assets/icons/bot-avatar.svg'
import ButtonSend from '@assets/icons/btn-send.svg'
import UserAvatar from '@assets/icons/user-avatar.svg'
import { cn } from '@lib/utils'

export const Chatbot = () => {
  const messages = [
    {
      bot: true,
      avatar: true,
      text: `Hi, welcome to rFLEET.ai`,
      createdAt: `Today 11:52`
    },
    {
      bot: true,
      avatar: true,
      text: `Hi, I'm happy to help.`,
      createdAt: `Today 11:57`
    },
    {
      bot: false,
      avatar: true,
      text: `Hi there! I need help tracking my parcel. Can you assist me?`,
      createdAt: `Today `
    },
    {
      bot: true,
      avatar: true,
      text: `Of course! I'd be happy to help you track your parcel.
      Please provide me with the tracking number, and I'll
      get the information for you.`,
      createdAt: `Today `
    }
  ]

  return (
    <>
      <div className="border-b border-[#FFFFFF20]">
        <div className="flex justify-center lg:py-[20px] py-[15px]">
          <div className="flex font-bold">
            <h4 className="text-primary">rFLEET.ai</h4>&nbsp;
            <h4>chatbot</h4>
          </div>
        </div>
      </div>
      <div className="lg:pt-[20px] pt-[15px] lg:pb-[32px] pb-[24px] lg:px-[40px] px-[30px] lg:py-[40px] py-[30px]">
        <div className="flex flex-col gap-d-12 lg:mb-[16px] mb-[12px]">
          {messages.map((message, index) => (
            <Message
              key={index}
              bot={message.bot}
              avatar={message.avatar}
              text={message.text}
              createdAt={message.createdAt}
            />
          ))}
          <div className="flex flex-col lg:gap-[8x] gap-[6px]">
            <div className="text-input">Suggestions</div>
            <div className="flex gap-d-16 overflow-x-hidden">
              <div className="whitespace-nowrap bg-gradient-for-chatbot-message lg:px-[16px] px-[12px] lg:py-[10px] py-[8px] lg:rounded-[10px] rounded-[10px]">
                Quote 2 pallets from Cleveland, OH to Los Angeles, CA?
              </div>
              <div className="whitespace-nowrap bg-gradient-for-chatbot-message lg:px-[16px] px-[12px] lg:py-[10px] py-[8px] lg:rounded-[10px] rounded-[10px]">
                Track my parcel
              </div>
              <div className="whitespace-nowrap bg-gradient-for-chatbot-message lg:px-[16px] px-[12px] lg:py-[10px] py-[8px] lg:rounded-[10px] rounded-[10px]">
                Organize the best route
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between gap-d-12 bg-white lg:rounded-[16px] rounded-[12px] lg:pl-[24px] pl-[18px] lg:pr-[16px] pr-[12px] lg:py-[14px] py-[10px]">
          <input
            type="text"
            className="grow lg:text-[14px] text-[10px] text-[#47464A] placeholder:text-[#84818A]"
            placeholder="Send your message..."
          />
          <button>
            <ButtonSend />
          </button>
        </div>
      </div>
    </>
  )
}

interface MessageProps {
  bot: boolean
  text: string
  createdAt: string
  avatar?: boolean
}

const Message = ({ bot, text, createdAt, avatar = false }: MessageProps) => {
  return (
    <div className={cn('flex lg:gap-[8px] gap-[6px]', bot ? '' : 'flex-row-reverse')}>
      {avatar ? <>{bot ? <BotAvatar className="flex-shrink-0" /> : <UserAvatar className="flex-shrink-0" />}</> : ''}

      <div
        className={cn(
          'bg-gradient-for-chatbot-message flex lg:gap-[22px] gap-[16px] lg:max-w-[510px] lg:p-[12px] p-[8px] text-input',
          bot
            ? 'lg:rounded-tl-[10px] rounded-tl-[8px] lg:rounded-r-[10px] rounded-r-[8px] border border-[#FFFFFF30]'
            : 'lg:rounded-tr-[10px] rounded-tr-[8px] lg:rounded-l-[10px] rounded-l-[8px]'
        )}
      >
        <div className="">
          {bot && <div>Chatbot</div>}
          <div>{text}</div>
        </div>
        <div className="flex items-end text-caption text-[#FFFFFF50]">{createdAt}</div>
      </div>
    </div>
  )
}
