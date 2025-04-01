import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Success = () => {
  const [userPlan, setUserPlan] = useState('Loading...')
  const navigate = useNavigate()

  useEffect(() => {
    // Get the email from localStorage
    const user = JSON.parse(localStorage.getItem('user'))
    const email = user?.email

    if (email) {
      // Make an API call to check the payment status
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/check-payment-status/${email}`)
        .then((response) => {
          const { updatedPayments } = response.data

          if (updatedPayments && updatedPayments.length > 0) {
            // Assuming we want to get the most recent plan from the first payment
            const latestPayment = updatedPayments[0]
            if (latestPayment.paymentStatus === 'completed') {
              setUserPlan(
                `Your plan is upgraded. Message limit: ${latestPayment.messageLimit}`
              )
            } else {
              setUserPlan('Payment still processing or failed.')
            }
          } else {
            setUserPlan('No payment records found.')
          }
        })
        .catch((error) => {
          console.error('Error fetching payment status:', error)
          setUserPlan('Error fetching payment status.')
        })
    } else {
      setUserPlan('No user logged in.')
    }
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
      <p className="text-lg text-gray-700 mb-6">{userPlan}</p>
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
