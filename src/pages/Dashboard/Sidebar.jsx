import { Link, useLocation } from "react-router-dom"
import { Heart, Plus } from "lucide-react"
import ProgressBar from "@ramonak/react-progress-bar";

const Sidebar = () => {
  const location = useLocation()

  return (
    <aside className="border-r border-gray-200 flex flex-col bg-[#FAFAFA] h-full">
      {/* Logo */}
      <div className="p-4 border-b border-gray-200">
        <Link to="/" className="flex items-center justify-center text-pink-500 font-bold text-xl">
          <Heart className="mr-2 h-5 w-5 " />
          <span>HeartBridge</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        <div className="px-4 py-3">
          <h2 className="text-gray-600 text-sm">Relationships</h2>
          <Link
            to="/new-relationship"
            className="flex items-center mt-2 text-pink-500 hover:bg-pink-50 px-2 py-1 rounded hover:text-black font-semibold"
          >
            <Plus className="h-4 w-4 mr-2" />
            <span>New Relationship</span>
          </Link>
        </div>

        {/* Message Usage */}
        <div className="px-4 py-14 border-t border-gray-200">
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>Message usage (0/10)</span>
            <span>0%</span>
          </div>

          <div className="mt-2">
            <ProgressBar completed={0} height="8px" bgColor="#EC4899" />
          </div>
        </div>
      </nav>

      {/* User Account */}
      <div className="p-4 border-t border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-1">
            <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center text-red-500 mr-3">R</div>
            <h1>Name</h1>
        </div>

        <Link>
            <div className="text-sm truncate py-2 px-3 rounded-lg hover:text-pink-600 hover:bg-pink-100 transition font-semibold">Account</div>
        </Link>
      </div>
    </aside>
  )
}

export default Sidebar

