import React, { useState } from 'react'
import axios from 'axios'

const MessagePage = () => {
  const [message, setMessage] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)
  // Define API key directly (remove for production!)
  const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY

  const handleSubmit = async () => {
    if (!message.trim()) return

    setLoading(true)
    setResponse('')

    try {
      const user = JSON.parse(localStorage.getItem('user'))
      if (!user || !user.email) {
        throw new Error('User not authenticated or missing email')
      }

      console.log('Checking message limit...')
      const limitCheck = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/send-message`,
        {
          email: user.email,
          message: message,
        }
      )

      if (limitCheck.data?.status === 'limit_reached') {
        return setResponse(
          "You've reached the message limit. Please upgrade your plan."
        )
      }

      console.log('Calling OpenRouter API...')
      const openRouterResponse = await fetch(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${OPENROUTER_API_KEY}`,
            'HTTP-Referer': window.location.href,
            'X-Title': 'My AI App',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'deepseek/deepseek-r1:free',
            messages: [{ role: 'user', content: message }],
            temperature: 0.7,
          }),
        }
      )

      if (!openRouterResponse.ok) {
        const errorData = await openRouterResponse.json()
        throw new Error(errorData.error?.message || 'API request failed')
      }

      const data = await openRouterResponse.json()
      setResponse(data.choices[0]?.message?.content || 'No response from AI.')
    } catch (error) {
      console.error('Error:', error)
      setResponse(`${error.message}` || 'An error occurred.')
    } finally {
      setLoading(false)
    }
  }

  // Function to format the response with proper styling
  const formatResponse = (text) => {
    if (!text) return null

    return text.split('\n').map((line, index) => {
      // Bold text detection
      const boldMatch = line.match(/\*\*(.*?)\*\*/) // Look for **bold** text
      if (boldMatch) {
        const parts = line.split('**')
        return (
          <p key={index} className="text-gray-700 mb-3">
            {parts.map((part, i) =>
              i % 2 === 1 ? (
                <span
                  key={i}
                  className="font-semibold text-gray-800 bg-pink-50 px-1 rounded"
                >
                  {part}
                </span>
              ) : (
                part
              )
            )}
          </p>
        )
      }

      // Italics text detection
      const italicMatch = line.match(/\*(.*?)\*/) // Look for *italic* text
      if (italicMatch) {
        const parts = line.split('*')
        return (
          <p key={index} className="text-gray-700 mb-3">
            {parts.map((part, i) =>
              i % 2 === 1 ? (
                <span key={i} className="italic text-gray-800">
                  {part}
                </span>
              ) : (
                part
              )
            )}
          </p>
        )
      }

      // Code block detection
      if (line.startsWith('```')) {
        let codeBlockContent = line.slice(3)
        return (
          <pre key={index} className="bg-gray-800 text-red-700 p-4 rounded">
            {codeBlockContent}
          </pre>
        )
      }

      // Links
      const linkMatch = line.match(/\[([^\]]+)\]\(([^)]+)\)/) // Look for [link](url)
      if (linkMatch) {
        const [fullMatch, text, url] = linkMatch
        return (
          <p key={index} className="text-gray-700 mb-3">
            {line.replace(
              fullMatch,
              `<a href="${url}" class="text-blue-500 underline">${text}</a>`
            )}
          </p>
        )
      }

      // Headers (H1, H2, etc.)
      if (line.startsWith('# ')) {
        return (
          <h1 key={index} className="text-2xl font-bold text-gray-900 mb-4">
            {line.slice(2)}
          </h1>
        )
      } else if (line.startsWith('## ')) {
        return (
          <h2 key={index} className="text-xl font-semibold text-gray-800 mb-3">
            {line.slice(3)}
          </h2>
        )
      } else if (line.startsWith('### ')) {
        return (
          <h3 key={index} className="text-lg font-semibold text-gray-700 mb-2">
            {line.slice(4)}
          </h3>
        )
      }

      // Bullet points
      if (line.startsWith('- ')) {
        return (
          <div key={index} className="flex items-start mb-2 pl-4">
            <span className="text-pink-500 mr-2 mt-1">•</span>
            <p className="text-gray-700">{line.substring(2)}</p>
          </div>
        )
      }

      // Regular paragraph
      return (
        <p key={index} className="text-gray-700 mb-3">
          {line}
        </p>
      )
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50 p-4 md:p-6">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 md:p-8">
        <h1 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-6">
          Chat with AI
        </h1>

        <div className="mb-6">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask me anything..."
            className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none h-40 transition duration-200"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSubmit()
              }
            }}
          />
        </div>

        <div className="flex justify-center mb-6">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 px-6 rounded-lg hover:from-pink-700 hover:to-purple-700 transition duration-300 focus:outline-none focus:ring-4 focus:ring-pink-300 disabled:opacity-70 flex items-center justify-center"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Thinking...
              </>
            ) : (
              'Send Message'
            )}
          </button>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-5 rounded-xl border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">Response</h2>
          <div className="min-h-[200px]">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-[200px]">
                <div className="relative w-12 h-12 mb-4">
                  <div className="absolute inset-0 rounded-full border-4 border-t-pink-500 border-r-purple-500 border-b-pink-500 border-l-purple-500 animate-spin"></div>
                  <div className="absolute inset-1 rounded-full border-4 border-t-pink-300 border-r-purple-300 border-b-pink-300 border-l-purple-300 animate-spin-reverse"></div>
                </div>
                <p className="text-gray-500">Generating response...</p>
              </div>
            ) : response ? (
              <div className="prose max-w-none">{formatResponse(response)}</div>
            ) : (
              <div className="flex items-center justify-center h-[200px]">
                <p className="text-gray-400">
                  Your AI response will appear here
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessagePage


// import React, { useState, useEffect } from 'react'
// import axios from 'axios'
// import { db } from '../config/firebaseConfig'

// import { ref, onValue } from "firebase/database"; 


// const MessagePage = () => {
//   const [message, setMessage] = useState('')
//   const [response, setResponse] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [relationships, setRelationships] = useState([])
//   const [selectedRelationship, setSelectedRelationship] = useState(null)
//   const [showRelationshipSelector, setShowRelationshipSelector] = useState(true)

//   const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY

//   // Load relationships from Firebase
//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem('user'))

//     if (!user?.uid) return

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
//     })

//     return () => unsubscribe()
//   }, [])

//   const formatDuration = (months) => {
//     if (months >= 12) {
//       const years = Math.floor(months / 12)
//       const remainingMonths = months % 12
//       return `${years} year${years > 1 ? 's' : ''}${
//         remainingMonths
//           ? ` ${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`
//           : ''
//       }`
//     }
//     return `${months} month${months > 1 ? 's' : ''}`
//   }

//   const handleSubmit = async () => {
//       if (!message.trim() || !selectedRelationship) return

//       setLoading(true)
//       setResponse('')

//     try {
//       const user = JSON.parse(localStorage.getItem('user'))
//           if (!user || !user.email) {
//             throw new Error('User not authenticated or missing email')
//           }

//           // Prepare the prompt with relationship context
//           const prompt = `
//           You are an expert in romantic relationships, attachment styles, communication, psychology and everything around this topic.
//           You only quote scientific backed research, you do not have any opinions, and you do not fabricate any of your responses.

//           Today, we are going to help ${
//             selectedRelationship.basicInfo?.person1Name || 'Person 1'
//           } and ${selectedRelationship.basicInfo?.person2Name || 'Person 2'}.
//           This is what you need to know:

//           Relationship Title: ${
//             selectedRelationship.relationshipTitle || 'Not specified'
//           }
//           Length of relationship: ${formatDuration(
//             selectedRelationship.basicInfo?.duration || 0
//           )}
//           Living status: ${
//             selectedRelationship.basicInfo?.livingStatus || 'Not specified'
//           }
//           Relationship stage: ${
//             selectedRelationship.basicInfo?.relationshipStage || 'Not specified'
//           }
//           Person 1 perspective: ${
//             selectedRelationship.perspectives?.person1Perspective || 'Not specified'
//           }
//           Person 2 perspective: ${
//             selectedRelationship.perspectives?.person2Perspective || 'Not specified'
//           }
//           Person 1 Love Language: ${
//             selectedRelationship.loveLanguages?.person1LoveLanguage ||
//             'Not specified'
//           }
//           Person 2 Love Language: ${
//             selectedRelationship.loveLanguages?.person2LoveLanguage ||
//             'Not specified'
//           }
//           Person 1 Communication Style: ${
//             selectedRelationship.communicationStyles?.person1CommunicationStyle ||
//             'Not specified'
//           }
//           Person 2 Communication Style: ${
//             selectedRelationship.communicationStyles?.person2CommunicationStyle ||
//             'Not specified'
//           }
//           Person 1 Conflict Style: ${
//             selectedRelationship.conflictStyles?.person1ConflictStyle ||
//             'Not specified'
//           }
//           Person 2 Conflict Style: ${
//             selectedRelationship.conflictStyles?.person2ConflictStyle ||
//             'Not specified'
//           }
//           Person 1 Attachment Style: ${
//             selectedRelationship.attachmentStyles?.person1AttachmentStyle ||
//             'Not specified'
//           }
//           Person 2 Attachment Style: ${
//             selectedRelationship.attachmentStyles?.person2AttachmentStyle ||
//             'Not specified'
//           }

//           User's question: ${message}

//           Remember, using all of the above information, your job is to quote scientific backed research to give ${
//             selectedRelationship.basicInfo?.person1Name || 'Person 1'
//           } and ${
//             selectedRelationship.basicInfo?.person2Name || 'Person 2'
//           } the best chance of flourishing in a romantic relationship.
//           `

//           console.log('Calling OpenRouter API...')

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

//       if (!openAIResponse.ok) {
//         // Changed from openRouterResponse to openAIResponse
//         const errorData = await openAIResponse.json()
//         throw new Error(errorData.error?.message || 'API request failed')
//       }

//       const data = await openAIResponse.json() // Changed from openRouterResponse to openAIResponse
//       setResponse(data.choices[0]?.message?.content || 'No response from AI.')
//     } catch (error) {
//       console.error('Error:', error)
//       setResponse(`${error.message}` || 'An error occurred.')
//     } finally {
//       setLoading(false)
//     }
//   }




//   const formatResponse = (text) => {
//     return <div className="whitespace-pre-wrap">{text}</div>
//   }

//   if (showRelationshipSelector && relationships.length > 0) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50 p-4 md:p-6">
//         <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 md:p-8">
//           <h1 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-6">
//             Select a Relationship
//           </h1>

//           <div className="space-y-4 mb-6">
//             {relationships.map((relationship) => (
//               <div
//                 key={relationship.id}
//                 className={`p-4 border rounded-lg cursor-pointer transition-all ${
//                   selectedRelationship?.id === relationship.id
//                     ? 'border-pink-500 bg-pink-50'
//                     : 'border-gray-200 hover:border-pink-300'
//                 }`}
//                 onClick={() => setSelectedRelationship(relationship)}
//               >
//                 <h3 className="font-semibold text-lg">
//                   {relationship.relationshipTitle || 'Unnamed Relationship'}
//                 </h3>
//                 <p className="text-gray-600">
//                   {relationship.basicInfo?.person1Name} &{' '}
//                   {relationship.basicInfo?.person2Name}
//                 </p>
//                 <p className="text-sm text-gray-500">
//                   {relationship.basicInfo?.relationshipType} •{' '}
//                   {formatDuration(relationship.basicInfo?.duration || 0)}
//                 </p>
//               </div>
//             ))}
//           </div>

//           <button
//             onClick={() => setShowRelationshipSelector(false)}
//             disabled={!selectedRelationship}
//             className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 px-6 rounded-lg hover:from-pink-700 hover:to-purple-700 transition duration-300 focus:outline-none focus:ring-4 focus:ring-pink-300 disabled:opacity-70"
//           >
//             Continue with Selected Relationship
//           </button>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50 p-4 md:p-6">
//       <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 md:p-8">
//         {selectedRelationship && (
//           <div className="mb-4 p-4 bg-pink-50 rounded-lg border border-pink-100">
//             <h3 className="font-semibold text-pink-800">
//               Discussing:{' '}
//               {selectedRelationship.relationshipTitle || 'Unnamed Relationship'}
//             </h3>
//             <p className="text-sm text-pink-600">
//               {selectedRelationship.basicInfo?.person1Name} &{' '}
//               {selectedRelationship.basicInfo?.person2Name}
//             </p>
//             <button
//               onClick={() => setShowRelationshipSelector(true)}
//               className="mt-2 text-sm text-pink-600 hover:text-pink-800 underline"
//             >
//               Change relationship
//             </button>
//           </div>
//         )}

//         <h1 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-6">
//           Chat with Relationship AI
//         </h1>

//         <div className="mb-6">
//           <textarea
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             placeholder="Ask about your relationship..."
//             className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none h-40 transition duration-200"
//             onKeyDown={(e) => {
//               if (e.key === 'Enter' && !e.shiftKey) {
//                 e.preventDefault()
//                 handleSubmit()
//               }
//             }}
//           />
//         </div>

//         <div className="flex justify-center mb-6">
//           <button
//             onClick={handleSubmit}
//             disabled={loading || !selectedRelationship}
//             className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 px-6 rounded-lg hover:from-pink-700 hover:to-purple-700 transition duration-300 focus:outline-none focus:ring-4 focus:ring-pink-300 disabled:opacity-70 flex items-center justify-center"
//           >
//             {loading ? (
//               <>
//                 <svg
//                   className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle
//                     className="opacity-25"
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="currentColor"
//                     strokeWidth="4"
//                   ></circle>
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                   ></path>
//                 </svg>
//                 Thinking...
//               </>
//             ) : (
//               'Send Message'
//             )}
//           </button>
//         </div>

//         <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-5 rounded-xl border border-gray-200">
//           <h2 className="text-xl font-semibold text-gray-700 mb-3">Response</h2>
//           <div className="min-h-[200px]">
//             {loading ? (
//               <div className="flex flex-col items-center justify-center h-[200px]">
//                 <div className="relative w-12 h-12 mb-4">
//                   <div className="absolute inset-0 rounded-full border-4 border-t-pink-500 border-r-purple-500 border-b-pink-500 border-l-purple-500 animate-spin"></div>
//                   <div className="absolute inset-1 rounded-full border-4 border-t-pink-300 border-r-purple-300 border-b-pink-300 border-l-purple-300 animate-spin-reverse"></div>
//                 </div>
//                 <p className="text-gray-500">Generating response...</p>
//               </div>
//             ) : response ? (
//               <div className="prose max-w-none">{formatResponse(response)}</div>
//             ) : (
//               <div className="flex items-center justify-center h-[200px]">
//                 <p className="text-gray-400">
//                   {selectedRelationship
//                     ? 'Ask about your relationship to get AI advice'
//                     : 'Please select a relationship first'}
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default MessagePage