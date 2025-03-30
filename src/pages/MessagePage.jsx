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
//       const result = await axios.post(
//         'https://api.openai.com/v1/chat/completions',
//         {
//           model: 'gpt-3.5-turbo', // Use your preferred model
//           messages: [{ role: 'user', content: message }],
//         },
//         {
//           headers: {
//             Authorization: `Bearer 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`,
//             'Content-Type': 'application/json',
//           },
//         }
//       )
//       setResponse(result.data.choices[0].message.content)
//     } catch (error) {
//       setResponse('Error contacting the AI.')
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
//             {response || 'AI response will appear here.'}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default MessagePage




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

//     const user = JSON.parse(localStorage.getItem('user'))

//     try {
//       // Call the backend to check the message limit and send the message
//       const result = await axios.post(
//         'http://localhost:5000/api/send-message',
//         {
//           userId: user.email,
//           message: message,
//         }
//       )

//       console.log('Backend Response:', result) // Debug: Log the full backend response

//       if (result.data.status === 'limit_reached') {
//         setResponse(result.data.message)
//       } else if (result.status === 200) {
//         setResponse(result.data.message || 'Message sent successfully.')
//       } else {
//         setResponse('Something went wrong. Please try again.')
//       }
//     } catch (error) {
//       if (error.response && error.response.data.status === 'limit_reached') {
//         setResponse(error.response.data.message)
//       } else {
//         setResponse('Error contacting the backend. Please try again later.')
//       }
//       console.error(error) // Log the error
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
//             {response || 'AI response will appear here.'}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default MessagePage




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

//     const user = JSON.parse(localStorage.getItem('user'))

//     try {
//       // First check message limit with backend
//       const limitCheck = await axios.post(
//         'http://localhost:5000/api/send-message',
//         {
//           userId: user.email,
//           message: message,
//         }
//       )

//       // If limit reached, show message and return
//       if (limitCheck.data.status === 'limit_reached') {
//         setResponse(limitCheck.data.message)
//         return
//       }

//       // If within limits, proceed with OpenAI API call
//       const openAiResponse = await axios.post(
//         'https://api.openai.com/v1/chat/completions',
//         {
//           model: 'gpt-3.5-turbo',
//           messages: [{ role: 'user', content: message }],
//           temperature: 0.7,
//         },
//         {
//           headers: {
//             'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       )

//       // Update response with AI's answer
//       setResponse(openAiResponse.data.choices[0].message.content)

//     } catch (error) {
//       if (error.response && error.response.data.status === 'limit_reached') {
//         setResponse(error.response.data.message)
//       } else if (error.response && error.response.data.error) {
//         setResponse(`AI Error: ${error.response.data.error.message}`)
//       } else {
//         setResponse('Error processing your request. Please try again.')
//       }
//       console.error('API Error:', error)
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
//             {response || 'AI response will appear here.'}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
// ``
// export default MessagePage


import React, { useState } from 'react'
import axios from 'axios'

const MessagePage = () => {
  const [message, setMessage] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!message.trim()) return

    setLoading(true)
    setResponse('')

    try {
      // Get user from localStorage
      const user = JSON.parse(localStorage.getItem('user'))
      if (!user || !user.email) {
        throw new Error('User not authenticated or missing email')
      }

      // 1. Check message limit with backend
      console.log('Checking message limit...')
      const limitCheck = await axios.post(
        'http://localhost:5000/api/send-message',
        {
          userId: user.email,
          message: message,
        }
      )

      // If limit reached
      if (limitCheck.data?.status === 'limit_reached') {
        console.log('Limit reached:', limitCheck.data.message)
        return setResponse(limitCheck.data.message)
      }

      // 2. Call OpenAI API
      console.log('Calling OpenAI API...')
      const openAiResponse = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: message }],
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY} || "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"`,
            'Content-Type': 'application/json',
          },
        }
      )

      // Update response
      setResponse(openAiResponse.data.choices[0].message.content)
    } catch (error) {
      console.error('Full error details:', error)

      // Network errors
      if (error.code === 'ERR_NETWORK') {
        return setResponse(
          'Network error: Please check your internet connection'
        )
      }

      // Backend limit reached
      if (error.response?.data?.status === 'limit_reached') {
        return setResponse(error.response.data.message)
      }

      // OpenAI API errors
      if (error.response?.data?.error) {
        return setResponse(`AI Error: ${error.response.data.error.message}`)
      }

      // Backend server errors
      if (error.response) {
        return setResponse(
          `Server Error: ${error.response.status} - ${error.response.statusText}`
        )
      }

      // All other errors
      setResponse(`Error: ${error.message || 'Please try again later'}`)
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
            {response || 'AI response will appear here.'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessagePage