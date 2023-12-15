'use client'

import { useState } from 'react'

import Link from 'next/link'

import Typewriter from 'typewriter-effect'

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
            <Typewriter
              options={{
                strings: [
                  'ELEVATE YOUR LOGISTICS',
                  'EXPAND YOUR BUSINESS',
                  'CONNECT ONLINE STORE',
                  'STREAMLINE OPERATIONS',
                  'OPTIMIZE YOUR DELIVERIES',
                  'MANAGE TRUCK ASSETS',
                  'MANAGE YOUR INVENTORY',
                  'MANAGE YOUR WAREHOUSE',
                  'GAIN SECURITY AND CONTROL'
                ],
                autoStart: true,
                delay: 35,
                loop: true
              }}
            />
            {/* <br className="only-desktop" /> */}
            WITH <span className="text-gradient bg-gradient-primary-to-br">rFleet.ai:</span>
            <div className="text-gradient bg-gradient-primary-to-br">
              EMPOWERING SUPPLY
              <br className="only-desktop" />
              CHAIN MANAGEMENT GLOBALLY
            </div>
          </h4>
          <div className="text-body-lg tracking-widest leading-relaxed lg:mb-[24px] mb-[18px]">
            Experience efficiency, connectivity, and growth
            <br className="only-desktop" />
            on one of the world&apos;s largest marketplace for supply chain
            <br className="only-desktop" />
            management software.{' '}
          </div>
          <div className="flex items-center gap-6">
            <Link href="#">
              <Button glossy className="lg:px-[46px] px-[34px]">
                Contact Us
              </Button>
            </Link>
            <Link href="#" onClick={() => setOpenVideoModal(true)} className="flex items-center gap-2 group">
              <div className="relative">
                <div className="z-[1] absolute flex justify-center items-center left-0 right-0 top-0 bottom-0 rounded-full group-hover:blur-[10px] active:blur-none active:bg-transparent active:duration-75 group-hover:bg-green blur-sm inset-0 transition duration-300">
                  <div className="w-[50px] h-[50px] bg-secondary rounded-full" />
                </div>
                <PlayCircle className="relative z-[2]" />
              </div>
              <div className="only-desktop text-body-xl">HOW IT WORKS</div>
            </Link>
          </div>
        </div>
        <div className="col-span-4 text-white lg:py-[60px]">
          <video width="520" height="520" autoPlay loop muted className="rounded-full">
            <source src={globeVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      <VideoModal open={openVideoModal} onClose={() => setOpenVideoModal(false)} />
    </section>
  )
}
