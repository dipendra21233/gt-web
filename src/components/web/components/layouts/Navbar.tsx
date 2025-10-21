'use client'
import gtLogo from '@/../public/images/gt-logo.png'
import { useAuthData } from '@/queries/useAuthData'
import { logout } from '@/store/actions/auth.action'
import '@/styles/modern-navbar.css'
import { ACCESS_TOKEN, navItems } from '@/utils/constant'
import { setInitialStorageState } from '@/utils/functions'
import { appRoutes } from '@/utils/routes'
import { translation } from '@/utils/translation'
import Cookies from 'js-cookie'
import {
  Bell,
  BookOpen,
  ChevronDown,
  ChevronRight,
  CreditCard,
  Key,
  LogOut,
  Mail,
  Phone,
  Plus,
  Shield,
  User,
  UserCircle,
  Wallet,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import { Box, Text } from 'theme-ui'
import { ThemeButton } from '../../core/Button/Button'
import { useGetBalanceData } from '@/queries/useGetBalanceData'

const Navbar = () => {
  const { balanceData } = useGetBalanceData()
  const [isSticky, setIsSticky] = useState(false)
  const [scrollOpacity, setScrollOpacity] = useState(1)
  const [isOpen, setIsOpen] = useState(false)
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)
  const router = useRouter()
  const dispatch = useDispatch()
  const { authUser } = useAuthData()
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const threshold = 100

      // Set sticky state
      setIsSticky(scrollY > 50)

      // Calculate opacity based on scroll position
      if (scrollY <= threshold) {
        setScrollOpacity(1 - (scrollY / threshold) * 0.3) // Fade from 1 to 0.7
      } else {
        setScrollOpacity(0.7 + ((scrollY - threshold) / 200) * 0.3) // Fade back from 0.7 to 1
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = () => {
    window.location.href = appRoutes?.login
  }

  const handleUserDropdownToggle = () => {
    setIsUserDropdownOpen((prev) => !prev)
    setOpenSubmenu(null)
  }

  const handleSubmenuToggle = (submenuKey: string) => {
    setOpenSubmenu(openSubmenu === submenuKey ? null : submenuKey)
  }

  const handleClickLogout = () => {
    setIsUserDropdownOpen(false)
    setOpenSubmenu(null)
    // Add logout logic here
    const accessToken = Cookies.get(ACCESS_TOKEN)
    if (accessToken) {
      dispatch(
        logout(accessToken, async (res) => {
          if (res) {
            router.replace(appRoutes?.home)
            setInitialStorageState()
          }
        })
      )
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsUserDropdownOpen(false)
        setOpenSubmenu(null)
      }
    }
    if (isUserDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isUserDropdownOpen])

  return (
    <>
      <Box
        as="nav"
        className={`enhanced-navbar fixed top-0 w-full z-50 transition-all duration-500 ${isSticky ? 'sticky-active' : ''
          }`}
        style={{
          background: `linear-gradient(135deg, rgba(30, 41, 59, ${0.85 * scrollOpacity
            }) 0%, rgba(15, 23, 42, ${0.95 * scrollOpacity}) 100%)`,
          backdropFilter: `blur(${10 + (isSticky ? 5 : 0)}px)`,
          borderBottom: `1px solid rgba(255, 255, 255, ${0.1 * scrollOpacity})`,
          boxShadow: `0 ${isSticky ? '8' : '4'}px ${isSticky ? '32' : '20'}px rgba(0, 0, 0, ${0.1 + (isSticky ? 0.1 : 0)
            })`,
        }}
      >
        <div className="container">
          {/* Scroll Progress Indicator */}
          <div
            className="navbar-scroll-indicator"
            style={{
              width: `${Math.min(
                ((typeof window !== 'undefined' ? window.scrollY : 0) /
                  (typeof document !== 'undefined'
                    ? document.documentElement.scrollHeight -
                    (typeof window !== 'undefined' ? window.innerHeight : 0)
                    : 1)) *
                100,
                100
              )}%`,
            }}
          ></div>

          {/* Main Navbar */}
          <div className="navbar-main" style={{ opacity: scrollOpacity }}>
            <Box
              as="div"
              className="mx-auto flex items-center justify-between py-3 lg:py-4"
            >
              {/* Logo Section */}
              <Box as="div" className="flex items-center flex-shrink-0">
                <Link
                  href="/"
                  className={`enhanced-logo ${isSticky ? 'sticky-logo' : ''}`}
                  style={{ transform: `scale(${isSticky ? 0.95 : 1})` }}
                >
                  <Image
                    src={gtLogo}
                    alt="Gayatri Travels Logo"
                    width={100}
                    height={40}
                    className="logo-image w-20 h-8 sm:w-24 sm:h-10 lg:w-28 lg:h-12"
                    style={{ filter: `brightness(${1.1 * scrollOpacity})` }}
                    priority
                  />
                </Link>
              </Box>

              {/* Desktop Navigation Links */}
              <Box
                as="div"
                className="hidden lg:flex items-center gap-6 xl:gap-[60px] flex-1 justify-center"
              >
                {navItems?.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="navbar-link text-decoration-none"
                    style={{ opacity: scrollOpacity }}
                  >
                    <Text
                      sx={{
                        cursor: 'pointer',
                        position: 'relative',
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontWeight: '500',
                        fontSize: '15px',
                        transition: 'all 0.3s ease',
                        whiteSpace: 'nowrap',
                        ':hover': {
                          color: '#ff6b35',
                          transform: 'translateY(-2px)',
                        },
                        '::after': {
                          content: '""',
                          display: 'block',
                          height: '3px',
                          width: '0%',
                          background:
                            'linear-gradient(90deg, #ff6b35, #f7931e)',
                          position: 'absolute',
                          bottom: '-8px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          borderRadius: '2px',
                          transition: 'width 0.3s ease',
                        },
                        ':hover::after': { width: '100%' },
                      }}
                      variant="Maison16Medium20"
                    >
                      {item.name}
                    </Text>
                  </Link>
                ))}
              </Box>

              {/* Desktop Right Section */}
              {authUser === undefined ? (
                <Box as="div" className="hidden lg:flex items-center">
                  <ThemeButton
                    variant="secondary3"
                    className={`enhanced-login-button text-sm px-4 py-2 lg:px-6 lg:py-3 ${isSticky ? 'sticky-button' : ''}`}
                    onClick={handleClick}
                    text={translation?.SIGNUP_LOGIN}
                    sx={{
                      boxShadow: `0 4px 15px rgba(255, 107, 53, ${0.3 * scrollOpacity})`,
                      opacity: scrollOpacity,
                      transform: `scale(${isSticky ? 0.95 : 1})`,
                    }}
                  />
                </Box>
              ) : (
                <Box
                  as="div"
                  className="hidden lg:flex items-center"
                  ref={dropdownRef}
                >
                  <div
                    className="user-profile-section"
                    onClick={handleUserDropdownToggle}
                    style={{
                      background: `rgba(255, 255, 255, ${0.1 * scrollOpacity})`,
                      borderColor: `rgba(255, 255, 255, ${0.2 * scrollOpacity})`,
                      opacity: scrollOpacity,
                    }}
                  >
                    <div className="user-avatar">
                      {authUser?.firstName?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <div className="user-info">
                      <p className="user-name">
                        {authUser?.firstName} {authUser?.lastName}
                      </p>
                      <p className="user-role">
                        {authUser?.isAdmin ? 'Admin' : 'User'}
                      </p>
                    </div>
                    <ChevronDown
                      size={18}
                      className={`dropdown-chevron ${isUserDropdownOpen ? 'open' : ''}`}
                    />
                  </div>

                  {/* Enhanced User Dropdown Menu */}
                  {isUserDropdownOpen && (
                    <div className="user-dropdown">
                      {/* Header */}
                      <div className="dropdown-header">
                        <div className="dropdown-user-info">
                          <div className="dropdown-avatar">
                            {authUser?.firstName?.charAt(0)?.toUpperCase() ||
                              'U'}
                          </div>
                          <div className="dropdown-user-details">
                            <h4>
                              {authUser?.firstName} {authUser?.lastName}
                            </h4>
                            <p>{authUser?.email}</p>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="dropdown-menu">
                        {/* Account Section */}
                        <div>
                          <div
                            className="dropdown-item"
                            onClick={() => handleSubmenuToggle('account')}
                          >
                            <div className="dropdown-item-content">
                              <User size={20} className="dropdown-item-icon" />
                              <span>Account</span>
                            </div>
                            <ChevronRight
                              size={16}
                              className={`submenu-indicator ${openSubmenu === 'account' ? 'open' : ''}`}
                            />
                          </div>

                          {/* Account Submenu */}
                          {openSubmenu === 'account' && (
                            <div className="submenu account-submenu">
                              <Link
                                href={appRoutes.bookingManagement}
                                className="submenu-item"
                              >
                                <BookOpen size={16} />
                                <span>Manage Bookings</span>
                              </Link>
                              <Link
                                href={appRoutes.myBookings}
                                className="submenu-item"
                              >
                                <BookOpen size={16} />
                                <span>My Bookings</span>
                              </Link>
                              <Link
                                href={appRoutes.ledgerManagement}
                                className="submenu-item"
                              >
                                <CreditCard size={16} />
                                <span>Ledger</span>
                              </Link>
                              <Link
                                href={appRoutes.markupManagement}
                                className="submenu-item"
                              >
                                <CreditCard size={16} />
                                <span>Agent Markup</span>
                              </Link>
                              <Link
                                href={appRoutes.holdQueuesManagement}
                                className="submenu-item"
                              >
                                <Shield size={16} />
                                <span>Agent Queues</span>
                              </Link>
                              <Link
                                href={appRoutes.holdQueuesManagement}
                                className="submenu-item"
                              >
                                <Shield size={16} />
                                <span>Flight Hold Queues</span>
                              </Link>
                              <Link
                                href="/import-pnr"
                                className="submenu-item"
                              >
                                <Key size={16} />
                                <span>Import PNR</span>
                              </Link>
                              <Link
                                href="/agents-series-fares"
                                className="submenu-item"
                              >
                                <CreditCard size={16} />
                                <span>Agents Series Fares</span>
                              </Link>
                              <Link
                                href="/add-staff"
                                className="submenu-item"
                              >
                                <User size={16} />
                                <span>Add Staff</span>
                              </Link>
                              <Link
                                href="/view-all-staff"
                                className="submenu-item"
                              >
                                <UserCircle size={16} />
                                <span>View All Staff</span>
                              </Link>
                              <Link
                                href="/reports"
                                className="submenu-item"
                              >
                                <Bell size={16} />
                                <span>Reports</span>
                              </Link>
                            </div>
                          )}
                        </div>

                        {/* Profile Section */}
                        <div>
                          <div
                            className="dropdown-item"
                            onClick={() => handleSubmenuToggle('profile')}
                          >
                            <div className="dropdown-item-content">
                              <CreditCard
                                size={20}
                                className="dropdown-item-icon"
                              />
                              <span>Profile</span>
                            </div>
                            <ChevronRight
                              size={16}
                              className={`submenu-indicator ${openSubmenu === 'profile' ? 'open' : ''}`}
                            />
                          </div>

                          {/* Profile Submenu */}
                          {openSubmenu === 'profile' && (
                            <div className="submenu">
                              <Link
                                href="/profile/balance"
                                className="submenu-item balance-item"
                              >
                                <Wallet size={16} />
                                <span>Balance</span>
                                <span className="balance-amount">
                                  ₹{balanceData?.availableBalance}
                                </span>
                              </Link>
                              <Link
                                href="/profile/upload-balance"
                                className="submenu-item"
                              >
                                <Plus size={16} />
                                <span>Upload Balance</span>
                              </Link>
                              <Link
                                href={appRoutes.userRequests}
                                className="submenu-item"
                              >
                                <Shield size={16} />
                                <span>Admin</span>
                              </Link>
                            </div>
                          )}
                        </div>

                        <div className="dropdown-separator"></div>

                        {/* Logout Section */}
                        <div className="logout-section">
                          <button
                            onClick={handleClickLogout}
                            className="dropdown-item logout"
                          >
                            <div className="dropdown-item-content">
                              <LogOut
                                size={20}
                                className="dropdown-item-icon logout-icon"
                              />
                              <span>Logout</span>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </Box>
              )}

              {/* Mobile Menu Toggle */}
              <Box as="div" className="lg:hidden flex-shrink-0">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="mobile-menu-toggle focus:outline-none p-2"
                  aria-label="Toggle mobile menu"
                  style={{
                    background: `rgba(255, 255, 255, ${0.1 * scrollOpacity})`,
                    borderColor: `rgba(255, 255, 255, ${0.2 * scrollOpacity})`,
                    opacity: scrollOpacity,
                  }}
                >
                  {isOpen ? (
                    <FiX className="text-white" size={24} />
                  ) : (
                    <FiMenu className="text-white" size={24} />
                  )}
                </button>
              </Box>
            </Box>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <Box as="div" className="mobile-menu lg:hidden">
              <div className="mobile-menu-content">
                <div className="mobile-menu-header">
                  <h3 className="text-white font-semibold text-lg mb-0">
                    Menu
                  </h3>
                </div>

                {/* Mobile Navigation Items */}
                <div className="mobile-menu-items">
                  {navItems?.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className="mobile-menu-item"
                      onClick={() => setIsOpen(false)}
                    >
                      <Text
                        sx={{
                          color: 'rgba(255, 255, 255, 0.9)',
                          fontWeight: '500',
                          fontSize: '16px',
                          transition: 'all 0.3s ease',
                          ':hover': { color: '#ff6b35' },
                        }}
                        variant="Maison16Medium20"
                      >
                        {item.name}
                      </Text>
                    </Link>
                  ))}
                </div>

                {/* Mobile Menu Footer */}
                <div className="mobile-menu-footer">
                  {authUser === undefined ? (
                    <ThemeButton
                      variant="secondary3"
                      onClick={() => {
                        handleClick()
                        setIsOpen(false)
                      }}
                      className="enhanced-login-button w-full mb-4"
                      text={translation?.SIGNUP_LOGIN}
                    />
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-white bg-opacity-10 rounded-lg">
                        <div className="user-avatar">
                          {authUser?.firstName?.charAt(0)?.toUpperCase() || 'U'}
                        </div>
                        <div>
                          <p className="text-white font-semibold text-sm mb-1">
                            {authUser?.firstName} {authUser?.lastName}
                          </p>
                          <p className="text-gray-300 text-xs">
                            {authUser?.email}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Link
                          href="/profile"
                          className="flex items-center gap-3 p-2 text-white text-sm hover:bg-orange-500 hover:bg-opacity-20 rounded-lg transition-all"
                          onClick={() => setIsOpen(false)}
                        >
                          <User size={16} />
                          <span>Profile</span>
                        </Link>
                        <Link
                          href="/my-bookings"
                          className="flex items-center gap-3 p-2 text-white text-sm hover:bg-orange-500 hover:bg-opacity-20 rounded-lg transition-all"
                          onClick={() => setIsOpen(false)}
                        >
                          <BookOpen size={16} />
                          <span>My Bookings</span>
                        </Link>
                        <button
                          onClick={() => {
                            handleClickLogout()
                            setIsOpen(false)
                          }}
                          className="flex items-center gap-3 p-2 text-red-400 text-sm hover:bg-red-500 hover:bg-opacity-20 rounded-lg transition-all w-full text-left"
                        >
                          <LogOut size={16} />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Mobile Contact Info */}
                  <div className="mobile-contact-info mt-4">
                    <div className="flex items-center gap-2 text-gray-300 text-sm">
                      <Phone size={16} />
                      <span>8011112020</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300 text-sm">
                      <Mail size={16} />
                      <span>info@gayatritravels.in</span>
                    </div>
                  </div>
                </div>
              </div>
            </Box>
          )}
        </div>
      </Box>
    </>
  )
}

export default Navbar
