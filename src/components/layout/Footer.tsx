'use client'

import { useState } from 'react'
import { Link as ScrollLink } from 'react-scroll'

import Link from 'next/link'

import { VideoModal } from '@app/(home)/sections/Banner/VideoModal'
import Discord from '@assets/icons/discord.svg'
import Instagram from '@assets/icons/instagram.svg'
import Twitter from '@assets/icons/twitter.svg'
import Youtube from '@assets/icons/youtube.svg'
import { Logo } from '@components/ui/Logo'

export default function Example() {
  const [openVideoModal, setOpenVideoModal] = useState(false)

  return (
    <footer className="relative flex flex-col pt-[60px] pb-[100px] lg:pt-[88px] lg:pb-[144px] bg-dark text-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-[120px] lg:mb-[160px]">
          <div className="flex flex-col gap-11">
            <Logo />
            <div className="flex flex-col gap-3">
              <div className="text-body-xl">A Leading Partner for Cutting-Edge</div>
              <div className="text-body-xl">Innovation in the Sphere of Logistics and</div>
              <div className="text-body-xl">Supply Chain Management</div>
            </div>
            <div className="flex gap-10">
              <Link href="#" className="svg-hover">
                <Discord />
              </Link>
              <Link href="#" className="svg-hover">
                <Twitter />
              </Link>
              <Link href="#" className="svg-hover">
                <Instagram />
              </Link>
              <Link href="#" className="svg-hover">
                <Youtube />
              </Link>
            </div>
          </div>
          <div className="flex lg:justify-center justify-start">
            <div className="flex flex-col gap-11 mt-11 lg:mt-0">
              <h4 className="font-semibold">Links</h4>
              <div className="flex flex-col gap-5 text-gray-200">
                <ScrollLink to="search-section" smooth>
                  <div className="text-body-xl">Main Screen</div>
                </ScrollLink>
                <ScrollLink to="calculator-section" smooth>
                  <div className="text-body-xl">Ship Now</div>
                </ScrollLink>
                <Link href="#">
                  <div className="text-body-xl">Carrier Network</div>
                </Link>
                <Link href="#" onClick={() => setOpenVideoModal(true)}>
                  <div className="text-body-xl">About US</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          © 2023 All Rights Reserved. Eminent Global Solutions, LLC and rFleet Inc.
        </div>
      </div>
      {openVideoModal && <VideoModal onClose={() => setOpenVideoModal(false)} />}
    </footer>
  )
}
