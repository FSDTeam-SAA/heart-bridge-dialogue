// import {
//   ArrowLeft,
//   CircleAlert,
//   Clock,
//   Gift,
//   Heart,
//   House,
//   MessageCircle,
//   Shield,
//   User,
// } from 'lucide-react'
// import Sidebar from './Dashboard/Sidebar'
// import { useEffect, useState } from 'react'
// import { ref, onValue } from 'firebase/database'
// import { db } from '../config/firebaseConfig'
// import { useNavigate, useParams } from 'react-router-dom'

// const Message = () => {
//   const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY
//   const { id } = useParams()
//   const navigate = useNavigate()

//   // All states
//   const [relationships, setRelationships] = useState([])
//   const [loading, setLoading] = useState(true)

//   // get data form firebase
//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem('user'))

//     if (!user?.uid) {
//       setLoading(false)
//       return
//     }

//     const relationshipsRef = ref(db, `users/${user.uid}/formSubmissions`)
//     const unsubscribe = onValue(relationshipsRef, (snapshot) => {
//       const data = snapshot.val()
//       const relationshipsArray = data
//         ? Object.entries(data).map(([key, value]) => ({
//             id: key,
//             ...value,
//           }))
//         : []
//       setRelationships(relationshipsArray)
//       setLoading(false)
//     })

//     return () => unsubscribe()
//   }, [])

//   console.log('data from message.jsx---', relationships)

//   const singleRelationship = relationships.find(
//     (relationship) => relationship.id === id
//   )

//   console.log('From Message==', singleRelationship)



//   // Implement the Ai
//   const handleSubmit = async () => {
//     try {
//         if (!singleRelationship) {
//           console.error('Error: singleRelationship is undefined or not found.')
//           return // Prevent further execution
//         }

//         const prompt = `
// You are an expert in romantic relationships analyzing the partnership between ${singleRelationship.personName1} and ${singleRelationship.personName2}. Your response must be based exclusively on peer-reviewed psychological research regarding:

// 1. Attachment theory (Bowlby, Ainsworth, Hazan & Shaver)
// 2. Love languages (Chapman)
// 3. Communication styles (Gottman, Markman)
// 4. Conflict resolution (Johnson, Gottman)
// 5. Relationship stages (Knapp)

// Relationship Context:
// - Title: ${singleRelationship.relationshipTitle}
// - Duration: ${singleRelationship.relationshipLength}
// - Living status: ${singleRelationship.livingStatus}
// - Stage: ${singleRelationship.relationshipState}

// Individual Profiles:

// ${singleRelationship.personName1}:
// - Attachment: ${singleRelationship.attachmentStyle1}
// - Love language: ${singleRelationship.loveLanguage1}
// - Communication: ${singleRelationship.communicationStyle1}
// - Conflict style: ${singleRelationship.conflictStyle1}
// - Current feelings: ${singleRelationship.yourFellings1}

// ${singleRelationship.personName2}:
// - Attachment: ${singleRelationship.attachmentStyle2}
// - Love language: ${singleRelationship.loveLanguage2}
// - Communication: ${singleRelationship.communicationStyle2}
// - Conflict style: ${singleRelationship.conflictStyle2}
// - Current feelings: ${singleRelationship.yourFellings2}

// Research-Based Analysis Required:

// 1. Attachment Dynamics:
//    - Cite research on Secure-Anxious pairings (Mikulincer & Shaver, 2007)
//    - Predict likely interaction patterns

// 2. Communication Assessment:
//    - Analyze Direct vs Diplomatic styles using Gottman's principles
//    - Identify potential friction points

// 3. Conflict Resolution:
//    - Evaluate dual-confrontational style risks (Johnson, 2008)
//    - Suggest evidence-based mitigation strategies

// 4. Love Language Compatibility:
//    - Apply Chapman's framework to Words vs Gifts preference
//    - Recommend bridging strategies

// 5. Stage-Appropriate Guidance:
//    - Provide research-backed advice for early dating phase (Sternberg, 1986)
//    - Address living-apart considerations

// Required Format:
// - All recommendations must cite specific studies
// - No speculative advice
// - Separate actionable steps for each partner
// - Highlight both strengths and growth areas
// `
//         console.log('prompt', prompt)


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
//           }),
//         }
//       )
//     } catch (error) {
//       console.error('Error:', error)
//       setResponse(`${error.message}` || 'An error occurred.')
//     } finally {
//       setLoading(false)
//     }
//   }


//   return (
//     <div className=" container mt-16">
//       <div className="flex items-center gap-2">
//         <div
//           className="h-8 w-8 rounded-full bg-pink-200 flex justify-center items-center cursor-pointer"
//           onClick={() => navigate(-1)}
//         >
//           <ArrowLeft />
//         </div>

