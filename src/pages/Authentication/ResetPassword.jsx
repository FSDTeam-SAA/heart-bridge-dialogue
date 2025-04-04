import { useState, useEffect } from 'react'
import { getAuth, confirmPasswordReset } from 'firebase/auth'
import { useSearchParams, Link } from 'react-router-dom'

export default function ResetPassword() {
  const [searchParams] = useSearchParams()
  const [message, setMessage] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [success, setSuccess] = useState(false)
  const auth = getAuth()

  useEffect(() => {
    const oobCode = searchParams.get('oobCode')
    if (!oobCode) {
      setMessage('Invalid or missing reset code.')
    }
  }, [searchParams])

  const handleResetPassword = async () => {
    const oobCode = searchParams.get('oobCode')
    if (!oobCode) {
      setMessage('Invalid or missing reset code.')
      return
    }

    if (newPassword.length < 6) {
      setMessage('Password should be at least 6 characters long.')
      return
    }

    try {
      await confirmPasswordReset(auth, oobCode, newPassword)
      setSuccess(true)
      setMessage('Password has been reset successfully!')
    } catch (error) {
      setMessage('Password reset failed: ' + error.message)
      console.error('Reset error:', error)
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-66px)] items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md text-center">
        <div className="mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-16 w-16 mx-auto ${
              success ? 'text-green-500' : 'text-gray-500'
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 11V17M12 7h.01M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-center mb-4">
          Reset Your Password
        </h2>

        {message && <p className="text-gray-600 mb-4">{message}</p>}

        {!success && (
          <>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full py-2 px-4 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            />

            <button
              onClick={handleResetPassword}
              className="w-full py-2 px-4 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition duration-300"
            >
              Reset Password
            </button>
          </>
        )}

        {success && (
          <Link
            to="/login"
            className="w-full py-2 px-4 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition duration-300 block mt-4"
          >
            Go to Login
          </Link>
        )}
      </div>
    </div>
  )
}
