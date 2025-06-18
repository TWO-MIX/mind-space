import React from 'react'
import CafeCard from './CafeCard'
import { Cafe } from '../types'

interface CafeGridProps {
  cafes: Cafe[]
  onCafeSelect: (cafe: Cafe) => void
}

const CafeGrid: React.FC<CafeGridProps> = ({ cafes, onCafeSelect }) => {
  if (cafes.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No cafes found</h3>
        <p className="text-gray-600">Try adjusting your filters to see more results.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cafes.map(cafe => (
        <CafeCard 
          key={cafe.id} 
          cafe={cafe} 
          onClick={() => onCafeSelect(cafe)}
        />
      ))}
    </div>
  )
}

export default CafeGrid
