import { BRD } from '@components/ui/BRD'
import { Title } from '@components/ui/Typography'

export const AboutSection = () => {
  return (
    <section className="lg:py-[130px] py-[100px] bg-[#191a4c] text-white">
      <div className="container text-center lg:mb-[72px] mb-[54px]">
        <div className="flex justify-center lg:mb-[26px] mb-[20px]">
          <Title>About Us</Title>
        </div>
        <div className="text-body-xl lg:mb-[62px] mb-[46px]">
          At rFleet Inc., we unite shippers, carriers, sellers, and buyers in a<BRD />
          decentralized ecosystem, cultivating collaboration across the supply
          <BRD />
          chain. We advocate fair wages and practices, promoting transparency
          <BRD />
          and accountability from carriers, drivers, and vendors. Together, we&apos;re
          <BRD />
          transforming the industry, forging a better way to do business.
        </div>
        <button className="hover-bg-white-glow lg:w-auto w-full lg:px-[80px] px-[60px] lg:py-[15px] py-[12px] border border-solid border-gray-200 lg:text-[20px] text-[15px] font-semibold rounded-md bg-[#2F80ED] hover:bg-[#4796fd] transition duration-300">
          LEARN MORE
        </button>
      </div>
      <div className="container">
        <div className="relative">
          <div className="absolute left-0 right-0 top-0 bottom-0 bg-gradient-card"></div>
          <div className="relative grid lg:grid-cols-4 grid-cols-2 gap-[2px]">
            <Card>{['~$100 billion', 'cumulative trading volume to date']}</Card>
            <Card>{['0.8%', 'of the global crypto spot trading volume']}</Card>
            <Card>{['~30', 'Gravity Teammates (& growing)']}</Card>
            <Card>{['25+', 'leading global and local crypto exchanges']}</Card>
            <Card>{['2017', 'start, crypto-natives']}</Card>
            <Card>{['1,200+', 'crypto-asset pairs']}</Card>
            <Card>{['24/7', 'liquidity']}</Card>
            <Card>{['5 billion+', 'trades done to date']}</Card>
          </div>
        </div>
      </div>
    </section>
  )
}

interface CardProps {
  children: [string, string]
}

const Card = ({ children }: CardProps) => (
  <div className="cursor-default group text-center lg:px-[32px] px-[24px] lg:py-[30px] py-[24px] bg-[#191a4c] hover:bg-gradient-card">
    <h4 className="font-[500] lg:mb-[15px] mb-[13px]">{children[0]}</h4>
    <div className="text-body-lg text-gray-400 group-hover:text-white">{children[1]}</div>
  </div>
)
