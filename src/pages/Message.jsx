// import { useState, useEffect } from 'react'
// import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
// import { ref, onValue, push, set } from 'firebase/database'
// import { db } from '../config/firebaseConfig'
// import { MessageCircle, History, Plus } from 'lucide-react'
// import MessageBubble from '../components/message-bubble'
// import RelationshipHeader from '../components/relationship-header'
// import MessageInput from '../components/message-input'
// import SuggestedQuestions from '../components/suggested-questions'
// import ConversationHistory from '../components/conversation-history'

// const Message = () => {
//   const { id } = useParams()
//   const navigate = useNavigate()
//   const [searchParams] = useSearchParams()
//   const conversationParam = searchParams.get('conversation')
//   const isNewConversation = searchParams.get('new') === 'true'

//   const [messages, setMessages] = useState([])
//   const [conversations, setConversations] = useState([])
//   const [currentConversationId, setCurrentConversationId] = useState(null)
//   const [relationship, setRelationship] = useState(null)
//   const [isAiTyping, setIsAiTyping] = useState(false)
//   const [messageLimit, setMessageLimit] = useState(null)
//   const [messagesSent, setMessagesSent] = useState(0)
//   const [limitReached, setLimitReached] = useState(false)
//   const [showHistory, setShowHistory] = useState(false)
//   const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY
//   const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

//   // Load relationship data
//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem('user'))

//     if (!user?.uid || !id) return

//     const relationshipsRef = ref(db, `users/${user.uid}/formSubmissions`)
//     const unsubscribe = onValue(relationshipsRef, (snapshot) => {
//       const data = snapshot.val()
//       if (data) {
//         const relationshipsArray = Object.entries(data).map(([key, value]) => ({
//           id: key,
//           ...value,
//         }))

//         const currentRelationship = relationshipsArray.find(
//           (rel) => rel.id === id
//         )
//         setRelationship(currentRelationship)
//       }
//     })

//     return () => unsubscribe()
//   }, [id])

//   // Load conversations
//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem('user'))

//     if (!user?.uid) return

//     // Load all conversations for this relationship
//     const conversationsRef = ref(db, `users/${user.uid}/conversations`)
//     const unsubscribe = onValue(conversationsRef, (snapshot) => {
//       const data = snapshot.val()
//       const conversationsArray = data
//         ? Object.entries(data)
//             .map(([key, value]) => ({
//               id: key,
//               ...value,
//             }))
//             .filter((conv) => conv.relationshipId === id)
//             .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
//         : []

//       setConversations(conversationsArray)

//       // Check if we should create a new conversation
//       if (isNewConversation) {
//         createNewConversation()
//       }
//       // If conversation ID is in URL, load that conversation
//       else if (
//         conversationParam &&
//         conversationsArray.some((conv) => conv.id === conversationParam)
//       ) {
//         setCurrentConversationId(conversationParam)
//         loadConversationMessages(conversationParam)
//       }
//       // Otherwise use most recent conversation or create new one
//       else if (conversationsArray.length > 0) {
//         setCurrentConversationId(conversationsArray[0].id)
//         loadConversationMessages(conversationsArray[0].id)
//       } else if (relationship) {
//         // Create a new conversation if none exists
//         createNewConversation()
//       }
//     })

//     return () => unsubscribe()
//   }, [id, conversationParam, isNewConversation, relationship])

//   // Check message limit
//   useEffect(() => {
//     checkMessageLimit()
//   }, [])

//   const checkMessageLimit = async () => {
//     try {
//       const user = JSON.parse(localStorage.getItem('user'))
//       if (!user?.email) return

//       const response = await fetch(`${BACKEND_URL}/api/send-message`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email: user.email,
//           message: 'check_limit',
//         }),
//       })

//       const data = await response.json()

//       if (data.status === 'limit_reached') {
//         setLimitReached(true)
//       } else if (data.remainingMessages !== undefined) {
//         setMessageLimit(data.remainingMessages + data.messagesSent)
//         setMessagesSent(data.messagesSent)
//       }
//     } catch (error) {
//       console.error('Error checking message limit:', error)
//     }
//   }

//   const loadConversationMessages = (conversationId) => {
//     const user = JSON.parse(localStorage.getItem('user'))

//     if (!user?.uid || !conversationId) return

//     const messagesRef = ref(
//       db,
//       `users/${user.uid}/conversations/${conversationId}/messages`
//     )

//     onValue(messagesRef, (snapshot) => {
//       const data = snapshot.val()
//       const messagesArray = data
//         ? Object.entries(data).map(([key, value]) => ({
//             id: key,
//             ...value,
//           }))
//         : []

//       // Sort messages by timestamp
//       messagesArray.sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0))

//       setMessages(messagesArray)
//     })
//   }

//   const handleSendMessage = async (text) => {
//     if (limitReached) return

//     const user = JSON.parse(localStorage.getItem('user'))
//     if (!user?.uid) return

//     // Ensure we have a conversation to add messages to
//     let convId = currentConversationId
//     if (!convId) {
//       convId = await createNewConversation()
//     }

//     // Add user message to Firebase
//     const userMessage = {
//       text: text,
//       isAi: false,
//       timestamp: Date.now(),
//       displayTime: new Date().toLocaleTimeString(),
//     }

