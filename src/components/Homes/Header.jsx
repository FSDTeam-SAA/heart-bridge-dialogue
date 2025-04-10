import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { auth } from '../../config/firebaseConfig'
import { signOut } from 'firebase/auth'

const Header = () => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      localStorage.removeItem('user')
      navigate('/login')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center space-x-2">
          <Heart className="h-5 w-5 text-pink-500" />
          <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent">
           My Relationship AI
          </span>
        </Link>

        <div className="flex items-center space-x-4">
          {user?.email ? (
            <>
              <Link
                to="/dashboard"
                className="text-sm font-medium text-gray-700 hover:text-pink-600"
              >
                Dashboard
              </Link>
              <button
                onClick={handleSignOut}
                className="text-sm font-medium text-gray-700 hover:text-pink-600 bg-transparent border-none cursor-pointer"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-gray-700 hover:text-pink-600"
              >
                Login
              </Link>
              <Link to="/signup">
                <button className="px-4 py-2 text-sm font-medium text-white bg-pink-500 rounded-md hover:bg-pink-600">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
