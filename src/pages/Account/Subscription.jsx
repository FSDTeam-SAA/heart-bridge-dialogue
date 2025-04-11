// import { CreditCard, CheckCircle, ArrowRight, AlertCircle } from 'lucide-react'
// import { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'

// export default function Subscription() {
//   const [messageData, setMessageData] = useState({
//     messagesSent: 0,
//     messageLimit: 0,
//     planStatus: 'inactive', 
//   })

//   const [user, setUser] = useState(null)
//   const [loading, setLoading] = useState(false)
//   const navigate = useNavigate()

//   useEffect(() => {
//     const userFromLocalStorage = JSON.parse(
//       localStorage.getItem('user') || '{}'
//     )
//     setUser(userFromLocalStorage)

//     const fetchMessageData = async () => {
//       try {
//         if (userFromLocalStorage?.email) {
//           const response = await fetch(
//             `${import.meta.env.VITE_BACKEND_URL}/check-plan?email=${
//               userFromLocalStorage.email
//             }`
//           )
//           const data = await response.json()

//           if (data.success) {
//             setMessageData({
//               messagesSent: data.messagesSent || 0,
//               messageLimit:
//                 data.messageLimit || (data.planStatus === 'finished' ? 0 : 10),
//               planStatus: data.planStatus || 'inactive',
//             })
//           } else if (data.planStatus === 'finished') {
//             setMessageData({
//               messagesSent: 0,
//               messageLimit: 0,
//               planStatus: 'finished',
//             })
//           }
//         }
//       } catch (error) {
//         console.error('Error fetching message data:', error)
//       }
//     }

//     fetchMessageData()
//   }, [])

//   const usagePercentage =
//     messageData.messageLimit > 0
//       ? Math.min(
//           (messageData.messagesSent / messageData.messageLimit) * 100,
//           100
//         ).toFixed(2)
//       : 0

//   const getPlanLabel = () => {
//     switch (messageData.planStatus) {
//       case 'activate':
//         return 'Pro Plan'
//       case 'finished':
//         return 'Plan Expired'
//       default:
//         return 'Free Plan'
//     }
//   }

//   const getPlanBenefits = () => {
//     switch (messageData.planStatus) {
//       case 'activate':
//         return [
//           '260 messages per month',
//           'Advanced insights',
//           'Priority support',
//         ]
//       case 'finished':
//         return [
//           'Plan has expired',
//           'Upgrade to continue using premium features',
//           'Your usage has been reset',
//         ]
//       default:
//         return [
//           '10 messages per month',
//           'Text-based insights',
//           'Basic relationship analysis',
//         ]
//     }
//   }

//   const handleCancelSubscription = async () => {
//     if (!user?.email) return
//     setLoading(true)
//     try {
//       const response = await fetch(
//         `${import.meta.env.VITE_BACKEND_URL}/finish-plan`,
//         {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ email: user.email }),
//         }
//       )

//       const data = await response.json()

//       if (data.success) {
//         setMessageData({
//           messagesSent: 0,
//           messageLimit: 0,
//           planStatus: 'finished',
//         })
//       } else {
//         console.error(data.error || 'Failed to cancel subscription')
//       }
//     } catch (error) {
//       console.error('Error cancelling subscription:', error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="bg-white rounded-lg p-6 border border-gray-100">
//       <div className="flex items-center gap-2 mb-2">
//         <CreditCard className="h-5 w-5 text-pink-600" />
//         <h2 className="text-xl font-semibold">Subscription Plan</h2>
//       </div>
//       <p className="text-gray-600 mb-6">Manage your subscription and usage</p>

//       <div className="space-y-8">
//         <div className="flex justify-between items-start">
//           <div>
//             <h3 className="font-semibold text-lg">{getPlanLabel()}</h3>
//             <p className="text-gray-600">
//               {messageData.planStatus === 'activate'
//                 ? 'Full access to premium insights and extended usage'
//                 : messageData.planStatus === 'finished'
//                 ? 'Your subscription plan has expired'
//                 : 'Basic access to relationship insights'}
//             </p>
//           </div>
//           <div
//             className={`px-3 py-1 rounded-full text-sm ${
//               messageData.planStatus === 'activate'
//                 ? 'bg-pink-100 text-pink-600'
//                 : messageData.planStatus === 'finished'
//                 ? 'bg-amber-100 text-amber-600'
//                 : 'bg-gray-100 text-gray-600'
//             }`}
//           >
//             {getPlanLabel()}
//           </div>
//         </div>

