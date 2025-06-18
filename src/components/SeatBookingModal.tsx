import React, { useState } from 'react'
import { X, Calendar, Clock, Users, CreditCard, Armchair } from 'lucide-react'
import { Cafe, UserState, TimeSlot } from '../types'

interface SeatBookingModalProps {
  cafe: Cafe
  onClose: () => void
  userState: UserState
  onBookSeat: (cafeId: string, timeSlot: TimeSlot, seatsBooked: number, specialRequests?: string) => void
  onUseSeatCredits: (creditsUsed: number) => void
}

const SeatBookingModal: React.FC<SeatBookingModalProps> = ({ 
  cafe, 
  onClose, 
  userState, 
  onBookSeat,
  onUseSeatCredits 
}) => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null)
  const [seatsBooked, setSeatsBooked] = useState(1)
  const [specialRequests, setSpecialRequests] = useState('')
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'credits'>('card')

  if (!cafe.bookableSeats) return null

  const handleBooking = () => {
    if (!selectedTimeSlot) return

    if (paymentMethod === 'credits') {
      const creditsNeeded = seatsBooked * getDurationInHours(selectedTimeSlot)
      if (userState.seatCredits >= creditsNeeded) {
        onUseSeatCredits(creditsNeeded)
        onBookSeat(cafe.id, selectedTimeSlot, seatsBooked, specialRequests)
      }
    } else {
      onBookSeat(cafe.id, selectedTimeSlot, seatsBooked, specialRequests)
    }
  }

  function getDurationInHours(timeSlot: TimeSlot): number {
    const start = new Date(`2000-01-01T${timeSlot.startTime}`)
    const end = new Date(`2000-01-01T${timeSlot.endTime}`)
    return (end.getTime() - start.getTime()) / (1000 * 60 * 60)
  }

  const calculateCost = () => {
    if (!selectedTimeSlot) return 0
    return cafe.bookableSeats!.pricePerHour * seatsBooked * getDurationInHours(selectedTimeSlot)
  }

  const calculateCreditsNeeded = () => {
    if (!selectedTimeSlot) return 0
    return seatsBooked * getDurationInHours(selectedTimeSlot)
  }

  const canPayWithCredits = userState.seatCredits >= calculateCreditsNeeded()

  const groupedTimeSlots = cafe.bookableSeats.timeSlots.reduce((acc, slot) => {
    if (!acc[slot.date]) {
      acc[slot.date] = []
    }
    acc[slot.date].push(slot)
    return acc
  }, {} as Record<string, TimeSlot[]>)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000)
    
    if (dateString === today.toISOString().split('T')[0]) {
      return 'Today'
    } else if (dateString === tomorrow.toISOString().split('T')[0]) {
      return 'Tomorrow'
    } else {
      return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Book a Seat</h2>
              <p className="text-gray-600">{cafe.name}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Time Slot Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Select Time Slot</h3>
            <div className="space-y-4">
              {Object.entries(groupedTimeSlots).map(([date, slots]) => (
                <div key={date}>
                  <h4 className="font-medium text-gray-700 mb-2">{formatDate(date)}</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {slots.map((slot) => (
                      <button
                        key={slot.id}
                        onClick={() => setSelectedTimeSlot(slot)}
                        disabled={slot.availableSeats === 0}
                        className={`p-3 rounded-lg border text-sm transition-all ${
                          selectedTimeSlot?.id === slot.id
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : slot.availableSeats === 0
                            ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className="font-medium">
                          {slot.startTime} - {slot.endTime}
                        </div>
                        <div className="text-xs text-gray-500">
                          {slot.availableSeats} seats available
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {selectedTimeSlot && (
            <>
              {/* Seat Selection */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Number of Seats</h3>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setSeatsBooked(Math.max(1, seatsBooked - 1))}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="text-xl font-semibold w-8 text-center">{seatsBooked}</span>
                  <button
                    onClick={() => setSeatsBooked(Math.min(selectedTimeSlot.availableSeats, seatsBooked + 1))}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                  >
                    +
                  </button>
                  <span className="text-sm text-gray-500">
                    (max {selectedTimeSlot.availableSeats} available)
                  </span>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Payment Method</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      paymentMethod === 'card'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <CreditCard className="h-5 w-5 text-blue-600" />
                      <div className="text-left">
                        <div className="font-medium">Credit Card</div>
                        <div className="text-sm text-gray-500">${calculateCost()}</div>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('credits')}
                    disabled={!canPayWithCredits}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      paymentMethod === 'credits'
                        ? 'border-blue-500 bg-blue-50'
                        : canPayWithCredits
                        ? 'border-gray-200 hover:border-gray-300'
                        : 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Armchair className="h-5 w-5 text-indigo-600" />
                      <div className="text-left">
                        <div className="font-medium">Seat Credits</div>
                        <div className="text-sm text-gray-500">
                          {calculateCreditsNeeded()} credits needed
                          {!canPayWithCredits && (
                            <span className="text-red-500"> (insufficient)</span>
                          )}
                        </div>
                        <div className="text-xs text-gray-400">
                          You have {userState.seatCredits} credits
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Special Requests */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Special Requests (Optional)</h3>
                <textarea
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="Any special seating preferences or requirements..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                />
              </div>

              {/* Booking Summary */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Booking Summary</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Date:</span>
                    <span>{formatDate(selectedTimeSlot.date)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time:</span>
                    <span>{selectedTimeSlot.startTime} - {selectedTimeSlot.endTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Seats:</span>
                    <span>{seatsBooked}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span>{getDurationInHours(selectedTimeSlot)} hours</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Total:</span>
                    <span>
                      {paymentMethod === 'card' 
                        ? `$${calculateCost()}` 
                        : `${calculateCreditsNeeded()} credits`
                      }
                    </span>
                  </div>
                </div>
              </div>

              {/* Book Button */}
              <button
                onClick={handleBooking}
                disabled={paymentMethod === 'credits' && !canPayWithCredits}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 font-medium flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Calendar className="h-5 w-5" />
                <span>Confirm Booking</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default SeatBookingModal
