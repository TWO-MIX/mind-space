import React, { useState } from 'react'
import { X, Coffee, Users, Gift, CreditCard, DollarSign } from 'lucide-react'
import { PayItForwardState } from '../types'

interface PayItForwardModalProps {
  payItForwardState: PayItForwardState
  onClose: () => void
  onDonate: (amount: number) => void
  onClaimCredit: () => void
}

const PayItForwardModal: React.FC<PayItForwardModalProps> = ({ 
  payItForwardState, 
  onClose, 
  onDonate, 
  onClaimCredit 
}) => {
  const [donationAmount, setDonationAmount] = useState(5)
  const [showThankYou, setShowThankYou] = useState(false)

  const handleDonate = () => {
    onDonate(donationAmount)
    setShowThankYou(true)
    setTimeout(() => {
      setShowThankYou(false)
      onClose()
    }, 2000)
  }

  const donationOptions = [
    { amount: 1, label: '1 Coffee', icon: Coffee },
    { amount: 3, label: '3 Coffees', icon: Coffee },
    { amount: 5, label: '5 Coffees', icon: Coffee },
    { amount: 10, label: '10 Coffees', icon: Coffee }
  ]

  if (showThankYou) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl max-w-md w-full p-8 text-center">
          <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Coffee className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
          <p className="text-gray-600">
            Your donation of {donationAmount} coffee{donationAmount > 1 ? 's' : ''} will help someone in need. 
            You're making a difference in your community!
          </p>
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
              <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-3 rounded-full">
                <Coffee className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Pay It Forward</h2>
                <p className="text-gray-600">Spread kindness, one coffee at a time</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="text-center p-4 bg-gradient-to-br from-pink-50 to-rose-50 rounded-lg">
              <Coffee className="h-8 w-8 text-pink-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{payItForwardState.totalCredits}</div>
              <div className="text-sm text-gray-600">Total Credits</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">156</div>
              <div className="text-sm text-gray-600">People Helped</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
              <Gift className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{payItForwardState.userCredits}</div>
              <div className="text-sm text-gray-600">Your Credits</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Donate Section */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Make a Donation</h3>
                <p className="text-gray-600 text-sm">
                  Help qualified community members access coffee and workspace. Every donation makes a difference.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Choose donation amount:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {donationOptions.map((option) => (
                      <button
                        key={option.amount}
                        onClick={() => setDonationAmount(option.amount)}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          donationAmount === option.amount
                            ? 'border-pink-500 bg-pink-50 text-pink-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <option.icon className="h-5 w-5 mx-auto mb-1" />
                        <div className="text-sm font-medium">{option.label}</div>
                        <div className="text-xs text-gray-500">${option.amount * 4}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleDonate}
                  className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 px-4 rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all duration-200 font-medium flex items-center justify-center space-x-2"
                >
                  <CreditCard className="h-5 w-5" />
                  <span>Donate ${donationAmount * 4}</span>
                </button>
              </div>
            </div>

            {/* Claim Section */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Claim Free Coffee</h3>
                <p className="text-gray-600 text-sm">
                  {payItForwardState.isQualifiedMember 
                    ? "As a qualified member, you can claim free coffee credits from community donations."
                    : "Qualification is based on community involvement, student status, or financial need."
                  }
                </p>
              </div>

              {payItForwardState.isQualifiedMember ? (
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium text-green-800">Qualified Member</span>
                    </div>
                    <p className="text-sm text-green-700">
                      You can claim up to 2 free coffees per week from participating cafes.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      onClaimCredit()
                      onClose()
                    }}
                    disabled={payItForwardState.totalCredits === 0}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 px-4 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200 font-medium flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Gift className="h-5 w-5" />
                    <span>
                      {payItForwardState.totalCredits > 0 
                        ? 'Claim Free Coffee' 
                        : 'No Credits Available'
                      }
                    </span>
                  </button>
                </div>
              ) : (
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-600">Not Qualified</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    To qualify for free coffee credits, you can:
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Verify student status</li>
                    <li>• Apply for financial assistance</li>
                    <li>• Volunteer in community programs</li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* How it Works */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">How Pay It Forward Works</h4>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
              <div className="flex items-start space-x-2">
                <DollarSign className="h-4 w-4 text-pink-500 mt-0.5 flex-shrink-0" />
                <span>Community members donate coffee credits to help others</span>
              </div>
              <div className="flex items-start space-x-2">
                <Users className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <span>Qualified members can claim free coffee at participating cafes</span>
              </div>
              <div className="flex items-start space-x-2">
                <Coffee className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                <span>Building stronger, more inclusive communities together</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PayItForwardModal