//     const messagesRef = ref(
//       db,
//       `users/${user.uid}/conversations/${convId}/messages`
//     )

//     await push(messagesRef, userMessage)

//     // Generate AI response
//     await generateAiResponse(text, convId)
//   }

//   const generateAiResponse = async (
//     userQuestion = '',
//     conversationId = null
//   ) => {
//     if (!relationship || limitReached) return

//     setIsAiTyping(true)

//     try {
//       // First check if user can send a message
//       const user = JSON.parse(localStorage.getItem('user'))
//       if (!user?.email) return

//       // Use the current conversation ID or the one provided
//       const convId = conversationId || currentConversationId

//       // Record the message with the backend
//       const sendResponse = await fetch(`${BACKEND_URL}/api/send-message`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email: user.email,
//           message: userQuestion || 'initial_analysis',
//         }),
//       })

//       const sendData = await sendResponse.json()

//       if (sendData.status === 'limit_reached') {
//         setLimitReached(true)
//         setIsAiTyping(false)
//         return
//       }

//       setMessagesSent(sendData.messagesSent)
//       setMessageLimit(sendData.remainingMessages + sendData.messagesSent)

//       const prompt = userQuestion
//         ? `You are an expert in romantic relationships, attachment styles, communication, psychology and everything around this topic. You only quote scientific backed research, you do not have any opinions, and you do not fabricate any of your responses.

// Today, we are going to help ${relationship.personName1} and ${relationship.personName2}. This is what you need to know:

// Relationship Title: ${relationship.relationshipTitle}

// Length of relationship: ${relationship.relationshipLength}

// Living status: ${relationship.livingStatus}

// Relationship stage: ${relationship.relationshipState}

// Person 1 perspective: ${relationship.person1Perspective}

// Person 2 perspective: ${relationship.person2Perspective}

// Person 1 Love Language: ${relationship.loveLanguage1}

// Person 2 Love Language: ${relationship.loveLanguage2}

// Person 1 Communication Style: ${relationship.communicationStyle1}

// Person 2 Communication Style: ${relationship.communicationStyle2}

// Person 1 Conflict Style: ${relationship.conflictStyle1}

// Person 2 Conflict Style: ${relationship.conflictStyle2}

// Person 1 Attachment Style: ${relationship.attachmentStyle1}

// Person 2 Attachment Style: ${relationship.attachmentStyle2}

// Remember, using all of the above information, your job is to quote scientific backed research to give ${relationship.personName1} and ${relationship.personName2} the best chance of flourishing in a romantic relationship.

// But before you do this – ask as many questions as you need to, to fully understand all of the context within their romantic relationship.

// Please continue with all of the questions you need to generate your scientific, research backed response.

// "${userQuestion}"`
//         : `You are an expert in romantic relationships, attachment styles, communication, psychology and everything around this topic. You only quote scientific backed research, you do not have any opinions, and you do not fabricate any of your responses.

// Today, we are going to help ${relationship.personName1} and ${relationship.personName2}. This is what you need to know:

// Relationship Title: ${relationship.relationshipTitle}

// Length of relationship: ${relationship.relationshipLength}

// Living status: ${relationship.livingStatus}

// Relationship stage: ${relationship.relationshipState}

// Person 1 perspective: ${relationship.person1Perspective}

// Person 2 perspective: ${relationship.person2Perspective}

// Person 1 Love Language: ${relationship.loveLanguage1}

// Person 2 Love Language: ${relationship.loveLanguage2}

// Person 1 Communication Style: ${relationship.communicationStyle1}

// Person 2 Communication Style: ${relationship.communicationStyle2}

// Person 1 Conflict Style: ${relationship.conflictStyle1}

// Person 2 Conflict Style: ${relationship.conflictStyle2}

// Person 1 Attachment Style: ${relationship.attachmentStyle1}

// Person 2 Attachment Style: ${relationship.attachmentStyle2}

// Remember, using all of the above information, your job is to quote scientific backed research to give ${relationship.personName1} and ${relationship.personName2} the best chance of flourishing in a romantic relationship.

// But before you do this – ask as many questions as you need to, to fully understand all of the context within their romantic relationship.

// Please continue with all of the questions you need to generate your scientific, research backed response.Important: And make sure to give me markdown formate for i can see more structure way `

//       const openAIResponse = await fetch(
//         'https://api.openai.com/v1/chat/completions',
//         {
//           method: 'POST',
//           headers: {
//             Authorization: `Bearer ${OPENAI_API_KEY}`,
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             model: 'gpt-3.5-turbo',
//             messages: [{ role: 'user', content: prompt }],
//             temperature: 0.7,
//             max_tokens: 150,
//           }),
//         }
//       )

//       const data = await openAIResponse.json()
//       console.log("from ai response data", data)
//       const aiMessage = 
//         data.choices[0]?.message?.content || "I couldn't generate a response."

//       // Create AI message object
//       const aiMessageObj = {
//         text: aiMessage,
//         isAi: true,
//         timestamp: Date.now(),
//         displayTime: new Date().toLocaleTimeString(),
//       }

//       // Save AI message to Firebase
//       const messagesRef = ref(
//         db,
//         `users/${user.uid}/conversations/${convId}/messages`
//       )
//       await push(messagesRef, aiMessageObj)
//     } catch (error) {
//       console.error('Error:', error)