//         <div>
//           <h1 className="text-3xl font-bold">
//             {singleRelationship?.relationshipTitle}
//           </h1>
//           <button className="p-1 border border-gray-300 rounded-3xl text-xs font-bold">
//             {singleRelationship?.status}
//           </button>
//         </div>
//       </div>

//       <div className="flex gap-24 mt-10">
//         {/* sidebar */}
//         <div className=" w-[30%]">
//           <div className="flex items-center gap-2">
//             <div className="text-pink-500">
//               <CircleAlert />
//             </div>

//             <div>
//               <h1 className="font-semibold">Relationship Details</h1>
//             </div>
//           </div>

//           <h1 className="text-gray-500 my-3 font-medium">
//             Key information about your relationship
//           </h1>

//           <div className="flex gap-2 mt-6">
//             <div className="h-2 text-gray-500">
//               <Clock />
//             </div>

//             <div>
//               <h1 className="font-medium">Length</h1>
//               <p className="text-gray-500">
//                 {singleRelationship?.relationshipLength}
//               </p>
//             </div>
//           </div>

//           <div className="flex gap-2 mt-3 border-b border-gray-300 pb-3">
//             <div className="h-2 text-gray-500">
//               <House />
//             </div>

//             <div>
//               <h1 className="font-medium">Living Status</h1>
//               <p className="text-gray-500">
//                 {singleRelationship?.livingStatus}
//               </p>
//             </div>
//           </div>

//           <div className="flex items-center mb-3 mt-3">
//             <User className="h-5 w-5 text-gray-500 mr-2" />
//             <h2 className="text-sm font-bold text-gray-700">
//               Personality Profiles
//             </h2>
//           </div>

//           <div className="max-w-md mx-auto px-6 border-b border-gray-300 pb-3">
//             <div className="flex items-center mb-6">
//               <div className="flex items-center justify-center h-8 w-8 rounded-full bg-pink-100 text-pink-500 mr-3">
//                 <span className="text-sm font-medium">P</span>
//               </div>
//               <span className="text-sm font-medium">Person 1</span>
//             </div>

//             <div className="grid grid-cols-2 gap-x-12 gap-y-6">
//               <div>
//                 <div className="text-xs text-gray-500 mb-1">Love Language</div>
//                 <div className="flex items-center">
//                   <Gift className="h-4 w-4 text-gray-700 mr-2" />
//                   <span className="text-sm font-medium text-gray-900">
//                     {singleRelationship?.loveLanguage1}
//                   </span>
//                 </div>
//               </div>

//               <div>
//                 <div className="text-xs text-gray-500 mb-1">Communication</div>
//                 <div className="flex items-center">
//                   <MessageCircle className="h-4 w-4 text-gray-700 mr-2" />
//                   <span className="text-sm font-medium text-gray-900">
//                     {singleRelationship?.communicationStyle1}
//                   </span>
//                 </div>
//               </div>

//               <div>
//                 <div className="text-xs text-gray-500 mb-1">Conflict Style</div>
//                 <div className="flex items-center">
//                   <Heart className="h-4 w-4 text-gray-700 mr-2" />
//                   <span className="text-sm font-medium text-gray-900">
//                     {singleRelationship?.conflictStyle1}
//                   </span>
//                 </div>
//               </div>

//               <div>
//                 <div className="text-xs text-gray-500 mb-1">Attachment</div>
//                 <div className="flex items-center">
//                   <Shield className="h-4 w-4 text-gray-700 mr-2" />
//                   <span className="text-sm font-medium text-gray-900">
//                     {singleRelationship?.attachmentStyle1}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="max-w-md mx-auto px-6 pt-3">
//             <div className="flex items-center mb-6">
//               <div className="flex items-center justify-center h-8 w-8 rounded-full bg-pink-100 text-pink-500 mr-3">
//                 <span className="text-sm font-medium">P</span>
//               </div>
//               <span className="text-sm font-medium">Person 2</span>
//             </div>

//             <div className="grid grid-cols-2 gap-x-12 gap-y-6">
//               <div>
//                 <div className="text-xs text-gray-500 mb-1">Love Language</div>
//                 <div className="flex items-center">
//                   <Gift className="h-4 w-4 text-gray-700 mr-2" />
//                   <span className="text-sm font-medium text-gray-900">
//                     {singleRelationship?.loveLanguage2}
//                   </span>
//                 </div>
//               </div>

//               <div>
//                 <div className="text-xs text-gray-500 mb-1">Communication</div>
//                 <div className="flex items-center">
//                   <MessageCircle className="h-4 w-4 text-gray-700 mr-2" />
//                   <span className="text-sm font-medium text-gray-900">
//                     {singleRelationship?.communicationStyle2}
//                   </span>
//                 </div>
//               </div>

//               <div>
//                 <div className="text-xs text-gray-500 mb-1">Conflict Style</div>
//                 <div className="flex items-center">
//                   <Heart className="h-4 w-4 text-gray-700 mr-2" />
//                   <span className="text-sm font-medium text-gray-900">
//                     {singleRelationship?.conflictStyle2}
//                   </span>
//                 </div>
//               </div>

//               <div>
//                 <div className="text-xs text-gray-500 mb-1">Attachment</div>
//                 <div className="flex items-center">
//                   <Shield className="h-4 w-4 text-gray-700 mr-2" />
//                   <span className="text-sm font-medium text-gray-900">
//                     {singleRelationship?.attachmentStyle2}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* content */}
//         <div className="border border-red-500 w-[70%]">
//           <div className="flex items-center gap-2">
//             <div className="text-pink-500">
//               <CircleAlert />
//             </div>

//             <div>
//               <h1 className="font-semibold">Relationship Details</h1>
//             </div>
//           </div>

//           <h1 className="text-gray-500 my-3 font-medium">
//             Key information about your relationship
//           </h1>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Message
//-------------------------------------------------------------------------------------------------------------

// import {
//   ArrowLeft,
//   CircleAlert,
//   Clock,
//   Gift,
//   Heart,
//   House,
//   MessageCircle,
//   Shield,
//   User,
//   Send,
// } from 'lucide-react'
// import { useEffect, useState } from 'react'
// import { ref, onValue } from 'firebase/database'
// import { db } from '../config/firebaseConfig'
// import { useNavigate, useParams } from 'react-router-dom'

// const Message = () => {
//   const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY
//   const { id } = useParams()
//   const navigate = useNavigate()

//   // All states
//   const [relationships, setRelationships] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [messages, setMessages] = useState([])
//   const [inputMessage, setInputMessage] = useState('')
//   const [isAiTyping, setIsAiTyping] = useState(false)
//   const [response, setResponse] = useState('')

//   // get data form firebase
//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem('user'))

//     if (!user?.uid) {
//       setLoading(false)
//       return
//     }

//     const relationshipsRef = ref(db, `users/${user.uid}/formSubmissions`)
//     const unsubscribe = onValue(relationshipsRef, (snapshot) => {
//       const data = snapshot.val()
//       const relationshipsArray = data
//         ? Object.entries(data).map(([key, value]) => ({
//             id: key,
//             ...value,
//           }))
//         : []
//       setRelationships(relationshipsArray)
//       setLoading(false)
//     })

//     return () => unsubscribe()
//   }, [])

//   const singleRelationship = relationships.find(
//     (relationship) => relationship.id === id
//   )

//   // Generate initial AI message on first load
//   useEffect(() => {
//     if (singleRelationship && messages.length === 0) {
//       generateAiResponse()
//     }
//   }, [singleRelationship])

//   const generateAiResponse = async (userQuestion = '') => {
//     if (!singleRelationship) return

//     setIsAiTyping(true)

//     try {
//       const prompt = userQuestion
//         ? `Analyze the romantic relationship between ${singleRelationship.personName1} and ${singleRelationship.personName2}. 
//      Given the context below, provide a research-backed response in 50-70 words to address the following question: 
//      "${userQuestion}"  

//      Relationship details:  
//      - ${singleRelationship.personName1}: ${singleRelationship.attachmentStyle1} attachment, ${singleRelationship.loveLanguage1} love language, ${singleRelationship.communicationStyle1} communication style, ${singleRelationship.conflictStyle1} conflict style  
//      - ${singleRelationship.personName2}: ${singleRelationship.attachmentStyle2} attachment, ${singleRelationship.loveLanguage2} love language, ${singleRelationship.communicationStyle2} communication style, ${singleRelationship.conflictStyle2} conflict style  
//      - Relationship stage: ${singleRelationship.relationshipState}  
//      - Length of relationship: ${singleRelationship.relationshipLength}  
//      - Living situation: ${singleRelationship.livingStatus}  

//      Ensure the response is strictly based on psychological and relationship research without opinions or fabrications.`
//         : `Provide a concise, research-backed 100-150 word analysis of the romantic relationship between ${singleRelationship.personName1} and ${singleRelationship.personName2}, considering their unique profiles:  

