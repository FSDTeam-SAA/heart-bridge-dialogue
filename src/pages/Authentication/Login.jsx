// import {
//   Link,
//   useLocation,
//   useNavigate,
//   useSearchParams,
// } from 'react-router-dom'
// import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
// import { auth } from '../../config/firebaseConfig'
// import { useState, useEffect } from 'react'
// import { toast } from 'react-toastify'

// import { logEvent } from 'firebase/analytics'
// import { analytics } from '../../config/firebaseConfig'

// export default function Login() {
//   const navigate = useNavigate()
//   const location = useLocation()
//   const from = location.state || '/'
//   const [searchParams] = useSearchParams()

//   const verified = searchParams.get('verified')
//   const errorParam = searchParams.get('error')

//   useEffect(() => {
//     if (verified) {
//       toast.success('Email verified successfully! Please log in.')
//     }
//     if (errorParam === 'email_verification_failed') {
//       toast.error(
//         'Email verification failed. Please try again or request a new verification email.'
//       )
//     }
//   }, [verified, errorParam])

//   const [loginData, setLoginData] = useState({
//     email: '',
//     password: '',
//   })
//   const [error, setError] = useState('')
//   const [loading, setLoading] = useState(false)

//   const handleInputChange = (e) => {
//     setLoginData({
//       ...loginData,
//       [e.target.name]: e.target.value,
//     })
//     setError('')
//   }

//   const handleLogin = async (e) => {
//     e.preventDefault()
//     setLoading(true)
//     setError('')

//     if (!loginData.email || !loginData.password) {
//       setError('Please fill in all fields')
//       setLoading(false)
//       return
//     }

//     try {
//       const userCredential = await signInWithEmailAndPassword(
//         auth,
//         loginData.email,
//         loginData.password
//       )
//       const user = userCredential.user

//       if (!user.emailVerified) {
//         setError('Please verify your email before logging in.')
//         await signOut(auth)
//         setLoading(false)
//         return
//       }

//       localStorage.setItem(
//         'user',
//         JSON.stringify({
//           uid: user.uid,
//           email: user.email,
//           displayName: user.displayName,
//         })
//       )

//       navigate(from)

//       logEvent(analytics, 'login') 

//     } catch (error) {
//       let errorMessage = 'Login failed. Please try again.'
//       switch (error.code) {
//         case 'auth/invalid-credential':
//         case 'auth/wrong-password':
//           errorMessage = 'Invalid email or password'
//           break
//         case 'auth/user-not-found':
//           errorMessage = 'User not found'
//           break
//         case 'auth/too-many-requests':
//           errorMessage = 'Too many attempts. Try again later'
//           break
//         case 'auth/network-request-failed':
//           errorMessage = 'Network error. Check your connection'
//           break
//         case 'auth/user-disabled':
//           errorMessage = 'Account disabled. Contact support'
//           break
//       }
//       setError(errorMessage)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="flex min-h-[calc(100vh-66px)] items-center justify-center">
//       <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md">
//         <h2 className="text-2xl font-bold text-center">Welcome back</h2>
//         <p className="text-center mb-6 mt-3 text-gray-500 font-medium">
//           Enter your email to log in to your account
//         </p>

//         {error && (
//           <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
//             {error}
//           </div>
//         )}

//         <form className="space-y-4" onSubmit={handleLogin}>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Email<span className="text-red-500">*</span>
//             </label>
//             <input
//               type="email"
//               name="email"
//               value={loginData.email}
//               onChange={handleInputChange}
//               placeholder="name@example.com"
//               className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
//               required
//             />
//           </div>
//           <div>
//             <div>
//               <div className="flex justify-between items-center">
//                 <div className="block text-sm font-medium text-gray-700">
//                   Password<span className="text-red-500">*</span>
//                 </div>

