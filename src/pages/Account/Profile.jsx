import { User } from "lucide-react"

export default function Profile() {
  // This could come from a user context or API call in a real app
  const userProfile = {
    email: "rifatbdcallingit23@gmail.com",
    memberSince: "N/A",
    plan: "Free Plan",
  }

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-100">
      <div className="flex items-center gap-2 mb-2">
        <User className="h-5 w-5 text-pink-600" />
        <h2 className="text-xl font-semibold">Profile Information</h2>
      </div>
      <p className="text-gray-600 mb-6">Manage your account details and preferences</p>

      <div className="space-y-6">
        
        <div className="flex md:flex-row flex-col  w-full gap-6">
          <div className="md:w-1/2">
            <h3 className="font-medium mb-2">Email Address</h3>
            <div className="border rounded-md p-3 text-gray-500 cursor-not-allowed">{userProfile.email}</div>
            <p className="text-sm text-gray-500 mt-1">Your email address cannot be changed</p>
          </div>

          <div className="md:w-1/2">
            <h3 className="font-medium mb-2">Member Since</h3>
            <div className="border rounded-md p-3 text-gray-500 cursor-not-allowed">{userProfile.memberSince}</div>
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-2">Current Plan</h3>
          <div className="inline-block bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm">
            {userProfile.plan}
          </div>
        </div>
      </div>
    </div>
  )
}

