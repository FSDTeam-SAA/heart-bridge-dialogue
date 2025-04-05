import { MessageCircle, Plus, Clock, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'
 
const ConversationHistory = ({
  conversations,
  currentConversationId,
  relationshipId,
  onSelectConversation,
  onNewConversation,
}) => {
  const navigate = useNavigate()
 
  if (!conversations || conversations.length === 0) {
    return (
      <div className="mt-8 p-4 border border-gray-200 rounded-lg bg-gray-50">
        <div className="text-center">
          <MessageCircle className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <h3 className="text-lg font-medium text-gray-700">
            No conversation history
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Start a new conversation to get relationship insights
          </p>
          <button
            onClick={onNewConversation}
            className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
          >
            <Plus className="h-4 w-4 inline mr-2" />
            New Conversation
          </button>
        </div>
      </div>
    )
  }

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Recently'
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true })
  }

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Conversation History</h2>
        <button
          onClick={onNewConversation}
          className="flex items-center text-sm text-pink-600 hover:text-pink-700"
        >
          <Plus className="h-4 w-4 mr-1" />
          New Conversation
        </button>
      </div>

      <div className="space-y-2">
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            onClick={() => onSelectConversation(conversation.id)}
            className={`p-3 border rounded-lg cursor-pointer transition-colors ${
              conversation.id === currentConversationId
                ? 'bg-pink-50 border-pink-200'
                : 'hover:bg-gray-50 border-gray-200'
            }`}
          >
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-pink-100 flex items-center justify-center mr-3 shrink-0">
                <MessageCircle className="h-5 w-5 text-pink-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium truncate">
                    {conversation.title || 'Conversation'}
                  </h3>
                  <ChevronRight className="h-4 w-4 text-gray-400 shrink-0 ml-2" />
                </div>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <Clock className="h-3 w-3 mr-1" />
                  {formatDate(conversation.createdAt)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ConversationHistory