//       // Save error message to Firebase
//       if (currentConversationId) {
//         const user = JSON.parse(localStorage.getItem('user'))
//         if (user?.uid) {
//           const errorMessage = {
//             text: "Sorry, I couldn't process your request.",
//             isAi: true,
//             timestamp: Date.now(),
//             displayTime: new Date().toLocaleTimeString(),
//           }

//           const messagesRef = ref(
//             db,
//             `users/${user.uid}/conversations/${currentConversationId}/messages`
//           )
//           await push(messagesRef, errorMessage)
//         }
//       }
//     } finally {
//       setIsAiTyping(false)
//     }
//   }

//   const createNewConversation = async () => {
//     const user = JSON.parse(localStorage.getItem('user'))
//     if (!user?.uid || !id) return null

//     // Create a new conversation in Firebase
//     const newConversation = {
//       relationshipId: id,
//       title: relationship?.relationshipTitle || 'New Conversation',
//       createdAt: Date.now(),
//     }

//     const conversationsRef = ref(db, `users/${user.uid}/conversations`)
//     const newConversationRef = push(conversationsRef)
//     await set(newConversationRef, newConversation)

//     const conversationId = newConversationRef.key

//     // Set as current conversation
//     setCurrentConversationId(conversationId)
//     setMessages([])
//     // Hide history when creating a new conversation
//     setShowHistory(false)

//     // Update URL to include the new conversation ID
//     navigate(`/messages/${id}?conversation=${conversationId}`, {
//       replace: true,
//     })

//     // Generate initial AI message if this is a new relationship
//     if (messages.length === 0 && relationship) {
//       setTimeout(() => {
//         generateAiResponse('', conversationId)
//       }, 500)
//     }

//     return conversationId
//   }

//   const handleSelectConversation = (conversationId) => {
//     setCurrentConversationId(conversationId)
//     loadConversationMessages(conversationId)
//     navigate(`/messages/${id}?conversation=${conversationId}`, {
//       replace: true,
//     })
//     // Hide history after selecting a conversation
//     setShowHistory(false)
//   }

//   const handleSuggestedQuestion = (question) => {
//     handleSendMessage(question)
//   }

//   const toggleHistory = () => {
//     setShowHistory(!showHistory)
//   }

//   if (!relationship) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <div className="animate-pulse">
//           <div className="h-8 w-48 bg-gray-200 rounded mb-4"></div>
//           <div className="h-4 w-32 bg-gray-200 rounded mb-8"></div>
//           <div className="h-64 bg-gray-100 rounded-lg mb-4"></div>
//           <div className="h-12 bg-gray-200 rounded-lg"></div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="flex flex-col space-y-6">
//         {/* Header section */}
//         <RelationshipHeader relationship={relationship} />

//         {/* Message limit indicator */}
//         {messageLimit !== null && (
//           <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
//             <p className="text-sm text-blue-800">
//               Messages: {messagesSent} / {messageLimit}
//               {limitReached && (
//                 <span className="font-bold text-red-600 ml-2">
//                   - Limit reached!
//                 </span>
//               )}
//             </p>
//           </div>
//         )}

//         {/* Conversation Actions */}
//         <div className="flex justify-between items-center">
//           <div className="flex items-center gap-2">
//             <button
//               onClick={toggleHistory}
//               className={`flex items-center px-3 py-1.5 rounded-lg text-sm ${
//                 showHistory
//                   ? 'bg-pink-100 text-pink-700'
//                   : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//               }`}
//             >
//               <History className="h-4 w-4 mr-1.5" />
//               {showHistory ? 'Hide History' : 'View History'}
//             </button>

//             <button
//               onClick={createNewConversation}
//               className="flex items-center px-3 py-1.5 bg-pink-500 text-white rounded-lg hover:bg-pink-600 text-sm"
//             >
//               <Plus className="h-4 w-4 mr-1.5" />
//               New Conversation
//             </button>
//           </div>

//           {!showHistory && conversations.length > 0 && (
//             <div className="flex items-center">
//               <span className="text-sm text-gray-500 mr-2">Current:</span>
//               <div className="flex items-center bg-gray-100 px-3 py-1.5 rounded-lg">
//                 <MessageCircle className="h-4 w-4 text-pink-500 mr-1.5" />
//                 <span className="text-sm font-medium">
//                   {conversations.find((c) => c.id === currentConversationId)
//                     ?.title || 'Conversation'}
//                 </span>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Main content */}
//         {showHistory ? (
//           <ConversationHistory
//             conversations={conversations}
//             currentConversationId={currentConversationId}
//             relationshipId={id}
//             onSelectConversation={handleSelectConversation}
//             onNewConversation={createNewConversation}
//           />
//         ) : (
//           <div className="flex flex-col-reverse lg:flex-row gap-8">
//             {/* Content - relationship advice section */}
//             <div className="w-full lg:w-2/3">
//               {/* Chat container */}
//               <div className="border border-gray-200 rounded-lg h-[400px] sm:h-[500px] overflow-hidden flex flex-col">
//                 {/* Messages area */}
//                 <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
//                   {limitReached ? (
//                     <div className="flex items-center justify-center h-full text-gray-400">
//                       You've reached your message limit. Please upgrade your
//                       plan.
//                     </div>
//                   ) : messages.length === 0 && !isAiTyping ? (
//                     <div className="flex items-center justify-center h-full text-gray-400">
//                       Your relationship analysis will appear here
//                     </div>
//                   ) : (
//                     <div className="space-y-4">
//                       {messages.map((message) => (
//                         <MessageBubble
//                           key={message.id}
//                           message={message}
//                           isOwnMessage={!message.isAi}
//                         />
//                       ))}

