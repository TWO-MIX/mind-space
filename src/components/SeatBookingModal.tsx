import React, { useState, useMemo } from 'react'
import { X, Calendar, Clock, Users, CreditCard, MapPin, Coffee, CheckCircle } from 'lucide-react'
import { Cafe, TimeSlot, UserState } from '../types'

interface SeatBookingModalProps {
  cafe: Cafe
  onClose: () => void
  userState: UserState
  onBookSeat: (cafeId: string, timeSlot: TimeSlot, seatsBooked: number, specialRequests?: string) => void
}

const SeatBookingModal: React.FC<SeatBookingModalProps> = ({ 
  cafe, 
  onClose, 
  userState, 
  onBookSeat 
}) => {
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null)
  const [seatsToBook, setSeatsToBook] = useState(1)
  const [specialRequests, setSpecialRequests] = useState('')
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [bookingStep, setBookingStep] = useState<'select' | 'confirm' | 'success'>('select')

  // Generate next 24 hours of available dates
  const availableDates = useMemo(() => {
    const dates = []
    const now = new Date()
    
    for (let i = 0; i < 2; i++) {
      const date = new Date(now)
      date.setDate(date.getDate() + i)
      dates.push({
        value: date.toISOString().split('T')[0],
        label: i === 0 ? 'Today' : 'Tomorrow',
        fullLabel: date.toLocaleDateString('en-US', { 
          weekday: 'long', 
          month: 'short', 
          day: 'numeric' 
        })
      })
    }
    return dates
  }, [])

  // Filter time slots for selected date within 24 hours
  const availableTimeSlots = useMemo(() => {
    if (!selectedDate || !cafe.bookableSeats?.timeSlots) return []
    
    const now = new Date()
    const twentyFourHoursFromNow = new Date(now.getTime() + 24 * 60 * 60 * 1000)
    
    return cafe.bookableSeats.timeSlots.filter(slot => {
      const slotDateTime = new Date(`${slot.date}T${slot.startTime}`)
      return slot.date === selectedDate && 
             slotDateTime > now && 
             slotDateTime <= twentyFourHoursFromNow &&
             slot.availableSeats > 0
    })
  }, [selectedDate, cafe.bookableSeats?.timeSlots])

  const handleBooking = () => {
    if (selectedTimeSlot && userState.isMember) {
      onBookSeat(cafe.id, selectedTimeSlot, seatsToBook, specialRequests)
      setBookingStep('success')
      setTimeout(() => {
        onClose()
      }, 3000)
    }
  }

  const totalCost = selectedTimeSlot && cafe.bookableSeats ? 
    (cafe.bookableSeats.pricePerHour * seatsToBook * getDurationInHours(selectedTimeSlot)) : 0

  function getDurationInHours(timeSlot: TimeSlot): number {
    const start = new Date(`2000-01-01T${timeSlot.startTime}`)
    const end = new Date(`2000-01-01T${timeSlot.endTime}`)
    return (end.getTime() - start.getTime()) / (1000 * 60 * 60)
  }

  if (bookingStep === 'success') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl max-w-md w-full p-8 text-center">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
          <p className="text-gray-600 mb-4">
            Your seat at {cafe.name} has been reserved for{' '}
            {selectedTimeSlot && new Date(`${selectedTimeSlot.date}T${selectedTimeSlot.startTime}`).toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'short',
              day: 'numeric'
            })}{' '}
            from {selectedTimeSlot?.startTime} to {selectedTimeSlot?.endTime}.
          </p>
          <p className="text-sm text-gray-500">
            You'll receive a confirmation email shortly with all the details.
          </p>
        </div>
      </div>
    )
  }

  if (!userState.isMember) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl max-w-md w-full p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Membership Required</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="text-center py-6">
            <Coffee className="h-12 w-12 text-amber-500 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">
              Seat booking is available exclusively for QuietSpaces members.
            </p>
            <button className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-2 rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-200 font-medium">
              Become a Member
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Book a Seat</h2>
                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{cafe.name}</span>
                </div>
              </div>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Booking Info */}
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">24-Hour Booking Window</span>
            </div>
            <p className="text-sm text-blue-700">
              Book seats up to 24 hours in advance. ${cafe.bookableSeats?.pricePerHour}/hour per seat.
            </p>
          </div>

          <div className="space-y-6">
            {/* Date Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Date
              </label>
              <div className="grid grid-cols-2 gap-3">
                {availableDates.map((date) => (
                  <button
                    key={date.value}
                    onClick={() => {
                      setSelectedDate(date.value)
                      setSelectedTimeSlot(null)
                    }}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      selectedDate === date.value
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium">{date.label}</div>
                    <div className="text-sm text-gray-500">{date.fullLabel}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slot Selection */}
            {selectedDate && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Available Time Slots
                </label>
                {availableTimeSlots.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {availableTimeSlots.map((slot) => (
                      <button
                        key={slot.id}
                        onClick={() => setSelectedTimeSlot(slot)}
                        className={`p-4 rounded-lg border-2 transition-all text-left ${
                          selectedTimeSlot?.id === slot.id
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">
                            {slot.startTime} - {slot.endTime}
                          </span>
                          <span className="text-sm text-gray-500">
                            {getDurationInHours(slot)}h
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Users className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">
                            {slot.availableSeats} of {slot.totalSeats} available
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Clock className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <p>No available time slots for this date</p>
                  </div>
                )}
              </div>
            )}

            {/* Seat Selection */}
            {selectedTimeSlot && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Number of Seats
                </label>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setSeatsToBook(Math.max(1, seatsToBook - 1))}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                    disabled={seatsToBook <= 1}
                  >
                    -
                  </button>
                  <span className="text-xl font-semibold w-8 text-center">{seatsToBook}</span>
                  <button
                    onClick={() => setSeatsToBook(Math.min(selectedTimeSlot.availableSeats, seatsToBook + 1))}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                    disabled={seatsToBook >= selectedTimeSlot.availableSeats}
                  >
                    +
                  </button>
                  <span className="text-sm text-gray-500 ml-4">
                    Max {selectedTimeSlot.availableSeats} available
                  </span>
                </div>
              </div>
            )}

            {/* Special Requests */}
            {selectedTimeSlot && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Special Requests (Optional)
                </label>
                <textarea
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="Window seat, quiet corner, near outlets, etc."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                />
              </div>
            )}

            {/* Booking Summary */}
            {selectedTimeSlot && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">Booking Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date & Time:</span>
                    <span className="font-medium">
                      {new Date(`${selectedTimeSlot.date}T${selectedTimeSlot.startTime}`).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric'
                      })}, {selectedTimeSlot.startTime} - {selectedTimeSlot.endTime}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{getDurationInHours(selectedTimeSlot)} hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Seats:</span>
                    <span className="font-medium">{seatsToBook}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2 mt-2">
                    <span className="font-medium text-gray-900">Total Cost:</span>
                    <span className="font-bold text-lg">${totalCost}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Book Button */}
            {selectedTimeSlot && (
              <button
                onClick={handleBooking}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 font-medium flex items-center justify-center space-x-2"
              >
                <CreditCard className="h-5 w-5" />
                <span>Book Seat - ${totalCost}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SeatBookingModal