//      - ${singleRelationship.personName1}: ${singleRelationship.attachmentStyle1} attachment, ${singleRelationship.loveLanguage1} love language, ${singleRelationship.communicationStyle1} communication style, ${singleRelationship.conflictStyle1} conflict style  
//      - ${singleRelationship.personName2}: ${singleRelationship.attachmentStyle2} attachment, ${singleRelationship.loveLanguage2} love language, ${singleRelationship.communicationStyle2} communication style, ${singleRelationship.conflictStyle2} conflict style  
//      - Relationship stage: ${singleRelationship.relationshipState}  
//      - Length of relationship: ${singleRelationship.relationshipLength}  
//      - Living situation: ${singleRelationship.livingStatus}  

//      The response must be rooted in scientific research on relationships, attachment theory, communication, and conflict resolution.`  


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
//       const aiMessage =
//         data.choices[0]?.message?.content || "I couldn't generate a response."

//       setMessages((prev) => [
//         ...prev,
//         {
//           id: Date.now(),
//           text: aiMessage,
//           isAi: true,
//           timestamp: new Date().toLocaleTimeString(),
//         },
//       ])
//     } catch (error) {
//       console.error('Error:', error)
//       setMessages((prev) => [
//         ...prev,
//         {
//           id: Date.now(),
//           text: "Sorry, I couldn't process your request.",
//           isAi: true,
//           timestamp: new Date().toLocaleTimeString(),
//         },
//       ])
//     } finally {
//       setIsAiTyping(false)
//     }
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     if (!inputMessage.trim()) return

//     // Add user message
//     const newMessage = {
//       id: Date.now(),
//       text: inputMessage,
//       isAi: false,
//       timestamp: new Date().toLocaleTimeString(),
//     }

//     setMessages((prev) => [...prev, newMessage])
//     setInputMessage('')

//     // Generate AI response
//     await generateAiResponse(inputMessage)
//   }

//    return (
//      <div className="container mx-auto px-4 py-8">
//        <div className="flex flex-col space-y-6">
//          {/* Header section */}
//          <div className="flex items-start gap-4">
//            <div
//              className="h-8 w-8 rounded-full bg-pink-200 flex justify-center items-center cursor-pointer shrink-0"
//              onClick={() => navigate(-1)}
//            >
//              <ArrowLeft />
//            </div>

//            <div>
//              <h1 className="text-2xl md:text-3xl font-bold">
//                {singleRelationship?.relationshipTitle}
//              </h1>
//              <button className="p-1 border border-gray-300 rounded-3xl text-xs font-bold mt-1">
//                {singleRelationship?.status}
//              </button>
//            </div>
//          </div>

//          {/* Main content grid */}
//          <div className="flex flex-col-reverse lg:flex-row gap-8 ">
//            {/* Content - relationship advice section */}
//            <div className="w-full lg:w-2/3">
//              <div className="flex items-center gap-2 mb-4">
//                <div className="text-pink-500">
//                  <Heart className="h-6 w-6" />
//                </div>
//                <h1 className="font-semibold">Relationship Advice</h1>
//              </div>

//              <p className="text-gray-500 mb-6 font-medium">
//                Ai Provided guidance based on scientific relationship.
//              </p>

//              {/* Chat container */}
//              <div className="border border-gray-200 rounded-lg h-[400px] sm:h-[500px] overflow-hidden flex flex-col">
//                {/* Messages area */}
//                <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
//                  {messages.length === 0 && !isAiTyping && (
//                    <div className="flex items-center justify-center h-full text-gray-400">
//                      Your relationship analysis will appear here
//                    </div>
//                  )}

//                  {messages.map((message) => (
//                    <div
//                      key={message.id}
//                      className={`mb-4 ${
//                        message.isAi ? '' : 'flex justify-end'
//                      }`}
//                    >
//                      <div
//                        className={`max-w-[90%] sm:max-w-[80%] p-3 rounded-lg ${
//                          message.isAi
//                            ? 'bg-white border border-gray-200'
//                            : 'bg-pink-100 text-pink-900'
//                        }`}
//                      >
//                        <p className="text-sm sm:text-base">{message.text}</p>
//                        <p className="text-xs text-gray-500 mt-1">
//                          {message.timestamp} {message.isAi ? '· RelateAI' : ''}
//                        </p>
//                      </div>
//                    </div>
//                  ))}

//                  {isAiTyping && (
//                    <div className="mb-4">
//                      <div className="max-w-[80%] p-3 rounded-lg bg-white border border-gray-200">
//                        <div className="flex space-x-2">
//                          <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce"></div>
//                          <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce delay-100"></div>
//                          <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce delay-200"></div>
//                        </div>
//                      </div>
//                    </div>
//                  )}
//                </div>

