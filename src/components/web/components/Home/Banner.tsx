'use client'
import FlightSearchForm, { FlightSearchData } from '@/components/shared/FlightSearchForm/FlightSearchForm'
import {
  Award,
  CheckCircle,
  Plane,
  Star
} from 'lucide-react'

const Banner = () => {
  const handleFlightSearch = (searchData: FlightSearchData) => {
    console.log('Flight search:', searchData)
  }

  return (
    <div className='container'>
      <div className="enhanced-banner-container">
        <div className="enhanced-banner-background">
          <div className="floating-elements">
            <div className="floating-element floating-element-1"></div>
            <div className="floating-element floating-element-2"></div>
            <div className="floating-element floating-element-3"></div>
          </div>

          <div className="enhanced-banner-content">
            {/* Left side - Hero content with Flight Search */}
            <div className="enhanced-hero-section">
              <div className="hero-badge-container">
                <div className="hero-badge">
                  <Plane className="hero-badge-icon" size={16} />
                  <span>Trusted by 50,000+ travelers worldwide</span>
                </div>

                <h1 className="enhanced-hero-title">
                  Find Your Perfect
                  <span className="hero-title-highlight"> Flight</span>
                  <div className="title-decoration"></div>
                </h1>

                <p className="enhanced-hero-subtitle">
                  Discover amazing destinations with unbeatable prices, exclusive deals, and a seamless booking experience that puts you first. Your journey to extraordinary adventures starts here.
                </p>

                <div className="hero-trust-indicators">
                  <div className="trust-indicator">
                    <CheckCircle size={14} />
                    <span>Verified Platform</span>
                  </div>
                  <div className="trust-indicator">
                    <Award size={14} />
                    <span>Best Prices</span>
                  </div>
                  <div className="trust-indicator">
                    <Star size={14} />
                    <span>5-Star Rated</span>
                  </div>
                </div>
              </div>

              {/* <div className="enhanced-hero-stats">
                <div className="stats-container">
                  <div className="stat-item">
                    <div className="stat-icon">
                      <Users size={18} />
                    </div>
                    <div className="stat-content">
                      <div className="stat-number">50K+</div>
                      <div className="stat-label">Happy Customers</div>
                    </div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-icon">
                      <Plane size={18} />
                    </div>
                    <div className="stat-content">
                      <div className="stat-number">1M+</div>
                      <div className="stat-label">Flights Booked</div>
                    </div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-icon">
                      <Globe size={18} />
                    </div>
                    <div className="stat-content">
                      <div className="stat-number">500+</div>
                      <div className="stat-label">Destinations</div>
                    </div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-icon">
                      <Heart size={18} />
                    </div>
                    <div className="stat-content">
                      <div className="stat-number">99%</div>
                      <div className="stat-label">Satisfaction</div>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>

            {/* Right side - Enhanced content */}
            <div className="enhanced-right-section">

              <div className="flight-search-section">
                <FlightSearchForm onSearch={handleFlightSearch} />
              </div>
              {/* <div className="enhanced-hero-features">
                <div className="feature-card">
                  <div className="feature-icon">
                    <Zap size={20} />
                  </div>
                  <div className="feature-content">
                    <h3>Lightning Fast</h3>
                    <p>Book flights in under 60 seconds with our streamlined process</p>
                  </div>
                </div>

                <div className="feature-card">
                  <div className="feature-icon">
                    <TrendingUp size={20} />
                  </div>
                  <div className="feature-content">
                    <h3>Best Deals</h3>
                    <p>Up to 40% off on premium flights and exclusive member discounts</p>
                  </div>
                </div>

                <div className="feature-card">
                  <div className="feature-icon">
                    <Shield size={20} />
                  </div>
                  <div className="feature-content">
                    <h3>100% Secure</h3>
                    <p>Bank-level security with SSL encryption and fraud protection</p>
                  </div>
                </div>

                <div className="feature-card">
                  <div className="feature-icon">
                    <Clock size={20} />
                  </div>
                  <div className="feature-content">
                    <h3>24/7 Support</h3>
                    <p>Round-the-clock assistance from our dedicated travel experts</p>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner
