'use client'

import { Star } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const reviews = [
  {
    id: 1,
    name: 'Sarah Thompson',
    role: 'Project Manager',
    rating: 5,
    text: 'This AI product has transformed the way I manage my daily tasks. It\'s intuitive, fast, and incredibly accurate!',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Software Developer',
    rating: 5,
    text: 'I was skeptical at first, but this AI tool saved me hours of work. The automation features are a game-changer.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Data Analyst',
    rating: 5,
    text: 'The AI\'s ability to analyze data and provide insights is unmatched. It\'s like having a personal assistant 24/7.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 4,
    name: 'David Kumar',
    role: 'Marketing Director',
    rating: 5,
    text: 'Outstanding service and support! The team went above and beyond to ensure our project was successful.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 5,
    name: 'Lisa Wang',
    role: 'Business Owner',
    rating: 5,
    text: 'Professional, reliable, and innovative solutions. Highly recommend their services to anyone looking for quality.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 6,
    name: 'James Wilson',
    role: 'Operations Manager',
    rating: 5,
    text: 'Exceptional attention to detail and customer service. They truly understand what their clients need.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face'
  }
]

const StarRating = ({ }) => {
  return (
    <div className="flex items-center gap-1 mb-4">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          className="w-5 h-5 text-yellow-400 fill-current"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

const ReviewCard = ({ review }: { review: typeof reviews[0] }) => {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-auto min-h-[320px]">
      <StarRating />

      <p className="text-gray-700 text-sm leading-relaxed mb-8 flex-grow">
        &quot;{review.text}&quot;
      </p>

      <div className="flex items-center gap-4 mt-auto">
        <Image
          src={review.avatar}
          alt={review.name}
          width={48}
          height={48}
          className="w-12 h-12 rounded-full object-cover flex-shrink-0"
        />
        <div className="min-w-0">
          <h4 className="font-semibold text-gray-900 text-sm truncate">{review.name}</h4>
          <p className="text-gray-500 text-xs truncate">{review.role}</p>
        </div>
      </div>
    </div>
  )
}

const CustomerReview = () => {
  const swiperRef = useRef<any>(null)

  useEffect(() => {
    // Ensure Swiper is properly initialized
    if (swiperRef.current) {
      swiperRef.current.update()
    }
  }, [])

  return (
    <section className="customer-review-section">
      <div className="container mx-auto px-4">
        {/* Section Header - Matching Services Section Style */}
        <div className="services-header">
          <div className="services-badge">
            <Star className="services-badge-icon" size={16} />
            <span>Customer Reviews</span>
          </div>

          <h2 className="services-title">
            What Our Customers Say
          </h2>

          <p className="services-subtitle">
            Don&apos;t just take our word for it. Here&apos;s what our satisfied customers have to say about their experience with us.
          </p>
        </div>

        <div className="relative">
          <Swiper
            ref={swiperRef}
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            pagination={{
              clickable: true,
              el: '.swiper-pagination-custom',
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
            }}
            className="review-swiper"
            onSwiper={(swiper) => {
              swiperRef.current = swiper
            }}
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id}>
                <ReviewCard review={review} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button className="swiper-button-prev-custom absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full w-12 h-12 shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button className="swiper-button-next-custom absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full w-12 h-12 shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Custom Pagination */}
          <div className="swiper-pagination-custom flex justify-center mt-8 gap-2"></div>
        </div>
      </div>
    </section>
  )
}

export default CustomerReview
