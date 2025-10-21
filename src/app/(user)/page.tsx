import Banner from '@/components/web/components/Home/Banner'
import CustomerReview from '@/components/web/components/Home/CustomerReview'
import ServicesCard from '@/components/web/components/Home/ServicesCard'

export default function Home() {

  return (
    <div className="min-h-screen modern-home-layout">
      <Banner />
      <div className="services-section">
        <ServicesCard />
      </div>
      <CustomerReview />
    </div>
  )
}
