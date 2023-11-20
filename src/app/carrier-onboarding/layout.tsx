import Footer from '@components/layout/Footer'
import Header from '@components/layout/Header'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="bg-[#191a4c] flex-grow">{children}</div>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  )
}