//                       {isAiTyping && (
//                         <div className="mb-4">
//                           <div className="max-w-[80%] p-3 rounded-lg bg-white border border-gray-200">
//                             <div className="flex space-x-2">
//                               <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce"></div>
//                               <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce delay-100"></div>
//                               <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce delay-200"></div>
//                             </div>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </div>

//                 {/* Input area */}
//                 <MessageInput
//                   onSendMessage={handleSendMessage}
//                   disabled={isAiTyping || limitReached}
//                 />
//               </div>

//               {/* Suggested questions */}
//               <SuggestedQuestions
//                 onSelectQuestion={handleSuggestedQuestion}
//                 disabled={isAiTyping || limitReached}
//               />
//             </div>

//             {/* Sidebar - Relationship Details */}
//             <div className="w-full lg:w-1/3">
//               <div className="flex items-center gap-2">
//                 <div className="text-pink-500">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="24"
//                     height="24"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     className="lucide lucide-circle-alert"
//                   >
//                     <circle cx="12" cy="12" r="10" />
//                     <line x1="12" x2="12" y1="8" y2="12" />
//                     <line x1="12" x2="12.01" y1="16" y2="16" />
//                   </svg>
//                 </div>
//                 <h1 className="font-semibold">Relationship Details</h1>
//               </div>

//               <h1 className="text-gray-500 my-3 font-medium">
//                 Key information about your relationship
//               </h1>

//               <div className="flex gap-2 mt-6">
//                 <div className="text-gray-500 shrink-0">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="24"
//                     height="24"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     className="lucide lucide-clock"
//                   >
//                     <circle cx="12" cy="12" r="10" />
//                     <polyline points="12 6 12 12 16 14" />
//                   </svg>
//                 </div>
//                 <div>
//                   <h1 className="font-medium">Length</h1>
//                   <p className="text-gray-500">
//                     {relationship?.relationshipLength}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex gap-2 mt-3 border-b border-gray-300 pb-3">
//                 <div className="text-gray-500 shrink-0">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="24"
//                     height="24"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     className="lucide lucide-house"
//                   >
//                     <path d="M20 9v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9" />
//                     <path d="M9 22V12h6v10" />
//                     <path d="M2 10.6 12 2l10 8.6" />
//                   </svg>
//                 </div>
//                 <div>
//                   <h1 className="font-medium">Living Status</h1>
//                   <p className="text-gray-500">{relationship?.livingStatus}</p>
//                 </div>
//               </div>

//               <div className="flex items-center mb-3 mt-3">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="24"
//                   height="24"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   className="lucide lucide-user h-5 w-5 text-gray-500 mr-2"
//                 >
//                   <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
//                   <circle cx="12" cy="7" r="4" />
//                 </svg>
//                 <h2 className="text-sm font-bold text-gray-700">
//                   Personality Profiles
//                 </h2>
//               </div>

//               {/* Person 1 Profile */}
//               <div className="border-b border-gray-300 pb-3">
//                 <div className="flex items-center mb-6">
//                   <div className="flex items-center justify-center h-8 w-8 rounded-full bg-pink-100 text-pink-500 mr-3">
//                     <span className="text-sm font-medium">P</span>
//                   </div>
//                   <span className="text-sm font-medium">
//                     {relationship?.personName1}
//                   </span>
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
//                   <div>
//                     <div className="text-xs text-gray-500 mb-1">
//                       Love Language
//                     </div>
//                     <div className="flex items-center">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="24"
//                         height="24"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         className="lucide lucide-gift h-4 w-4 text-gray-700 mr-2 shrink-0"
//                       >
//                         <polyline points="20 12 20 22 4 22 4 12" />
//                         <rect width="20" height="5" x="2" y="7" />
//                         <line x1="12" x2="12" y1="22" y2="7" />
//                         <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
//                         <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
//                       </svg>
//                       <span className="text-sm font-medium text-gray-900">
//                         {relationship?.loveLanguage1}
//                       </span>
//                     </div>
//                   </div>

//                   <div>
//                     <div className="text-xs text-gray-500 mb-1">
//                       Communication
//                     </div>
//                     <div className="flex items-center">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="24"
//                         height="24"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         className="lucide lucide-message-circle h-4 w-4 text-gray-700 mr-2 shrink-0"
//                       >
//                         <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
//                       </svg>
//                       <span className="text-sm font-medium text-gray-900">
//                         {relationship?.communicationStyle1}
//                       </span>
//                     </div>
//                   </div>

//                   <div>
//                     <div className="text-xs text-gray-500 mb-1">
//                       Conflict Style
//                     </div>
//                     <div className="flex items-center">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="24"
//                         height="24"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         className="lucide lucide-heart h-4 w-4 text-gray-700 mr-2 shrink-0"
//                       >
//                         <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
//                       </svg>
//                       <span className="text-sm font-medium text-gray-900">
//                         {relationship?.conflictStyle1}
//                       </span>
//                     </div>
//                   </div>

