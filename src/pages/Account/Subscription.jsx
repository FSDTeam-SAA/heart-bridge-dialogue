import { CreditCard, CheckCircle, ArrowRight } from "lucide-react"

export default function Subscription() {
  // This could come from an API call in a real app
  const subscriptionData = {
    plan: "Free Plan",
    description: "Basic access to relationship insights",
    messageUsage: 0,
    messageLimit: 10,
    benefits: ["10 messages per month", "Text-based insights", "Basic relationship analysis"],
  }

  const usagePercentage = (subscriptionData.messageUsage / subscriptionData.messageLimit) * 100

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-100">
      <div className="flex items-center gap-2 mb-2">
        <CreditCard className="h-5 w-5 text-pink-600" />
        <h2 className="text-xl font-semibold">Subscription Plan</h2>
      </div>
      <p className="text-gray-600 mb-6">Manage your subscription and usage</p>

      <div className="space-y-8">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{subscriptionData.plan}</h3>
            <p className="text-gray-600">{subscriptionData.description}</p>
          </div>
          <div className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm">Free Plan</div>
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm text-gray-600">
              Message usage ({subscriptionData.messageUsage}/{subscriptionData.messageLimit})
            </span>
            <span className="text-sm text-gray-600">{usagePercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-pink-600 h-2 rounded-full" style={{ width: `${usagePercentage}%` }}></div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4">Plan Benefits</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {subscriptionData.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-pink-600" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        <button className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 px-4 rounded-md transition-colors flex items-center justify-center">
          Upgrade Your Plan
          <ArrowRight className="ml-2 h-5 w-5" />
        </button>

        <div className="pt-4 border-t">
          <h3 className="font-semibold text-lg mb-2">Message Usage</h3>
          <p className="text-gray-600 mb-4">Your usage history for the current billing cycle</p>

          <div className="flex justify-between items-center mb-1">
            <div>
              <h4 className="font-medium">Total Messages</h4>
              <p className="text-sm text-gray-600">
                {subscriptionData.messageUsage} out of {subscriptionData.messageLimit} messages used
              </p>
            </div>
            <div className="text-right">
              <span className="text-xl font-semibold">{subscriptionData.messageLimit}</span>
              <p className="text-sm text-gray-600">Messages remaining</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

