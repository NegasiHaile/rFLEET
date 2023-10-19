'use client'

import { Parallax } from 'react-scroll-parallax'

import ship from '@assets/images/ship.png'
import truck from '@assets/images/truck.png'

export const TruckAndShip = () => {
  return (
    <div className="flex justify-between items-end mt-[-120px]">
      <Parallax translateX={[-16, 2]} translateY={[9, 2]} scale={[0.8, 1]}>
        <img src={truck.src} alt="" />
      </Parallax>
      <Parallax translateX={[16, 0]} translateY={[10, 1]} scale={[0.8, 1]}>
        <img src={ship.src} alt="" />
      </Parallax>
    </div>
  )
}
