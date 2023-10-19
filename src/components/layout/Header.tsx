'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { VideoModal } from '@app/(home)/sections/Banner/VideoModal'
import Close from '@assets/icons/close.svg'
import Hamburger from '@assets/icons/hamburger.svg'
import Lock from '@assets/icons/lock.svg'
import { Logo } from '@components/ui/Logo'

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openVideoModal, setOpenVideoModal] = useState(false)
  const pathName = usePathname()

  const closeMenu = () => {
    setMobileMenuOpen(false)
  }

  useEffect(() => {
    closeMenu()
  }, [pathName])

  return (
    <header className="bg-secondary h-[100px] flex items-center">
      <div className="container">
        <div className="relative flex flex-wrap items-center justify-between gap-6 md:gap-0">
          <div className="relative z-[20] flex justify-between w-full md:px-0 lg:w-max ">
            <Logo />
            <div className="relative flex items-center max-h-10 lg:hidden ">
              <button
                aria-label="humburger"
                id="hamburger"
                className="fill-white"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
              >
                {mobileMenuOpen ? <Close /> : <Hamburger />}
              </button>
            </div>
          </div>
          <div
            id="navLayer"
            aria-hidden="true"
            className="fixed inset-0 z-[10] w-screen h-screen transition duration-500 origin-bottom scale-y-0 bg-white/70 backdrop-blur-2xl lg:hidden"
          ></div>
          <div
            id="navlinks"
            className={`fixed left-0 top-[96px] lg:top-0 z-[100] flex-col flex-wrap justify-end sm:visible gap-6 p-8 transition-all duration-300 translate-y-1 bg-secondary lg:relative lg:flex lg:grow lg:translate-y-0 lg:flex-row lg:items-center lg:gap-0 lg:bg-transparent lg:p-0 lg:opacity-100 font-[15px] w-screen h-screen lg:w-auto lg:h-auto
            ${mobileMenuOpen ? '' : 'invisible opacity-0'}`}
          >
            <div className="flex flex-col lg:flex-row lg:items-center gap-[40px] relative">
              <div className="w-full lg:w-auto lg:pr-4 lg:pt-0 flex flex-col gap-5 tracking-wide lg:flex-row lg:text-sm">
                <Nav>MAIN SCREEN</Nav>
                <Nav>SHIP NOW</Nav>
                <Nav>CARRIER NETWORK</Nav>
                <Nav onClick={() => setOpenVideoModal(true)}>ABOUT US</Nav>
              </div>
              <div className="flex">
                <Nav href="/signin">
                  <div className="flex gap-2 items-center text-white font-semibold transition fill-white hover:fill-white">
                    <span className="font-semibold">Log in</span>
                    <Lock className="" />
                  </div>
                </Nav>
              </div>
              <div className="flex gap-2">
                <Link href="/signup">
                  <button className="relative flex items-center justify-center before:absolute before:inset-0 before:rounded-md before:transition before:duration-300 active:duration-75 font-semibold before:bg-primary px-[24px] py-[14px] lg:px-[32px] lg:py-[18px] hover:before:scale-[1.03] before:z-[1] before:border-2 before:border-solid before:border-primary hover:before:border-primary-green after:z-0 hover:after:bg-primary-green after:blur-sm after:absolute after:inset-0 after:rounded-md after:transition after:duration-300 active:before:scale-[0.97] hover:after:blur-md active:after:blur-none active:after:bg-transparent">
                    <span className="relative z-[2] text-white text-[15px]">Create Account</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {openVideoModal && <VideoModal onClose={() => setOpenVideoModal(false)} />}
    </header>
  )
}

interface NavProps {
  href?: string
  onClick?: () => void | Promise<void>
  children: React.ReactNode
}

const Nav = ({ href = '#', children, onClick }: NavProps) => (
  <Link href={href} className="block text-white relative group" onClick={onClick}>
    <span className="absolute w-full h-full group-hover:bg-primary-green transition duration-300 active:scale-[0.97] group-hover:blur-md active:blur-none active:bg-transparent group-hover:scale-y-[60%] group-hover:scale-x-[105%]" />
    <span className="relative group-hover:text-white block">{children}</span>
  </Link>
)
