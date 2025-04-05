import React from 'react'
import { ArrowLeft, Heart } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
 
const RelationshipHeader = ({ relationship }) => {
  const navigate = useNavigate()

  if (!relationship) {
    return (
      <div className="flex items-center gap-4 mb-6 animate-pulse">
        <div className="h-8 w-8 rounded-full bg-gray-200"></div>
        <div className="h-6 w-48 bg-gray-200 rounded"></div>
      </div>
    )
  }

  return (
    <div className="flex items-start gap-4 mb-6">
      <div
        className="h-8 w-8 rounded-full bg-pink-200 flex justify-center items-center cursor-pointer shrink-0"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="h-4 w-4 text-pink-700" />
      </div>

      <div>
        <h1 className="text-2xl md:text-3xl font-bold">
          {relationship.title ||
            `${relationship.personName1} & ${relationship.personName2}`}
        </h1>

        <div className="flex items-center gap-2 mt-1">
          <button className="px-2 py-1 border border-gray-300 rounded-3xl text-xs font-medium">
            {relationship.relationshipState || relationship.status || 'Active'}
          </button>

          <div className="flex items-center text-xs text-gray-500">
            <Heart className="h-3 w-3 text-pink-500 mr-1" />
            {relationship.relationshipLength || 'Relationship'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RelationshipHeader
