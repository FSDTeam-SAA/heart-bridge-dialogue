import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../../config/firebaseConfig'
import { onAuthStateChanged, sendPasswordResetEmail } from 'firebase/auth'

export default function ForgotPass() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser?.email) {
        setEmail(currentUser?.email)
      }
    })
    return () => unsubscribe()
  }, [auth])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      await sendPasswordResetEmail(auth, email)
      setIsSuccess(true)
    } catch (err) {
      setError(err.message)
    }
    setIsSubmitting(false)
  }

  return (
    <div className="flex min-h-[calc(100vh-66px)] items-center justify-center p-4">
      <div className="w-full max-w-md rounded-lg border border-gray-100 bg-white p-8 shadow-md">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-[#C62553]">
            My Relationship Ai
          </h1>
        </div>

        <h2 className="mb-2 text-center text-2xl font-bold text-gray-900">
          Reset your password
        </h2>
        <p className="mb-6 text-center text-gray-600">
          Enter your email and we'll send you a reset link
        </p>

        {isSuccess ? (
          <div className="rounded-md bg-green-50 p-4 text-center">
            <p className="text-green-800">
              Reset link sent! Please check your email.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="mb-1 block font-medium text-gray-900"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="hello@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 outline-none focus:outline-none focus:ring-1"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 w-full rounded-md bg-pink-700 px-4 py-2 font-medium text-white transition-colors hover:bg-pink-800 focus:outline-none focus:ring-2 focus:bg-pink-800 focus:ring-offset-2 disabled:opacity-70"
            >
              {isSubmitting ? 'Sending...' : 'Send reset link'}
            </button>
          </form>
        )}

        <div className="mt-6 text-center text-sm text-gray-600">
          Remember your password?{' '}
          <Link to="/login" className="font-medium text-[#C62553]">
            Back to login
          </Link>
        </div>
      </div>
    </div>
  )
}
