import React from 'react'
import { Star, MapPin, Wifi, Zap, Laptop, Car, TreePine, Coffee, Users, Clock, Calendar } from 'lucide-react'
import { Cafe } from '../types'

interface CafeCardProps {
  cafe: Cafe
  onClick: () => void
}

const CafeCard: React.FC<CafeCardProps> = ({ cafe, onClick }) => {
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

  const getSeatAvailabilityColor = (availableSeats: number, totalSeats: number) => {
    const ratio = availableSeats / totalSeats
    if (ratio === 0) return 'bg-red-100 text-red-800 border-red-200'
    if (ratio <= 0.3) return 'bg-orange-100 text-orange-800 border-orange-200'
    if (ratio <= 0.6) return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    return 'bg-green-100 text-green-800 border-green-200'
  }

  const formatQuietnessLevel = (level: string) => {
    return level.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  }

  const formatBusynessLevel = (level: string) => {
    return level.charAt(0).toUpperCase() + level.slice(1)
  }

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer group"
    >
      <div className="relative">
        <img 
          src={cafe.image} 
          alt={cafe.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
        />
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getQuietnessColor(cafe.quietnessLevel)}`}>
            {formatQuietnessLevel(cafe.quietnessLevel)}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBusynessColor(cafe.busynessLevel)}`}>
            {formatBusynessLevel(cafe.busynessLevel)}
          </span>
        </div>
        
        {/* Booking Options Badges */}
        <div className="absolute bottom-3 left-3 flex flex-col space-y-2">
          {cafe.payItForwardSeats?.enabled && (
            <div className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${getSeatAvailabilityColor(cafe.payItForwardSeats.availableSeats, cafe.payItForwardSeats.totalSeats)} backdrop-blur-sm`}>
              <div className="flex items-center space-x-1">
                <Coffee className="h-3 w-3" />
                <span>
                  {cafe.payItForwardSeats.availableSeats > 0 
                    ? `${cafe.payItForwardSeats.availableSeats} free seats`
                    : 'No free seats'
                  }
                </span>
              </div>
            </div>
          )}
          
          {cafe.bookableSeats?.enabled && (
            <div className="px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200 backdrop-blur-sm">
              <div className="flex items-center space-x-1">
                <Calendar className="h-3 w-3" />
                <span>Bookable ${cafe.bookableSeats.pricePerHour}/hr</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-amber-600 transition-colors">
              {cafe.name}
            </h3>
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              <MapPin className="h-4 w-4" />
              <span>{cafe.distance}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-gray-900">{cafe.rating}</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {cafe.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {cafe.amenities.wifi && <Wifi className="h-4 w-4 text-gray-400" />}
            {cafe.amenities.outlets && <Zap className="h-4 w-4 text-gray-400" />}
            {cafe.amenities.laptopFriendly && <Laptop className="h-4 w-4 text-gray-400" />}
            {cafe.amenities.parking && <Car className="h-4 w-4 text-gray-400" />}
            {cafe.amenities.outdoorSeating && <TreePine className="h-4 w-4 text-gray-400" />}
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-lg font-semibold text-gray-900">{cafe.priceRange}</span>
            {cafe.payItForwardCredits && (
              <div className="flex items-center space-x-1 text-pink-600">
                <Coffee className="h-4 w-4" />
                <span className="text-sm font-medium">{cafe.payItForwardCredits}</span>
              </div>
            )}
          </div>
        </div>

        {(cafe.payItForwardSeats?.enabled || cafe.bookableSeats?.enabled) && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center space-x-3">
                {cafe.payItForwardSeats?.enabled && (
                  <div className="flex items-center space-x-1">
                    <Users className="h-3 w-3" />
                    <span>{cafe.payItForwardSeats.totalSeats} free seats</span>
                  </div>
                )}
                {cafe.bookableSeats?.enabled && (
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>{cafe.bookableSeats.totalSeats} bookable</span>
                  </div>
                )}
              </div>
              {cafe.payItForwardSeats?.enabled && (
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>Updated {cafe.payItForwardSeats.lastUpdated}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CafeCard
