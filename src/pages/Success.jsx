import React, { useEffect, useState } from 'react'
import { auth, db } from '../config/firebaseConfig'
import { ref, get } from 'firebase/database'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'

const Success = () => {
  const [userPlan, setUserPlan] = useState('Loading...')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserPlan = async (userId) => {
      const userRef = ref(db, 'users/' + userId)
      const snapshot = await get(userRef)

      if (snapshot.exists()) {
        setUserPlan(snapshot.val().planType || 'Free Plan')
      } else {
        console.log('No user data found.')
      }
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserPlan(user.uid)
      }
    })

    return () => unsubscribe()
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
      {/* <p className="text-sm text-gray-600 mb-6">
        Your current plan:{' '}
        <span className="font-medium text-pink-600">{userPlan}</span>
      </p> */}

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
