import React from 'react'
import { Volume2, Users } from 'lucide-react'

interface TimeSlotData {
  time: string
  quietnessLevel: 'very-quiet' | 'quiet' | 'moderate' | 'lively' | 'bustling'
  busynessLevel: 'empty' | 'light' | 'moderate' | 'busy' | 'packed'
}

interface TimeSlotInfographicProps {
  cafeId: string
  cafeName: string
}

const TimeSlotInfographic: React.FC<TimeSlotInfographicProps> = ({ cafeId, cafeName }) => {
  // Generate realistic time slot data based on typical cafe patterns
  const generateTimeSlotData = (): TimeSlotData[] => {
    const baseData = [
      { time: '7:00 AM', quietness: 'very-quiet', busyness: 'light' },
      { time: '8:00 AM', quietness: 'quiet', busyness: 'moderate' },
      { time: '9:00 AM', quietness: 'moderate', busyness: 'busy' },
      { time: '10:00 AM', quietness: 'quiet', busyness: 'moderate' },
      { time: '11:00 AM', quietness: 'quiet', busyness: 'light' },
      { time: '12:00 PM', quietness: 'lively', busyness: 'busy' },
      { time: '1:00 PM', quietness: 'bustling', busyness: 'packed' },
      { time: '2:00 PM', quietness: 'moderate', busyness: 'moderate' },
      { time: '3:00 PM', quietness: 'quiet', busyness: 'light' },
      { time: '4:00 PM', quietness: 'moderate', busyness: 'moderate' },
      { time: '5:00 PM', quietness: 'lively', busyness: 'busy' },
      { time: '6:00 PM', quietness: 'moderate', busyness: 'moderate' },
      { time: '7:00 PM', quietness: 'quiet', busyness: 'light' },
      { time: '8:00 PM', quietness: 'very-quiet', busyness: 'light' }
    ]

    // Add some variation based on cafe ID for different patterns
    return baseData.map(slot => ({
      time: slot.time,
      quietnessLevel: slot.quietness as TimeSlotData['quietnessLevel'],
      busynessLevel: slot.busyness as TimeSlotData['busynessLevel']
    }))
  }

  const timeSlots = generateTimeSlotData()

  const getQuietnessIntensity = (level: string): number => {
    switch (level) {
      case 'very-quiet': return 1
      case 'quiet': return 2
      case 'moderate': return 3
      case 'lively': return 4
      case 'bustling': return 5
      default: return 3
    }
  }

  const getBusynessIntensity = (level: string): number => {
    switch (level) {
      case 'empty': return 1
      case 'light': return 2
      case 'moderate': return 3
      case 'busy': return 4
      case 'packed': return 5
      default: return 3
    }
  }

  const getQuietnessColor = (intensity: number): string => {
    switch (intensity) {
      case 1: return 'bg-green-500'
      case 2: return 'bg-blue-500'
      case 3: return 'bg-yellow-500'
      case 4: return 'bg-orange-500'
      case 5: return 'bg-red-500'
      default: return 'bg-gray-400'
    }
  }

  const getBusynessColor = (intensity: number): string => {
    switch (intensity) {
      case 1: return 'bg-green-500'
      case 2: return 'bg-blue-500'
      case 3: return 'bg-yellow-500'
      case 4: return 'bg-orange-500'
      case 5: return 'bg-red-500'
      default: return 'bg-gray-400'
    }
  }

  const formatTime = (time: string): string => {
    return time.replace(':00', '')
  }

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Activity Pattern</h3>
      
      <div className="bg-gray-50 rounded-lg p-4">
        {/* Legend */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-2 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Volume2 className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Quietness</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Busyness</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Low</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span>Med</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>High</span>
            </div>
          </div>
        </div>

        {/* Time Slot Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {timeSlots.map((slot, index) => {
            const quietnessIntensity = getQuietnessIntensity(slot.quietnessLevel)
            const busynessIntensity = getBusynessIntensity(slot.busynessLevel)
            
            return (
              <div key={index} className="bg-white rounded-lg p-3 border border-gray-200 hover:shadow-sm transition-shadow">
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-900 mb-2">
                    {formatTime(slot.time)}
                  </div>
                  
                  {/* Quietness Bar */}
                  <div className="mb-2">
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <Volume2 className="h-3 w-3 text-gray-500" />
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getQuietnessColor(quietnessIntensity)} transition-all duration-300`}
                        style={{ width: `${(quietnessIntensity / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Busyness Bar */}
                  <div>
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <Users className="h-3 w-3 text-gray-500" />
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getBusynessColor(busynessIntensity)} transition-all duration-300`}
                        style={{ width: `${(busynessIntensity / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Summary */}
        <div className="mt-4 text-xs text-gray-500 text-center">
          <p>Activity levels shown are typical patterns and may vary by day</p>
        </div>
      </div>
    </div>
  )
}

export default TimeSlotInfographic
