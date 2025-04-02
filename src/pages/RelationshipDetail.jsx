import React, { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ref,
  get,
  set,
  push,
  update,
  query,
  orderByChild,
  equalTo,
} from 'firebase/database'
import { db } from '../config/firebaseConfig'
import Header from '../components/Homes/Header'
import ChatInput from '../components/Homes/ChatInput'

// Icons - Replace with your preferred icon library if not using lucide-react
import {
  ArrowLeft,
  Loader2,
  MessageSquare,
  Info,
  Clock,
  Home,
  Heart,
  User,
  Users,
  RefreshCw,
} from 'lucide-react'

// OpenAI configuration
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY

const RelationshipDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const messagesEndRef = useRef(null)

  const [relationship, setRelationship] = useState(null)
  const [perspectives, setPerspectives] = useState([])
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSending, setIsSending] = useState(false)
  const [loadingConversation, setLoadingConversation] = useState(false)
  const [conversationId, setConversationId] = useState(null)
  const [user, setUser] = useState(null)
  const [activeTab, setActiveTab] = useState('person1')

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Get current user from localStorage
  useEffect(() => {
    const userFromLocalStorage = JSON.parse(
      localStorage.getItem('user') || '{}'
    )
    if (userFromLocalStorage?.email) {
      setUser(userFromLocalStorage)
    }
  }, [])

  // Fetch relationship data when component mounts
  useEffect(() => {
    const fetchRelationshipData = async () => {
      if (!id) return

      try {
        setIsLoading(true)

        // Fetch relationship details from Firebase Realtime Database
        const relationshipRef = ref(db, `relationships/${id}`)
        const relationshipSnapshot = await get(relationshipRef)

        if (!relationshipSnapshot.exists()) {
          throw new Error('Relationship not found')
        }

        const relationshipData = { id, ...relationshipSnapshot.val() }
        setRelationship(relationshipData)

        // Fetch perspectives
        const perspectivesRef = ref(db, 'perspectives')
        const perspectivesQuery = query(
          perspectivesRef,
          orderByChild('relationship_id'),
          equalTo(id)
        )
        const perspectivesSnapshot = await get(perspectivesQuery)

        const perspectivesData = []
        if (perspectivesSnapshot.exists()) {
          perspectivesSnapshot.forEach((childSnapshot) => {
            perspectivesData.push({
              id: childSnapshot.key,
              ...childSnapshot.val(),
            })
          })
        }

        setPerspectives(perspectivesData)

        // Fetch conversation or create one if it doesn't exist
        await fetchOrCreateConversation(id)
      } catch (error) {
        console.error('Error fetching relationship data:', error)
        showToast('Failed to load relationship details', 'error')
      } finally {
        setIsLoading(false)
      }
    }

    fetchRelationshipData()
  }, [id])

  const fetchOrCreateConversation = async (relationshipId) => {
    try {
      setLoadingConversation(true)

      // Check if there's an existing conversation
      const conversationsRef = ref(db, 'conversations')
      const conversationsQuery = query(
        conversationsRef,
        orderByChild('relationship_id'),
        equalTo(relationshipId)
      )
      const conversationsSnapshot = await get(conversationsQuery)

      let conversation = null
      let conversationKey = null

      // If conversation exists, use it
      if (conversationsSnapshot.exists()) {
        // Get the first conversation (most recent)
        conversationsSnapshot.forEach((childSnapshot) => {
          if (!conversation) {
            conversationKey = childSnapshot.key
            conversation = childSnapshot.val()
          }
        })

        if (conversationKey) {
          setConversationId(conversationKey)

          // Parse message history
          if (conversation.message_history) {
            try {
              const parsedMessages =
                typeof conversation.message_history === 'string'
                  ? JSON.parse(conversation.message_history)
                  : conversation.message_history

              setMessages(Array.isArray(parsedMessages) ? parsedMessages : [])
            } catch (e) {
              console.error('Error parsing message history:', e)
              setMessages([])
            }
          }
        }
      } else {
        // Create a new conversation if none exists
        console.log('No existing conversation, creating a new one')

        const newConversation = {
          relationship_id: relationshipId,
          ai_analysis: 'Analyzing your relationship...',
          message_history: JSON.stringify([]),
          created_at: Date.now(),
        }

        const newConversationRef = push(ref(db, 'conversations'))
        await set(newConversationRef, newConversation)

        conversationKey = newConversationRef.key
        conversation = newConversation

        if (conversationKey) {
          setConversationId(conversationKey)
          setMessages([])

          // Initiate analysis with OpenAI
          console.log('Initiating analysis for new relationship')
          await analyzeRelationship(relationshipId, conversationKey)
        }
      }
    } catch (error) {
      console.error('Error with conversation:', error)
      showToast('Failed to load or create conversation', 'error')
    } finally {
      setLoadingConversation(false)
    }
  }

  const analyzeRelationship = async (
    relationshipId,
    conversationId,
    message
  ) => {
    try {
      // Get relationship data for analysis
      const relationshipRef = ref(db, `relationships/${relationshipId}`)
      const relationshipSnapshot = await get(relationshipRef)

      if (!relationshipSnapshot.exists()) {
        throw new Error('Relationship not found')
      }

      const relationshipData = relationshipSnapshot.val()

      // Get perspectives
      const perspectivesRef = ref(db, 'perspectives')
      const perspectivesQuery = query(
        perspectivesRef,
        orderByChild('relationship_id'),
        equalTo(relationshipId)
      )
      const perspectivesSnapshot = await get(perspectivesQuery)

      const perspectivesData = []
      if (perspectivesSnapshot.exists()) {
        perspectivesSnapshot.forEach((childSnapshot) => {
          perspectivesData.push(childSnapshot.val())
        })
      }

      // Prepare data for OpenAI
      const analysisData = {
        relationship: relationshipData,
        perspectives: perspectivesData,
        message: message || null,
      }

      // Call OpenAI API
      const response = await fetch(
        'https://api.openai.com/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: 'gpt-4o',
            messages: [
              {
                role: 'system',
                content: `You are a relationship advisor. You have expertise in relationship psychology, attachment theory, and communication strategies. 
              Your goal is to provide helpful, empathetic advice based on the relationship information provided.
              If this is the first message, introduce yourself and provide a brief analysis of the relationship based on the data.
              If responding to a user message, be empathetic, thoughtful, and provide actionable advice.`,
              },
              {
                role: 'user',
                content: `Here is the relationship data: ${JSON.stringify(
                  analysisData
                )}`,
              },
            ],
            temperature: 0.7,
            max_tokens: 800,
          }),
        }
      )

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`)
      }

      const data = await response.json()
      const aiResponse = data.choices[0].message.content

      // Update conversation with AI response
      const conversationRef = ref(db, `conversations/${conversationId}`)

      // Get current messages
      const currentMessages = [...messages]

      // Add user message if provided
      if (message) {
        currentMessages.push({ role: 'user', content: message })
      }

      // Add AI response
      currentMessages.push({ role: 'assistant', content: aiResponse })

      // Update in Realtime Database
      await update(conversationRef, {
        message_history: JSON.stringify(currentMessages),
        updated_at: Date.now(),
      })

      // Update local state
      setMessages(currentMessages)

      return { success: true }
    } catch (error) {
      console.error('Error analyzing relationship:', error)
      return { success: false, error }
    }
  }

  const fetchConversation = async (conversationId) => {
    try {
      const conversationRef = ref(db, `conversations/${conversationId}`)
      const conversationSnapshot = await get(conversationRef)

      if (!conversationSnapshot.exists()) {
        throw new Error('Conversation not found')
      }

      const data = conversationSnapshot.val()

      if (data.message_history) {
        try {
          const parsedMessages =
            typeof data.message_history === 'string'
              ? JSON.parse(data.message_history)
              : data.message_history

          setMessages(Array.isArray(parsedMessages) ? parsedMessages : [])
        } catch (e) {
          console.error('Error parsing message history:', e)
        }
      }
    } catch (error) {
      console.error('Error fetching conversation:', error)
    }
  }

  const sendMessage = async (message) => {
    if (!message.trim() || !conversationId || !id) {
      showToast("Can't send message at this time", 'error')
      return
    }

    try {
      setIsSending(true)

      // Add user message to local state immediately for responsiveness
      const updatedMessages = [...messages, { role: 'user', content: message }]
      setMessages(updatedMessages)

      // Process the message with OpenAI
      const result = await analyzeRelationship(id, conversationId, message)

      if (!result.success) {
        throw new Error('Failed to get AI response')
      }

      // Update message usage count
      try {
        if (user?.email) {
          await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/update-message-count`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email: user.email }),
            }
          )
        }
      } catch (error) {
        console.error('Error updating message count:', error)
      }
    } catch (error) {
      console.error('Error sending message:', error)
      showToast('Failed to send message. Please try again.', 'error')

      // Revert the optimistic update
      setMessages(messages)
    } finally {
      setIsSending(false)
    }
  }

  // Simple toast implementation
  const showToast = (message, type = 'success') => {
    alert(message) // Replace with your preferred toast implementation
  }

  const formatMessage = (content) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold text
      .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic text
      .replace(
        /^###\s+(.*?)$/gm,
        '<h3 class="text-lg font-bold mt-3 mb-1">$1</h3>'
      ) // Heading 3
      .replace(
        /^##\s+(.*?)$/gm,
        '<h2 class="text-xl font-bold mt-4 mb-2">$1</h2>'
      ) // Heading 2
      .replace(
        /^#\s+(.*?)$/gm,
        '<h1 class="text-2xl font-bold mt-4 mb-2">$1</h1>'
      ) // Heading 1
      .replace(/\n\n/g, '<br/><br/>') // Preserve paragraphs
      .replace(/\n/g, '<br/>') // Preserve line breaks
  }

  // Function to parse and format personality notes
  const formatPersonalityNotes = () => {
    if (!relationship || !relationship.personality_notes) return null

    try {
      let personalityData

      if (typeof relationship.personality_notes === 'string') {
        personalityData = JSON.parse(relationship.personality_notes)
      } else {
        personalityData = relationship.personality_notes
      }

      if (!personalityData || typeof personalityData !== 'object') {
        return (
          <p className="text-sm text-gray-500">
            No personality details available
          </p>
        )
      }

      // Extract person data
      const person1 = personalityData.person1 || {}
      const person2 = personalityData.person2 || {}

      // Find corresponding names from perspectives
      const person1Name =
        perspectives.find((p) => p.is_primary_user)?.person_name || 'Person 1'
      const person2Name =
        perspectives.find((p) => !p.is_primary_user)?.person_name || 'Person 2'

      return (
        <div className="space-y-6">
          {/* Person 1 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-pink-100 rounded-full flex items-center justify-center">
                <span className="text-pink-500 font-medium">
                  {person1Name.charAt(0)}
                </span>
              </div>
              <h3 className="font-medium text-base">{person1Name}</h3>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {person1.loveLanguage && (
                <div className="bg-pink-50 rounded-md p-3">
                  <p className="text-xs text-gray-500 font-medium">
                    Love Language
                  </p>
                  <p className="text-sm">{person1.loveLanguage}</p>
                </div>
              )}

              {person1.communicationStyle && (
                <div className="bg-pink-50 rounded-md p-3">
                  <p className="text-xs text-gray-500 font-medium">
                    Communication
                  </p>
                  <p className="text-sm">{person1.communicationStyle}</p>
                </div>
              )}

              {person1.conflictStyle && (
                <div className="bg-pink-50 rounded-md p-3">
                  <p className="text-xs text-gray-500 font-medium">
                    Conflict Style
                  </p>
                  <p className="text-sm">{person1.conflictStyle}</p>
                </div>
              )}

              {person1.attachmentStyle && (
                <div className="bg-pink-50 rounded-md p-3">
                  <p className="text-xs text-gray-500 font-medium">
                    Attachment
                  </p>
                  <p className="text-sm">{person1.attachmentStyle}</p>
                </div>
              )}
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Person 2 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-pink-100 rounded-full flex items-center justify-center">
                <span className="text-pink-500 font-medium">
                  {person2Name.charAt(0)}
                </span>
              </div>
              <h3 className="font-medium text-base">{person2Name}</h3>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {person2.loveLanguage && (
                <div className="bg-pink-50 rounded-md p-3">
                  <p className="text-xs text-gray-500 font-medium">
                    Love Language
                  </p>
                  <p className="text-sm">{person2.loveLanguage}</p>
                </div>
              )}

              {person2.communicationStyle && (
                <div className="bg-pink-50 rounded-md p-3">
                  <p className="text-xs text-gray-500 font-medium">
                    Communication
                  </p>
                  <p className="text-sm">{person2.communicationStyle}</p>
                </div>
              )}

              {person2.conflictStyle && (
                <div className="bg-pink-50 rounded-md p-3">
                  <p className="text-xs text-gray-500 font-medium">
                    Conflict Style
                  </p>
                  <p className="text-sm">{person2.conflictStyle}</p>
                </div>
              )}

              {person2.attachmentStyle && (
                <div className="bg-pink-50 rounded-md p-3">
                  <p className="text-xs text-gray-500 font-medium">
                    Attachment
                  </p>
                  <p className="text-sm">{person2.attachmentStyle}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )
    } catch (error) {
      console.error('Error formatting personality notes:', error)
      return (
        <div className="p-3 bg-red-50 text-red-600 rounded-md text-sm">
          <p>Failed to parse personality data. Raw data:</p>
          <pre className="mt-2 text-xs overflow-auto">
            {JSON.stringify(relationship.personality_notes, null, 2)}
          </pre>
        </div>
      )
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-pink-50">
        <Header />
        <main className="container px-4 sm:px-6 py-16 md:py-24 mt-16">
          <div className="flex justify-center items-center h-[50vh]">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin text-pink-500 mx-auto mb-4" />
              <p className="text-gray-500">Loading relationship details...</p>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (!relationship) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-pink-50">
        <Header />
        <main className="container px-4 sm:px-6 py-16 md:py-24 mt-16">
          <div className="flex justify-center items-center h-[50vh]">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">
                Relationship not found
              </h1>
              <p className="mb-6 text-gray-500">
                This relationship doesn't exist or you don't have access to it.
              </p>
              <button
                onClick={() => navigate('/dashboard')}
                className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-md"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-white to-pink-50">
      <Header />

      <main className="container px-4 sm:px-6 py-16 md:py-24 mt-16">
        {/* Header with back button and title */}
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="rounded-full h-9 w-9 flex items-center justify-center hover:bg-gray-100"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              {relationship.title || 'Relationship'}
            </h1>
            {relationship.relationship_stage && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-50 text-pink-700 border border-pink-200 mt-1">
                {relationship.relationship_stage}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Sidebar with relationship details */}
          <div className="md:col-span-4 space-y-6">
            <div className="bg-white border border-pink-100 rounded-lg shadow-sm overflow-hidden">
              <div className="bg-pink-50 p-4 pb-3">
                <div className="flex items-center text-lg font-semibold">
                  <Info className="mr-2 h-5 w-5 text-pink-500" />
                  Relationship Details
                </div>
                <p className="text-sm text-gray-500">
                  Key information about your relationship
                </p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {relationship.relationship_length && (
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <h3 className="text-sm font-medium">Length</h3>
                        <p className="text-sm text-gray-500">
                          {relationship.relationship_length}
                        </p>
                      </div>
                    </div>
                  )}

                  {relationship.living_status && (
                    <div className="flex items-start gap-3">
                      <Home className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <h3 className="text-sm font-medium">Living Status</h3>
                        <p className="text-sm text-gray-500">
                          {relationship.living_status}
                        </p>
                      </div>
                    </div>
                  )}

                  <hr className="border-gray-200 my-2" />

                  <div className="space-y-1">
                    <h3 className="text-sm font-medium flex items-center">
                      <Users className="h-4 w-4 mr-1 text-gray-500" />
                      Personality Profiles
                    </h3>
                    {formatPersonalityNotes()}
                  </div>
                </div>
              </div>
            </div>

            {/* Perspectives Card */}
            {perspectives && perspectives.length > 0 && (
              <div className="bg-white border border-pink-100 rounded-lg shadow-sm overflow-hidden">
                <div className="bg-pink-50 p-4 pb-3">
                  <div className="flex items-center text-lg font-semibold">
                    <MessageSquare className="mr-2 h-5 w-5 text-pink-500" />
                    Perspectives
                  </div>
                  <p className="text-sm text-gray-500">
                    How you both view your relationship
                  </p>
                </div>
                <div className="pt-6 px-0">
                  <div className="w-full">
                    {/* Custom Tabs */}
                    <div className="w-full border-b border-gray-200 flex">
                      {perspectives.map((perspective, index) => (
                        <button
                          key={perspective.id || index}
                          onClick={() => setActiveTab(`person${index + 1}`)}
                          className={`flex items-center justify-center px-4 py-2 text-sm font-medium flex-1 ${
                            activeTab === `person${index + 1}`
                              ? 'border-b-2 border-pink-500 text-pink-600'
                              : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                          }`}
                        >
                          <User className="h-4 w-4 mr-1.5" />
                          {perspective.person_name}
                        </button>
                      ))}
                    </div>

                    {/* Tab Content */}
                    <div className="px-6 py-4">
                      {perspectives.map((perspective, index) => (
                        <div
                          key={perspective.id || index}
                          className={
                            activeTab === `person${index + 1}`
                              ? 'block'
                              : 'hidden'
                          }
                        >
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="h-7 w-7 bg-pink-100 rounded-full flex items-center justify-center">
                                <span className="text-pink-500">
                                  {perspective.person_name.charAt(0)}
                                </span>
                              </div>
                              <h3 className="font-medium">
                                {perspective.person_name}'s Perspective
                              </h3>
                            </div>
                            <div className="h-48 overflow-y-auto rounded-md border p-4">
                              <p className="text-sm text-gray-500 whitespace-pre-wrap">
                                {perspective.perspective}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Chat section */}
          <div className="md:col-span-8">
            <div className="bg-white border border-pink-100 rounded-lg shadow-sm overflow-hidden h-full flex flex-col">
              <div className="bg-pink-50 p-4 pb-3 flex-shrink-0">
                <div className="flex items-center text-lg font-semibold">
                  <Heart className="mr-2 h-5 w-5 text-pink-500" />
                  Relationship Advisor
                </div>
                <p className="text-sm text-gray-500">
                  AI-powered guidance based on relationship science
                </p>
              </div>
              <div className="p-6 flex-grow flex flex-col h-[600px]">
                <div className="flex flex-col space-y-4 h-full overflow-y-auto mb-4 p-2 rounded-md border border-pink-100 bg-pink-50/30 flex-grow">
                  {loadingConversation ? (
                    <div className="flex justify-center items-center h-full">
                      <div className="text-center">
                        <Loader2 className="h-8 w-8 animate-spin text-pink-500 mx-auto mb-2" />
                        <p className="text-sm text-gray-500">
                          Loading conversation...
                        </p>
                      </div>
                    </div>
                  ) : messages.length === 0 ? (
                    <div className="flex justify-center items-center h-full">
                      <div className="text-center max-w-md">
                        <p className="text-sm text-gray-500">
                          Your conversation will appear here. Start by asking a
                          question about your relationship.
                        </p>
                      </div>
                    </div>
                  ) : (
                    messages.map((msg, index) => (
                      <div
                        key={index}
                        className={`flex ${
                          msg.role === 'assistant'
                            ? 'justify-start'
                            : 'justify-end'
                        }`}
                      >
                        <div
                          className={`max-w-[85%] rounded-lg p-4 ${
                            msg.role === 'assistant'
                              ? 'bg-pink-50 text-gray-800 rounded-tl-sm'
                              : 'bg-pink-500 text-white rounded-tr-sm'
                          }`}
                        >
                          {msg.role === 'assistant' ? (
                            <div
                              className="whitespace-pre-wrap text-sm"
                              dangerouslySetInnerHTML={{
                                __html: formatMessage(msg.content),
                              }}
                            />
                          ) : (
                            <p className="whitespace-pre-wrap text-sm">
                              {msg.content}
                            </p>
                          )}
                        </div>
                      </div>
                    ))
                  )}

                  {isSending && (
                    <div className="flex justify-start">
                      <div className="rounded-lg p-3 bg-pink-50 text-gray-800">
                        <div className="flex items-center space-x-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span className="text-sm">Thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <button
                    className="rounded-full h-10 w-10 flex items-center justify-center border border-pink-200 hover:bg-pink-50 flex-shrink-0"
                    onClick={() => {
                      if (conversationId) {
                        fetchConversation(conversationId)
                        showToast('Conversation refreshed', 'success')
                      }
                    }}
                    disabled={loadingConversation || isSending}
                  >
                    <RefreshCw className="h-4 w-4" />
                  </button>

                  <ChatInput
                    onSendMessage={sendMessage}
                    isLoading={isSending}
                    placeholder="Ask a question about your relationship..."
                    disabled={loadingConversation || !conversationId}
                    className="flex-grow"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default RelationshipDetail
