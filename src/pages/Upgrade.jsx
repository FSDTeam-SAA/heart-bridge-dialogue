
import { CheckIcon } from '../shared/CheckIcon'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { auth, db } from '../config/firebaseConfig' // Firebase config
import { ref, set } from 'firebase/database' // Import Realtime Database functions
import { useNavigate } from 'react-router-dom'

const Upgrade = () => {
  const [loading, setLoading] = useState(false)
  const [userPlan, setUserPlan] = useState(null)
  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem('user'))

  // useEffect(() => {
  //   const fetchUserPlan = async () => {
  //     if (user?.email) {
  //       try {
  //         const response = await axios.get(
  //           `http://localhost:5000/api/payment-status/${user.email}`
  //         )
  //         if (response.data.paymentStatus === 'paid') {
  //           setUserPlan('Pro Plan')
  //         }
  //       } catch (error) {
  //         console.error('Error fetching payment status:', error)
  //       }
  //     }
  //   }
  //   fetchUserPlan()
  // }, [user?.email])
//      'https://heart-bridge-dialogue-backend.onrender.com/api/payment',

useEffect(() => {
  const fetchUserPlan = async () => {
    if (user?.email) {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/payment-status/${user.email}`
        )
        const { paymentStatus, eventId } = response.data

        if (paymentStatus === 'paid' && eventId !== 'Limit_finished') {
          setUserPlan('Pro Plan')
        } else if (eventId === 'Limit_finished') {
          setUserPlan(null) // Allow payment again
        }
      } catch (error) {
        console.error('Error fetching payment status:', error)
      }
    }
  }
  fetchUserPlan()
}, [user?.email])


const handleUpgrade = async () => {
    setLoading(true)
    const user = JSON.parse(localStorage.getItem('user'))
    console.log('-----', user.email)
    try {
      const response = await axios.post(
        'http://localhost:5000/api/payment',

        {
          amount: 20,
          userId: user.email,
          eventId: 'pro_plan',
        }
      )

      if (response.data.url) {
        await updateUserPlan(user.email, response.data.paymentDetails)

        // Redirect to payment URL
        window.location.href = response.data.url
      }
    } catch (error) {
      console.error('Payment error:', error.response?.data || error.message)
      alert('Payment failed. Please try again.')
    }
    setLoading(false)
  }

  const updateUserPlan = async (userId, paymentDetails) => {
    try {
      // Set user payment info in Realtime Database
      await set(ref(db, 'users/' + userId), {
        plan: 'Pro Plan',
        paymentHistory: {
          [paymentDetails.paymentId]: {
            paymentStatus: true,
            plan: 'Pro Plan',
            amount: 20,
            messageLeft: 250,
            paymentDate: paymentDetails.paymentDate,
            paymentId: paymentDetails.paymentId,
          },
        },
      })

      console.log(
        'User plan and payment info updated in Firebase Realtime Database'
      )
      setUserPlan('Pro Plan')
    } catch (error) {
      console.error('Error updating user plan:', error)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">Upgrade Your Plan</h1>
        <p className="text-gray-600 mb-2">
          Choose the plan that works best for you
        </p>
        <p>
          Current plan:{' '}
          <span className="text-pink-500 font-medium">
            {userPlan || 'Free'}
          </span>
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Free Plan */}
        {userPlan !== 'Pro Plan' && (
          <div className="border border-pink-500 rounded-lg p-6 relative">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-pink-600">Free</h2>
              <div className="flex items-baseline mt-2">
                <span className="text-4xl font-bold text-pink-600">$0</span>
              </div>
              <p className="text-gray-600 mt-2">
                Basic access to relationship insights
              </p>
            </div>
            <div className="space-y-3 mb-8">
              <div className="flex items-start">
                <CheckIcon className="h-5 w-5 text-pink-500 mr-2 mt-0.5" />
                <span>10 messages per month</span>
              </div>
              <div className="flex items-start">
                <CheckIcon className="h-5 w-5 text-pink-500 mr-2 mt-0.5" />
                <span>Basic relationship analysis</span>
              </div>
            </div>

            <button className="w-full py-3 bg-gray-100 text-gray-600 rounded-md font-medium">
              Current Plan
            </button>
          </div>
        )}

        {/* Pro Plan */}
        <div className="border border-gray-200 rounded-lg p-6 relative">
          {userPlan !== 'Pro Plan' && (
            <div className="absolute -top-3 right-6 bg-pink-500 text-white text-sm px-3 py-1 rounded-full">
              Recommended
            </div>
          )}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-pink-600">Pro</h2>
            <div className="flex items-baseline mt-2">
              <span className="text-4xl font-bold text-pink-600">$20</span>
              <span className="text-gray-600 ml-1">/month</span>
            </div>
            <p className="text-gray-600 mt-2">
              Enhanced insights for deeper understanding
            </p>
          </div>
          <div className="space-y-3 mb-8">
            <div className="flex items-start">
              <CheckIcon className="h-5 w-5 text-pink-500 mr-2 mt-0.5" />
              <span>250 messages per month</span>
            </div>
            <div className="flex items-start">
              <CheckIcon className="h-5 w-5 text-pink-500 mr-2 mt-0.5" />
              <span>Advanced relationship analysis</span>
            </div>
          </div>

          {/* Show the button only if the user hasn't bought the plan */}
          {userPlan !== 'Pro Plan' && (
            <button
              onClick={handleUpgrade}
              className="w-full py-3 bg-pink-500 text-white rounded-md font-medium hover:bg-pink-600 transition-colors"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Upgrade'}
            </button>
          )}
        </div>
      </div>

      <p className="text-center text-gray-500 text-sm mt-8">
        All subscriptions are billed monthly and can be canceled anytime. By
        upgrading, you agree to our terms of service and privacy policy.
      </p>
    </div>
  )
}

export default Upgrade
