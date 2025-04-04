// import { useEffect, useState } from 'react'
// import { useSearchParams, useNavigate, Link } from 'react-router-dom'
// import { auth } from '../../config/firebaseConfig'
// import {
//   applyActionCode,
//   checkActionCode,
//   sendEmailVerification,
//   onAuthStateChanged,
// } from 'firebase/auth'

// export default function VerifyEmailByToken() {
//   const [searchParams] = useSearchParams()
//   const navigate = useNavigate()
//   const [status, setStatus] = useState('verifying') // 'verifying', 'success', 'error', 'already_verified', 'resend_success'
//   const [errorMessage, setErrorMessage] = useState('')
//   const [email, setEmail] = useState('')
//   const [user, setUser] = useState(null)
//   const [hasVerified, setHasVerified] = useState(false) // Track if we've already attempted verification

//   // Track auth state
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser)
//     })
//     return () => unsubscribe()
//   }, [])

//   // Verify email on component mount (only once)
//   useEffect(() => {
//     const verifyEmail = async () => {
//       if (hasVerified) return // Skip if we've already attempted verification

//       try {
//         const oobCode = searchParams.get('oobCode')

//         if (!oobCode) {
//           throw new Error('No verification code provided')
//         }

//         // First check if the code is valid
//         const info = await checkActionCode(auth, oobCode)
//         setEmail(info.data.email || '')
//         setHasVerified(true)

//         // Apply the verification code
//         await applyActionCode(auth, oobCode)

//         // Check if user is logged in and email is verified
//         const currentUser = auth.currentUser
//         if (currentUser?.emailVerified) {
//           setStatus('already_verified')
//         } else {
//           setStatus('success')
//         }
//       } catch (error) {
//         console.error('Verification error:', error)
//         setStatus('error')
//         setHasVerified(true)

//         switch (error.code) {
//           case 'auth/invalid-action-code':
//             setErrorMessage('This verification link is invalid or has expired.')
//             break
//           case 'auth/user-not-found':
//             setErrorMessage('No account found for this verification link.')
//             break
//           case 'auth/expired-action-code':
//             setErrorMessage('This verification link has expired.')
//             break
//           default:
//             setErrorMessage(error.message || 'Email verification failed.')
//         }
//       }
//     }

//     verifyEmail()
//   }, [searchParams, hasVerified])
// console.log(status)
//   // Rest of your component remains the same...
//   const handleResendVerification = async () => {
//     try {
//       if (!user) {
//         throw new Error('Please sign in to resend verification email')
//       }

//       await sendEmailVerification(user)
//       setStatus('resend_success')
//       setErrorMessage('')
//     } catch (error) {
//       console.error('Resend error:', error)
//       setErrorMessage(
//         error.code === 'auth/too-many-requests'
//           ? 'Too many requests. Please try again later.'
//           : error.message || 'Failed to resend verification email.'
//       )
//     }
//   }

//   // Loading state
//   if (status === 'verifying') {
//     return (
//       <div className="flex items-center justify-center min-h-[calc(100vh-66px)]">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-600 mx-auto mb-4"></div>
//           <p className="text-gray-600">Verifying your email address...</p>
//         </div>
//       </div>
//     )
//   }

//   // Error state
//   // if (status === 'error') {
//   //   return (
//   //     <div className="flex min-h-[calc(100vh-66px)] items-center justify-center">
//   //       <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md text-center">
//   //         <div className="mb-6">
//   //           <svg
//   //             xmlns="http://www.w3.org/2000/svg"
//   //             className="h-16 w-16 text-red-500 mx-auto"
//   //             fill="none"
//   //             viewBox="0 0 24 24"
//   //             stroke="currentColor"
//   //           >
//   //             <path
//   //               strokeLinecap="round"
//   //               strokeLinejoin="round"
//   //               strokeWidth={2}
//   //               d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//   //             />
//   //           </svg>
//   //         </div>

//   //         <h2 className="text-2xl font-bold text-center mb-4">
//   //           Verification Failed
//   //         </h2>

//   //         <p className="text-gray-600 mb-6">{errorMessage}</p>

//   //         <div className="space-y-4">
//   //           {user && (
//   //             <button
//   //               onClick={handleResendVerification}
//   //               className="w-full py-2 px-4 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition duration-300"
//   //             >
//   //               Send New Verification Email
//   //             </button>
//   //           )}

