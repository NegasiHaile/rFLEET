'use client'

import { useEffect, useState } from 'react'

import { Box } from '@components/ui/Box'
import { BoxLight } from '@components/ui/BoxLight'
import { ClipBoard } from '@components/ui/Clipboard'
import { ECommerce } from '@components/ui/E-Commerce'
import { Logo } from '@components/ui/Logo'
import { TruckLogo } from '@components/ui/TruckLogo'

export default function Sidebar() {
  const navigateToSection = (sectionId: any) => {
    window.location.hash = `#${sectionId}`
  }
  return (
    <header className="bg-[#141943] h-100">
      <div className="flex flex-col h-full overflow-y-auto">
        <div className="flex justify-between items-center p-6">
          <Logo />
        </div>

        <nav className="flex flex-col gap-6 p-8">
          <div
            onClick={() => navigateToSection('dashboard')}
            className="flex items-center pl-1 p-2 rounded-lg hover:cursor-pointer hover:bg-[#252C65]"
          >
            <BoxLight />
            <div className="text-[#FFFFFF80] text-base font-medium leading-5 ml-4 font-poppins">Dashboard</div>
          </div>

          <div
            onClick={() => navigateToSection('new-quote')}
            className="flex items-center pl-1 p-2 rounded-lg hover:cursor-pointer hover:bg-[#252C65]"
          >
            <ClipBoard />
            <div className="text-[#FFFFFF80] font-poppins text-base font-medium ml-4 leading-5">New Quote</div>
          </div>

          <div
            onClick={() => navigateToSection('new-shipment')}
            className="flex items-center pl-1 p-2 rounded-lg hover:cursor-pointer hover:bg-[#252C65]"
          >
            <TruckLogo />
            <div className="text-[#FFFFFF80] font-poppins text-base font-medium ml-4 leading-5">New Shipment</div>
          </div>

          <div
            onClick={() => navigateToSection('e-commerce')}
            className="flex items-center pl-1 p-2 rounded-lg hover:cursor-pointer hover:bg-[#252C65]"
          >
            <ECommerce />
            <div className="text-[#FFFFFF80] font-poppins text-base font-medium ml-4 leading-5">E-Commerce</div>
          </div>

          <div
            onClick={() => navigateToSection('product')}
            className="flex items-center pl-1 p-2 rounded-lg hover:cursor-pointer hover:bg-[#252C65]"
          >
            <BoxLight />
            <div className="text-[#FFFFFF80] font-poppins text-base font-medium ml-4 leading-5">Product</div>
          </div>

          <div
            onClick={() => navigateToSection('addressbook')}
            className="flex items-center pl-1 p-2 rounded-lg hover:cursor-pointer hover:bg-[#252C65]"
          >
            <ClipBoard />
            <div className="text-[#FFFFFF80] font-poppins text-base font-medium ml-4 leading-5">Address Book</div>
          </div>

          <div
            onClick={() => navigateToSection('shipmentprofile')}
            className="flex items-center pl-1 p-2 rounded-lg hover:cursor-pointer hover:bg-[#252C65]"
          >
            <BoxLight />
            <div className="text-[#FFFFFF80] font-poppins text-base font-medium ml-4 leading-5">Shipment Profile</div>
          </div>

          <div
            onClick={() => navigateToSection('newpfq-newrfb')}
            className="flex items-center pl-1 p-2 rounded-lg hover:cursor-pointer hover:bg-[#252C65]"
          >
            <ECommerce />
            <div className="text-[#FFFFFF80] font-poppins text-base font-medium ml-4 leading-5">New PFQ/New RFB</div>
          </div>

          <div
            onClick={() => navigateToSection('reports')}
            className="flex items-center pl-1 p-2 rounded-lg hover:cursor-pointer hover:bg-[#252C65]"
          >
            <ClipBoard />
            <div className="text-[#FFFFFF80] font-poppins text-base font-medium ml-4 leading-5">Reports</div>
          </div>
        </nav>
      </div>
    </header>
  )
}
