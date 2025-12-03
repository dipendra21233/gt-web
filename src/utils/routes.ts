import { Routes } from '@/types/module/routesModule'

export const appRoutes: Routes = {
  // Public Routes
  home: '/',
  login: '/login',
  userRegistration: '/user-registration',
  about: '/about',
  contact: '/contact',
  support: '/support',
  flightResult: '/flight-result',
  flightResultTest: '/flights-search',

  // Admin Routes
  dashboard: '/admin/dashboard',
  surfCoupons: '/admin/coupons',
  userRequests: '/admin/user-list',
  addCoupon: '/admin/add-coupon',
  bookingManagement: '/admin/booking-list',
  ledgerManagement: '/admin/ledger',
  myBookings: '/admin/my-bookings',
  markupManagement: '/admin/markup-management',
  addMarkup: '/admin/add-markup',
  cancellationQueuesManagement: '/admin/cancellation-queues',
  rescheduleQueuesManagement: '/admin/reschedule-queues',
  holdQueuesManagement: '/admin/hold-queues',
  transactionManagement: '/admin/transaction-list',
  uploadBalance: '/admin/upload-balance',
  paxCalendar: '/admin/pax-calendar',
}
