import { LayoutGrid, LayoutList, Plus } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"

const DashNav = ({ viewMode, setViewMode }) => {
  //   const [viewMode, setViewMode] = useState('grid')

  return (
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-pink-800 bg-clip-text text-transparent">
        Dashboard
      </h1>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => setViewMode('grid')}
          className={`p-2 rounded-md ${
            viewMode === 'grid' ? 'bg-pink-100 text-pink-600' : 'bg-muted'
          }`}
        >
          <LayoutGrid className="h-5 w-5" />
        </button>
        <button
          onClick={() => setViewMode('list')}
          className={`p-2 rounded-md ${
            viewMode === 'list' ? 'bg-pink-100 text-pink-600' : 'bg-muted'
          }`}
        >
          <LayoutList className="h-5 w-5" />
        </button>
        <Link
          to="/"
          className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Relationship
        </Link>
      </div>
    </div>
  )
}

export default DashNav