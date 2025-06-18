import { Cafe } from '../types'

// Generate time slots for the next 24 hours
const generateTimeSlots = (cafeId: string, totalSeats: number) => {
  const slots = []
  const now = new Date()
  const today = now.toISOString().split('T')[0]
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  
  const timeSlots = [
    { start: '08:00', end: '10:00' },
    { start: '10:00', end: '12:00' },
    { start: '12:00', end: '14:00' },
    { start: '14:00', end: '16:00' },
    { start: '16:00', end: '18:00' },
    { start: '18:00', end: '20:00' }
  ]
  
  // Add today's remaining slots
  const currentHour = now.getHours()
  timeSlots.forEach((slot, index) => {
    const slotHour = parseInt(slot.start.split(':')[0])
    if (slotHour > currentHour) {
      slots.push({
        id: `${cafeId}-${today}-${index}`,
        startTime: slot.start,
        endTime: slot.end,
        date: today,
        availableSeats: Math.floor(Math.random() * totalSeats) + 1,
        totalSeats
      })
    }
  })
  
  // Add tomorrow's slots
  timeSlots.forEach((slot, index) => {
    slots.push({
      id: `${cafeId}-${tomorrow}-${index}`,
      startTime: slot.start,
      endTime: slot.end,
      date: tomorrow,
      availableSeats: Math.floor(Math.random() * totalSeats) + 1,
      totalSeats
    })
  })
  
  return slots
}