//         {messageData.planStatus === 'finished' ? (
//           <div className="bg-amber-50 border border-amber-200 rounded-md p-4 flex items-start gap-3">
//             <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
//             <div>
//               <h4 className="font-medium text-amber-800">Plan Expired</h4>
//               <p className="text-amber-700 text-sm">
//                 Your subscription plan has ended. Upgrade to continue using
//                 premium features.
//               </p>
//             </div>
//           </div>
//         ) : (
//           <div>
//             <div className="flex justify-between mb-1">
//               <span className="text-sm text-gray-600">
//                 Message usage ({messageData.messagesSent}/
//                 {messageData.messageLimit || '0'})
//               </span>
//               <span className="text-sm text-gray-600">{usagePercentage}%</span>
//             </div>
//             <div className="w-full bg-gray-200 rounded-full h-2">
//               <div
//                 className={`h-2 rounded-full ${
//                   messageData.planStatus === 'activate'
//                     ? 'bg-pink-600'
//                     : 'bg-gray-400'
//                 }`}
//                 style={{ width: `${usagePercentage}%` }}
//               ></div>
//             </div>
//           </div>
//         )}

//         <div>
//           <h3 className="font-semibold text-lg mb-4">Plan Benefits</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//             {getPlanBenefits().map((benefit, index) => (
//               <div key={index} className="flex items-center gap-2">
//                 <CheckCircle
//                   className={`h-5 w-5 ${
//                     messageData.planStatus === 'activate'
//                       ? 'text-pink-600'
//                       : messageData.planStatus === 'free_plan'
//                       ? 'text-gray-500'
//                       : messageData.planStatus === 'finished'
//                       ? 'text-amber-500'
//                       : 'text-gray-500'
//                   }`}
//                 />
//                 <span>{benefit}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {messageData.planStatus === 'activate' ? (
//           <button
//             onClick={handleCancelSubscription}
//             disabled={loading}
//             className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-4 rounded-md transition-colors flex items-center justify-center"
//           >
//             {loading ? 'Cancelling...' : 'Cancel Subscription'}
//           </button>
//         ) : messageData.planStatus === 'free_plan' ? (
//           <button
//             onClick={() => navigate('/upgrade')}
//             className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-4 rounded-md transition-colors flex items-center justify-center"
//           >
//             Upgrade to Unlock More Features
//             <ArrowRight className="ml-2 h-5 w-5" />
//           </button>
//         ) : (
//           <button
//             onClick={() => navigate('/upgrade')}
//             className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 px-4 rounded-md transition-colors flex items-center justify-center"
//           >
//             {messageData.planStatus === 'finished'
//               ? 'Renew Your Plan'
//               : 'Upgrade Your Plan'}
//             <ArrowRight className="ml-2 h-5 w-5" />
//           </button>
//         )}

//         <div className="pt-4 border-t">
//           <h3 className="font-semibold text-lg mb-2">Message Usage</h3>
//           <p className="text-gray-600 mb-4">
//             {messageData.planStatus === 'finished'
//               ? 'Your previous usage history'
//               : messageData.planStatus === 'free_plan'
//               ? 'You are on the free plan. Upgrade to unlock full access.'
//               : 'Your usage history for the current billing cycle'}
//           </p>

//           <div className="flex justify-between items-center mb-1">
//             <div>
//               <h4 className="font-medium">Total Messages</h4>
//               <p className="text-sm text-gray-600">
//                 {messageData.messagesSent} out of{' '}
//                 {messageData.messageLimit || '0'} messages used
//               </p>
//             </div>
//             <div className="text-right">
//               <span className="text-xl font-semibold">
//                 {Math.max(
//                   messageData.messageLimit - messageData.messagesSent,
//                   0
//                 )}
//               </span>
//               <p className="text-sm text-gray-600">Messages remaining</p>
//             </div>
//           </div>
//         </div>

