'use client'
import { MessageCircle, Clock } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

const ConversationItem = ({ conversation, isActive, onClick }) => {
  // Format the timestamp if it exists
  const formattedTime = conversation.createdAt
    ? formatDistanceToNow(new Date(conversation.createdAt), { addSuffix: true })
    : 'just now'

  // Get the first few characters of the first message as a preview
  const getPreview = () => {
    if (!conversation.messages) return 'Start a new conversation'

    const firstMessage = Object.values(conversation.messages)[0]
    if (!firstMessage) return 'Start a new conversation'

    return firstMessage.text.length > 40
      ? `${firstMessage.text.substring(0, 40)}...`
      : firstMessage.text
  }

  return (
    <div
      onClick={onClick}
      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
        isActive
          ? 'bg-pink-50 border-pink-200'
          : 'hover:bg-gray-50 border-gray-200'
      }`}
    >
      <div className="flex items-center">
        <div className="h-8 w-8 rounded-full bg-pink-100 flex items-center justify-center mr-3">
          <MessageCircle className="h-4 w-4 text-pink-600" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium truncate">
            {conversation.title || 'Conversation'}
          </h3>
          <div className="flex items-center text-xs text-gray-500 mt-1">
            <Clock className="h-3 w-3 mr-1" />
            {formattedTime}
          </div>
          <p className="text-xs text-gray-500 mt-1 truncate">{getPreview()}</p>
        </div>
      </div>
    </div>
  )
}

export default ConversationItem
