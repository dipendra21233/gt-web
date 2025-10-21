'use client'

import { useGetBalanceData } from '@/queries/useGetBalanceData'
import { logout } from '@/store/actions/auth.action'
import { ACCESS_TOKEN } from '@/utils/constant'
import { setInitialStorageState } from '@/utils/functions'
import { appRoutes } from '@/utils/routes'
import Cookies from 'js-cookie'
import { ChevronDown, LogOut, Settings, User, UserCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { memo, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

// Custom hook for scroll direction detection
const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(
    null
  )
  const [isVisible, setIsVisible] = useState(true)
  const lastScrollY = useRef(0)
  const ticking = useRef(false)

  useEffect(() => {
    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop

      if (Math.abs(scrollY - lastScrollY.current) < 10) {
        ticking.current = false
        return
      }

      const direction = scrollY > lastScrollY.current ? 'down' : 'up'

      // Show header when scrolling up or at top
      if (direction === 'up' || scrollY < 10) {
        setIsVisible(true)
      }
      // Hide header when scrolling down (but not at the very top)
      else if (direction === 'down' && scrollY > 100) {
        setIsVisible(false)
      }

      setScrollDirection(direction)
      lastScrollY.current = scrollY > 0 ? scrollY : 0
      ticking.current = false
    }

    const requestTick = () => {
      if (!ticking.current) {
        requestAnimationFrame(updateScrollDirection)
        ticking.current = true
      }
    }

    const onScroll = () => requestTick()

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return { scrollDirection, isVisible }
}

export const ModernHeader = memo(() => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { balanceData } = useGetBalanceData()
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)
  const { isVisible } = useScrollDirection()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleClickLogout = () => {
    const accessToken = Cookies.get(ACCESS_TOKEN)
    if (accessToken) {
      dispatch(
        logout(accessToken, async (res: boolean) => {
          if (res) {
            router.push(appRoutes?.home)
            setInitialStorageState()
          }
        })
      )
    }
  }


  return (
    <header
      className="modern-header-wrapper"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        width: '100%',
        borderBottom: '1px solid #e5e7eb',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(12px)',
        transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        willChange: 'transform',
      }}
    >
      <div
        style={{
          display: 'flex',
          height: '74px',
          alignItems: 'center',
          gap: '20px',
          padding: '0 24px',
        }}
      >
        <div style={{ flex: 1 }}></div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            className="hidden md:flex"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              marginRight: '20px',
              // padding: '12px 20px',
              // background:
              //   'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #f0f9ff 100%)',
              // borderRadius: '12px',
              // border: '1px solid #0ea5e9',
              boxShadow: '0 4px 6px -1px rgba(14, 165, 233, 0.1)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Background pattern */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background:
                  'url("data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%230ea5e9" fill-opacity="0.03" fill-rule="evenodd"%3E%3Ccircle cx="3" cy="3" r="3"/%3E%3Ccircle cx="13" cy="13" r="3"/%3E%3C/g%3E%3C/svg%3E")',
                zIndex: 0,
              }}
            />

            <div
              style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}
            >
              <p
                style={{
                  fontSize: '14px',
                  color: '#0369a1',
                  fontWeight: '600',
                  margin: 0,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                Available Balance
              </p>
              <p
                style={{
                  fontSize: '16px',
                  fontWeight: '700',
                  color: '#059669',
                  margin: '2px 0 0 0',
                }}
              >
                ₹{balanceData?.availableBalance}
              </p>
            </div>

            <div
              style={{
                width: '2px',
                height: '40px',
                background:
                  'linear-gradient(to bottom, transparent, #0ea5e9, transparent)',
                borderRadius: '1px',
              }}
            />

            <div
              style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}
            >
              <p
                style={{
                  fontSize: '14px',
                  color: '#0369a1',
                  fontWeight: '600',
                  margin: 0,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                Credit Limit
              </p>
              <p
                style={{
                  fontSize: '16px',
                  fontWeight: '700',
                  color: '#2563eb',
                  margin: '2px 0 0 0',
                }}
              >
                ₹{balanceData?.creditLimit}
              </p>
            </div>

            <div
              style={{
                width: '2px',
                height: '40px',
                background:
                  'linear-gradient(to bottom, transparent, #0ea5e9, transparent)',
                borderRadius: '1px',
              }}
            />

            <div
              style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}
            >
              <p
                style={{
                  fontSize: '14px',
                  color: '#0369a1',
                  fontWeight: '600',
                  margin: 0,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                Due Amount
              </p>
              <p
                style={{
                  fontSize: '16px',
                  fontWeight: '700',
                  color: '#dc2626',
                  margin: '2px 0 0 0',
                }}
              >
                -₹{balanceData?.due}
              </p>
            </div>
          </div>

          {/* Enhanced User Profile Menu */}
          <div style={{ position: 'relative' }} ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 12px',
                borderRadius: '10px',
                background: isProfileOpen
                  ? 'linear-gradient(135deg, #fef3e2, #fef7ed)'
                  : 'transparent',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: isProfileOpen
                  ? '0 2px 8px rgba(0, 0, 0, 0.1)'
                  : 'none',
              }}
              onMouseEnter={(e) => {
                if (!isProfileOpen) {
                  e.currentTarget.style.background =
                    'linear-gradient(135deg, #f9fafb, #f3f4f6)'
                }
              }}
              onMouseLeave={(e) => {
                if (!isProfileOpen) {
                  e.currentTarget.style.background = 'transparent'
                }
              }}
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #ff7b00, #ef9700)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  boxShadow: '0 2px 6px rgba(255, 123, 0, 0.3)',
                }}
              >
                <User size={18} />
              </div>
              <div className="hidden lg:block" style={{ textAlign: 'left' }}>
                <p
                  style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#1f2937',
                    margin: 0,
                  }}
                >
                  Admin User
                </p>
                <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>
                  admin@gayatri.com
                </p>
              </div>
              <ChevronDown
                size={16}
                color="#6b7280"
                style={{
                  transform: isProfileOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease',
                }}
              />
            </button>

            {/* Profile Dropdown */}
            {isProfileOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '8px',
                  width: '220px',
                  background: 'white',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
                  border: '1px solid #e5e7eb',
                  zIndex: 50,
                  overflow: 'hidden',
                }}
              >
                {/* Profile Header */}
                <div
                  style={{
                    padding: '16px',
                    background: 'linear-gradient(135deg, #f8fafc, #f1f5f9)',
                    borderBottom: '1px solid #e2e8f0',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                    }}
                  >
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #ff7b00, #ef9700)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                      }}
                    >
                      <User size={20} />
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: '14px',
                          fontWeight: '600',
                          color: '#1f2937',
                          margin: 0,
                        }}
                      >
                        Admin User
                      </p>
                      <p
                        style={{
                          fontSize: '12px',
                          color: '#6b7280',
                          margin: 0,
                        }}
                      >
                        admin@gayatri.com
                      </p>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div style={{ padding: '8px 0' }}>
                  <button
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 16px',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '14px',
                      color: '#374151',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        'linear-gradient(135deg, #fef3e2, #fef7ed)'
                      e.currentTarget.style.color = '#c2410c'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent'
                      e.currentTarget.style.color = '#374151'
                    }}
                  >
                    <UserCircle size={18} />
                    <span>Profile</span>
                  </button>

                  <button
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 16px',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '14px',
                      color: '#374151',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        'linear-gradient(135deg, #fef3e2, #fef7ed)'
                      e.currentTarget.style.color = '#c2410c'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent'
                      e.currentTarget.style.color = '#374151'
                    }}
                  >
                    <Settings size={18} />
                    <span>Settings</span>
                  </button>

                  <div
                    style={{
                      height: '1px',
                      background: '#e5e7eb',
                      margin: '8px 16px',
                    }}
                  />

                  <button
                    onClick={handleClickLogout}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 16px',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '14px',
                      color: '#dc2626',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        'linear-gradient(135deg, #fef2f2, #fee2e2)'
                      e.currentTarget.style.color = '#b91c1c'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent'
                      e.currentTarget.style.color = '#dc2626'
                    }}
                  >
                    <LogOut size={18} />
                    <span>Log out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
})

ModernHeader.displayName = 'ModernHeader'

export default ModernHeader
