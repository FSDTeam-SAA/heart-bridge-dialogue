import React, { useState } from 'react'

const ChatInput = ({
  onSendMessage,
  isLoading = false,
  placeholder = 'Type your message...',
  disabled = false,
  className = '',
}) => {
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (message.trim() && !isLoading && !disabled) {
      onSendMessage(message)
      setMessage('')
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex items-center gap-2 ${className}`}
    >
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled || isLoading}
        className="w-full min-h-[50px] resize-none border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={1}
      />
      <button
        type="submit"
        disabled={!message.trim() || isLoading || disabled}
        className="h-10 w-10 flex items-center justify-center rounded-full bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-300"
      >
        ➤
      </button>
    </form>
  )
}

export default ChatInput
