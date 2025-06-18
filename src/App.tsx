import React, { useState } from 'react'
import Header from './components/Header'
import FilterBar from './components/FilterBar'
import CafeGrid from './components/CafeGrid'
import CafeDetail from './components/CafeDetail'
import PayItForwardModal from './components/PayItForwardModal'
import SeatBookingModal from './components/SeatBookingModal'
import { cafes } from './data/cafes'
import { Cafe, FilterOptions, PayItForwardState, UserState, TimeSlot, SeatBooking } from './types'

function App() {
  const [selectedCafe, setSelectedCafe] = useState<Cafe | null>(null)
  const [showPayItForward, setShowPayItForward] = useState(false)
  const [showSeatBooking, setShowSeatBooking] = useState(false)
  const [payItForwardState, setPayItForwardState] = useState<PayItForwardState>({
    totalCredits: 67,
    userCredits: 0,
    isQualifiedMember: Math.random() > 0.5, // Simulate qualification status
    hasDonated: false
  })
  const [userState, setUserState] = useState<UserState>({
    id: 'user-123',
    name: 'John Doe',
    email: 'john@example.com',
    isMember: Math.random() > 0.3, // 70% chance of being a member
    bookings: []
  })
  const [filters, setFilters] = useState<FilterOptions>({
    quietnessLevel: 'all',
    busynessLevel: 'all',
    hasWifi: false,
    hasOutlets: false,
    allowsLaptops: false,
    hasPayItForwardSeats: false,
    hasBookableSeats: false
  })

  const filteredCafes = cafes.filter(cafe => {
    if (filters.quietnessLevel !== 'all' && cafe.quietnessLevel !== filters.quietnessLevel) return false
    if (filters.busynessLevel !== 'all' && cafe.busynessLevel !== filters.busynessLevel) return false
    if (filters.hasWifi && !cafe.amenities.wifi) return false
    if (filters.hasOutlets && !cafe.amenities.outlets) return false
    if (filters.allowsLaptops && !cafe.amenities.laptopFriendly) return false
    if (filters.hasPayItForwardSeats && (!cafe.payItForwardSeats?.enabled || cafe.payItForwardSeats.availableSeats === 0)) return false
    if (filters.hasBookableSeats && !cafe.bookableSeats?.enabled) return false
    return true
  })

  const handleDonate = (amount: number) => {
    setPayItForwardState(prev => ({
      ...prev,
      totalCredits: prev.totalCredits + amount,
      hasDonated: true
    }))
  }

  const handleClaimCredit = () => {
    if (payItForwardState.isQualifiedMember && payItForwardState.totalCredits > 0) {
      setPayItForwardState(prev => ({
        ...prev,
        totalCredits: prev.totalCredits - 1,
        userCredits: prev.userCredits + 1
      }))
    }
  }

  const handleBookSeat = (cafeId: string, timeSlot: TimeSlot, seatsBooked: number, specialRequests?: string) => {
    const cafe = cafes.find(c => c.id === cafeId)
    if (!cafe) return

    const booking: SeatBooking = {
      id: `booking-${Date.now()}`,
      cafeId,
      cafeName: cafe.name,
      userId: userState.id,
      timeSlot,
      seatsBooked,
      totalCost: cafe.bookableSeats!.pricePerHour * seatsBooked * getDurationInHours(timeSlot),
      bookingTime: new Date().toISOString(),
      status: 'confirmed',
      specialRequests
    }

    setUserState(prev => ({
      ...prev,
      bookings: [...prev.bookings, booking]
    }))

    setShowSeatBooking(false)
  }

  function getDurationInHours(timeSlot: TimeSlot): number {
    const start = new Date(`2000-01-01T${timeSlot.startTime}`)
    const end = new Date(`2000-01-01T${timeSlot.endTime}`)
    return (end.getTime() - start.getTime()) / (1000 * 60 * 60)
  }

  const handleOpenSeatBooking = () => {
    setShowSeatBooking(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        payItForwardState={payItForwardState}
        onPayItForwardClick={() => setShowPayItForward(true)}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find Your Mind Space
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Discover cafes based on their atmosphere, noise levels, and amenities. 
            Whether you need a quiet space to work or simply to condense your thoughts, we'll help you find it.
          </p>
        </div>

        <FilterBar filters={filters} onFiltersChange={setFilters} />
        
        <div className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              {filteredCafes.length} Cafes Found
            </h2>
            {userState.isMember && userState.bookings.length > 0 && (
              <div className="text-sm text-gray-600">
                You have {userState.bookings.filter(b => b.status === 'confirmed').length} active bookings
              </div>
            )}
          </div>
          
          <CafeGrid 
            cafes={filteredCafes} 
            onCafeSelect={setSelectedCafe}
          />
        </div>
      </main>

      {selectedCafe && (
        <CafeDetail 
          cafe={selectedCafe} 
          onClose={() => setSelectedCafe(null)}
          payItForwardState={payItForwardState}
          userState={userState}
          onClaimCredit={handleClaimCredit}
          onBookSeat={handleOpenSeatBooking}
        />
      )}

      {showPayItForward && (
        <PayItForwardModal
          payItForwardState={payItForwardState}
          onClose={() => setShowPayItForward(false)}
          onDonate={handleDonate}
          onClaimCredit={handleClaimCredit}
        />
      )}

      {showSeatBooking && selectedCafe && (
        <SeatBookingModal
          cafe={selectedCafe}
          onClose={() => setShowSeatBooking(false)}
          userState={userState}
          onBookSeat={handleBookSeat}
        />
      )}
    </div>
  )
}

export default App