//   //           <Link
//   //             to="/login"
//   //             className="w-full py-2 px-4 border border-pink-600 text-pink-600 rounded-md hover:bg-pink-50 transition duration-300 block"
//   //           >
//   //             Go to Login
//   //           </Link>
//   //         </div>
//   //       </div>
//   //     </div>
//   //   )
//   // }

//   // Already verified state
//   if (status === 'already_verified') {
//     return (
//       <div className="flex min-h-[calc(100vh-66px)] items-center justify-center">
//         <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md text-center">
//           <div className="mb-6">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-16 w-16 text-blue-500 mx-auto"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M5 13l4 4L19 7"
//               />
//             </svg>
//           </div>
//           <h2 className="text-2xl font-bold text-center mb-4">
//             Email Already Verified
//           </h2>
//           <p className="text-gray-600 mb-6">
//             Your email address has already been verified.
//           </p>
//           <Link
//             to="/login"
//             className="w-full py-2 px-4 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition duration-300 block"
//           >
//             Go to Login
//           </Link>
//         </div>
//       </div>
//     )
//   }

//   // Resend success state
//   if (status === 'resend_success') {
//     return (
//       <div className="flex min-h-[calc(100vh-66px)] items-center justify-center">
//         <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md text-center">
//           <div className="mb-6">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-16 w-16 text-green-500 mx-auto"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M5 13l4 4L19 7"
//               />
//             </svg>
//           </div>
//           <h2 className="text-2xl font-bold text-center mb-4">
//             Verification Email Sent
//           </h2>
//           <p className="text-gray-600 mb-6">
//             We've sent a new verification link to{' '}
//             {email || 'your email address'}. Please check your inbox.
//           </p>
//           <Link
//             to="/login"
//             className="w-full py-2 px-4 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition duration-300 block"
//           >
//             Go to Login
//           </Link>
//         </div>
//       </div>
//     )
//   }

//   // Default success state
//   return (
//     <div className="flex min-h-[calc(100vh-66px)] items-center justify-center">
//       <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md text-center">
//         <div className="mb-6">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-16 w-16 text-green-500 mx-auto"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M5 13l4 4L19 7"
//             />
//           </svg>
//         </div>
//         <h2 className="text-2xl font-bold text-center mb-4">
//           Email Verified Successfully!
//         </h2>
//         <p className="text-gray-600 mb-6">
//           Your email address has been successfully verified.
//         </p>
//         <Link
//           to="/login"
//           className="w-full py-2 px-4 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition duration-300 block"
//         >
//           Go to Login
//         </Link>
//       </div>
//     </div>
//   )
// }





import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import {
  getAuth,
  confirmPasswordReset,
  applyActionCode,
  checkActionCode,
  sendEmailVerification,
  onAuthStateChanged,
} from 'firebase/auth'

