import { Link, useLocation } from 'react-router-dom'
import { Heart, Plus } from 'lucide-react'
import ProgressBar from '@ramonak/react-progress-bar'
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../config/firebaseConfig'

const Sidebar = () => {
  const location = useLocation()

  const [user, setUser] = useState(null)
  const [messageData, setMessageData] = useState({
    messagesSent: 0,
    messageLimit: 10,
    planStatus: 'inactive',
  })

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    const fetchMessageData = async () => {
      const userFromLocalStorage = JSON.parse(localStorage.getItem('user'))
      if (userFromLocalStorage?.email) {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/check-plan?email=${
              userFromLocalStorage.email
            }`
          )
          const data = await response.json()

          if (data.success) {
            setMessageData({
              messagesSent: data.messagesSent,
              messageLimit: data.messageLimit,
              planStatus: data.planStatus,
            })
          } else {
            setMessageData({
              messagesSent: 0,
              messageLimit: 0,
              planStatus: 'inactive',
            })
          }
        } catch (error) {
          console.error('Error fetching message data:', error)
        }
      }
    }

    if (user) {
      fetchMessageData()
    }
  }, [user])

  const usagePercentage =
    (messageData.messagesSent / messageData.messageLimit) * 100

  return (
    <aside className="border-r border-gray-200 flex flex-col bg-[#FAFAFA] h-full">
      {/* Logo */}
      <div className="p-4 border-b border-gray-200">
        <Link
          to="/"
          className="flex items-center justify-center text-pink-500 font-bold text-xl"
        >
          <Heart className="mr-2 h-5 w-5" />
          <span>My Relationship AI</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        <div className="px-4 py-3">
          <h2 className="text-gray-600 text-sm">Relationships</h2>
          <Link
            to="/"
            className="flex items-center mt-2 text-pink-500 hover:bg-pink-50 px-2 py-1 rounded hover:text-black font-semibold"
          >
            <Plus className="h-4 w-4 mr-2" />
            <span>New Relationship</span>
          </Link>
          <Link
            to="/messages"
            className="flex items-center mt-2 text-pink-500 hover:bg-pink-50 px-2 py-1 rounded hover:text-black font-semibold"
          >
            <Plus className="h-4 w-4 mr-2" />
            <span>Message</span>
          </Link>
        </div>

        {/* Message Usage */}
        <div className="px-4 py-14 border-t border-gray-200">
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>
              Message usage ({messageData.messagesSent}/
              {messageData.messageLimit})
            </span>
            <span>{Math.min(usagePercentage, 100)}%</span>
          </div>

          <div className="mt-2">
            <ProgressBar
              completed={Math.min(usagePercentage, 100)}
              height="8px"
              bgColor="#EC4899"
            />
          </div>
        </div>
      </nav>

      {/* User Account */}
      <div className="p-4 border-t border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center text-red-500 mr-3">
            {user?.displayName?.charAt(0).toUpperCase()}
          </div>
          <h1>{user?.displayName}</h1>
        </div>

        <Link to={'/account'}>
          <div className="text-sm truncate py-2 px-3 rounded-lg hover:text-pink-600 hover:bg-pink-100 transition font-semibold">
            Account
          </div>
        </Link>
      </div>
    </aside>
  )
}

export default Sidebar
