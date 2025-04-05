'use client'

import { useState, useEffect } from 'react'
import { ref, onValue } from 'firebase/database'
import { db } from '../config/firebaseConfig'
import { useNavigate } from 'react-router-dom'
import { MessageCircle, Plus, Clock } from 'lucide-react'

const ConversationList = ({ relationshipId }) => {
  const [conversations, setConversations] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))

    if (!user?.uid) {
      setLoading(false)
      return
    }

    // Get all conversations for this relationship
    const query = relationshipId
      ? ref(db, `users/${user.uid}/conversations`)
      : ref(db, `users/${user.uid}/conversations`)

    const unsubscribe = onValue(query, (snapshot) => {
      const data = snapshot.val()
      let conversationsArray = data
        ? Object.entries(data).map(([key, value]) => ({
            id: key,
            ...value,
          }))
        : []

      // Filter by relationship ID if provided
      if (relationshipId) {
        conversationsArray = conversationsArray.filter(
          (conv) => conv.relationshipId === relationshipId
        )
      }

      // Sort by most recent
      conversationsArray.sort((a, b) => b.createdAt - a.createdAt)

      setConversations(conversationsArray)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [relationshipId])

  const handleConversationClick = (conversationId) => {
    navigate(`/message/${relationshipId}?conversation=${conversationId}`)
  }

  const formatDate = (timestamp) => {
    if (!timestamp) return ''
    const date = new Date(timestamp)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Past Conversations</h2>
        <button
          onClick={() => navigate(`/message/${relationshipId}?new=true`)}
          className="flex items-center text-sm text-pink-600 hover:text-pink-700"
        >
          <Plus className="h-4 w-4 mr-1" />
          New Conversation
        </button>
      </div>

      {loading ? (
        <div className="text-center py-4">Loading conversations...</div>
      ) : conversations.length === 0 ? (
        <div className="text-center py-4 text-gray-500">
          No past conversations found
        </div>
      ) : (
        <div className="space-y-2">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => handleConversationClick(conversation.id)}
              className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-pink-100 flex items-center justify-center mr-3">
                  <MessageCircle className="h-4 w-4 text-pink-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">
                    {conversation.title || 'Conversation'}
                  </h3>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatDate(conversation.createdAt)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ConversationList
