import { Outlet } from "react-router-dom"
import AccountSidebar from "./AccountSidebar"

export default function Account() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-2xl font-bold text-pink-600 mb-6">Account Settings</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <AccountSidebar />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

