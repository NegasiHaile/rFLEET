'use client'

import { useState } from 'react'

import Link from 'next/link'

import PlayCircle from '@assets/icons/play-circle.svg'
import globeVideo from '@assets/videos/cities-globe.mp4'
import { Button } from '@components/ui/Button'

import { VideoModal } from './VideoModal'

export const BannerSection = () => {
  const [openVideoModal, setOpenVideoModal] = useState(false)

  return (
    <section className="text-white bg-secondary">
      <div className="container block lg:grid grid-cols-9">
        <div className="col-span-5 py-[100px] lg:pt-[140px] pb-[100px]">
          <h4 className="font-bold mb-[15px] lg:mb-[20px]">
            ELEVATE YOUR LOGISTICS
            <br className="only-desktop" />
            WITH <span className="text-gradient bg-gradient-primary-to-br">rFleet.io:</span>
            <div className="text-gradient bg-gradient-primary-to-br">
              EMPOWERING SUPPLY
              <br className="only-desktop" />
              CHAIN MANAGEMENT GLOBALLY
            </div>
          </h4>
          <div className="text-gray-300 tracking-widest leading-relaxed mb-[36px] lg:mb-[48px]">
            Experience efficiency, connectivity, and growth
            <br className="only-desktop" />
            on one of the world&apos;s largest marketplace for supply chain
            <br className="only-desktop" />
            management software.{' '}
          </div>
          <div className="flex items-center gap-6">
            <Link href="#">
              <Button glossy>CONTACT US</Button>
            </Link>
            <Link href="#" onClick={() => setOpenVideoModal(true)} className="flex items-center gap-2">
              <PlayCircle />
              <div className="only-desktop text-body-xl">HOW IT WORKS</div>
            </Link>
          </div>
        </div>
        <div className="col-span-4 text-white lg:py-[60px]">
          <video width="520" height="520" autoPlay loop muted>
            <source src={globeVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      {openVideoModal && <VideoModal onClose={() => setOpenVideoModal(false)} />}
    </section>
  )
}
