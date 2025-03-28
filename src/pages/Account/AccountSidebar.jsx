"use client"

import { NavLink, useNavigate } from "react-router-dom"
import { User, CreditCard } from "lucide-react"
import { signOut } from "firebase/auth"
import { auth } from "../../config/firebaseConfig"

export default function AccountSidebar() {
  const navigate = useNavigate()

  const handleSignOut = async() => {
    await signOut(auth);
    localStorage.removeItem("user");
  }

  return (
    <div className="w-full md:w-64 border rounded-lg p-4 h-52">
      <nav className="flex flex-col space-y-1">
        <NavLink
          to="/account/profile"
          className={({ isActive }) =>
            `flex items-center px-4 py-2 rounded-md ${
              isActive ? "bg-pink-50/80 text-pink-600 font-semibold" : "text-gray-500 font-semibold"
            }`
          }
        >
          <User className="mr-2 h-5 w-5" />
          <span>Profile</span>
        </NavLink>
        <NavLink
          to="/account/subscription"
          className={({ isActive }) =>
            `flex items-center px-4 py-2 rounded-md ${
              isActive ? "bg-pink-50 text-pink-600 font-semibold" : "text-gray-500 font-semibold"
            }`
          }
        >
          <CreditCard className="mr-2 h-5 w-5" />
          <span>Subscription</span>
        </NavLink>
      </nav>
      <div className="mt-8">
        <button
          onClick={handleSignOut}
          className="w-full border border-gray-300 text-pink-600 py-2 px-4 rounded-md hover:bg-pink-50 transition-colors"
        >
          Sign Out
        </button>
      </div>
    </div>
  )
}

