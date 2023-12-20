'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AiOutlineClose } from 'react-icons/ai'
import { ParallaxBanner } from 'react-scroll-parallax'

import Link from 'next/link'

import { yupResolver } from '@hookform/resolvers/yup'

import WalletMoney from '@assets/icons/wallet-money.svg'
import bgWireframeGlobe from '@assets/images/bg-wireframe-globe.png'
import gradientCard from '@assets/images/gradient-card-cyan-indigo-to-br.png'
import { BRD } from '@components/ui/BRD'
import { TransparentButton } from '@components/ui/Button'
import { GlobeLoader } from '@components/ui/Loaders'
import { Modal } from '@components/ui/Modal'
import { Title } from '@components/ui/Typography'

import { companyInfoInputs, companyInfoSchema } from './schemas/companyInfo'
import { payeeInfoInputs, payeeInfoSchema } from './schemas/payeeInfo'
import { CarrierEquipment } from './sections/CarrierEquipment'
import { CompanyInfo } from './sections/CompanyInfo'
import { CompanyValidation } from './sections/CompanyValidation'
import { ContactForm } from './sections/ContactForm'
import { Contacts } from './sections/Contacts'
import { DocusignAgreement } from './sections/DocusignAgreement'
import { DriverForm } from './sections/DriverForm'
import { DriverInfo } from './sections/DriverInfo'
import { InsurancePolicy } from './sections/InsurancePolicy'
import { InsurancePolicyForm } from './sections/InsurancePolicyForm'
import { LocationValidation } from './sections/LocationValidation'
import { PayeeInfo } from './sections/PayeeInfo'
import { PreferedLanes } from './sections/PreferredLanes'
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

  const companyInfoForm = useForm<companyInfoInputs>({
    mode: 'onChange',
    resolver: yupResolver(companyInfoSchema),
    defaultValues: {}
  })
  const payeeInfoForm = useForm<payeeInfoInputs>({
    mode: 'onChange',
    resolver: yupResolver(payeeInfoSchema),
    defaultValues: {
      quickPay: ''
    }
  })

  const onboardingForms: {
    [key: number]: JSX.Element
  } = {
    0: <CompanyInfo form={companyInfoForm} onClose={() => setOnboardingModalOpen(false)} onSubmit={gotoNextForm} />,
    1: <TermsAndConditions onClose={() => setOnboardingModalOpen(false)} onSubmit={gotoNextForm} />,
    2: (
      <PayeeInfo
        companyInfoForm={companyInfoForm}
        form={payeeInfoForm}
        onClose={() => setOnboardingModalOpen(false)}
        onSubmit={gotoNextForm}
      />
    ),
    3: <LocationValidation onClose={() => setOnboardingModalOpen(false)} onSubmit={gotoNextForm} />,
    4: <CompanyValidation onClose={() => setOnboardingModalOpen(false)} onSubmit={gotoNextForm} />,
    5: <DocusignAgreement onClose={() => setOnboardingModalOpen(false)} onSubmit={gotoNextForm} />,
    6: <CarrierEquipment onClose={() => setOnboardingModalOpen(false)} onSubmit={gotoNextForm} />,
    7: <DriverInfo onClose={() => setOnboardingModalOpen(false)} onSubmit={gotoNextForm} />,
    8: <PreferedLanes onClose={() => setOnboardingModalOpen(false)} onSubmit={gotoNextForm} />,
    9: <InsurancePolicy onClose={() => setOnboardingModalOpen(false)} onSubmit={gotoNextForm} />,
    10: <Contacts onClose={() => setOnboardingModalOpen(false)} />
  }
  return (
    <section id="onboarding-section">
      {loadingNext ? (
        <GlobeLoader />
      ) : (
        <Modal
          open={onboardingModalOpen}
          onClose={() => setOnboardingModalOpen(true)}
          className="max-h-[96vh]  my-auto p-4 lg:max-w-[900px]  w-full lg:rounded-[10px] rounded-[8px] bg-[#1a194990] border border-[#1a1949] shadow-[0px,4px,4px,0px,rgba(0,0,0,0.25)] backdrop-blur-[25px] z-999"
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