export default function AuthActionHandler() {
  const [searchParams] = useSearchParams()
  const [message, setMessage] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [success, setSuccess] = useState(false)
  const [status, setStatus] = useState('verifying') // For email verification
  const [errorMessage, setErrorMessage] = useState('')
  const [email, setEmail] = useState('')
  const [user, setUser] = useState(null)
  const [hasVerified, setHasVerified] = useState(false)
  const [mode, setMode] = useState(null) // 'resetPassword' or 'verifyEmail'
  const auth = getAuth()

  // Determine the mode from URL parameters
  useEffect(() => {
    const urlMode = searchParams.get('mode')
    if (urlMode === 'resetPassword' || urlMode === 'verifyEmail') {
      setMode(urlMode)
    } else {
      setMessage('Invalid or missing action type.')
      setStatus('error')
    }
  }, [searchParams])

  // Track auth state for email verification
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return () => unsubscribe()
  }, [auth])

  // Handle email verification
  useEffect(() => {
    if (mode !== 'verifyEmail' || hasVerified) return

    const verifyEmail = async () => {
      try {
        const oobCode = searchParams.get('oobCode')
        if (!oobCode) {
          throw new Error('No verification code provided')
        }

        // First check if the code is valid
        const info = await checkActionCode(auth, oobCode)
        setEmail(info.data.email || '')
        setHasVerified(true)

        // Apply the verification code
        await applyActionCode(auth, oobCode)

        // Check if user is logged in and email is verified
        const currentUser = auth.currentUser
        if (currentUser?.emailVerified) {
          setStatus('already_verified')
        } else {
          setStatus('success')
        }
      } catch (error) {
        console.error('Verification error:', error)
        setStatus('error')
        setHasVerified(true)

        switch (error.code) {
          case 'auth/invalid-action-code':
            setErrorMessage('This verification link is invalid or has expired.')
            break
          case 'auth/user-not-found':
            setErrorMessage('No account found for this verification link.')
            break
          case 'auth/expired-action-code':
            setErrorMessage('This verification link has expired.')
            break
          default:
            setErrorMessage(error.message || 'Email verification failed.')
        }
      }
    }

    verifyEmail()
  }, [mode, searchParams, hasVerified, auth])

  // Handle password reset
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

  // Handle resend verification email
  const handleResendVerification = async () => {
    try {
      if (!user) {
        throw new Error('Please sign in to resend verification email')
      }

      await sendEmailVerification(user)
      setStatus('resend_success')
      setErrorMessage('')
    } catch (error) {
      console.error('Resend error:', error)
      setErrorMessage(
        error.code === 'auth/too-many-requests'
          ? 'Too many requests. Please try again later.'
          : error.message || 'Failed to resend verification email.'
      )
    }
  }

  // Loading state for email verification
  if (mode === 'verifyEmail' && status === 'verifying') {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-66px)]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying your email address...</p>
        </div>
      </div>
    )
  }

  // Password reset UI
  if (mode === 'resetPassword') {
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

  // Email verification states
  if (mode === 'verifyEmail') {
    // Already verified state
    if (status === 'already_verified') {
      return (
        <div className="flex min-h-[calc(100vh-66px)] items-center justify-center">
          <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md text-center">
            <div className="mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-blue-500 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-center mb-4">
              Email Already Verified
            </h2>
            <p className="text-gray-600 mb-6">
              Your email address has already been verified.
            </p>
            <Link
              to="/login"
              className="w-full py-2 px-4 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition duration-300 block"
            >
              Go to Login
            </Link>
          </div>
        </div>
      )
    }

    // Resend success state
    if (status === 'resend_success') {
      return (
        <div className="flex min-h-[calc(100vh-66px)] items-center justify-center">
          <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md text-center">
            <div className="mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-green-500 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-center mb-4">
              Verification Email Sent
            </h2>
            <p className="text-gray-600 mb-6">
              We've sent a new verification link to{' '}
              {email || 'your email address'}. Please check your inbox.
            </p>
            <Link
              to="/login"
              className="w-full py-2 px-4 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition duration-300 block"
            >
              Go to Login
            </Link>
          </div>
        </div>
      )
    }

    // Error state
    if (status === 'error') {
      return (
        <div className="flex min-h-[calc(100vh-66px)] items-center justify-center">
          <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md text-center">
            <div className="mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-red-500 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            <h2 className="text-2xl font-bold text-center mb-4">
              Verification Failed
            </h2>

            <p className="text-gray-600 mb-6">{errorMessage}</p>

            <div className="space-y-4">
              {user && (
                <button
                  onClick={handleResendVerification}
                  className="w-full py-2 px-4 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition duration-300"
                >
                  Send New Verification Email
                </button>
              )}

              <Link
                to="/login"
                className="w-full py-2 px-4 border border-pink-600 text-pink-600 rounded-md hover:bg-pink-50 transition duration-300 block"
              >
                Go to Login
              </Link>
            </div>
          </div>
        </div>
      )
    }

    // Default success state for email verification
    return (
      <div className="flex min-h-[calc(100vh-66px)] items-center justify-center">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md text-center">
          <div className="mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-green-500 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-center mb-4">
            Email Verified Successfully!
          </h2>
          <p className="text-gray-600 mb-6">
            Your email address has been successfully verified.
          </p>
          <Link
            to="/login"
            className="w-full py-2 px-4 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition duration-300 block"
          >
            Go to Login
          </Link>
        </div>
      </div>
    )
  }

  // Default invalid mode state
  return (
    <div className="flex min-h-[calc(100vh-66px)] items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md text-center">
        <div className="mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-red-500 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-center mb-4">Invalid Action</h2>
        <p className="text-gray-600 mb-6">
          The link you followed is invalid or has expired.
        </p>
        <Link
          to="/login"
          className="w-full py-2 px-4 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition duration-300 block"
        >
          Go to Login
        </Link>
      </div>
    </div>
  )
}