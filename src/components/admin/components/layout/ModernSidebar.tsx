'use client'

import fareIcon from '@/../public/svg/fare-icon.svg'
import '@/styles/admin/sidebar.css'
import { appRoutes } from '@/utils/routes'
import { translation } from '@/utils/translation'
import {
  BarChart3,
  ChevronRight,
  CreditCard,
  Menu,
  Receipt,
  Settings,
  Ticket,
  Upload,
  Users,
  X
} from 'lucide-react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { memo, useCallback, useMemo, useState } from 'react'
import { BsFillPersonCheckFill } from 'react-icons/bs'
import { FaReceipt, FaTachometerAlt } from 'react-icons/fa'

interface ModernMenuItemProps {
  id: string
  title: string
  path: string
  icon: React.ReactNode
  isSubOption: boolean
  subOption?: {
    title: string
    path: string
    icon: React.ReactNode
    isMultiOption: boolean
  }[]
}

export const ModernSidebar = memo(() => {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [openMenus, setOpenMenus] = useState<string[]>([])

  const toggleMenu = useCallback((id: string) => {
    setOpenMenus((prev) =>
      prev.includes(id) ? prev.filter((menuId) => menuId !== id) : [...prev, id]
    )
  }, [])

  const menuItems: ModernMenuItemProps[] = useMemo(() => [
    {
      id: 'users',
      title: translation?.USERS || 'Users',
      path: appRoutes?.userRequests || '/admin/user-list',
      icon: <Users className="w-4 h-4" />,
      isSubOption: false,
    },
    {
      id: 'fares',
      title: translation?.FARES || 'Fares',
      path: '#',
      icon: <Image src={fareIcon} alt="fare-icon" width={16} height={16} />,
      isSubOption: true,
      subOption: [
        {
          title: translation?.ADD_MARKUP || 'Add Markup',
          path: appRoutes?.addMarkup || '/admin/add-markup',
          icon: <BarChart3 className="w-4 h-4" />,
          isMultiOption: false,
        },
        {
          title: translation?.MARKUP_MANAGEMENT || 'Markup Management',
          path: appRoutes?.markupManagement || '/admin/markup-management',
          icon: <Settings className="w-4 h-4" />,
          isMultiOption: false,
        },
      ],
    },
    {
      id: 'accounting',
      title: translation?.ACCOUNTING_REPORTS || 'Accounting & Reports',
      path: '#',
      icon: <Receipt className="w-4 h-4" />,
      isSubOption: true,
      subOption: [
        {
          title: translation?.BOOKING_LIST || 'Booking List',
          path: appRoutes?.bookingManagement || '/admin/booking-list',
          icon: <Ticket className="w-4 h-4" />,
          isMultiOption: false,
        },
        {
          title: translation?.MY_BOOKINGS || 'My Bookings',
          path: appRoutes?.myBookings || '/admin/my-bookings',
          icon: <FaReceipt className="w-4 h-4" />,
          isMultiOption: false,
        },
        {
          title: translation?.LEDGER || 'Ledger',
          path: appRoutes?.ledgerManagement || '/admin/ledger',
          icon: <Receipt className="w-4 h-4" />,
          isMultiOption: false,
        },
      ],
    },
    // {
    //   id: 'queues',
    //   title: translation?.QUEUES || 'Queues',
    //   path: '#',
    //   icon: <Clock className="w-4 h-4" />,
    //   isSubOption: true,
    //   subOption: [
    //     {
    //       title: translation?.HOLD_QUEUES || 'Hold Queues',
    //       path: appRoutes?.holdQueuesManagement || '/admin/hold-queues',
    //       icon: <Clock className="w-4 h-4" />,
    //       isMultiOption: false,
    //     },
    //     {
    //       title: translation?.CANCELLATION_QUEUES || 'Cancellation Queues',
    //       path:
    //         appRoutes?.cancellationQueuesManagement ||
    //         '/admin/cancellation-queues',
    //       icon: <Clock className="w-4 h-4" />,
    //       isMultiOption: false,
    //     },
    //     {
    //       title: translation?.RESCHEDULE_QUEUES || 'Reschedule Queues',
    //       path:
    //         appRoutes?.rescheduleQueuesManagement || '/admin/reschedule-queues',
    //       icon: <Clock className="w-4 h-4" />,
    //       isMultiOption: false,
    //     },
    //   ],
    // },
    {
      id: 'transactions',
      title: translation?.TRANSACTIONS || 'Transactions',
      path: appRoutes?.transactionManagement || '/admin/transaction-list',
      icon: <CreditCard className="w-4 h-4" />,
      isSubOption: false,
    },
    {
      id: 'coupons',
      title: translation?.COUPONS || 'Coupons',
      path: appRoutes?.surfCoupons || '/admin/coupons',
      icon: <Ticket className="w-4 h-4" />,
      isSubOption: false,
    },
    {
      id: 'upload-balance',
      title: translation?.UPLOAD_BALANCE || 'Upload Balance',
      path: appRoutes?.uploadBalance || '/admin/upload-balance',
      icon: <Upload className="w-4 h-4" />,
      isSubOption: false,
    },
  ], [])

  const SidebarContent = () => (
    <div
      className="modern-sidebar-wrapper"
      style={{
        height: '100vh',
        background: '#ffffff',
        borderRight: '1px solid #e5e7eb',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        width: isCollapsed ? '80px' : '280px',
        transition: 'width 0.3s ease',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1000,
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '24px 16px',
          borderBottom: '1px solid #f3f4f6',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #ff7b00, #ef9700)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          }}
        >
          <FaTachometerAlt size={20} />
        </div>
        {!isCollapsed && (
          <div>
            <h2
              style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#111827',
                margin: 0,
              }}
            >
              Gayatri Travels
            </h2>
            <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>
              Admin Dashboard
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div style={{ flex: 1, padding: '16px 8px', overflowY: 'auto' }}>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {menuItems.map((item) => {
            const isActiveParent =
              pathname === item.path ||
              item.subOption?.some((sub) => pathname === sub.path)
            const isOpen = openMenus.includes(item.id)

            return (
              <div key={item.id}>
                {item.isSubOption ? (
                  <div>
                    <button
                      onClick={() => toggleMenu(item.id)}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        border: 'none',
                        background: isActiveParent
                          ? 'linear-gradient(to right, #fef3e2, #fef7ed)'
                          : 'transparent',
                        color: isActiveParent ? '#c2410c' : '#374151',
                        fontWeight: isActiveParent ? '500' : '400',
                        fontSize: '14px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        borderLeft: isActiveParent
                          ? '4px solid #ea580c'
                          : '4px solid transparent',
                        boxShadow: isActiveParent
                          ? '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
                          : 'none',
                      }}
                      onMouseEnter={(e) => {
                        if (!isActiveParent) {
                          e.currentTarget.style.background = '#fef7ed'
                          e.currentTarget.style.color = '#c2410c'
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActiveParent) {
                          e.currentTarget.style.background = 'transparent'
                          e.currentTarget.style.color = '#374151'
                        }
                      }}
                    >
                      <div
                        style={{
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                        }}
                      >
                        <div
                          style={{
                            padding: '6px',
                            borderRadius: '6px',
                            background: isActiveParent ? '#fed7aa' : '#f3f4f6',
                            color: isActiveParent ? '#c2410c' : '#6b7280',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          {item.icon}
                        </div>
                        {!isCollapsed && (
                          <span className="maison-14-normal">{item.title}</span>
                        )}
                      </div>
                      {!isCollapsed && (
                        <ChevronRight
                          size={16}
                          style={{
                            transform: isOpen
                              ? 'rotate(90deg)'
                              : 'rotate(0deg)',
                            transition: 'transform 0.2s ease',
                          }}
                        />
                      )}
                    </button>

                    {isOpen && !isCollapsed && item.subOption && (
                      <div
                        style={{
                          marginLeft: '24px',
                          marginTop: '8px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '2px',
                        }}
                      >
                        {item.subOption.map((subItem, subIndex) => (
                          <div
                            key={`${item.id}-${subIndex}`}
                            onClick={() => window.location.href = subItem.path}
                            style={{
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '12px',
                              padding: '8px 16px',
                              borderRadius: '6px',
                              background:
                                pathname === subItem.path
                                  ? 'linear-gradient(to right, #fef3e2, #fef7ed)'
                                  : 'transparent',
                              color:
                                pathname === subItem.path
                                  ? '#c2410c'
                                  : '#6b7280',
                              fontSize: '13px',
                              fontWeight:
                                pathname === subItem.path ? '500' : '400',
                              textDecoration: 'none',
                              transition: 'all 0.2s ease',
                              borderLeft:
                                pathname === subItem.path
                                  ? '2px solid #fb923c'
                                  : '2px solid transparent',
                              boxShadow:
                                pathname === subItem.path
                                  ? '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                                  : 'none',
                            }}
                            onMouseEnter={(e) => {
                              if (pathname !== subItem.path) {
                                e.currentTarget.style.background = '#fef7ed'
                                e.currentTarget.style.color = '#c2410c'
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (pathname !== subItem.path) {
                                e.currentTarget.style.background = 'transparent'
                                e.currentTarget.style.color = '#6b7280'
                              }
                            }}
                          >
                            <div
                              style={{
                                padding: '4px',
                                borderRadius: '4px',
                                background:
                                  pathname === subItem.path
                                    ? '#fed7aa'
                                    : '#f9fafb',
                                color:
                                  pathname === subItem.path
                                    ? '#c2410c'
                                    : '#9ca3af',
                                transition: 'all 0.2s ease',
                              }}
                            >
                              {subItem.icon}
                            </div>
                            <span className="maison-14-normal">
                              {subItem.title}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div
                    onClick={() => window.location.href = item.path}
                    style={{
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      background:
                        pathname === item.path
                          ? 'linear-gradient(to right, #fef3e2, #fef7ed)'
                          : 'transparent',
                      color: pathname === item.path ? '#c2410c' : '#374151',
                      fontSize: '14px',
                      fontWeight: pathname === item.path ? '500' : '400',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                      borderLeft:
                        pathname === item.path
                          ? '4px solid #ea580c'
                          : '4px solid transparent',
                      boxShadow:
                        pathname === item.path
                          ? '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
                          : 'none',
                    }}
                    onMouseEnter={(e) => {
                      if (pathname !== item.path) {
                        e.currentTarget.style.background = '#fef7ed'
                        e.currentTarget.style.color = '#c2410c'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (pathname !== item.path) {
                        e.currentTarget.style.background = 'transparent'
                        e.currentTarget.style.color = '#374151'
                      }
                    }}
                  >
                    <div
                      style={{
                        padding: '6px',
                        borderRadius: '6px',
                        background:
                          pathname === item.path ? '#fed7aa' : '#f3f4f6',
                        color: pathname === item.path ? '#c2410c' : '#6b7280',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {item.icon}
                    </div>
                    {!isCollapsed && (
                      <span className="maison-14-normal">{item.title}</span>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </nav>
      </div>

      {/* Footer */}
      <div
        style={{
          padding: '16px',
          borderTop: '1px solid #f3f4f6',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #10b981, #059669)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          }}
        >
          <BsFillPersonCheckFill size={16} />
        </div>
        {!isCollapsed && (
          <div>
            <p
              style={{
                fontSize: '14px',
                fontWeight: '500',
                color: '#111827',
                margin: 0,
              }}
            >
              Admin User
            </p>
            <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>
              admin@gayatri.com
            </p>
          </div>
        )}
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        style={{
          position: 'absolute',
          top: '50%',
          right: '-12px',
          transform: 'translateY(-50%)',
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          background: '#ffffff',
          border: '1px solid #e5e7eb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          zIndex: 1001,
        }}
      >
        <ChevronRight
          size={12}
          style={{
            transform: isCollapsed ? 'rotate(0deg)' : 'rotate(180deg)',
            transition: 'transform 0.3s ease',
          }}
        />
      </button>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <SidebarContent />
        {/* Spacer div to prevent content overlap */}
        <div
          style={{
            width: isCollapsed ? '80px' : '280px',
            transition: 'width 0.3s ease',
            flexShrink: 0,
          }}
        />
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md"
        style={{ border: '1px solid #e5e7eb' }}
      >
        <Menu size={20} />
      </button>

      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-50"
          style={{ background: 'rgba(0, 0, 0, 0.5)' }}
          onClick={() => setIsMobileOpen(false)}
        >
          <div
            style={{
              width: '280px',
              height: '100%',
              background: '#ffffff',
              transform: 'translateX(0)',
              transition: 'transform 0.3s ease',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ position: 'relative', height: '100%' }}>
              <button
                onClick={() => setIsMobileOpen(false)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  width: '32px',
                  height: '32px',
                  borderRadius: '6px',
                  background: '#f3f4f6',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 1002,
                }}
              >
                <X size={16} />
              </button>
              <SidebarContent />
            </div>
          </div>
        </div>
      )}
    </>
  )
})

ModernSidebar.displayName = 'ModernSidebar'

export default ModernSidebar