//                {/* Input area */}
//                <form
//                  onSubmit={handleSubmit}
//                  className="border-t border-gray-200 p-4 bg-white"
//                >
//                  <div className="flex items-center">
//                    <input
//                      type="text"
//                      value={inputMessage}
//                      onChange={(e) => setInputMessage(e.target.value)}
//                      placeholder="Ask any question about your relationship..."
//                      className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm sm:text-base"
//                      disabled={isAiTyping}
//                    />
//                    <button
//                      type="submit"
//                      className="bg-pink-500 text-white px-4 py-2 rounded-r-lg hover:bg-pink-600 transition-colors disabled:opacity-50"
//                      disabled={!inputMessage.trim() || isAiTyping}
//                    >
//                      <Send className="h-5 w-5" />
//                    </button>
//                  </div>
//                  <p className="text-xs text-gray-500 mt-2">
//                    RelateAI provides research-based relationship insights
//                  </p>
//                </form>
//              </div>

//              {/* Suggested questions */}
//              <div className="mt-4">
//                <h3 className="text-sm font-medium text-gray-500 mb-2">
//                  Try asking:
//                </h3>
//                <div className="flex flex-wrap gap-2">
//                  {[
//                    'How can we improve our communication?',
//                    'What are our relationship strengths?',
//                    'How to handle conflicts better?',
//                    'Tips for our attachment styles',
//                  ].map((question) => (
//                    <button
//                      key={question}
//                      onClick={() => setInputMessage(question)}
//                      className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition-colors"
//                    >
//                      {question}
//                    </button>
//                  ))}
//                </div>
//              </div>
//            </div>

//            {/* Sidebar */}
//            <div className="w-full lg:w-1/3">
//              <div className="flex items-center gap-2">
//                <div className="text-pink-500">
//                  <CircleAlert />
//                </div>
//                <h1 className="font-semibold">Relationship Details</h1>
//              </div>

//              <h1 className="text-gray-500 my-3 font-medium">
//                Key information about your relationship
//              </h1>

//              <div className="flex gap-2 mt-6">
//                <div className="text-gray-500 shrink-0">
//                  <Clock />
//                </div>
//                <div>
//                  <h1 className="font-medium">Length</h1>
//                  <p className="text-gray-500">
//                    {singleRelationship?.relationshipLength}
//                  </p>
//                </div>
//              </div>

//              <div className="flex gap-2 mt-3 border-b border-gray-300 pb-3">
//                <div className="text-gray-500 shrink-0">
//                  <House />
//                </div>
//                <div>
//                  <h1 className="font-medium">Living Status</h1>
//                  <p className="text-gray-500">
//                    {singleRelationship?.livingStatus}
//                  </p>
//                </div>
//              </div>

//              <div className="flex items-center mb-3 mt-3">
//                <User className="h-5 w-5 text-gray-500 mr-2" />
//                <h2 className="text-sm font-bold text-gray-700">
//                  Personality Profiles
//                </h2>
//              </div>

//              {/* Person 1 Profile */}
//              <div className="border-b border-gray-300 pb-3">
//                <div className="flex items-center mb-6">
//                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-pink-100 text-pink-500 mr-3">
//                    <span className="text-sm font-medium">P</span>
//                  </div>
//                  <span className="text-sm font-medium">Person 1</span>
//                </div>

//                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
//                  <div>
//                    <div className="text-xs text-gray-500 mb-1">
//                      Love Language
//                    </div>
//                    <div className="flex items-center">
//                      <Gift className="h-4 w-4 text-gray-700 mr-2 shrink-0" />
//                      <span className="text-sm font-medium text-gray-900">
//                        {singleRelationship?.loveLanguage1}
//                      </span>
//                    </div>
//                  </div>

//                  <div>
//                    <div className="text-xs text-gray-500 mb-1">
//                      Communication
//                    </div>
//                    <div className="flex items-center">
//                      <MessageCircle className="h-4 w-4 text-gray-700 mr-2 shrink-0" />
//                      <span className="text-sm font-medium text-gray-900">
//                        {singleRelationship?.communicationStyle1}
//                      </span>
//                    </div>
//                  </div>

//                  <div>
//                    <div className="text-xs text-gray-500 mb-1">
//                      Conflict Style
//                    </div>
//                    <div className="flex items-center">
//                      <Heart className="h-4 w-4 text-gray-700 mr-2 shrink-0" />
//                      <span className="text-sm font-medium text-gray-900">
//                        {singleRelationship?.conflictStyle1}
//                      </span>
//                    </div>
//                  </div>

