export interface FlightTransactionData {
  'Transaction Date': string
  'Tx Id': string
  Sector: string
  JType: 'One Way' | 'Round Trip'
  'Pax Name': string
  'Numbers of passengers': number
  Amount: number
  'SSR Amount': number
  'Insurance Amount': number
  'PG Charges': number
  Carrier: string
  Company: string
  Department: string
  'GDS PNR': string
  APNR: string
  BookedById: string
  JDate: string
  'Book.Status': 'CONFIRMED' | 'CANCELLED' | 'PENDING'
  'Erp.Ref': string
  'Booking Type': string
  Supplier: string
  'Supplier Name': string
  'Booking Channel': string
  Domint: string
  IsPassThrough: boolean
}
