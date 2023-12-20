'use client'

import { useEffect, useState } from 'react'

import Map from '@assets/images/Maps.png'
import { Arrows } from '@components/ui/Arrows'
import { DropdownArrow } from '@components/ui/DropdownArrow'
import { Search } from '@components/ui/Search'

import Footer from '../components/footer'
import { Header } from '../components/header'
import { Payment, columns } from './table/columns'
import { DataTable } from './table/data-table'

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: '1ee86b9',
      load: '#427925',
      type: 'Parcel',
      status: 'Out for Delivery',
      customer: 'Alibaba',
      carrier: 'FedEx',
      shipping: 'Los Angeles, CA / Houston, TX',
      date: '09/06/2021 01:14 PM'
    },
    {
      id: '1e8e137',
      load: '#229683',
      type: 'Parcel',
      status: 'In Transit',
      customer: 'Walmart',
      carrier: 'FedEx',
      shipping: 'New York, NY / Houston, TX',
      date: '08/21/2021 07:46 PM'
    },
    {
      id: '5e3bf37',
      load: '#207339',
      type: 'Freight',
      status: 'Out for Delivery',
      customer: 'Alibaba',
      carrier: 'USPS',
      shipping: 'Chicago, IL / Houston, TX',
      date: '03/06/2021 06:56 PM'
    },
    {
      id: 'aca76e',
      load: '#577697',
      type: 'Envelope',
      status: 'In Transit',
      customer: 'Walmart',
      carrier: 'USPS',
      shipping: 'Houston, TX / New York, NY',
      date: '07/16/2021 05:04 AM'
    },
    {
      id: '15d6d00',
      load: '#154580',
      type: 'Freight',
      status: 'In Transit',
      customer: 'Amazon',
      carrier: 'USPS',
      shipping: 'New York, NY / Chicago, IL',
      date: '05/13/2021 08:42 PM'
    },
    {
      id: '1ee86b9',
      load: '#427925',
      type: 'Parcel',
      status: 'Out for Delivery',
      customer: 'Alibaba',
      carrier: 'FedEx',
      shipping: 'Los Angeles, CA / Houston, TX',
      date: '09/06/2021 01:14 PM'
    },
    {
      id: '1e8e137',
      load: '#229683',
      type: 'Parcel',
      status: 'In Transit',
      customer: 'Walmart',
      carrier: 'FedEx',
      shipping: 'New York, NY / Houston, TX',
      date: '08/21/2021 07:46 PM'
    },
    {
      id: '5e3bf37',
      load: '#207339',
      type: 'Freight',
      status: 'Out for Delivery',
      customer: 'Alibaba',
      carrier: 'USPS',
      shipping: 'Chicago, IL / Houston, TX',
      date: '03/06/2021 06:56 PM'
    },
    {
      id: 'aca76e',
      load: '#577697',
      type: 'Envelope',
      status: 'In Transit',
      customer: 'Walmart',
      carrier: 'USPS',
      shipping: 'Houston, TX / New York, NY',
      date: '07/16/2021 05:04 AM'
    },
    {
      id: '15d6d00',
      load: '#154580',
      type: 'Freight',
      status: 'In Transit',
      customer: 'Amazon',
      carrier: 'USPS',
      shipping: 'New York, NY / Chicago, IL',
      date: '05/13/2021 08:42 PM'
    }
  ]
}

