'use client'

import React, { useEffect, useState } from 'react'
import { ParallaxProvider } from 'react-scroll-parallax'

import { AddressBookSection } from './sections/Address Book'
import { DashboardSection } from './sections/Dashboard'
import { ECommerceSection } from './sections/ECommerce'
import { NewQuoteSection } from './sections/New Quote'
import { NewPFQSection } from './sections/NewPFQ'
import { NewShipmentSection } from './sections/NewShipment'
import { ProductSection } from './sections/Product'
import { ReportsSection } from './sections/Reports'
import { ShipmentProfileSection } from './sections/Shipment Profile'

// Define the props that Home component accepts
interface HomeProps {
  // ... you can add more props here if needed
}

export default function Home(props: HomeProps) {
  const [currentHash, setCurrentHash] = useState<string>(() =>
    typeof window !== 'undefined' ? window.location.hash : ''
  )

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const handleHashChange = () => {
      setCurrentHash(window.location.hash)
    }

    window.addEventListener('hashchange', handleHashChange)

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  return (
    <ParallaxProvider>
      <PageContent currentHash={currentHash} />
    </ParallaxProvider>
  )
}

// Define the props that PageContent component accepts
interface PageContentProps {
  currentHash: string
}

const PageContent = ({ currentHash }: PageContentProps) => {
  const renderSection = () => {
    switch (currentHash) {
      case '#dashboard':
        return <DashboardSection />
      case '#new-quote':
        return <NewQuoteSection />
      case '#new-shipment':
        return <NewShipmentSection />
      case '#e-commerce':
        return <ECommerceSection />
      case '#product':
        return <ProductSection />
      case '#addressbook':
        return <AddressBookSection />
      case '#shipmentprofile':
        return <ShipmentProfileSection />
      case '#newpfq-newrfb':
        return <NewPFQSection />
      case '#reports':
        return <ReportsSection />

      default:
        return <DashboardSection />
    }
  }

  return <main>{renderSection()}</main>
}
