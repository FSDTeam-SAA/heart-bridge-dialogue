
// import { Outlet } from "react-router-dom";
// import Sidebar from "./Sidebar";

// const Dashboard = () => {
//     return (
//         <section className="flex gap-10 ">
            
//             {/* Sidebar */}
//             <div className=" w-[14%] hidden lg:flex flex-col sticky top-0 h-screen overflow-auto">
//                 <Sidebar />
//             </div>

//             {/* Content Section */}
//             <div className="w-[85%] min-h-screen mx-auto">
//                 <Outlet />
//             </div>

//         </section>
//     );
// };

// export default Dashboard;

import { Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../config/firebaseConfig'
import { Link, useLocation } from 'react-router-dom'
import {
  Heart,
  Plus,
  MessageCircle,
  LayoutGrid,
  LayoutList,
} from 'lucide-react'
import ProgressBar from '@ramonak/react-progress-bar'

const DashboardLayout = () => {
  const location = useLocation()
  const [user, setUser] = useState(null)
  const [messageData, setMessageData] = useState({
    messagesSent: 0,
    messageLimit: 10,
    planStatus: 'inactive',
  })
  const [viewMode, setViewMode] = useState('grid')

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    const fetchMessageData = async () => {
      try {
        const userFromLocalStorage = JSON.parse(
          localStorage.getItem('user') || '{}'
        )
        if (userFromLocalStorage?.email) {
          const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/check-plan?email=${
              userFromLocalStorage.email
            }`
          )
          const data = await response.json()

          if (data.success) {
            setMessageData({
              messagesSent: data.messagesSent || 0,
              messageLimit: data.messageLimit || 10,
              planStatus: data.planStatus || 'inactive',
            })
          }
        }
      } catch (error) {
        console.error('Error fetching message data:', error)
      }
    }

    if (user) {
      fetchMessageData()
    }
  }, [user])

  const usagePercentage =
    messageData.messageLimit > 0
      ? (messageData.messagesSent / messageData.messageLimit) * 100
      : 0

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full bg-background">
      <div className="flex min-h-screen w-full bg-background">
        {/* Sidebar */}
        <aside className="w-64 border-r border-border/30 flex flex-col sticky top-0 h-screen overflow-auto bg-background">
          {/* Logo */}
          <div className="p-4 border-b border-border/30">
            <Link to="/" className="flex items-center space-x-2">
              <Heart className="h-5 w-5 text-pink-500" />
              <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent">
                HeartBridge
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 pt-2">
            <div className="px-4">
              <h2 className="text-sm font-medium text-muted-foreground">
                Relationships
              </h2>
              <div className="mt-2 space-y-1">
                <Link
                  to="/new-relationship"
                  className="w-full flex items-center text-sm font-medium text-pink-600 hover:bg-pink-50 px-2 py-1.5 rounded-md"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  <span>New Relationship</span>
                </Link>
                <Link
                  to="/messages"
                  className="w-full flex items-center text-sm font-medium text-pink-600 hover:bg-pink-50 px-2 py-1.5 rounded-md"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  <span>Messages</span>
                </Link>
              </div>
            </div>

            {/* Message Usage */}
            <div className="px-4 py-4 mt-4 border-t border-border/30">
              <div className="flex justify-between items-center text-sm text-muted-foreground">
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
                  baseBgColor="#f3f4f6"
                  isLabelVisible={false}
                />
              </div>
            </div>
          </nav>

          {/* User Account */}
          <div className="p-4 border-t border-border/30 mt-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center flex-1 truncate">
                <div className="h-8 w-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-500">
                  {user?.displayName?.charAt(0).toUpperCase() || 'U'}
                </div>
                <span className="ml-2 text-sm truncate">
                  {user?.displayName || 'User'}
                </span>
              </div>
              <Link
                to="/account"
                className="ml-2 text-sm hover:bg-pink-50 hover:text-pink-600 px-2 py-1 rounded-md"
              >
                Account
              </Link>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* View Mode Toggle */}
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-pink-800 bg-clip-text text-transparent">
                Dashboard
              </h1>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md ${
                    viewMode === 'grid'
                      ? 'bg-pink-100 text-pink-600'
                      : 'bg-muted'
                  }`}
                >
                  <LayoutGrid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md ${
                    viewMode === 'list'
                      ? 'bg-pink-100 text-pink-600'
                      : 'bg-muted'
                  }`}
                >
                  <LayoutList className="h-5 w-5" />
                </button>
                <Link
                  to="/new-relationship"
                  className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  New Relationship
                </Link>
              </div>
            </div>

            {/* Content */}
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'flex flex-col space-y-4'
              }
            >
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout