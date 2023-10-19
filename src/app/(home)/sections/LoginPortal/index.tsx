'use client'

import { isMobile } from 'react-device-detect'
import { ParallaxBanner } from 'react-scroll-parallax'
import { Tooltip } from 'react-tooltip'

import gradientCard from '@assets/images/gradient-card-cyan-indigo-to-r.png'
import wave from '@assets/images/particle-wave.png'
import wireframeGlobe from '@assets/images/wireframe-globe-body.png'
import { TransparentButton } from '@components/ui/Button'
import { Title } from '@components/ui/Typography'

export const LoginPortalSection = () => {
  return (
    <section className="relative bg-[#00010c] text-white">
      <div className="absolute xl:left-0 lg:-left-[20%] -left-[60%] lg:-top-[20%]">
        <div
          className="absolute w-[1200px] h-[1200px]"
          style={{
            background: `radial-gradient(600px 600px at center, #191D8840 ,#191D8880, #191D8800)`
          }}
        />
        <div
          className="absolute w-[1200px] h-[1200px]"
          style={{ background: `url(${wireframeGlobe.src}) no-repeat 300px 350px` }}
        />
      </div>
      <ParallaxBanner className="parallax-banner" layers={[{ image: wave.src, speed: -20 }]}>
        <div className="relative container lg:grid block grid-cols-2">
          <div className="relative text-white">
            <div className="relative h-full"></div>
          </div>
          <div className="flex flex-col lg:items-end items-center lg:py-[128px] py-[90px]">
            <div className="flex flex-col react-tooltip-portal-help-container">
              <div className="flex justify-start">
                <Title>LOGIN PORTAL</Title>
              </div>
              <GradientCard>
                <div className="text-body-xl font-semi lg:mb-[24px] mb-[18px]">
                  ACCESS
                  <br className="only-desktop" />
                  SHIPPING PORTAL
                </div>
                <div className="text-gray-200 lg:mb-[12px] mb-[8px]">
                  Quote, Ship, Track, Manage Work Orders,
                  <br className="only-desktop" />
                  Carrier Relationships, Multi-Warehouses, and
                  <br className="only-desktop" />
                  Inventory Suppliers.{' '}
                  <a id="help-shiping-portal" className="inline-block">
                    (?)
                  </a>
                  <Tooltip
                    anchorSelect="#help-shiping-portal"
                    place={isMobile ? 'top-start' : 'top-end'}
                    style={{
                      backgroundColor: '#6957F2',
                      color: 'white',
                      borderRadius: 16,
                      padding: '30px 20px',
                      fontSize: 16
                    }}
                    opacity={1}
                  >
                    For Shippers, Agents, <br />
                    Brokers, and Drone <br />
                    Delivery Operators.
                  </Tooltip>
                </div>
                <TransparentButton>LOGIN</TransparentButton>
              </GradientCard>
              <GradientCard>
                <div className="text-body-xl font-semi lg:mb-[24px] mb-[18px]">
                  ACCESS
                  <br className="only-desktop" />
                  CARRIER PORTAL
                </div>
                <div className="text-gray-200 lg:mb-[12px] mb-[8px]">
                  Efficiently Manage Trucks, Drivers, Bids, and
                  <br className="only-desktop" />
                  Loads. Seamlessly Collaborate with Your Team,
                  <br className="only-desktop" />
                  Customers, and Vendors in Real-Time.{' '}
                  <a id="help-carrier-portal" className="inline-block">
                    (?)
                  </a>
                  <Tooltip
                    anchorSelect="#help-carrier-portal"
                    place="top-start"
                    style={{
                      backgroundColor: '#6957F2',
                      color: 'white',
                      borderRadius: 16,
                      padding: '30px 20px',
                      fontSize: 16
                    }}
                    opacity={1}
                  >
                    For Truck Fleet Managers, <br />
                    Drivers, Carriers/Couriers, <br />
                    Intermodal-Rail Providers, <br />
                    Vessels, and Airlines
                  </Tooltip>
                </div>
                <TransparentButton>LOGIN</TransparentButton>
              </GradientCard>
            </div>
          </div>
        </div>
      </ParallaxBanner>
    </section>
  )
}

export const GradientCard = ({ children }: { children: React.ReactNode }) => (
  <div
    className="text-center lg:px-[32px] px-[24px] lg:py-[30px] py-[22px] lg:mb-[54px] mb-[48px]"
    style={{ background: `url(${gradientCard.src})`, backgroundSize: '100% 100%' }}
  >
    {children}
  </div>
)
