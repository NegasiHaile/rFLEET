import Close from '@assets/icons/close-white.svg'
import { Modal } from '@components/ui/Modal'

interface Props {
  open: boolean
  onClose: () => void | Promise<void>
}
export const VideoModal = ({ open, onClose }: Props) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="lg:w-[800px] lg:h-[450px] bg-black transition duration-500">
        <video width="100%" height="100%" autoPlay loop muted controls>
          <source
            src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <button className="absolute right-0 top-0 p-[10px]" onClick={onClose}>
          <Close />
        </button>
      </div>
    </Modal>
  )
}
