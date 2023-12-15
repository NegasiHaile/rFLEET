import Footer from '../components/footer'
import { Header } from '../components/header'
import QuoteSection from './quotesection'

const NewQuoteSection = () => {
  return (
    <main>
      <div className="bg-[#141943] h-12"></div>
      <div className="relative p-8 bg-[#F6F7FF]">
        <Header title="New Quote" />
        <QuoteSection />
        <Footer />
      </div>
    </main>
  )
}
export default NewQuoteSection
