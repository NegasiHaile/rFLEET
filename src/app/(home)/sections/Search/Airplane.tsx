'use client'

import { Parallax } from 'react-scroll-parallax'

import airplane from '@assets/images/airplane.png'

export const Airplane = () => {
  return (
    <div className="relative bg-secondary">
      <Parallax translateX={[-5, 2]} translateY={[40, -60]} className="pl-0 lg:pl-[60px]">
        <img src={airplane.src} alt="airplane" />
      </Parallax>
    </div>
  )
}