//                 <Link to={'/forgot-password'}>
//                   <div className="block text-sm font-medium text-gray-700">
//                     Forgot Password?
//                   </div>
//                 </Link>
//               </div>
//             </div>
//             <input
//               type="password"
//               name="password"
//               value={loginData.password}
//               onChange={handleInputChange}
//               placeholder="Enter your password"
//               className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-pink-700 text-white py-2 rounded-md hover:bg-pink-800 transition disabled:bg-pink-400 disabled:cursor-not-allowed"
//           >
//             {loading ? 'Signing in...' : 'Sign in'}
//           </button>
//         </form>

//         <p className="text-center text-sm text-gray-600 mt-4">
//           Do not have an account?{' '}
//           <Link to="/signup" className="text-pink-500 hover:underline">
//             Sign Up
//           </Link>
//         </p>
//       </div>
//     </div>
//   )
// }


import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '../../config/firebaseConfig'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { logEvent, setUserId, setUserProperties } from 'firebase/analytics'
import { analytics } from '../../config/firebaseConfig'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state || '/'
  const [searchParams] = useSearchParams()

  const verified = searchParams.get('verified')
  const errorParam = searchParams.get('error')

  useEffect(() => {
    if (verified) {
      toast.success('Email verified successfully! Please log in.')
    }
    if (errorParam === 'email_verification_failed') {
      toast.error(
        'Email verification failed. Please try again or request a new verification email.'
      )
    }
  }, [verified, errorParam])

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    })
    setError('')
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (!loginData.email || !loginData.password) {
      setError('Please fill in all fields')
      setLoading(false)
      return
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        loginData.email,
        loginData.password
      )
      const user = userCredential.user

      if (!user.emailVerified) {
        setError('Please verify your email before logging in.')
        await signOut(auth)
        setLoading(false)
        return
      }

      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        emailVerified: user.emailVerified,
        providerData: user.providerData.map((provider) => ({
          providerId: provider.providerId,
          uid: provider.uid,
          displayName: provider.displayName,
          email: provider.email,
          phoneNumber: provider.phoneNumber,
          photoURL: provider.photoURL,
        })),
        metadata: {
          creationTime: user.metadata.creationTime,
          lastSignInTime: user.metadata.lastSignInTime,
        },
      }

      localStorage.setItem('user', JSON.stringify(userData))

      // Set Firebase Analytics user ID and properties
      if (analytics) {
        setUserId(analytics, user.uid)
        setUserProperties(analytics, {
          email: user.email,
          username: user.displayName || 'unknown',
          account_created: user.metadata.creationTime,
          last_login: user.metadata.lastSignInTime,
        })
        logEvent(analytics, 'login', {
          method: 'email',
          success: true,
        })
      }

      navigate(from)
    } catch (error) {
      let errorMessage = 'Login failed. Please try again.'
      switch (error.code) {
        case 'auth/invalid-credential':
        case 'auth/wrong-password':
          errorMessage = 'Invalid email or password'
          break
        case 'auth/user-not-found':
          errorMessage = 'User not found'
          break
        case 'auth/too-many-requests':
          errorMessage = 'Too many attempts. Try again later'
          break
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Check your connection'
          break
        case 'auth/user-disabled':
          errorMessage = 'Account disabled. Contact support'
          break
      }
      setError(errorMessage)

      // Log failed login attempt to analytics
      if (analytics) {
        logEvent(analytics, 'login_error', {
          error_code: error.code,
          error_message: error.message,
        })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-66px)] items-center justify-center">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-center">Welcome back</h2>
        <p className="text-center mb-6 mt-3 text-gray-500 font-medium">
          Enter your email to log in to your account
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleInputChange}
              placeholder="name@example.com"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>
          <div>
            <div>
              <div className="flex justify-between items-center">
                <div className="block text-sm font-medium text-gray-700">
                  Password<span className="text-red-500">*</span>
                </div>

                <Link to={'/forgot-password'}>
                  <div className="block text-sm font-medium text-gray-700">
                    Forgot Password?
                  </div>
                </Link>
              </div>
            </div>
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-700 text-white py-2 rounded-md hover:bg-pink-800 transition disabled:bg-pink-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Do not have an account?{' '}
          <Link to="/signup" className="text-pink-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}