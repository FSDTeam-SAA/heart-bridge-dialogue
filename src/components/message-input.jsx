import { useState } from 'react'
import { Send, Smile, Paperclip } from 'lucide-react'
 
const MessageInput = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!message.trim() || disabled) return

    onSendMessage(message.trim())
    setMessage('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`mt-4 p-3 border rounded-lg transition-all ${
        isFocused ? 'border-pink-300 shadow-sm' : 'border-gray-200'
      }`}
    >
      <div className="flex items-center">
        <button
          type="button"
          className="p-2 text-gray-400 hover:text-gray-600 rounded-full"
        >
          <Paperclip className="h-5 w-5" />
        </button>

        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={
            disabled
              ? 'Message limit reached - upgrade plan'
              : 'Ask any question about your relationship...'
          }
          className="flex-1 px-3 py-2 focus:outline-none text-sm sm:text-base"
          disabled={disabled}
        />

        <button
          type="button"
          className="p-2 text-gray-400 hover:text-gray-600 rounded-full"
        >
          <Smile className="h-5 w-5" />
        </button>

        <button
          type="submit"
          className={`p-2 rounded-full ${
            !message.trim() || disabled
              ? 'bg-gray-100 text-gray-400'
              : 'bg-pink-500 text-white hover:bg-pink-600'
          }`}
          disabled={!message.trim() || disabled}
        >
          <Send className="h-5 w-5" />
        </button>
      </div>

      <p className="text-xs text-gray-500 mt-2 ml-2">
        Relationship Ai provides research-based relationship insights
      </p>
    </form>
  )
}

export default MessageInput
