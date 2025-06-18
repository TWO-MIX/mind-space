import React from 'react'
import { Filter, Wifi, Zap, Laptop, Coffee, Calendar } from 'lucide-react'
import { FilterOptions } from '../types'

interface FilterBarProps {
  filters: FilterOptions
  onFiltersChange: (filters: FilterOptions) => void
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, onFiltersChange }) => {
  const quietnessOptions = [
    { value: 'all', label: 'All Levels' },
    { value: 'very-quiet', label: 'Very Quiet' },
    { value: 'quiet', label: 'Quiet' },
    { value: 'moderate', label: 'Moderate' },
    { value: 'lively', label: 'Lively' },
    { value: 'bustling', label: 'Bustling' }
  ]

  const busynessOptions = [
    { value: 'all', label: 'All Levels' },
    { value: 'empty', label: 'Empty' },
    { value: 'light', label: 'Light' },
    { value: 'moderate', label: 'Moderate' },
    { value: 'busy', label: 'Busy' },
    { value: 'packed', label: 'Packed' }
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Filter className="h-5 w-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">Filter Cafes</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quietness Level
          </label>
          <select
            value={filters.quietnessLevel}
            onChange={(e) => onFiltersChange({ ...filters, quietnessLevel: e.target.value as any })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          >
            {quietnessOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Busyness Level
          </label>
          <select
            value={filters.busynessLevel}
            onChange={(e) => onFiltersChange({ ...filters, busynessLevel: e.target.value as any })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          >
            {busynessOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Amenities
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.hasWifi}
                onChange={(e) => onFiltersChange({ ...filters, hasWifi: e.target.checked })}
                className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
              />
              <Wifi className="h-4 w-4 ml-2 mr-1 text-gray-600" />
              <span className="text-sm text-gray-700">WiFi</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.hasOutlets}
                onChange={(e) => onFiltersChange({ ...filters, hasOutlets: e.target.checked })}
                className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
              />
              <Zap className="h-4 w-4 ml-2 mr-1 text-gray-600" />
              <span className="text-sm text-gray-700">Power Outlets</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.allowsLaptops}
                onChange={(e) => onFiltersChange({ ...filters, allowsLaptops: e.target.checked })}
                className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
              />
              <Laptop className="h-4 w-4 ml-2 mr-1 text-gray-600" />
              <span className="text-sm text-gray-700">Laptop Friendly</span>
            </label>
          </div>
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Booking Options
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.hasPayItForwardSeats}
                onChange={(e) => onFiltersChange({ ...filters, hasPayItForwardSeats: e.target.checked })}
                className="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
              />
              <Coffee className="h-4 w-4 ml-2 mr-1 text-pink-600" />
              <span className="text-sm text-gray-700">Free Seats</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.hasBookableSeats}
                onChange={(e) => onFiltersChange({ ...filters, hasBookableSeats: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <Calendar className="h-4 w-4 ml-2 mr-1 text-blue-600" />
              <span className="text-sm text-gray-700">Bookable Seats</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterBar
