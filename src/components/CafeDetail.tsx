import React from 'react'
import { X, MapPin, Clock, Wifi, Zap, Laptop, Car, TreePine, Star, Coffee, Users, Gift, Armchair, Calendar } from 'lucide-react'
import { Cafe, PayItForwardState, UserState } from '../types'

interface CafeDetailProps {
  cafe: Cafe
  onClose: () => void
  payItForwardState: PayItForwardState
  userState: UserState
  onClaimCredit: () => void
  onBookSeat: () => void
  onUseSeatCredits: (creditsUsed: number) => void
}

const CafeDetail: React.FC<CafeDetailProps> = ({ 
  cafe, 
  onClose, 
  payItForwardState, 
  userState, 
  onClaimCredit, 
  onBookSeat,
  onUseSeatCredits 
}) => {
  const getQuietnessColor = (level: string) => {
    switch (level) {
      case 'very-quiet': return 'bg-green-100 text-green-800'
      case 'quiet': return 'bg-blue-100 text-blue-800'
      case 'moderate': return 'bg-yellow-100 text-yellow-800'
      case 'lively': return 'bg-orange-100 text-orange-800'
      case 'bustling': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getBusynessColor = (level: string) => {
    switch (level) {
      case 'empty': return 'bg-green-100 text-green-800'
      case 'light': return 'bg-blue-100 text-blue-800'
      case 'moderate': return 'bg-yellow-100 text-yellow-800'
      case 'busy': return 'bg-orange-100 text-orange-800'
      case 'packed': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatQuietness = (level: string) => {
    return level.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  }

  const formatBusyness = (level: string) => {
    return level.charAt(0).toUpperCase() + level.slice(1)
  }

  const canUseSeatCredits = userState.isMember && userState.seatCredits > 0 && cafe.payItForwardSeats?.enabled

  const handleUseSeatCreditsForSeat = () => {
    if (canUseSeatCredits && cafe.payItForwardSeats?.availableSeats! > 0) {
      onUseSeatCredits(1)
      // In a real app, this would also reserve the seat
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img 
            src={cafe.image} 
            alt={cafe.name}
            className="w-full h-64 object-cover rounded-t-xl"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white bg-opacity-90 hover:bg-opacity-100 p-2 rounded-full transition-all"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{cafe.name}</h2>
              <div className="flex items-center space-x-4 text-gray-600 mb-2">
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{cafe.address}</span>
                </div>
                <span className="text-sm">{cafe.distance}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="font-medium">{cafe.rating}</span>
                </div>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600">{cafe.priceRange}</span>
              </div>
            </div>
          </div>

          <p className="text-gray-700 mb-6">{cafe.description}</p>

          {/* Atmosphere Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getQuietnessColor(cafe.quietnessLevel)}`}>
              {formatQuietness(cafe.quietnessLevel)}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getBusynessColor(cafe.busynessLevel)}`}>
              {formatBusyness(cafe.busynessLevel)}
            </span>
          </div>

          {/* Amenities */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {cafe.amenities.wifi && (
                <div className="flex items-center space-x-2 text-green-600">
                  <Wifi className="h-4 w-4" />
                  <span className="text-sm">Free WiFi</span>
                </div>
              )}
              {cafe.amenities.outlets && (
                <div className="flex items-center space-x-2 text-green-600">
                  <Zap className="h-4 w-4" />
                  <span className="text-sm">Power Outlets</span>
                </div>
              )}
              {cafe.amenities.laptopFriendly && (
                <div className="flex items-center space-x-2 text-green-600">
                  <Laptop className="h-4 w-4" />
                  <span className="text-sm">Laptop Friendly</span>
                </div>
              )}
              {cafe.amenities.parking && (
                <div className="flex items-center space-x-2 text-green-600">
                  <Car className="h-4 w-4" />
                  <span className="text-sm">Parking</span>
                </div>
              )}
              {cafe.amenities.outdoorSeating && (
                <div className="flex items-center space-x-2 text-green-600">
                  <TreePine className="h-4 w-4" />
                  <span className="text-sm">Outdoor Seating</span>
                </div>
              )}
            </div>
          </div>

          {/* Hours */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Hours</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              {Object.entries(cafe.hours).map(([day, hours]) => (
                <div key={day} className="flex justify-between">
                  <span className="text-gray-600">{day}:</span>
                  <span className="text-gray-900">{hours}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Specialties */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Specialties</h3>
            <div className="flex flex-wrap gap-2">
              {cafe.specialties.map((specialty, index) => (
                <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                  {specialty}
                </span>
              ))}
            </div>
          </div>

          {/* Pay It Forward & Seat Booking Section */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Pay It Forward Seats */}
            {cafe.payItForwardSeats?.enabled && (
              <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-4 rounded-lg border border-pink-200">
                <div className="flex items-center space-x-2 mb-3">
                  <Coffee className="h-5 w-5 text-pink-600" />
                  <h4 className="font-semibold text-gray-900">Pay It Forward Seats</h4>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Available:</span>
                    <span className="font-medium">{cafe.payItForwardSeats.availableSeats}/{cafe.payItForwardSeats.totalSeats}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Updated:</span>
                    <span className="text-gray-500">{cafe.payItForwardSeats.lastUpdated}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {payItForwardState.isQualifiedMember && payItForwardState.totalCredits > 0 && cafe.payItForwardSeats.availableSeats > 0 && (
                    <button
                      onClick={onClaimCredit}
                      className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-2 px-4 rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all duration-200 text-sm font-medium flex items-center justify-center space-x-2"
                    >
                      <Gift className="h-4 w-4" />
                      <span>Claim Free Seat</span>
                    </button>
                  )}
                  
                  {canUseSeatCredits && cafe.payItForwardSeats.availableSeats > 0 && (
                    <button
                      onClick={handleUseSeatCreditsForSeat}
                      className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 text-sm font-medium flex items-center justify-center space-x-2"
                    >
                      <Armchair className="h-4 w-4" />
                      <span>Use Seat Credit (1 credit)</span>
                    </button>
                  )}
                  
                  {cafe.payItForwardSeats.availableSeats === 0 && (
                    <div className="text-center text-gray-500 text-sm py-2">
                      No seats currently available
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Bookable Seats */}
            {cafe.bookableSeats?.enabled && (
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-2 mb-3">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <h4 className="font-semibold text-gray-900">Book a Seat</h4>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Available seats:</span>
                    <span className="font-medium">{cafe.bookableSeats.totalSeats}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Price per hour:</span>
                    <span className="font-medium">${cafe.bookableSeats.pricePerHour}</span>
                  </div>
                </div>
                
                {userState.isMember ? (
                  <button
                    onClick={onBookSeat}
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 text-sm font-medium flex items-center justify-center space-x-2"
                  >
                    <Users className="h-4 w-4" />
                    <span>Book Now</span>
                  </button>
                ) : (
                  <div className="text-center text-gray-500 text-sm py-2">
                    Member login required to book
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CafeDetail
