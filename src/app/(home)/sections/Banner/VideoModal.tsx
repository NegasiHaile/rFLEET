import Close from '@assets/icons/close-white.svg'

interface Props {
  onClose: () => void | Promise<void>
}
export const VideoModal = ({ onClose }: Props) => {
  return (
    <div className="fixed flex justify-center items-center left-0 top-0 z-[100] w-full h-full bg-black transition duration-500">
      <video width="100%" height="100%" autoPlay loop muted>
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
  )
}