const DashboardSection = () => {
  const [selected, setSelected] = useState<number | null>(null)
  const [selectedType, setSelectedType] = useState<number | null>(null)
  const [data, setData] = useState<Payment[] | null>(null)

  useEffect(() => {
    setSelected(0)
  }, [])

  const handleClick = (index: number) => {
    setSelected(index)
  }

  useEffect(() => {
    setSelectedType(0)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData()
      setData(result)
    }
    fetchData()
  }, [])

  const handleClickType = (index: number) => {
    setSelectedType(index)
  }

  const getBgColorType = (index: number) => {
    if (selectedType === index) {
      return 'bg-blue-500 !text-white'
    }
    return ''
  }

  const getBgColor = (index: number) => {
    if (selected === index) {
      return 'bg-blue-500 !text-white'
    }
    return ''
  }

  return (
    <main>
      <div className="bg-[#141943] h-12"></div>
      <div className="relative p-8 bg-[#F6F7FF] overflow-hidden">
        <Header title="Dashboard" />
        <div
          className="mt-10 rounded-lg bg-[#FFF] shadow-xl"
          style={{ boxShadow: '0 -10px 10px rgba(0, 0, 0, 0.025)' }}
        >
          <div className="flex justify-between p-4">
            <div className="text-[#0C0A09] flex items-center font-poppins text-b2 font-semibold">Shipping</div>

            <div className="flex border border-[#B8BEF8] rounded-d-6 p-[2px] justify-content-center w-60">
              <div className="flex w-[100%]">
                <div
                  className={`px-3 p-1 w-[50%] flex flex-row justify-center text-black items-center cursor-pointer rounded-md ${getBgColor(
                    0
                  )}`}
                  onClick={() => handleClick(0)}
                >
                  <span>Flat</span>
                </div>
                <div
                  className={`px-3 p-1 w-[50%] flex flex-row justify-center text-black items-center cursor-pointer rounded-md ${getBgColor(
                    1
                  )}`}
                  onClick={() => handleClick(1)}
                >
                  <span>3D</span>
                </div>
              </div>
            </div>
          </div>

          <img src={Map.src} alt="" />
        </div>

        <div className="mt-10 rounded-lg bg-[#FFF]">
          <div className="p-4">
            <div className="text-gray border border-gray p-2 rounded-lg flex">
              <Search />
              <input className="ml-2 w-[100%]" placeholder="Search" />
            </div>

            <div className="text-black mt-4 flex">
              <div className="flex items-center text-black font-poppins text-b3 font-medium">Status</div>
              <div className="flex border border-[#B8BEF8] rounded-lg p-[2px] justify-content-center ml-4">
                <div className="flex">
                  <div
                    className={`px-3 p-1 flex flex-row justify-center text-black items-center cursor-pointer rounded-md ${getBgColorType(
                      0
                    )}`}
                    onClick={() => handleClickType(0)}
                  >
                    <span className="px-5">All</span>
                  </div>
                  <div
                    className={`px-3 p-1 flex flex-row justify-center text-black items-center cursor-pointer rounded-md ${getBgColorType(
                      1
                    )}`}
                    onClick={() => handleClickType(1)}
                  >
                    <span className="px-5">Parcel</span>
                  </div>
                  <div
                    className={`px-3 p-1 flex flex-row justify-center text-black items-center cursor-pointer rounded-md ${getBgColorType(
                      2
                    )}`}
                    onClick={() => handleClickType(2)}
                  >
                    <span className="px-5">LTL</span>
                  </div>
                  <div
                    className={`px-3 p-1 flex flex-row justify-center text-black items-center cursor-pointer rounded-md ${getBgColorType(
                      3
                    )}`}
                    onClick={() => handleClickType(3)}
                  >
                    <span className="px-5">FTL</span>
                  </div>
                  <div
                    className={`px-3 p-1 flex flex-row justify-center text-black items-center cursor-pointer rounded-md ${getBgColorType(
                      4
                    )}`}
                    onClick={() => handleClickType(4)}
                  >
                    <span className="px-5">Drayage</span>
                  </div>
                  <div
                    className={`px-3 p-1 flex flex-row justify-center text-black items-center cursor-pointer rounded-md ${getBgColorType(
                      5
                    )}`}
                    onClick={() => handleClickType(5)}
                  >
                    <span className="px-5">Rail</span>
                  </div>
                  <div
                    className={`px-3 p-1 flex flex-row justify-center text-black items-center cursor-pointer rounded-md ${getBgColorType(
                      6
                    )}`}
                    onClick={() => handleClickType(6)}
                  >
                    <span className="px-5">Ocean</span>
                  </div>
                  <div
                    className={`px-3 p-1 flex flex-row justify-center text-black items-center cursor-pointer rounded-md ${getBgColorType(
                      7
                    )}`}
                    onClick={() => handleClickType(7)}
                  >
                    <span className="px-5">Air</span>
                  </div>
                </div>
              </div>
              <div className="w-12 border border-[#2F80ED] ml-2 rounded-lg hover:cursor-pointer">
                <div className="h-12 flex justify-center items-center hover:cursor-pointer">
                  <Arrows />
                </div>
              </div>
              <div className="flex items-center ml-4">Entries</div>
              <div className=" border border-[#2F80ED] ml-4 flex rounded-lg hover:cursor-pointer">
                <div className="flex items-center px-4">15</div>
                <div className="flex items-center px-2">
                  <DropdownArrow />
                </div>
              </div>
            </div>
          </div>
          <div className="text-black">{data && <DataTable columns={columns} data={data} />}</div>
        </div>
        <Footer />
      </div>
    </main>
  )
}
export default DashboardSection
