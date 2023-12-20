'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { VideoModal } from '@app/(home)/sections/Banner/VideoModal'
import Close from '@assets/icons/close.svg'
import Hamburger from '@assets/icons/hamburger.svg'
import Lock from '@assets/icons/lock.svg'
import { Button } from '@components/ui/Button'
import { Logo } from '@components/ui/Logo'

import { useUserContext } from '../../providers/UserProvider'

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openVideoModal, setOpenVideoModal] = useState(false)
  const pathName = usePathname()
  const { user } = useUserContext()
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
            className={`fixed left-0 top-[96px] lg:top-0 z-[40] flex-col flex-wrap justify-end sm:visible gap-6 p-8 transition-all duration-300 translate-y-1 bg-secondary lg:relative lg:flex lg:grow lg:translate-y-0 lg:flex-row lg:items-center lg:gap-0 lg:bg-transparent lg:p-0 lg:opacity-100 font-[15px] w-screen h-screen lg:w-auto lg:h-auto
            ${mobileMenuOpen ? '' : 'invisible opacity-0'}`}
          >
            <div className="flex flex-col lg:flex-row lg:items-center gap-[40px] relative">
              <div className="w-full lg:w-auto lg:pr-4 lg:pt-0 flex flex-col gap-5 tracking-wide lg:flex-row lg:text-sm">
                <Nav>MAIN SCREEN</Nav>
                <Nav>SHIP NOW</Nav>
                <Nav href="/signup">JOIN NETWORK</Nav>
                <Nav onClick={() => setOpenVideoModal(true)}>ABOUT US</Nav>
                <Nav href="/internal">INTERNAL</Nav>
              </div>
              {user?.email ? (
                <form action="/api/account/logout" method="post">
                  <Button> Logout </Button>
                </form>
              ) : (
                <>
                  <div className="flex">
                    <Nav href="/signin">
                      <div className="flex gap-2 items-center text-white font-semibold transition fill-white hover:fill-white">
                        <span className="font-medium text-input">Log in</span>
                        <Lock className="" />
                      </div>
                    </Nav>
                  </div>
                  <div className="flex gap-2">
                    <Link href="/signup">
                      <Button>Create Account</Button>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {openVideoModal && <VideoModal open={openVideoModal} onClose={() => setOpenVideoModal(false)} />}
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
    <span className="absolute w-full h-full group-hover:bg-green transition duration-300 active:scale-[0.97] group-hover:blur-md active:blur-none active:bg-transparent group-hover:scale-y-[60%] group-hover:scale-x-[105%]" />
    <span className="relative group-hover:text-white block">{children}</span>
  </Link>
)
