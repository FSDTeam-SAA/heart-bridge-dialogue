'use client'
import { useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { auth } from '../../config/firebaseConfig'
import { applyActionCode } from 'firebase/auth'

export default function VerifyEmailbytoken() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const oobCode = searchParams.get('oobCode')

        if (!oobCode) {
          throw new Error('No verification code provided')
        }

        // Apply the verification code
        await applyActionCode(auth, oobCode)

        // Redirect to login with success message
        navigate('/login?verified=true')
      } catch (error) {
        console.error('Email verification error:', error)
        // Redirect to login with error message
        navigate('/login?error=email_verification_failed')
      }
    }

    verifyEmail()
  }, [searchParams, navigate])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <p>Verifying your email address...</p>
      </div>
    </div>
  )
}
