'use client'

import { useState } from 'react'
import { Link as ScrollLink } from 'react-scroll'

import Link from 'next/link'

import { VideoModal } from '@app/(home)/sections/Banner/VideoModal'
import Discord from '@assets/icons/discord.svg'
import Instagram from '@assets/icons/instagram.svg'
import Twitter from '@assets/icons/twitter-new.svg'
import Youtube from '@assets/icons/youtube.svg'
import { BRD } from '@components/ui/BRD'
import { Logo } from '@components/ui/Logo'

export default function Example() {
  const [openVideoModal, setOpenVideoModal] = useState(false)

  return (
    <footer className="self-end w-full relative flex flex-col pt-[75px] pb-[36px] lg:pt-[100px] lg:pb-[48px] bg-dark text-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-[48px] lg:mb-[36px]">
          <div className="flex flex-col gap-d-16">
            <Logo />
            <div className="flex flex-col gap-3 lg:mb-[16px] mb-[12px]">
              <div>
                A Leading Partner for Cutting-Edge Innovation in the <BRD />
                Sphere of Logistics and Supply Chain Management
              </div>
            </div>
            <div className="flex items-center gap-d-18">
              <Link href="#" className="svg-hover">
                <Discord className="lg:w-[32px] w-[24px]" />
              </Link>
              <Link href="#" className="svg-hover">
                <Twitter className="lg:w-[26px] w-[19px]" />
              </Link>
              <Link href="#" className="svg-hover">
                <Instagram className="lg:w-[24px] w-[18px]" />
              </Link>
              <Link href="#" className="svg-hover">
                <Youtube className="lg:w-[32px] w-[24px]" />
              </Link>
            </div>
          </div>
          <div className="flex lg:justify-center justify-start">
            <div className="flex flex-col gap-d-24 mt-11 lg:mt-0">
              <h6 className="font-semibold">Links</h6>
              <div className="flex flex-col gap-d-16 text-gray-200">
                <ScrollLink to="search-section" smooth>
                  Main Screen
                </ScrollLink>
                <ScrollLink to="calculator-section" smooth>
                  Ship Now
                </ScrollLink>
                <ScrollLink to="onboarding-section" smooth>
                  Join Network
                </ScrollLink>
                <Link href="#" onClick={() => setOpenVideoModal(true)}>
                  About US
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">© 2023 All Rights Reserved. rFleet Inc.</div>
      </div>
      <VideoModal open={openVideoModal} onClose={() => setOpenVideoModal(false)} />
    </footer>
  )
}