//                   <div>
//                     <div className="text-xs text-gray-500 mb-1">Attachment</div>
//                     <div className="flex items-center">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="24"
//                         height="24"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         className="lucide lucide-shield h-4 w-4 text-gray-700 mr-2 shrink-0"
//                       >
//                         <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
//                       </svg>
//                       <span className="text-sm font-medium text-gray-900">
//                         {relationship?.attachmentStyle1}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Person 2 Profile */}
//               <div className="pt-3">
//                 <div className="flex items-center mb-6">
//                   <div className="flex items-center justify-center h-8 w-8 rounded-full bg-pink-100 text-pink-500 mr-3">
//                     <span className="text-sm font-medium">P</span>
//                   </div>
//                   <span className="text-sm font-medium">
//                     {relationship?.personName2}
//                   </span>
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
//                   <div>
//                     <div className="text-xs text-gray-500 mb-1">
//                       Love Language
//                     </div>
//                     <div className="flex items-center">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="24"
//                         height="24"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         className="lucide lucide-gift h-4 w-4 text-gray-700 mr-2 shrink-0"
//                       >
//                         <polyline points="20 12 20 22 4 22 4 12" />
//                         <rect width="20" height="5" x="2" y="7" />
//                         <line x1="12" x2="12" y1="22" y2="7" />
//                         <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
//                         <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
//                       </svg>
//                       <span className="text-sm font-medium text-gray-900">
//                         {relationship?.loveLanguage2}
//                       </span>
//                     </div>
//                   </div>

//                   <div>
//                     <div className="text-xs text-gray-500 mb-1">
//                       Communication
//                     </div>
//                     <div className="flex items-center">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="24"
//                         height="24"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         className="lucide lucide-message-circle h-4 w-4 text-gray-700 mr-2 shrink-0"
//                       >
//                         <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
//                       </svg>
//                       <span className="text-sm font-medium text-gray-900">
//                         {relationship?.communicationStyle2}
//                       </span>
//                     </div>
//                   </div>

//                   <div>
//                     <div className="text-xs text-gray-500 mb-1">
//                       Conflict Style
//                     </div>
//                     <div className="flex items-center">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="24"
//                         height="24"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         className="lucide lucide-heart h-4 w-4 text-gray-700 mr-2 shrink-0"
//                       >
//                         <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
//                       </svg>
//                       <span className="text-sm font-medium text-gray-900">
//                         {relationship?.conflictStyle2}
//                       </span>
//                     </div>
//                   </div>

//                   <div>
//                     <div className="text-xs text-gray-500 mb-1">Attachment</div>
//                     <div className="flex items-center">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="24"
//                         height="24"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         className="lucide lucide-shield h-4 w-4 text-gray-700 mr-2 shrink-0"
//                       >
//                         <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
//                       </svg>
//                       <span className="text-sm font-medium text-gray-900">
//                         {relationship?.attachmentStyle2 || ''}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default Message















import { useState, useEffect } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { ref, onValue, push, set } from 'firebase/database'
import { db } from '../config/firebaseConfig'
import { MessageCircle, History, Plus } from 'lucide-react'
import MessageBubble from '../components/message-bubble'
import RelationshipHeader from '../components/relationship-header'
import MessageInput from '../components/message-input'
import SuggestedQuestions from '../components/suggested-questions'
import ConversationHistory from '../components/conversation-history'

