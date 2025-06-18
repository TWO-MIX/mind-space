export interface Cafe {
  id: string
  name: string
  address: string
  image: string
  rating: number
  priceRange: '$' | '$$' | '$$$'
  quietnessLevel: 'very-quiet' | 'quiet' | 'moderate' | 'lively' | 'bustling'
  busynessLevel: 'empty' | 'light' | 'moderate' | 'busy' | 'packed'
  description: string
  amenities: {
    wifi: boolean
    outlets: boolean
    laptopFriendly: boolean
    parking: boolean
    outdoorSeating: boolean
  }
  hours: {
    [key: string]: string
  }
  specialties: string[]
  distance: string
  payItForwardCredits?: number
  payItForwardSeats?: {
    enabled: boolean
    totalSeats: number
    availableSeats: number
    lastUpdated: string
  }
  bookableSeats?: {
    enabled: boolean
    totalSeats: number
    pricePerHour: number
    timeSlots: TimeSlot[]
  }
}

export interface TimeSlot {
  id: string
  startTime: string
  endTime: string
  date: string
  availableSeats: number
  totalSeats: number
  isBooked?: boolean
  bookingId?: string
}

export interface SeatBooking {
  id: string
  cafeId: string
  cafeName: string
  userId: string
  timeSlot: TimeSlot
  seatsBooked: number
  totalCost: number
  bookingTime: string
  status: 'confirmed' | 'cancelled' | 'completed'
  specialRequests?: string
}

export interface FilterOptions {
  quietnessLevel: 'all' | 'very-quiet' | 'quiet' | 'moderate' | 'lively' | 'bustling'
  busynessLevel: 'all' | 'empty' | 'light' | 'moderate' | 'busy' | 'packed'
  hasWifi: boolean
  hasOutlets: boolean
  allowsLaptops: boolean
  hasPayItForwardSeats: boolean
  hasBookableSeats: boolean
}

export interface PayItForwardState {
  totalCredits: number
  userCredits: number
  isQualifiedMember: boolean
  hasDonated: boolean
}

export interface UserState {
  id: string
  name: string
  email: string
  isMember: boolean
  bookings: SeatBooking[]
  seatCredits: number // Credits that can be used to exchange for cafe seats
}
