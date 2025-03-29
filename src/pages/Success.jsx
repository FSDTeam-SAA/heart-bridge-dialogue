
import React, { useEffect, useState } from 'react'

import { auth, db } from '../config/firebaseConfig'

import { doc, getDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

const Success = () => {
  const [userPlan, setUserPlan] = useState(null)
  const navigate = useNavigate()

  // Fetch user data from Firestore on page load
  useEffect(() => {
    const fetchUserPlan = async () => {
      if (auth.currentUser) {
        const userRef = doc(db, 'users', auth.currentUser.uid)
        const docSnap = await getDoc(userRef)

        if (docSnap.exists()) {
          setUserPlan(docSnap.data().plan)
        } else {
          console.log('No such document!')
        }
      }
    }

    fetchUserPlan()
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        Payment Successful! 🎉
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        Thank you for upgrading your plan. Your payment has been successfully
        processed.
      </p>
      <p className="text-sm text-gray-600 mb-6">
        Your current plan:{' '}
        <span className="font-medium text-pink-600">
          {userPlan || 'Loading...'}
        </span>
      </p>

      <button
        onClick={() => navigate('/')}
        className="px-6 py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition"
      >
        Go to Dashboard
      </button>
    </div>
  )
}

export default Success