const Message = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const conversationParam = searchParams.get('conversation')
  const isNewConversation = searchParams.get('new') === 'true'

  const [messages, setMessages] = useState([])
  const [conversations, setConversations] = useState([])
  const [currentConversationId, setCurrentConversationId] = useState(null)
  const [relationship, setRelationship] = useState(null)
  const [isAiTyping, setIsAiTyping] = useState(false)
  const [messageLimit, setMessageLimit] = useState(null)
  const [messagesSent, setMessagesSent] = useState(0)
  const [limitReached, setLimitReached] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

  // Load relationship data
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))

    if (!user?.uid || !id) return

    const relationshipsRef = ref(db, `users/${user.uid}/formSubmissions`)
    const unsubscribe = onValue(relationshipsRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const relationshipsArray = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value,
        }))

        const currentRelationship = relationshipsArray.find(
          (rel) => rel.id === id
        )
        setRelationship(currentRelationship)
      }
    })

    return () => unsubscribe()
  }, [id])

  // Load conversations
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))

    if (!user?.uid) return

    // Load all conversations for this relationship
    const conversationsRef = ref(db, `users/${user.uid}/conversations`)
    const unsubscribe = onValue(conversationsRef, (snapshot) => {
      const data = snapshot.val()
      const conversationsArray = data
        ? Object.entries(data)
            .map(([key, value]) => ({
              id: key,
              ...value,
            }))
            .filter((conv) => conv.relationshipId === id)
            .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
        : []

      setConversations(conversationsArray)

      // Check if we should create a new conversation
      if (isNewConversation) {
        createNewConversation()
      }
      // If conversation ID is in URL, load that conversation
      else if (
        conversationParam &&
        conversationsArray.some((conv) => conv.id === conversationParam)
      ) {
        setCurrentConversationId(conversationParam)
        loadConversationMessages(conversationParam)
      }
      // Otherwise use most recent conversation or create new one
      else if (conversationsArray.length > 0) {
        setCurrentConversationId(conversationsArray[0].id)
        loadConversationMessages(conversationsArray[0].id)
      } else if (relationship) {
        // Create a new conversation if none exists
        createNewConversation()
      }
    })

    return () => unsubscribe()
  }, [id, conversationParam, isNewConversation, relationship])

  // Check message limit
  useEffect(() => {
    checkMessageLimit()
  }, [])

  const checkMessageLimit = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'))
      if (!user?.email) return

      const response = await fetch(`${BACKEND_URL}/api/send-message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          message: 'check_limit',
        }),
      })

      const data = await response.json()

      if (data.status === 'limit_reached') {
        setLimitReached(true)
      } else if (data.remainingMessages !== undefined) {
        setMessageLimit(data.remainingMessages + data.messagesSent)
        setMessagesSent(data.messagesSent)
      }
    } catch (error) {
      console.error('Error checking message limit:', error)
    }
  }

  const loadConversationMessages = (conversationId) => {
    const user = JSON.parse(localStorage.getItem('user'))

    if (!user?.uid || !conversationId) return

    const messagesRef = ref(
      db,
      `users/${user.uid}/conversations/${conversationId}/messages`
    )

    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val()
      const messagesArray = data
        ? Object.entries(data).map(([key, value]) => ({
            id: key,
            ...value,
          }))
        : []

      // Sort messages by timestamp
      messagesArray.sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0))

      setMessages(messagesArray)
    })
  }

  const handleSendMessage = async (text) => {
    if (limitReached) return

    const user = JSON.parse(localStorage.getItem('user'))
    if (!user?.uid) return

    // Ensure we have a conversation to add messages to
    let convId = currentConversationId
    if (!convId) {
      convId = await createNewConversation()
    }

    // Add user message to Firebase
    const userMessage = {
      text: text,
      isAi: false,
      timestamp: Date.now(),
      displayTime: new Date().toLocaleTimeString(),
    }

    const messagesRef = ref(
      db,
      `users/${user.uid}/conversations/${convId}/messages`
    )

    await push(messagesRef, userMessage)

    // Generate AI response
    await generateAiResponse(text, convId)
  }

  const generateAiResponse = async (
    userQuestion = '',
    conversationId = null
  ) => {
    if (!relationship || limitReached) return

    setIsAiTyping(true)

    try {
      // First check if user can send a message
      const user = JSON.parse(localStorage.getItem('user'))
      if (!user?.email) return

      // Use the current conversation ID or the one provided
      const convId = conversationId || currentConversationId

      // Record the message with the backend
      const sendResponse = await fetch(`${BACKEND_URL}/api/send-message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          message: userQuestion || 'initial_analysis',
        }),
      })

      const sendData = await sendResponse.json()

      if (sendData.status === 'limit_reached') {
        setLimitReached(true)
        setIsAiTyping(false)
        return
      }

      setMessagesSent(sendData.messagesSent)
      setMessageLimit(sendData.remainingMessages + sendData.messagesSent)

     
