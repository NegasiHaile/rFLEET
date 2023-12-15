'use client'

import { ParallaxBanner } from 'react-scroll-parallax'

import planetEarth from '@assets/images/bg-planet-earth.jpeg'
import { Title } from '@components/ui/Typography'

import { Panel } from './Panel'

export const CalculatorSection = () => {
  return (
    <section id="calculator-section" className="relative">
      <div className="bg-white mt-10 rounded-lg border border-[#B8BEF8] shadow-md">
        <Panel />
      </div>
    </section>
  )
}