//                  <div>
//                    <div className="text-xs text-gray-500 mb-1">Attachment</div>
//                    <div className="flex items-center">
//                      <Shield className="h-4 w-4 text-gray-700 mr-2 shrink-0" />
//                      <span className="text-sm font-medium text-gray-900">
//                        {singleRelationship?.attachmentStyle1}
//                      </span>
//                    </div>
//                  </div>
//                </div>
//              </div>

//              {/* Person 2 Profile */}
//              <div className="pt-3">
//                <div className="flex items-center mb-6">
//                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-pink-100 text-pink-500 mr-3">
//                    <span className="text-sm font-medium">P</span>
//                  </div>
//                  <span className="text-sm font-medium">Person 2</span>
//                </div>

//                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
//                  <div>
//                    <div className="text-xs text-gray-500 mb-1">
//                      Love Language
//                    </div>
//                    <div className="flex items-center">
//                      <Gift className="h-4 w-4 text-gray-700 mr-2 shrink-0" />
//                      <span className="text-sm font-medium text-gray-900">
//                        {singleRelationship?.loveLanguage2}
//                      </span>
//                    </div>
//                  </div>

//                  <div>
//                    <div className="text-xs text-gray-500 mb-1">
//                      Communication
//                    </div>
//                    <div className="flex items-center">
//                      <MessageCircle className="h-4 w-4 text-gray-700 mr-2 shrink-0" />
//                      <span className="text-sm font-medium text-gray-900">
//                        {singleRelationship?.communicationStyle2}
//                      </span>
//                    </div>
//                  </div>

//                  <div>
//                    <div className="text-xs text-gray-500 mb-1">
//                      Conflict Style
//                    </div>
//                    <div className="flex items-center">
//                      <Heart className="h-4 w-4 text-gray-700 mr-2 shrink-0" />
//                      <span className="text-sm font-medium text-gray-900">
//                        {singleRelationship?.conflictStyle2}
//                      </span>
//                    </div>
//                  </div>

//                  <div>
//                    <div className="text-xs text-gray-500 mb-1">Attachment</div>
//                    <div className="flex items-center">
//                      <Shield className="h-4 w-4 text-gray-700 mr-2 shrink-0" />
//                      <span className="text-sm font-medium text-gray-900">
//                        {singleRelationship?.attachmentStyle2}
//                      </span>
//                    </div>
//                  </div>
//                </div>
//              </div>
//            </div>
//          </div>
//        </div>
//      </div>
//    )
  
// }

// export default Message


//-------------------------------------------------------------------------------------------------------------

