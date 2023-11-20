'use client'

import { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { ParallaxBanner } from 'react-scroll-parallax'

import Link from 'next/link'

import WalletMoney from '@assets/icons/wallet-money.svg'
import bgWireframeGlobe from '@assets/images/bg-wireframe-globe.png'
import gradientCard from '@assets/images/gradient-card-cyan-indigo-to-br.png'
import { BRD } from '@components/ui/BRD'
import { TransparentButton } from '@components/ui/Button'
import { GlobeLoader } from '@components/ui/Loaders'
import { Modal } from '@components/ui/Modal'
import { Title } from '@components/ui/Typography'

import { BillingInfo } from './sections/BillingInfo'
// import { CompanyValidation } from './CompanyValidation'
// import { ContactForm } from './ContactForm'
// import { Contacts } from './Contacts'
// import { DriverForm } from './DriverForm'
// import { DriverInfo } from './DriverInfo'
// import { InsurancePolicy } from './InsurancePolicy'
// import { InsurancePolicyForm } from './InsurancePolicyForm'
// import { PayeeInfo } from './PayeeInfo'
// import { PreferedLanes } from './PreferredLanes'
// import { TermsAndConditions } from './TermsAndConditions'
import { CompanyInfo } from './sections/CompanyInfo'
import { CompanyUploads } from './sections/CompanyUploads'
import { Contacts } from './sections/Contacts'
import { CustomerAgreement } from './sections/CustomerAgreement'
import { ShipperEquipment } from './sections/ShipperEquipment'
import { ShipperProducts } from './sections/ShipperProducts'
import { ShippingLanes } from './sections/ShippingLanes'
import { StartOnboarding } from './sections/StartOnboarding'
import { TermsAndConditions } from './sections/TermsAndConditions'

export const OnboardingSection = () => {
  const [onboardingModalOpen, setOnboardingModalOpen] = useState<boolean>(true)
  const [loadingNext, setLoadingNext] = useState<boolean>(false)
  const [activeFormIndex, setActiveFormIndex] = useState<number>(0)

  const gotoNextForm = () => {
    setLoadingNext(true)
    setTimeout(() => {
      setActiveFormIndex((prev) => prev + 1)
      setLoadingNext(false)
    }, 1000)
  }

  useEffect(() => {
    setActiveFormIndex(0)
  }, [onboardingModalOpen])

  const onboardingForms: {
    [key: number]: JSX.Element
  } = {
    0: <StartOnboarding onClose={() => setOnboardingModalOpen(false)} onSubmit={gotoNextForm} />,
    1: <CompanyInfo onClose={() => setOnboardingModalOpen(false)} onSubmit={gotoNextForm} />,
    2: <TermsAndConditions onClose={() => setOnboardingModalOpen(false)} onSubmit={gotoNextForm} />,
    3: <BillingInfo onClose={() => setOnboardingModalOpen(false)} onSubmit={gotoNextForm} />,
    4: <ShipperProducts onClose={() => setOnboardingModalOpen(false)} onSubmit={gotoNextForm} />,
    5: <CompanyUploads onClose={() => setOnboardingModalOpen(false)} onSubmit={gotoNextForm} />,
    6: <ShippingLanes onClose={() => setOnboardingModalOpen(false)} onSubmit={gotoNextForm} />,
    7: <Contacts onClose={() => setOnboardingModalOpen(false)} onSubmit={gotoNextForm} />,
    8: <CustomerAgreement onClose={() => setOnboardingModalOpen(false)} onSubmit={gotoNextForm} />,
    9: <ShipperEquipment onClose={() => setOnboardingModalOpen(false)} />
  }
  return (
    <section id="onboarding-section">
      {loadingNext ? (
        <GlobeLoader />
      ) : (
        <Modal
          open={onboardingModalOpen}
          onClose={() => setOnboardingModalOpen(true)}
          className="max-h-[96vh]  my-auto p-4 lg:max-w-[850px]  w-full lg:rounded-[10px] rounded-[8px] bg-[#1a194990] border border-[#1a1949] shadow-[0px,4px,4px,0px,rgba(0,0,0,0.25)] backdrop-blur-[25px] z-999"
        >
          {onboardingForms[activeFormIndex]}
        </Modal>
      )}
    </section>
  )
}

export const GradientCard = ({ children }: { children: React.ReactNode }) => (
  <div
    className="relative bg-gradient-blur-dialog"
    style={{ backgroundImage: `url(${gradientCard.src})`, backgroundSize: '100% 100%' }}
  >
    <div className="absolute left-0 right-0 top-0 bottom-0 m-[2px] bg-gradient-blur-dialog rounded-[10px]" />
    <div className="relative left-0 right-0 top-0 bottom-0 lg:px-[28px] px-[22px] lg:py-[34px] py-[26px] flex flex-col items-center lg:gap-[25px] gap-[18px] text-center">
      {children}
    </div>
  </div>
)
