import User from '@assets/images/User.png'
import { Message } from '@components/ui/Message'
import { Phone } from '@components/ui/Phone'
import { Video } from '@components/ui/Video'

interface NewHeaderProps {
  title: string
}

export const Header: React.FC<NewHeaderProps> = ({ title }) => {
  return (
    <div>
      <div className="flex justify-between">
        <div className="text-[#141943] font-poppins text-4xl font-bold leading-11 uppercase">{title}</div>
        <div className="flex">
          <div className="w-12 h-12 mr-2 bg-white border border-[#2F80ED] rounded-md">
            <div className="h-12 flex justify-center items-center hover:cursor-pointer">
              <Phone />
            </div>
          </div>

          <div className="w-12 h-12 mr-2 bg-white border border-[#2F80ED] rounded-md">
            <div className="h-12 flex justify-center items-center hover:cursor-pointer">
              <Video />
            </div>
          </div>

          <div className="w-12 h-12 mr-2 bg-white border border-[#2f80ED] rounded-md">
            <div className="h-12 flex justify-center items-center hover:cursor-pointer">
              <Message />
            </div>
          </div>
          <div className="w-12 h-12 bg-white border border-[#2f80ED] rounded-md hover:cursor-pointer">
            <img src={User.src} alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}