const prompt = userQuestion
  ? `**Role**: You are an expert relationship psychologist specializing in attachment theory, communication patterns, and conflict resolution. Your responses must be:
  - Based ONLY on peer-reviewed scientific research
  - Formatted in clear markdown
  - Structured for easy reading
  - Focused on actionable advice

**Relationship Context**:
- Couple: ${relationship.personName1} & ${relationship.personName2}
- Relationship Stage: ${relationship.relationshipState}
- Duration: ${relationship.relationshipLength}
- Living Situation: ${relationship.livingStatus}

**Key Profiles**:
|||
|---|---|
| **Person 1** | **Person 2** |
| Love Language: ${relationship.loveLanguage1} | Love Language: ${relationship.loveLanguage2} |
| Communication: ${relationship.communicationStyle1} | Communication: ${relationship.communicationStyle2} |
| Conflict Style: ${relationship.conflictStyle1} | Conflict Style: ${relationship.conflictStyle2} |
| Attachment: ${relationship.attachmentStyle1} | Attachment: ${relationship.attachmentStyle2} |

**Perspectives**:
- ${relationship.personName1}: "${relationship.person1Perspective}"
- ${relationship.personName2}: "${relationship.person2Perspective}"

**Response Requirements**:
1. Format using markdown (## headings, **bold** key terms, bullet points)
2. Start with 1-2 sentence summary
3. Include 3-5 research-backed recommendations
4. End with open-ended questions to deepen understanding
5. Cite studies using [Author, Year] format

**Current Query**: "${userQuestion}"
`
  : `**Initial Analysis Request**:

  ## Relationship Assessment Needed
  
  Based on the provided profile for ${relationship.personName1} and ${relationship.personName2}, please:
  
  1. **Identify 3 key areas** of potential growth/conflict
  2. **Ask 5-7 diagnostic questions** to better understand:
     - Their conflict resolution patterns
     - Emotional connection quality
     - Daily interaction dynamics
  3. Format your response with:
     - Clear section headers (##)
     - Bullet points for lists
     - Bolded key terms
     - Research citations where applicable
  
  Example structure:
  \`\`\`markdown
  ## Initial Observations
  
  - **Key dynamic**: [description] 
  - **Primary strength**: [description]
  
  ## Recommended Exploration
  
  1. Question 1?
  2. Question 2?
  
  ## Supporting Research
  
  - [Johnson, 2008] found that...
  \`\`\`
  `

      const openAIResponse = await fetch(
        'https://api.openai.com/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7,
            max_tokens: 1000,
          }),
        }
      )

      const data = await openAIResponse.json()
      const aiMessage =
        data.choices[0]?.message?.content || "I couldn't generate a response."

      // Create AI message object
      const aiMessageObj = {
        text: aiMessage,
        isAi: true,
        timestamp: Date.now(),
        displayTime: new Date().toLocaleTimeString(),
      }

      // Save AI message to Firebase
      const messagesRef = ref(
        db,
        `users/${user.uid}/conversations/${convId}/messages`
      )
      await push(messagesRef, aiMessageObj)
    } catch (error) {
      console.error('Error:', error)

      // Save error message to Firebase
      if (currentConversationId) {
        const user = JSON.parse(localStorage.getItem('user'))
        if (user?.uid) {
          const errorMessage = {
            text: "Sorry, I couldn't process your request.",
            isAi: true,
            timestamp: Date.now(),
            displayTime: new Date().toLocaleTimeString(),
          }

          const messagesRef = ref(
            db,
            `users/${user.uid}/conversations/${currentConversationId}/messages`
          )
          await push(messagesRef, errorMessage)
        }
      }
    } finally {
      setIsAiTyping(false)
    }
  }

  const createNewConversation = async () => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user?.uid || !id) return null

    // Create a new conversation in Firebase
    const newConversation = {
      relationshipId: id,
      title: relationship?.relationshipTitle || 'New Conversation',
      createdAt: Date.now(),
    }

    const conversationsRef = ref(db, `users/${user.uid}/conversations`)
    const newConversationRef = push(conversationsRef)
    await set(newConversationRef, newConversation)

    const conversationId = newConversationRef.key

    // Set as current conversation
    setCurrentConversationId(conversationId)
    setMessages([])
    setShowHistory(false) // Hide history when creating a new conversation

    // Update URL to include the new conversation ID
    navigate(`/messages/${id}?conversation=${conversationId}`, {
      replace: true,
    })

    // Generate initial AI message if this is a new relationship
    if (messages.length === 0 && relationship) {
      setTimeout(() => {
        generateAiResponse('', conversationId)
      }, 500)
    }

    return conversationId
  }

  const handleSelectConversation = (conversationId) => {
    setCurrentConversationId(conversationId)
    loadConversationMessages(conversationId)
    navigate(`/messages/${id}?conversation=${conversationId}`, {
      replace: true,
    })
    setShowHistory(false) // Hide history after selecting a conversation
  }

  const handleSuggestedQuestion = (question) => {
    handleSendMessage(question)
  }

  const toggleHistory = () => {
    setShowHistory(!showHistory)
  }

  if (!relationship) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 w-48 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 w-32 bg-gray-200 rounded mb-8"></div>
          <div className="h-64 bg-gray-100 rounded-lg mb-4"></div>
          <div className="h-12 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-6">
        {/* Header section */}
        <RelationshipHeader relationship={relationship} />

        {/* Message limit indicator */}
        {messageLimit !== null && (
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
            <p className="text-sm text-blue-800">
              Messages: {messagesSent} / {messageLimit}
              {limitReached && (
                <span className="font-bold text-red-600 ml-2">
                  - Limit reached!
                </span>
              )}
            </p>
          </div>
        )}

        {/* Conversation Actions */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <button
              onClick={toggleHistory}
              className={`flex items-center px-3 py-1.5 rounded-lg text-sm ${
                showHistory
                  ? 'bg-pink-100 text-pink-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <History className="h-4 w-4 mr-1.5" />
              {showHistory ? 'Hide History' : 'View History'}
            </button>

            <button
              onClick={createNewConversation}
              className="flex items-center px-3 py-1.5 bg-pink-500 text-white rounded-lg hover:bg-pink-600 text-sm"
            >
              <Plus className="h-4 w-4 mr-1.5" />
              New Conversation
            </button>
          </div>

          {!showHistory && conversations.length > 0 && (
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2">Current:</span>
              <div className="flex items-center bg-gray-100 px-3 py-1.5 rounded-lg">
                <MessageCircle className="h-4 w-4 text-pink-500 mr-1.5" />
                <span className="text-sm font-medium">
                  {conversations.find((c) => c.id === currentConversationId)
                    ?.title || 'Conversation'}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Main content */}
        {showHistory ? (
          <ConversationHistory
            conversations={conversations}
            currentConversationId={currentConversationId}
            relationshipId={id}
            onSelectConversation={handleSelectConversation}
            onNewConversation={createNewConversation}
          />
        ) : (
          <div className="flex flex-col-reverse lg:flex-row gap-8">
            {/* Content - relationship advice section */}
            <div className="w-full lg:w-2/3">
              {/* Chat container */}
              <div className="border border-gray-200 rounded-lg h-[400px] sm:h-[500px] overflow-hidden flex flex-col">
                {/* Messages area */}
                <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                  {limitReached ? (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      You've reached your message limit. Please upgrade your
                      plan.
                    </div>
                  ) : messages.length === 0 && !isAiTyping ? (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      Your relationship analysis will appear here
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <MessageBubble
                          key={message.id}
                          message={message}
                          isOwnMessage={!message.isAi}
                        />
                      ))}

                      {isAiTyping && (
                        <div className="mb-4">
                          <div className="max-w-[80%] p-3 rounded-lg bg-white border border-gray-200">
                            <div className="flex space-x-2">
                              <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce"></div>
                              <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce delay-100"></div>
                              <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce delay-200"></div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Input area */}
                <MessageInput
                  onSendMessage={handleSendMessage}
                  disabled={isAiTyping || limitReached}
                />
              </div>

              {/* Suggested questions */}
              <SuggestedQuestions
                onSelectQuestion={handleSuggestedQuestion}
                disabled={isAiTyping || limitReached}
              />
            </div>

            {/* Sidebar - Relationship Details */}
            <div className="w-full lg:w-1/3">
              <div className="flex items-center gap-2">
                <div className="text-pink-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-circle-alert"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" x2="12" y1="8" y2="12" />
                    <line x1="12" x2="12.01" y1="16" y2="16" />
                  </svg>
                </div>
                <h1 className="font-semibold">Relationship Details</h1>
              </div>

              <h1 className="text-gray-500 my-3 font-medium">
                Key information about your relationship
              </h1>

              <div className="flex gap-2 mt-6">
                <div className="text-gray-500 shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-clock"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div>
                  <h1 className="font-medium">Length</h1>
                  <p className="text-gray-500">
                    {relationship?.relationshipLength}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 mt-3 border-b border-gray-300 pb-3">
                <div className="text-gray-500 shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-house"
                  >
                    <path d="M20 9v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9" />
                    <path d="M9 22V12h6v10" />
                    <path d="M2 10.6 12 2l10 8.6" />
                  </svg>
                </div>
                <div>
                  <h1 className="font-medium">Living Status</h1>
                  <p className="text-gray-500">{relationship?.livingStatus}</p>
                </div>
              </div>

              <div className="flex items-center mb-3 mt-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-user h-5 w-5 text-gray-500 mr-2"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <h2 className="text-sm font-bold text-gray-700">
                  Personality Profiles
                </h2>
              </div>

              {/* Person 1 Profile */}
              <div className="border-b border-gray-300 pb-3">
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-pink-100 text-pink-500 mr-3">
                    <span className="text-sm font-medium">P</span>
                  </div>
                  <span className="text-sm font-medium">
                    {relationship?.personName1}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">
                      Love Language
                    </div>
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-gift h-4 w-4 text-gray-700 mr-2 shrink-0"
                      >
                        <polyline points="20 12 20 22 4 22 4 12" />
                        <rect width="20" height="5" x="2" y="7" />
                        <line x1="12" x2="12" y1="22" y2="7" />
                        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
                        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
                      </svg>
                      <span className="text-sm font-medium text-gray-900">
                        {relationship?.loveLanguage1}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-gray-500 mb-1">
                      Communication
                    </div>
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-message-circle h-4 w-4 text-gray-700 mr-2 shrink-0"
                      >
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                      </svg>
                      <span className="text-sm font-medium text-gray-900">
                        {relationship?.communicationStyle1}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-gray-500 mb-1">
                      Conflict Style
                    </div>
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-heart h-4 w-4 text-gray-700 mr-2 shrink-0"
                      >
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                      </svg>
                      <span className="text-sm font-medium text-gray-900">
                        {relationship?.conflictStyle1}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-gray-500 mb-1">Attachment</div>
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-shield h-4 w-4 text-gray-700 mr-2 shrink-0"
                      >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                      </svg>
                      <span className="text-sm font-medium text-gray-900">
                        {relationship?.attachmentStyle1}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Person 2 Profile */}
              <div className="pt-3">
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-pink-100 text-pink-500 mr-3">
                    <span className="text-sm font-medium">P</span>
                  </div>
                  <span className="text-sm font-medium">
                    {relationship?.personName2}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">
                      Love Language
                    </div>
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-gift h-4 w-4 text-gray-700 mr-2 shrink-0"
                      >
                        <polyline points="20 12 20 22 4 22 4 12" />
                        <rect width="20" height="5" x="2" y="7" />
                        <line x1="12" x2="12" y1="22" y2="7" />
                        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
                        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
                      </svg>
                      <span className="text-sm font-medium text-gray-900">
                        {relationship?.loveLanguage2}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-gray-500 mb-1">
                      Communication
                    </div>
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-message-circle h-4 w-4 text-gray-700 mr-2 shrink-0"
                      >
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                      </svg>
                      <span className="text-sm font-medium text-gray-900">
                        {relationship?.communicationStyle2}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-gray-500 mb-1">
                      Conflict Style
                    </div>
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-heart h-4 w-4 text-gray-700 mr-2 shrink-0"
                      >
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                      </svg>
                      <span className="text-sm font-medium text-gray-900">
                        {relationship?.conflictStyle2}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-gray-500 mb-1">Attachment</div>
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-shield h-4 w-4 text-gray-700 mr-2 shrink-0"
                      >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                      </svg>
                      <span className="text-sm font-medium text-gray-900">
                        {relationship?.attachmentStyle2 || ''}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Message

