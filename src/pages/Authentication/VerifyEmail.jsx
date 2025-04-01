
import { Link } from 'react-router-dom'

export default function VerifyEmail() {
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
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-center mb-4">
          Verify Your Email
        </h2>

        <p className="text-gray-600 mb-6">
          We've sent a verification link to your email address. Please check
          your inbox and click the link to verify your account.
        </p>

        <div className="mb-6">
          <p className="text-sm text-gray-500">
            Didn't receive the email? Check your spam folder or
            <button className="text-pink-600 hover:underline ml-1">
              resend verification email
            </button>
          </p>
        </div>

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
