import React from 'react'
import { MessageSquare, Plus } from 'lucide-react'

const EmptyState = ({ onNewConversation, message }) => {
  return (
    <div className="flex flex-col items-center justify-center h-64 p-6 text-center">
      <div className="h-16 w-16 rounded-full bg-pink-100 flex items-center justify-center mb-4">
        <MessageSquare className="h-8 w-8 text-pink-500" />
      </div>

      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {message || 'No conversations yet'}
      </h3>

      <p className="text-sm text-gray-500 mb-4 max-w-md">
        Start a new conversation to get relationship insights and advice based
        on your profile.
      </p>

      <button
        onClick={onNewConversation}
        className="flex items-center px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
      >
        <Plus className="h-4 w-4 mr-2" />
        New Conversation
      </button>
    </div>
  )
}

export default EmptyState
