'use client'

import { ParallaxProvider } from 'react-scroll-parallax'

import './Botframework.css'
import { AboutSection } from './sections/About'
import { BannerSection } from './sections/Banner'
import { CalculatorSection } from './sections/Calculator'
import { LoginPortalSection } from './sections/LoginPortal'
import { OnboardingSection } from './sections/Onboarding'
import { SearchSection } from './sections/Search'

export default function Home() {
  return (
    <ParallaxProvider>
      <PageContent />
    </ParallaxProvider>
  )
}

const PageContent = () => {
  return (
    <main>
      <BannerSection />
      <SearchSection />
      <CalculatorSection />
      <LoginPortalSection />
      <OnboardingSection />
      <AboutSection />
    </main>
  )
}
