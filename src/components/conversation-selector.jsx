import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ChevronDown, MessageCircle, Plus } from 'lucide-react'

const ConversationSelector = ({
  conversations,
  currentConversationId,
  relationshipId,
  onNewConversation,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const getCurrentConversationTitle = () => {
    if (!currentConversationId || !conversations.length)
      return 'Current Conversation'
    const current = conversations.find((c) => c.id === currentConversationId)
    return current?.title || 'Conversation'
  }

  const handleConversationSelect = (conversationId) => {
    navigate(`/message/${relationshipId}?conversation=${conversationId}`)
    setIsOpen(false)
  }

  const formatDate = (timestamp) => {
    if (!timestamp) return ''
    const date = new Date(timestamp)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-3 py-2 text-sm border rounded-lg hover:bg-gray-50"
      >
        <div className="flex items-center">
          <MessageCircle className="h-4 w-4 mr-2 text-pink-500" />
          <span>{getCurrentConversationTitle()}</span>
        </div>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
          <div
            className="p-2 hover:bg-pink-50 cursor-pointer border-b flex items-center text-pink-600"
            onClick={() => {
              onNewConversation()
              setIsOpen(false)
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            <span>New Conversation</span>
          </div>

          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`p-2 cursor-pointer hover:bg-gray-50 ${
                conversation.id === currentConversationId ? 'bg-gray-100' : ''
              }`}
              onClick={() => handleConversationSelect(conversation.id)}
            >
              <div className="flex justify-between items-center">
                <span className="truncate">
                  {conversation.title || 'Conversation'}
                </span>
                <span className="text-xs text-gray-500">
                  {formatDate(conversation.createdAt)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ConversationSelector
