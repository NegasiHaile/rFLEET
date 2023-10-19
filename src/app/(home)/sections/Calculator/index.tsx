'use client'

import { ParallaxBanner } from 'react-scroll-parallax'

import planetEarth from '@assets/images/bg-planet-earth.jpeg'
import { Title } from '@components/ui/Typography'

import { Panel } from './Panel'
import { TruckAndShip } from './TruckAndShip'

export const CalculatorSection = () => {
  return (
    <section id="calculator-section" className="relative">
      <ParallaxBanner
        className="parallax-banner lg:h-[814px] md:h-[1318px] sm:h-[1277px] h-[1244px]"
        layers={[{ image: planetEarth.src, speed: -20 }]}
      />
      <div className="absolute left-0 top-0 w-full flex flex-col justify-between flex-1 bg-gradient-secondary-fade-in-to-top">
        <div className="container text-white relative z-10">
          <div className="text-center mb-[42px] lg:mb-[54px]">
            <div className="flex justify-center">
              <Title>FREIGHT CALCULATOR & RATE REQUEST (RFQ TOOL)</Title>
            </div>
            <div className="text-body-xl text-gray-100">
              Request rates for Parcel, LTL, FTL, Drayage, Ocean Containers, and Air Cargo
              <br className="only-desktop" />
              from anywhere to just about everywhere.
            </div>
          </div>
          <Panel />
        </div>
        <TruckAndShip />
      </div>
    </section>
  )
}
