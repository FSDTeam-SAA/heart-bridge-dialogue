

import { CheckIcon } from '../shared/CheckIcon'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { auth, db } from '../config/firebaseConfig' // Firebase config
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

const Upgrade = () => {
  const [loading, setLoading] = useState(false)
  const [userPlan, setUserPlan] = useState(null) // Track user's plan
  const navigate = useNavigate()

  useEffect(() => {
    // Fetch the current user plan from Firestore when the component loads
    const fetchUserPlan = async () => {
      if (auth.currentUser) {
        const userRef = doc(db, 'users', auth.currentUser.uid)
        const userDoc = await getDoc(userRef)

        if (userDoc.exists()) {
          setUserPlan(userDoc.data().plan)
        }
      }
    }
    fetchUserPlan()
  }, [])

  const handleUpgrade = async () => {
    setLoading(true)
    try {
      const response = await axios.post('http://localhost:5000/api/payment', {
        amount: 20,
        userId: auth.currentUser.uid, // Get current user ID from Firebase Authentication
        eventId: 'event_67890',
      })

      if (response.data.url) {
        // Update the user's plan in Firebase
        await updateUserPlan(auth.currentUser.uid)

        // Redirect to payment URL
        window.location.href = response.data.url
      }
    } catch (error) {
      console.error('Payment error:', error.response?.data || error.message)
      alert('Payment failed. Please try again.')
    }
    setLoading(false)
  }

  // Function to update user plan in Firebase Firestore
  const updateUserPlan = async (userId) => {
    try {
      const userRef = doc(db, 'users', userId) // Get user document reference
      await setDoc(
        userRef,
        {
          plan: 'Pro Plan', // Update to 'Pro Plan'
          subscriptionStatus: 'Active',
          memberSince: new Date(), // Set the current date as member since
        },
        { merge: true }
      ) // Merge with existing data

      console.log('User plan updated in Firestore')
      setUserPlan('Pro Plan') // Update local state to reflect the new plan
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
        {userPlan !== 'Pro Plan' && (
          <div className="border border-gray-200 rounded-lg p-6 relative">
            <div className="absolute -top-3 right-6 bg-pink-500 text-white text-sm px-3 py-1 rounded-full">
              Recommended
            </div>
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

            <button
              onClick={handleUpgrade}
              className="w-full py-3 bg-pink-500 text-white rounded-md font-medium hover:bg-pink-600 transition-colors"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Upgrade'}
            </button>
          </div>
        )}
      </div>

      <p className="text-center text-gray-500 text-sm mt-8">
        All subscriptions are billed monthly and can be canceled anytime. By
        upgrading, you agree to our terms of service and privacy policy.
      </p>
    </div>
  )
}

export default Upgrade
