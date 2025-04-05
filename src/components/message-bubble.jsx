import React from 'react'
import { formatDistanceToNow } from 'date-fns'

const MessageBubble = ({ message, isOwnMessage }) => {
  // Format the timestamp if it exists
  const formattedTime = message.timestamp
    ? formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })
    : 'just now'

  return (
    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[75%] p-3 rounded-lg ${
          isOwnMessage
            ? 'bg-pink-100 text-pink-900'
            : 'bg-white border border-gray-200'
        }`}
      >
        <p className="text-sm sm:text-base">{message.text}</p>
        <div className="flex justify-between items-center mt-1">
          <p className="text-xs text-gray-500">{formattedTime}</p>
          {!isOwnMessage && (
            <p className="text-xs text-gray-500 ml-2">Relationship Ai</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default MessageBubble
