import React from 'react'
import { useNavigate } from 'react-router-dom'

const Cancel = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-3xl font-bold text-red-600 mb-4">
        Payment Canceled ❌
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        It looks like you canceled your payment. No worries, you can try again
        anytime.
      </p>
      <button
        onClick={() => navigate('/upgrade')}
        className="px-6 py-3 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition"
      >
        Try Again
      </button>
    </div>
  )
}

export default Cancel
