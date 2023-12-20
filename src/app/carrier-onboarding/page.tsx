'use client'

import React from 'react'
import { ParallaxBanner } from 'react-scroll-parallax'

import bgWireframeGlobe from '@assets/images/bg-wireframe-globe.png'

import { OnboardingSection } from '.'

type Props = {}

function page({}: Props) {
  return (
    <section className="relative lg:pt-[90px] pt-[70px] lg:pb-[120px] pb-[90px] bg-[#191a4c] text-white overflow-hidden">
      <OnboardingSection />
    </section>
  )
}

export default page