import {
  ArrowLeft,
  CircleAlert,
  Clock,
  Gift,
  Heart,
  House,
  MessageCircle,
  Shield,
  User,
  Send,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { ref, onValue } from 'firebase/database'
import { db } from '../config/firebaseConfig'
import { useNavigate, useParams } from 'react-router-dom'

const Message = () => {
  const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
  const { id } = useParams()
  const navigate = useNavigate()

  // All states
  const [relationships, setRelationships] = useState([])
  const [loading, setLoading] = useState(true)
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [isAiTyping, setIsAiTyping] = useState(false)
  const [response, setResponse] = useState('')
  const [messageLimit, setMessageLimit] = useState(null)
  const [messagesSent, setMessagesSent] = useState(0)
  const [limitReached, setLimitReached] = useState(false)

  // get data form firebase
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))

    if (!user?.uid) {
      setLoading(false)
      return
    }

    const relationshipsRef = ref(db, `users/${user.uid}/formSubmissions`)
    const unsubscribe = onValue(relationshipsRef, (snapshot) => {
      const data = snapshot.val()
      const relationshipsArray = data
        ? Object.entries(data).map(([key, value]) => ({
            id: key,
            ...value,
          }))
        : []
      setRelationships(relationshipsArray)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const singleRelationship = relationships.find(
    (relationship) => relationship.id === id
  )

  // Generate initial AI message on first load
  useEffect(() => {
    if (singleRelationship && messages.length === 0) {
      generateAiResponse()
    }
  }, [singleRelationship])

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

  const generateAiResponse = async (userQuestion = '') => {
    if (!singleRelationship || limitReached) return

    setIsAiTyping(true)

    try {
      // First check if user can send a message
      const user = JSON.parse(localStorage.getItem('user'))
      if (!user?.email) return

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
        ? `Analyze the romantic relationship between ${singleRelationship.personName1} and ${singleRelationship.personName2}. 
     Given the context below, provide a research-backed response in 50-70 words to address the following question: 
     "${userQuestion}"  

     Relationship details:  
     - ${singleRelationship.personName1}: ${singleRelationship.attachmentStyle1} attachment, ${singleRelationship.loveLanguage1} love language, ${singleRelationship.communicationStyle1} communication style, ${singleRelationship.conflictStyle1} conflict style  
     - ${singleRelationship.personName2}: ${singleRelationship.attachmentStyle2} attachment, ${singleRelationship.loveLanguage2} love language, ${singleRelationship.communicationStyle2} communication style, ${singleRelationship.conflictStyle2} conflict style  
     - Relationship stage: ${singleRelationship.relationshipState}  
     - Length of relationship: ${singleRelationship.relationshipLength}  
     - Living situation: ${singleRelationship.livingStatus}  

     Ensure the response is strictly based on psychological and relationship research without opinions or fabrications.`
        : `Provide a concise, research-backed 100-150 word analysis of the romantic relationship between ${singleRelationship.personName1} and ${singleRelationship.personName2}, considering their unique profiles:  

     - ${singleRelationship.personName1}: ${singleRelationship.attachmentStyle1} attachment, ${singleRelationship.loveLanguage1} love language, ${singleRelationship.communicationStyle1} communication style, ${singleRelationship.conflictStyle1} conflict style  
     - ${singleRelationship.personName2}: ${singleRelationship.attachmentStyle2} attachment, ${singleRelationship.loveLanguage2} love language, ${singleRelationship.communicationStyle2} communication style, ${singleRelationship.conflictStyle2} conflict style  
     - Relationship stage: ${singleRelationship.relationshipState}  
     - Length of relationship: ${singleRelationship.relationshipLength}  
     - Living situation: ${singleRelationship.livingStatus}  

     The response must be rooted in scientific research on relationships, attachment theory, communication, and conflict resolution.`

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
            max_tokens: 150,
          }),
        }
      )

      const data = await openAIResponse.json()
      const aiMessage =
        data.choices[0]?.message?.content || "I couldn't generate a response."

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: aiMessage,
          isAi: true,
          timestamp: new Date().toLocaleTimeString(),
        },
      ])
    } catch (error) {
      console.error('Error:', error)
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: "Sorry, I couldn't process your request.",
          isAi: true,
          timestamp: new Date().toLocaleTimeString(),
        },
      ])
    } finally {
      setIsAiTyping(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!inputMessage.trim() || limitReached) return

    // Add user message
    const newMessage = {
      id: Date.now(),
      text: inputMessage,
      isAi: false,
      timestamp: new Date().toLocaleTimeString(),
    }

    setMessages((prev) => [...prev, newMessage])
    setInputMessage('')

    // Generate AI response
    await generateAiResponse(inputMessage)
  }

  // Check message limit on component mount
  useEffect(() => {
    checkMessageLimit()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-6">
        {/* Header section */}
        <div className="flex items-start gap-4">
          <div
            className="h-8 w-8 rounded-full bg-pink-200 flex justify-center items-center cursor-pointer shrink-0"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft />
          </div>

          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              {singleRelationship?.relationshipTitle}
            </h1>
            <button className="p-1 border border-gray-300 rounded-3xl text-xs font-bold mt-1">
              {singleRelationship?.status}
            </button>
          </div>
        </div>

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

        {/* Main content grid */}
        <div className="flex flex-col-reverse lg:flex-row gap-8 ">
          {/* Content - relationship advice section */}
          <div className="w-full lg:w-2/3">
            <div className="flex items-center gap-2 mb-4">
              <div className="text-pink-500">
                <Heart className="h-6 w-6" />
              </div>
              <h1 className="font-semibold">Relationship Advice</h1>
            </div>

            <p className="text-gray-500 mb-6 font-medium">
              Ai Provided guidance based on scientific relationship.
            </p>

            {/* Chat container */}
            <div className="border border-gray-200 rounded-lg h-[400px] sm:h-[500px] overflow-hidden flex flex-col">
              {/* Messages area */}
              <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                {limitReached ? (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    You've reached your message limit. Please upgrade your plan.
                  </div>
                ) : messages.length === 0 && !isAiTyping ? (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    Your relationship analysis will appear here
                  </div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`mb-4 ${
                        message.isAi ? '' : 'flex justify-end'
                      }`}
                    >
                      <div
                        className={`max-w-[90%] sm:max-w-[80%] p-3 rounded-lg ${
                          message.isAi
                            ? 'bg-white border border-gray-200'
                            : 'bg-pink-100 text-pink-900'
                        }`}
                      >
                        <p className="text-sm sm:text-base">{message.text}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {message.timestamp} {message.isAi ? '· RelateAI' : ''}
                        </p>
                      </div>
                    </div>
                  ))
                )}

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

              {/* Input area */}
              <form
                onSubmit={handleSubmit}
                className="border-t border-gray-200 p-4 bg-white"
              >
                <div className="flex items-center">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder={
                      limitReached
                        ? 'Message limit reached - upgrade plan'
                        : 'Ask any question about your relationship...'
                    }
                    className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm sm:text-base"
                    disabled={isAiTyping || limitReached}
                  />
                  <button
                    type="submit"
                    className="bg-pink-500 text-white px-4 py-2 rounded-r-lg hover:bg-pink-600 transition-colors disabled:opacity-50"
                    disabled={
                      !inputMessage.trim() || isAiTyping || limitReached
                    }
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  RelateAI provides research-based relationship insights
                </p>
              </form>
            </div>

            {/* Suggested questions */}
            {!limitReached && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Try asking:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    'How can we improve our communication?',
                    'What are our relationship strengths?',
                    'How to handle conflicts better?',
                    'Tips for our attachment styles',
                  ].map((question) => (
                    <button
                      key={question}
                      onClick={() => setInputMessage(question)}
                      className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-1/3">
            <div className="flex items-center gap-2">
              <div className="text-pink-500">
                <CircleAlert />
              </div>
              <h1 className="font-semibold">Relationship Details</h1>
            </div>

            <h1 className="text-gray-500 my-3 font-medium">
              Key information about your relationship
            </h1>

            <div className="flex gap-2 mt-6">
              <div className="text-gray-500 shrink-0">
                <Clock />
              </div>
              <div>
                <h1 className="font-medium">Length</h1>
                <p className="text-gray-500">
                  {singleRelationship?.relationshipLength}
                </p>
              </div>
            </div>

            <div className="flex gap-2 mt-3 border-b border-gray-300 pb-3">
              <div className="text-gray-500 shrink-0">
                <House />
              </div>
              <div>
                <h1 className="font-medium">Living Status</h1>
                <p className="text-gray-500">
                  {singleRelationship?.livingStatus}
                </p>
              </div>
            </div>

            <div className="flex items-center mb-3 mt-3">
              <User className="h-5 w-5 text-gray-500 mr-2" />
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
                <span className="text-sm font-medium">Person 1</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
                <div>
                  <div className="text-xs text-gray-500 mb-1">
                    Love Language
                  </div>
                  <div className="flex items-center">
                    <Gift className="h-4 w-4 text-gray-700 mr-2 shrink-0" />
                    <span className="text-sm font-medium text-gray-900">
                      {singleRelationship?.loveLanguage1}
                    </span>
                  </div>
                </div>

                <div>
                  <div className="text-xs text-gray-500 mb-1">
                    Communication
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="h-4 w-4 text-gray-700 mr-2 shrink-0" />
                    <span className="text-sm font-medium text-gray-900">
                      {singleRelationship?.communicationStyle1}
                    </span>
                  </div>
                </div>

                <div>
                  <div className="text-xs text-gray-500 mb-1">
                    Conflict Style
                  </div>
                  <div className="flex items-center">
                    <Heart className="h-4 w-4 text-gray-700 mr-2 shrink-0" />
                    <span className="text-sm font-medium text-gray-900">
                      {singleRelationship?.conflictStyle1}
                    </span>
                  </div>
                </div>

                <div>
                  <div className="text-xs text-gray-500 mb-1">Attachment</div>
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 text-gray-700 mr-2 shrink-0" />
                    <span className="text-sm font-medium text-gray-900">
                      {singleRelationship?.attachmentStyle1}
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
                <span className="text-sm font-medium">Person 2</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
                <div>
                  <div className="text-xs text-gray-500 mb-1">
                    Love Language
                  </div>
                  <div className="flex items-center">
                    <Gift className="h-4 w-4 text-gray-700 mr-2 shrink-0" />
                    <span className="text-sm font-medium text-gray-900">
                      {singleRelationship?.loveLanguage2}
                    </span>
                  </div>
                </div>

                <div>
                  <div className="text-xs text-gray-500 mb-1">
                    Communication
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="h-4 w-4 text-gray-700 mr-2 shrink-0" />
                    <span className="text-sm font-medium text-gray-900">
                      {singleRelationship?.communicationStyle2}
                    </span>
                  </div>
                </div>

                <div>
                  <div className="text-xs text-gray-500 mb-1">
                    Conflict Style
                  </div>
                  <div className="flex items-center">
                    <Heart className="h-4 w-4 text-gray-700 mr-2 shrink-0" />
                    <span className="text-sm font-medium text-gray-900">
                      {singleRelationship?.conflictStyle2}
                    </span>
                  </div>
                </div>

                <div>
                  <div className="text-xs text-gray-500 mb-1">Attachment</div>
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 text-gray-700 mr-2 shrink-0" />
                    <span className="text-sm font-medium text-gray-900">
                      {singleRelationship?.attachmentStyle2}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Message