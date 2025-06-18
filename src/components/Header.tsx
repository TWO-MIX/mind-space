import React from 'react'
import { Coffee, MapPin, Gift } from 'lucide-react'
import { PayItForwardState } from '../types'

interface HeaderProps {
  payItForwardState: PayItForwardState
  onPayItForwardClick: () => void
}

const Header: React.FC<HeaderProps> = ({ payItForwardState, onPayItForwardClick }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-amber-100 p-2 rounded-lg">
              <Coffee className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">QuietSpaces</h1>
              <p className="text-sm text-gray-500">Find your mind space</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-gray-600">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">Outram, Singapore</span>
            </div>
            
            <button
              onClick={onPayItForwardClick}
              className="flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-2 rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all duration-200 shadow-sm"
            >
              <Gift className="h-4 w-4" />
              <span className="text-sm font-medium">Pay It Forward</span>
              <span className="bg-white bg-opacity-20 px-2 py-0.5 rounded-full text-xs">
                {payItForwardState?.totalCredits || 0}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