//         <div className="pt-4 border-t">
//           <h3 className="font-semibold text-lg mb-2">Message Usage</h3>
//           <p className="text-gray-600 mb-4">
//             {messageData.planStatus === 'finished'
//               ? 'Your previous usage history'
//               : 'Your usage history for the current billing cycle'}
//           </p>

//           <div className="flex justify-between items-center mb-1">
//             <div>
//               <h4 className="font-medium">Total Messages</h4>
//               <p className="text-sm text-gray-600">
//                 {messageData.messagesSent} out of{' '}
//                 {messageData.messageLimit || '0'} messages used
//               </p>
//             </div>
//             <div className="text-right">
//               <span className="text-xl font-semibold">
//                 {Math.max(
//                   messageData.messageLimit - messageData.messagesSent,
//                   0
//                 )}
//               </span>
//               <p className="text-sm text-gray-600">Messages remaining</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }





import {
  CreditCard,
  CheckCircle,
  ArrowRight,
  AlertCircle,
  X,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Subscription() {
  const [messageData, setMessageData] = useState({
    messagesSent: 0,
    messageLimit: 0,
    planStatus: 'inactive',
  })

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showCancelModal, setShowCancelModal] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const userFromLocalStorage = JSON.parse(
      localStorage.getItem('user') || '{}'
    )
    setUser(userFromLocalStorage)

    const fetchMessageData = async () => {
      try {
        if (userFromLocalStorage?.email) {
          const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/check-plan?email=${
              userFromLocalStorage.email
            }`
          )
          const data = await response.json()

          if (data.success) {
            setMessageData({
              messagesSent: data.messagesSent || 0,
              messageLimit:
                data.messageLimit || (data.planStatus === 'finished' ? 0 : 10),
              planStatus: data.planStatus || 'inactive',
            })
          } else if (data.planStatus === 'finished') {
            setMessageData({
              messagesSent: 0,
              messageLimit: 0,
              planStatus: 'finished',
            })
          }
        }
      } catch (error) {
        console.error('Error fetching message data:', error)
      }
    }

    fetchMessageData()
  }, [])

  const usagePercentage =
    messageData.messageLimit > 0
      ? Math.min(
          (messageData.messagesSent / messageData.messageLimit) * 100,
          100
        ).toFixed(2)
      : 0

  const getPlanLabel = () => {
    switch (messageData.planStatus) {
      case 'activate':
        return 'Pro Plan'
      case 'finished':
        return 'Plan Expired'
      default:
        return 'Free Plan'
    }
  }

  const getPlanBenefits = () => {
    switch (messageData.planStatus) {
      case 'activate':
        return [
          '250 messages',
          'Advanced insights',
          'Priority support',
        ]
      case 'finished':
        return [
          'Plan has expired',
          'Upgrade to continue using premium features',
          'Your usage has been reset',
        ]
      default:
        return [
          '10 messages',
          'Basic relationship analysis',
        ]
    }
  }

  const handleCancelClick = () => {
    setShowCancelModal(true)
  }

  const handleCancelSubscription = async () => {
    if (!user?.email) return
    setLoading(true)
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/finish-plan`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: user.email }),
        }
      )

      const data = await response.json()

      if (data.success) {
        setMessageData({
          messagesSent: 0,
          messageLimit: 0,
          planStatus: 'finished',
        })
      } else {
        console.error(data.error || 'Failed to cancel subscription')
      }
    } catch (error) {
      console.error('Error cancelling subscription:', error)
    } finally {
      setLoading(false)
      setShowCancelModal(false)
    }
  }

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-100">
      {/* Cancel Subscription Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Cancel Subscription</h3>
              <button
                onClick={() => setShowCancelModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mb-6">
              <div className="flex items-start gap-3 mb-4">
                <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700">
                  Are you sure you want to cancel your subscription? You'll lose
                  access to premium features immediately.
                </p>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-md p-3">
                <p className="text-amber-800 text-sm">
                  Your remaining messages will be reset and you'll be downgraded
                  to the free plan.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md transition-colors"
              >
                Go Back
              </button>
              <button
                onClick={handleCancelSubscription}
                disabled={loading}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition-colors flex items-center justify-center"
              >
                {loading ? 'Processing...' : 'Confirm Cancellation'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center gap-2 mb-2">
        <CreditCard className="h-5 w-5 text-pink-600" />
        <h2 className="text-xl font-semibold">Subscription Plan</h2>
      </div>
      <p className="text-gray-600 mb-6">Manage your subscription and usage</p>

      <div className="space-y-8">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{getPlanLabel()}</h3>
            <p className="text-gray-600">
              {messageData.planStatus === 'activate'
                ? 'Full access to premium insights and extended usage'
                : messageData.planStatus === 'finished'
                ? 'Your subscription plan has expired'
                : 'Basic access to relationship insights'}
            </p>
          </div>
          <div
            className={`px-3 py-1 rounded-full text-sm ${
              messageData.planStatus === 'activate'
                ? 'bg-pink-100 text-pink-600'
                : messageData.planStatus === 'finished'
                ? 'bg-amber-100 text-amber-600'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {getPlanLabel()}
          </div>
        </div>

        {messageData.planStatus === 'finished' ? (
          <div className="bg-amber-50 border border-amber-200 rounded-md p-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-amber-800">Plan Expired</h4>
              <p className="text-amber-700 text-sm">
                Your subscription plan has ended. Upgrade to continue using
                premium features.
              </p>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-600">
                Message usage ({messageData.messagesSent}/
                {messageData.messageLimit || '0'})
              </span>
              <span className="text-sm text-gray-600">{usagePercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  messageData.planStatus === 'activate'
                    ? 'bg-pink-600'
                    : 'bg-gray-400'
                }`}
                style={{ width: `${usagePercentage}%` }}
              ></div>
            </div>
          </div>
        )}

        <div>
          <h3 className="font-semibold text-lg mb-4">Plan Benefits</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {getPlanBenefits().map((benefit, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle
                  className={`h-5 w-5 ${
                    messageData.planStatus === 'activate'
                      ? 'text-pink-600'
                      : messageData.planStatus === 'free_plan'
                      ? 'text-gray-500'
                      : messageData.planStatus === 'finished'
                      ? 'text-amber-500'
                      : 'text-gray-500'
                  }`}
                />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {messageData.planStatus === 'activate' ? (
          <button
            onClick={handleCancelClick}
            disabled={loading}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-4 rounded-md transition-colors flex items-center justify-center"
          >
            {loading ? 'Processing...' : 'Cancel Subscription'}
          </button>
        ) : messageData.planStatus === 'free_plan' ? (
          <button
            onClick={() => navigate('/upgrade')}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-4 rounded-md transition-colors flex items-center justify-center"
          >
            Upgrade to Unlock More Features
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        ) : (
          <button
            onClick={() => navigate('/upgrade')}
            className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 px-4 rounded-md transition-colors flex items-center justify-center"
          >
            {messageData.planStatus === 'finished'
              ? 'Renew Your Plan'
              : 'Upgrade Your Plan'}
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        )}

        <div className="pt-4 border-t">
          <h3 className="font-semibold text-lg mb-2">Message Usage</h3>
          <p className="text-gray-600 mb-4">
            {messageData.planStatus === 'finished'
              ? 'Your previous usage history'
              : messageData.planStatus === 'free_plan'
              ? 'You are on the free plan. Upgrade to unlock full access.'
              : 'Your usage history for the current billing cycle'}
          </p>

          <div className="flex justify-between items-center mb-1">
            <div>
              <h4 className="font-medium">Total Messages</h4>
              <p className="text-sm text-gray-600">
                {messageData.messagesSent} out of{' '}
                {messageData.messageLimit || '0'} messages used
              </p>
            </div>
            <div className="text-right">
              <span className="text-xl font-semibold">
                {Math.max(
                  messageData.messageLimit - messageData.messagesSent,
                  0
                )}
              </span>
              <p className="text-sm text-gray-600">Messages remaining</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}