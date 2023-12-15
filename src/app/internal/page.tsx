'use client'

import React, { useEffect, useState } from 'react'
import { ParallaxProvider } from 'react-scroll-parallax'

import Link from 'next/link'

// import { WMSSection } from './WMS/page'
// import { AddressBookSection } from './address-book/page'
import DashboardSection from './dashboard/page'

// import { ECommerceSection } from './ecommerce/page'
// import { NewShipmentSection } from './new-shipment/page'
// import { NewPFQSection } from './newPFQ/page'
// import { NewQuoteSection } from './newquote/page'
// import { ProductSection } from './product/page'
// import { ReportsSection } from './reports/page'
// import { ShipmentProfileSection } from './shipment-profile/page'

// Define the props that Home component accepts
interface HomeProps {
  // ... you can add more props here if needed
}

export default function Home(props: HomeProps) {
  return (
    <ParallaxProvider>
      <DashboardSection />
    </ParallaxProvider>
  )
}
