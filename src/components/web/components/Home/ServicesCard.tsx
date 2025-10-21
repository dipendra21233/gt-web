'use client'
import { translation } from '@/utils/translation'
import {
  Award,
  Clock,
  DollarSign,
  Gift,
  Headphones,
  Plane,
  Shield,
  Star,
} from 'lucide-react'

const ServicesCard = () => {
  const services = [
    {
      icon: <Plane size={32} />,
      title: 'Easy Booking',
      description:
        'We offer easy and convenient flight bookings with attractive offers.',
      gradient: 'from-blue-500 to-purple-600',
    },
    {
      icon: <DollarSign size={32} />,
      title: 'Lowest Price',
      description:
        'We ensure low rates on hotel reservation, holiday packages and on flight tickets.',
      gradient: 'from-green-500 to-teal-600',
    },
    {
      icon: <Gift size={32} />,
      title: 'Exciting Deals',
      description:
        'Enjoy exciting deals on flights, hotels, buses, car rental and tour packages.',
      gradient: 'from-pink-500 to-rose-600',
    },
    {
      icon: <Headphones size={32} />,
      title: '24/7 Support',
      description:
        'Get assistance 24x7 on any kind of travel related query, we are happy to assist you.',
      gradient: 'from-orange-500 to-red-600',
    },
  ]

  const features = [
    { icon: <Star size={20} />, text: '5-Star Rated Service' },
    { icon: <Shield size={20} />, text: '100% Secure Booking' },
    { icon: <Clock size={20} />, text: 'Instant Confirmation' },
    { icon: <Award size={20} />, text: 'Award Winning Support' },
  ]

  return (
    <div className="container mx-auto px-4 pt-[100px]">
      {/* Section Header */}
      <div className="services-header">
        <div className="services-badge">
          <Star className="services-badge-icon" size={16} />
          <span>Why choose us</span>
        </div>

        <h2 className="services-title">
          {translation?.WHY_WITH_US || 'Why book with us?'}
        </h2>

        <p className="services-subtitle">
          Experience the difference with our premium travel services and
          unmatched customer satisfaction
        </p>

        {/* Feature badges */}
        <div className="services-features">
          {features.map((feature, index) => (
            <div key={index} className="service-feature-badge">
              <div className="service-feature-icon">{feature.icon}</div>
              <span>{feature.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <div className="services-grid">
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <div
              className={`service-icon-wrapper bg-gradient-to-br ${service.gradient}`}
            >
              {service.icon}
            </div>

            <div className="service-content">
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </div>

            <div className="service-card-decoration"></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ServicesCard