export const cafes: Cafe[] = [
  {
    id: '1',
    name: 'The Quiet Corner',
    address: '123 Peaceful St, Downtown',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=600&fit=crop',
    rating: 4.8,
    priceRange: '$$',
    quietnessLevel: 'very-quiet',
    busynessLevel: 'light',
    description: 'A serene cafe perfect for deep work and study sessions. Soft ambient music and comfortable seating create the ideal environment for productivity.',
    amenities: {
      wifi: true,
      outlets: true,
      laptopFriendly: true,
      parking: true,
      outdoorSeating: false
    },
    hours: {
      'Monday': '7:00 AM - 9:00 PM',
      'Tuesday': '7:00 AM - 9:00 PM',
      'Wednesday': '7:00 AM - 9:00 PM',
      'Thursday': '7:00 AM - 9:00 PM',
      'Friday': '7:00 AM - 10:00 PM',
      'Saturday': '8:00 AM - 10:00 PM',
      'Sunday': '8:00 AM - 8:00 PM'
    },
    specialties: ['Artisan Coffee', 'Pastries', 'Light Meals'],
    distance: '0.3 miles',
    payItForwardCredits: 12,
    payItForwardSeats: {
      enabled: true,
      totalSeats: 8,
      availableSeats: 3,
      lastUpdated: '2 minutes ago'
    },
    bookableSeats: {
      enabled: true,
      totalSeats: 12,
      pricePerHour: 8,
      timeSlots: generateTimeSlots('1', 12)
    }
  },
  {
    id: '2',
    name: 'Buzz Central',
    address: '456 Energy Ave, Midtown',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&h=600&fit=crop',
    rating: 4.5,
    priceRange: '$',
    quietnessLevel: 'bustling',
    busynessLevel: 'busy',
    description: 'A vibrant, energetic cafe with a social atmosphere. Perfect for casual meetings, catching up with friends, or when you need the energy of a busy environment.',
    amenities: {
      wifi: true,
      outlets: false,
      laptopFriendly: false,
      parking: false,
      outdoorSeating: true
    },
    hours: {
      'Monday': '6:00 AM - 11:00 PM',
      'Tuesday': '6:00 AM - 11:00 PM',
      'Wednesday': '6:00 AM - 11:00 PM',
      'Thursday': '6:00 AM - 11:00 PM',
      'Friday': '6:00 AM - 12:00 AM',
      'Saturday': '7:00 AM - 12:00 AM',
      'Sunday': '7:00 AM - 10:00 PM'
    },
    specialties: ['Espresso Drinks', 'Fresh Juices', 'Breakfast Sandwiches'],
    distance: '0.7 miles',
    payItForwardCredits: 8,
    bookableSeats: {
      enabled: true,
      totalSeats: 6,
      pricePerHour: 5,
      timeSlots: generateTimeSlots('2', 6)
    }
  },
  {
    id: '3',
    name: 'Balanced Brew',
    address: '789 Harmony Rd, Uptown',
    image: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800&h=600&fit=crop',
    rating: 4.6,
    priceRange: '$$',
    quietnessLevel: 'moderate',
    busynessLevel: 'moderate',
    description: 'The perfect middle ground - not too quiet, not too loud. Great for both work and socializing, with flexible seating options.',
    amenities: {
      wifi: true,
      outlets: true,
      laptopFriendly: true,
      parking: true,
      outdoorSeating: true
    },
    hours: {
      'Monday': '7:00 AM - 8:00 PM',
      'Tuesday': '7:00 AM - 8:00 PM',
      'Wednesday': '7:00 AM - 8:00 PM',
      'Thursday': '7:00 AM - 8:00 PM',
      'Friday': '7:00 AM - 9:00 PM',
      'Saturday': '8:00 AM - 9:00 PM',
      'Sunday': '8:00 AM - 7:00 PM'
    },
    specialties: ['Specialty Lattes', 'Homemade Soups', 'Artisan Sandwiches'],
    distance: '1.2 miles',
    payItForwardCredits: 15,
    payItForwardSeats: {
      enabled: true,
      totalSeats: 12,
      availableSeats: 7,
      lastUpdated: '5 minutes ago'
    },
    bookableSeats: {
      enabled: true,
      totalSeats: 16,
      pricePerHour: 10,
      timeSlots: generateTimeSlots('3', 16)
    }
  },
  {
    id: '4',
    name: 'Whisper Woods Cafe',
    address: '321 Forest Lane, Suburbs',
    image: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800&h=600&fit=crop',
    rating: 4.9,
    priceRange: '$$$',
    quietnessLevel: 'quiet',
    busynessLevel: 'light',
    description: 'Nestled in a quiet neighborhood, this cafe offers a library-like atmosphere with premium coffee and gourmet treats.',
    amenities: {
      wifi: true,
      outlets: true,
      laptopFriendly: true,
      parking: true,
      outdoorSeating: true
    },
    hours: {
      'Monday': '8:00 AM - 6:00 PM',
      'Tuesday': '8:00 AM - 6:00 PM',
      'Wednesday': '8:00 AM - 6:00 PM',
      'Thursday': '8:00 AM - 6:00 PM',
      'Friday': '8:00 AM - 7:00 PM',
      'Saturday': '9:00 AM - 7:00 PM',
      'Sunday': '9:00 AM - 5:00 PM'
    },
    specialties: ['Single Origin Coffee', 'French Pastries', 'Organic Teas'],
    distance: '2.1 miles',
    payItForwardCredits: 6,
    payItForwardSeats: {
      enabled: true,
      totalSeats: 6,
      availableSeats: 0,
      lastUpdated: '1 minute ago'
    },
    bookableSeats: {
      enabled: true,
      totalSeats: 8,
      pricePerHour: 12,
      timeSlots: generateTimeSlots('4', 8)
    }
  },
  {
    id: '5',
    name: 'Social Hub',
    address: '654 Community Blvd, Downtown',
    image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800&h=600&fit=crop',
    rating: 4.3,
    priceRange: '$',
    quietnessLevel: 'lively',
    busynessLevel: 'busy',
    description: 'A community-focused cafe with regular events, live music, and a welcoming atmosphere for meeting new people.',
    amenities: {
      wifi: true,
      outlets: false,
      laptopFriendly: false,
      parking: false,
      outdoorSeating: true
    },
    hours: {
      'Monday': '7:00 AM - 10:00 PM',
      'Tuesday': '7:00 AM - 10:00 PM',
      'Wednesday': '7:00 AM - 10:00 PM',
      'Thursday': '7:00 AM - 11:00 PM',
      'Friday': '7:00 AM - 12:00 AM',
      'Saturday': '8:00 AM - 12:00 AM',
      'Sunday': '8:00 AM - 9:00 PM'
    },
    specialties: ['Cold Brew', 'Local Pastries', 'Smoothie Bowls'],
    distance: '0.5 miles',
    payItForwardCredits: 22,
    payItForwardSeats: {
      enabled: true,
      totalSeats: 15,
      availableSeats: 9,
      lastUpdated: '3 minutes ago'
    },
    bookableSeats: {
      enabled: true,
      totalSeats: 10,
      pricePerHour: 6,
      timeSlots: generateTimeSlots('5', 10)
    }
  },
  {
    id: '6',
    name: 'Zen Garden Cafe',
    address: '987 Meditation Way, East Side',
    image: 'https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=800&h=600&fit=crop',
    rating: 4.7,
    priceRange: '$$',
    quietnessLevel: 'very-quiet',
    busynessLevel: 'empty',
    description: 'A minimalist cafe with zen-inspired decor, perfect for meditation, reading, or quiet contemplation over exceptional tea and coffee.',
    amenities: {
      wifi: false,
      outlets: false,
      laptopFriendly: false,
      parking: true,
      outdoorSeating: true
    },
    hours: {
      'Monday': '9:00 AM - 5:00 PM',
      'Tuesday': '9:00 AM - 5:00 PM',
      'Wednesday': '9:00 AM - 5:00 PM',
      'Thursday': '9:00 AM - 5:00 PM',
      'Friday': '9:00 AM - 6:00 PM',
      'Saturday': '10:00 AM - 6:00 PM',
      'Sunday': 'Closed'
    },
    specialties: ['Matcha', 'Herbal Teas', 'Vegan Treats'],
    distance: '1.8 miles',
    payItForwardCredits: 4
  }
]
