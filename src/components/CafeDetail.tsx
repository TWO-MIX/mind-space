import React from 'react'
import { X, Star, MapPin, Clock, Volume2, Users, Wifi, Zap, Laptop, Car, TreePine, Coffee, Gift, Calendar } from 'lucide-react'
import { Cafe, PayItForwardState, UserState } from '../types'
import TimeSlotInfographic from './TimeSlotInfographic'

interface CafeDetailProps {
  cafe: Cafe
  onClose: () => void
  payItForwardState: PayItForwardState
  userState: UserState
  onClaimCredit: () => void
  onBookSeat: () => void
}

const CafeDetail: React.FC<CafeDetailProps> = ({ 
  cafe, 
  onClose, 
  payItForwardState, 
  userState,
  onClaimCredit,
  onBookSeat
}) => {
  const getQuietnessColor = (level: string) => {
    switch (level) {
      case 'very-quiet': return 'bg-green-100 text-green-800'
      case 'quiet': return 'bg-green-100 text-green-700'
      case 'moderate': return 'bg-yellow-100 text-yellow-800'
      case 'lively': return 'bg-orange-100 text-orange-800'
      case 'bustling': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getBusynessColor = (level: string) => {
    switch (level) {
      case 'empty': return 'bg-blue-100 text-blue-800'
      case 'light': return 'bg-green-100 text-green-800'
      case 'moderate': return 'bg-yellow-100 text-yellow-800'
      case 'busy': return 'bg-orange-100 text-orange-800'
      case 'packed': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatLevel = (level: string) => {
    return level.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  }

  const canClaimCredit = payItForwardState.isQualifiedMember && 
                        cafe.payItForwardCredits && 
                        cafe.payItForwardCredits > 0

  const canBookSeat = userState.isMember && cafe.bookableSeats?.enabled

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
            className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
          
          <div className="absolute top-4 left-4 flex flex-col space-y-2">
            {cafe.payItForwardCredits && cafe.payItForwardCredits > 0 && (
              <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-3 py-2 rounded-full text-sm font-medium flex items-center space-x-2">
                <Coffee className="h-4 w-4" />
                <span>{cafe.payItForwardCredits} kind coffees available</span>
              </div>
            )}
            
            {cafe.bookableSeats?.enabled && (
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-3 py-2 rounded-full text-sm font-medium flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Bookable seats ${cafe.bookableSeats.pricePerHour}/hr</span>
              </div>
            )}
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{cafe.name}</h2>
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{cafe.address}</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                  <span className="font-medium">{cafe.rating}</span>
                </div>
                <span className="text-gray-400">•</span>
                <span className="font-medium">{cafe.priceRange}</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600">{cafe.distance}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mb-6 flex flex-col sm:flex-row gap-3">
            {canClaimCredit && (
              <div className="flex-1 p-4 bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-2 rounded-full">
                      <Gift className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Kind Coffee Available!</h3>
                      <p className="text-sm text-gray-600">
                        As a qualified member, you can claim a kind coffee here.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onClaimCredit}
                    className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-2 rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all duration-200 font-medium text-sm whitespace-nowrap"
                  >
                    Claim Coffee
                  </button>
                </div>
              </div>
            )}

            {canBookSeat && (
              <div className="flex-1 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-2 rounded-full">
                      <Calendar className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Book a Seat</h3>
                      <p className="text-sm text-gray-600">
                        Reserve your spot up to 24 hours in advance.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onBookSeat}
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 font-medium text-sm whitespace-nowrap"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            )}
          </div>

          <p className="text-gray-700 mb-6">{cafe.description}</p>

          {/* Time Slot Infographic */}
          <TimeSlotInfographic cafeId={cafe.id} cafeName={cafe.name} />

          {/* Atmosphere */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Current Atmosphere</h3>
            <div className="flex flex-wrap gap-3">
              <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${getQuietnessColor(cafe.quietnessLevel)}`}>
                <Volume2 className="h-4 w-4 mr-2" />
                {formatLevel(cafe.quietnessLevel)}
              </span>
              <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${getBusynessColor(cafe.busynessLevel)}`}>
                <Users className="h-4 w-4 mr-2" />
                {formatLevel(cafe.busynessLevel)}
              </span>
            </div>
          </div>

          {/* Seating Options */}
          {(cafe.payItForwardSeats?.enabled || cafe.bookableSeats?.enabled) && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Seating Options</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cafe.payItForwardSeats?.enabled && (
                  <div className="p-4 border border-pink-200 rounded-lg bg-pink-50">
                    <div className="flex items-center space-x-2 mb-2">
                      <Coffee className="h-5 w-5 text-pink-600" />
                      <span className="font-medium text-pink-800">Pay It Forward Kind Seats</span>
                    </div>
                    <div className="text-sm text-pink-700">
                      <p>{cafe.payItForwardSeats.availableSeats} of {cafe.payItForwardSeats.totalSeats} available</p>
                      <p className="text-xs mt-1">Updated {cafe.payItForwardSeats.lastUpdated}</p>
                    </div>
                  </div>
                )}
                
                {cafe.bookableSeats?.enabled && (
                  <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
                    <div className="flex items-center space-x-2 mb-2">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      <span className="font-medium text-blue-800">Bookable Seats</span>
                    </div>
                    <div className="text-sm text-blue-700">
                      <p>{cafe.bookableSeats.totalSeats} seats available</p>
                      <p className="text-xs mt-1">${cafe.bookableSeats.pricePerHour}/hour per seat</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Amenities */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Amenities</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className={`flex items-center space-x-2 ${cafe.amenities.wifi ? 'text-green-600' : 'text-gray-400'}`}>
                <Wifi className="h-4 w-4" />
                <span className="text-sm">WiFi</span>
              </div>
              <div className={`flex items-center space-x-2 ${cafe.amenities.outlets ? 'text-green-600' : 'text-gray-400'}`}>
                <Zap className="h-4 w-4" />
                <span className="text-sm">Power Outlets</span>
              </div>
              <div className={`flex items-center space-x-2 ${cafe.amenities.laptopFriendly ? 'text-green-600' : 'text-gray-400'}`}>
                <Laptop className="h-4 w-4" />
                <span className="text-sm">Laptop Friendly</span>
              </div>
              <div className={`flex items-center space-x-2 ${cafe.amenities.parking ? 'text-green-600' : 'text-gray-400'}`}>
                <Car className="h-4 w-4" />
                <span className="text-sm">Parking</span>
              </div>
              <div className={`flex items-center space-x-2 ${cafe.amenities.outdoorSeating ? 'text-green-600' : 'text-gray-400'}`}>
                <TreePine className="h-4 w-4" />
                <span className="text-sm">Outdoor Seating</span>
              </div>
            </div>
          </div>

          {/* Specialties */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Specialties</h3>
            <div className="flex flex-wrap gap-2">
              {cafe.specialties.map((specialty, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Hours</h3>
            <div className="space-y-1">
              {Object.entries(cafe.hours).map(([day, hours]) => (
                <div key={day} className="flex justify-between text-sm">
                  <span className="text-gray-600">{day}</span>
                  <span className="text-gray-900">{hours}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CafeDetail
