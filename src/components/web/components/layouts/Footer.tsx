'use client'
import gtLogo from '@/../public/images/gt-logo.png'
import { navItems } from '@/utils/constant'
import { translation } from '@/utils/translation'
import {
  Facebook,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Paragraph } from 'theme-ui'

const Footer = () => {
  return (
    <footer className="modern-footer">
      <div className="modern-footer-content">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          {/* Top Footer Sections */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Logo and Company Info */}
            <div className="modern-footer-section">
              <Link href="/" className="logo mb-6 block">
                <Image
                  src={gtLogo}
                  alt="Gayatri Travels Logo"
                  width={150}
                  height={60}
                />
              </Link>
              <p className="text-gray-300 leading-relaxed mb-4">
                Your trusted travel partner for amazing destinations with the
                best prices, exclusive deals, and seamless booking experience.
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <MapPin size={16} />
                <span>Serving travelers worldwide since 2016</span>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="modern-footer-section">
              <h3 className="modern-footer-title">
                {translation?.GAYATRI_TRAVELS}
              </h3>
              <div className="space-y-2">
                {navItems?.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="modern-footer-link"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Products & Services */}
            <div className="modern-footer-section">
              <h3 className="modern-footer-title">
                {translation?.PRODUCT_AND_SERVICES}
              </h3>
              <div className="space-y-2">
                <a href="#" className="modern-footer-link">
                  Flight Booking
                </a>
                <a href="#" className="modern-footer-link">
                  Hotel Reservation
                </a>
                <a href="#" className="modern-footer-link">
                  Holiday Packages
                </a>
                <a href="#" className="modern-footer-link">
                  Car Rental
                </a>
                <a href="#" className="modern-footer-link">
                  Tour Packages
                </a>
                <a href="#" className="modern-footer-link">
                  Travel Insurance
                </a>
              </div>
            </div>

            {/* Contact & Social */}
            <div className="modern-footer-section">
              <h3 className="modern-footer-title">
                {translation?.LETS_GET_CONNECTED}
              </h3>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-gray-300">
                  <Phone size={16} className="text-orange-500" />
                  <span>8011112020</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Mail size={16} className="text-orange-500" />
                  <span>info@gayatritravels.in</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Globe size={16} className="text-orange-500" />
                  <span>www.gayatritravels.in</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="modern-footer-social">
                <a href="#" className="modern-footer-social-link">
                  <Facebook size={20} />
                </a>
                <a href="#" className="modern-footer-social-link">
                  <Twitter size={20} />
                </a>
                <a href="#" className="modern-footer-social-link">
                  <Linkedin size={20} />
                </a>
                <a href="#" className="modern-footer-social-link">
                  <Mail size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="modern-footer-bottom">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <Paragraph className="text-gray-400 text-center md:text-left">
                {translation?.COPYRIGHT_TEXT}
              </Paragraph>

              <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-400">
                <span>Privacy Policy</span>
                <span className="hidden sm:inline">•</span>
                <span>Terms of Service</span>
                <span className="hidden sm:inline">•</span>
                <span>Cookie Policy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
