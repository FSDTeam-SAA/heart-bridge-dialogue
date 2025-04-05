'use client'

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ref, onValue } from 'firebase/database'
import { db } from '../config/firebaseConfig'
import { ArrowLeft, MessageCircle, Plus, Search } from 'lucide-react'

const Conversations = () => {
  const [conversations, setConversations] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))

    if (!user?.uid) {
      setLoading(false)
      navigate('/login')
      return
    }

    // Get all conversations
    const conversationsRef = ref(db, `users/${user.uid}/conversations`)

    const unsubscribe = onValue(conversationsRef, (snapshot) => {
      const data = snapshot.val()
      let conversationsArray = data
        ? Object.entries(data).map(([key, value]) => ({
            id: key,
            ...value,
          }))
        : []

      // Sort by most recent
      conversationsArray.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))

      // Get relationship data for each conversation
      const relationshipsRef = ref(db, `users/${user.uid}/formSubmissions`)
      onValue(relationshipsRef, (snapshot) => {
        const relationshipsData = snapshot.val()

        if (relationshipsData) {
          const relationshipsMap = {}

          Object.entries(relationshipsData).forEach(([key, value]) => {
            relationshipsMap[key] = value
          })

          // Add relationship data to conversations
          conversationsArray = conversationsArray.map((conv) => {
            const relationship = relationshipsMap[conv.relationshipId] || {}
            return {
              ...conv,
              relationshipTitle: relationship.relationshipTitle,
              personName1: relationship.personName1,
              personName2: relationship.personName2,
            }
          })
        }

        setConversations(conversationsArray)
        setLoading(false)
      })
    })

    return () => unsubscribe()
  }, [navigate])

  const formatDate = (timestamp) => {
    if (!timestamp) return ''
    const date = new Date(timestamp)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const filteredConversations = conversations.filter((conv) => {
    const searchLower = searchTerm.toLowerCase()
    return (
      (conv.title && conv.title.toLowerCase().includes(searchLower)) ||
      (conv.personName1 &&
        conv.personName1.toLowerCase().includes(searchLower)) ||
      (conv.personName2 &&
        conv.personName2.toLowerCase().includes(searchLower)) ||
      (conv.relationshipTitle &&
        conv.relationshipTitle.toLowerCase().includes(searchLower))
    )
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="h-8 w-8 rounded-full bg-pink-200 flex justify-center items-center mr-4"
        >
          <ArrowLeft className="h-4 w-4 text-pink-700" />
        </button>
        <h1 className="text-2xl font-bold">All Conversations</h1>
      </div>

      <div className="mb-6 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search conversations..."
          className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
        </div>
      ) : filteredConversations.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
          <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            No conversations found
          </h3>
          <p className="text-gray-500 mb-4">
            {searchTerm
              ? 'No conversations match your search'
              : "You haven't started any conversations yet"}
          </p>
          <button
            onClick={() => navigate('/messages')}
            className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
          >
            <Plus className="h-4 w-4 inline mr-2" />
            Start a Conversation
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() =>
                navigate(
                  `/messages/${conversation.relationshipId}?conversation=${conversation.id}`
                )
              }
              className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center mb-3">
                <div className="h-10 w-10 rounded-full bg-pink-100 flex items-center justify-center mr-3">
                  <MessageCircle className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <h3 className="font-medium">
                    {conversation.title || 'Conversation'}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {conversation.relationshipTitle || 'Relationship'}
                  </p>
                </div>
              </div>

              <div className="text-sm text-gray-700 mb-3 line-clamp-2">
                {conversation.lastMessage ||
                  'Start or continue this conversation...'}
              </div>

              <div className="text-xs text-gray-500">
                {formatDate(conversation.createdAt)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Conversations
