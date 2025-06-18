import React, { useState } from 'react'
import Header from './components/Header'
import FilterBar from './components/FilterBar'
import CafeGrid from './components/CafeGrid'
import CafeDetail from './components/CafeDetail'
import PayItForwardModal from './components/PayItForwardModal'
import { cafes } from './data/cafes'
import { Cafe, FilterOptions, PayItForwardState } from './types'

function App() {
  const [selectedCafe, setSelectedCafe] = useState<Cafe | null>(null)
  const [showPayItForward, setShowPayItForward] = useState(false)
  const [payItForwardState, setPayItForwardState] = useState<PayItForwardState>({
    totalCredits: 67,
    userCredits: 0,
    isQualifiedMember: Math.random() > 0.5, // Simulate qualification status
    hasDonated: false
  })
  const [filters, setFilters] = useState<FilterOptions>({
    quietnessLevel: 'all',
    busynessLevel: 'all',
    hasWifi: false,
    hasOutlets: false,
    allowsLaptops: false,
    hasPayItForwardSeats: false
  })

  const filteredCafes = cafes.filter(cafe => {
    if (filters.quietnessLevel !== 'all' && cafe.quietnessLevel !== filters.quietnessLevel) return false
    if (filters.busynessLevel !== 'all' && cafe.busynessLevel !== filters.busynessLevel) return false
    if (filters.hasWifi && !cafe.amenities.wifi) return false
    if (filters.hasOutlets && !cafe.amenities.outlets) return false
    if (filters.allowsLaptops && !cafe.amenities.laptopFriendly) return false
    if (filters.hasPayItForwardSeats && (!cafe.payItForwardSeats?.enabled || cafe.payItForwardSeats.availableSeats === 0)) return false
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        payItForwardState={payItForwardState}
        onPayItForwardClick={() => setShowPayItForward(true)}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find Your Perfect Cafe
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
          onClaimCredit={handleClaimCredit}
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
    </div>
  )
}

export default App
