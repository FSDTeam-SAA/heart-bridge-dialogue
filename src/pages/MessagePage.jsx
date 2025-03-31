// import React, { useState } from 'react'
// import axios from 'axios'

// const MessagePage = () => {
//   const [message, setMessage] = useState('')
//   const [response, setResponse] = useState('')
//   const [loading, setLoading] = useState(false)

//   const handleSubmit = async () => {
//     if (!message.trim()) return

//     setLoading(true)
//     setResponse('')

//     try {
//       // Get user from localStorage
//       const user = JSON.parse(localStorage.getItem('user'))
//       if (!user || !user.email) {
//         throw new Error('User not authenticated or missing email')
//       }

//       // 1. Check message limit with backend
//       console.log('Checking message limit...')
//       const limitCheck = await axios.post(
//         'http://localhost:5000/api/send-message',
//         {
//           userId: user.email,
//           message: message,
//         }
//       )

//       // If limit reached
//       if (limitCheck.data?.status === 'limit_reached') {
//         console.log('Limit reached:', limitCheck.data.message)
//         return setResponse(limitCheck.data.message)
//       }

//       // 2. Call OpenRouter API
//       console.log('Calling OpenRouter API...')
//       const openRouterResponse = await fetch(
//         'https://openrouter.ai/api/v1/chat/completions',
//         {
//           method: 'POST',
//           headers: {
//             Authorization: `Bearer ${
//               process.env.REACT_APP_OPENROUTER_API_KEY ||
//               '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'
//             }`,
//             'HTTP-Referer': window.location.href, // Use current URL
//             'X-Title': 'My AI App', // Replace with your app name
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             model: 'deepseek/deepseek-r1:free',
//             messages: [{ role: 'user', content: message }],
//             temperature: 0.7,
//           }),
//         }
//       )

//       if (!openRouterResponse.ok) {
//         const errorData = await openRouterResponse.json()
//         throw new Error(
//           errorData.error?.message || 'Failed to fetch response from OpenRouter'
//         )
//       }

//       const data = await openRouterResponse.json()

//       if (data?.choices?.length > 0) {
//         setResponse(data.choices[0].message.content)
//       } else {
//         setResponse('No response from AI.')
//       }
//     } catch (error) {
//       console.error('Full error details:', error)

//       // More specific error handling
//       if (error.message.includes('Failed to fetch')) {
//         setResponse('Network error: Please check your internet connection')
//       } else if (error.response?.data?.message) {
//         setResponse(`Error: ${error.response.data.message}`)
//       } else {
//         setResponse(`Error: ${error.message || 'An unexpected error occurred'}`)
//       }
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
//       <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-8">
//         <h1 className="text-3xl font-semibold text-center text-pink-600 mb-6">
//           Chat with AI
//         </h1>
//         <div className="mb-4">
//           <textarea
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             placeholder="Ask a question..."
//             className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none h-40"
//           />
//         </div>
//         <div className="flex justify-center mb-6">
//           <button
//             onClick={handleSubmit}
//             disabled={loading}
//             className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition duration-300 focus:outline-none focus:ring-4 focus:ring-pink-500 disabled:opacity-50"
//           >
//             {loading ? 'Sending...' : 'Send'}
//           </button>
//         </div>
//         <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
//           <h2 className="text-xl font-semibold text-gray-700 mb-2">Response</h2>
//           <div
//             className={`text-sm ${
//               response ? 'text-gray-800' : 'text-gray-500'
//             }`}
//             style={{ minHeight: '100px', whiteSpace: 'pre-wrap' }}
//           >
//             {loading
//               ? 'Loading...'
//               : response || 'AI response will appear here.'}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default MessagePage


import React, { useState } from 'react'
import axios from 'axios'

const MessagePage = () => {
  const [message, setMessage] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  // Define API key directly (remove for production!)
  const OPENROUTER_API_KEY =
    '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'

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
        'http://localhost:5000/api/send-message',
        {
          userId: user.email,
          message: message,
        }
      )

      if (limitCheck.data?.status === 'limit_reached') {
        return setResponse(limitCheck.data.message)
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
      setResponse(`Error: ${error.message || 'Request failed'}`)
    } finally {
      setLoading(false)
    }
  }
return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-8">
        <h1 className="text-3xl font-semibold text-center text-pink-600 mb-6">
          Chat with AI
        </h1>
        <div className="mb-4">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask a question..."
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none h-40"
          />
        </div>
        <div className="flex justify-center mb-6">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition duration-300 focus:outline-none focus:ring-4 focus:ring-pink-500 disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Response</h2>
          <div
            className={`text-sm ${
              response ? 'text-gray-800' : 'text-gray-500'
            }`}
            style={{ minHeight: '100px', whiteSpace: 'pre-wrap' }}
          >
            {loading
              ? 'Loading...'
              : response || 'AI response will appear here.'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessagePage