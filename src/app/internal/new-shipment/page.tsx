import Footer from '../components/footer'
import { Header } from '../components/header'
import { CalculatorSection } from './Calculator'

const NewShipmentSection = () => {
  return (
    <main>
      <div className="bg-[#141943] h-12"></div>
      <div className="relative p-8 bg-[#F6F7FF] min-h-[100vh]">
        <Header title="New Shipment" />
        <CalculatorSection />
        <Footer />
      </div>
    </main>
  )
}
export default NewShipmentSection
