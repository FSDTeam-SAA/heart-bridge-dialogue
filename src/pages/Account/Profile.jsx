import { onAuthStateChanged } from "firebase/auth";
import { User } from "lucide-react"
import { useEffect, useState } from "react";
import { auth } from "../../config/firebaseConfig";

export default function Profile() {

  
  const [user, setUser] = useState(null);

  useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
      });
      return () => unsubscribe();
  }, []);

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
            <div className="border rounded-md p-3 text-gray-500 cursor-not-allowed">{user?.email}</div>
            <p className="text-sm text-gray-500 mt-1">Your email address cannot be changed</p>
          </div>

          <div className="md:w-1/2">
            <h3 className="font-medium mb-2">Member Since</h3>
            <div className="border rounded-md p-3 text-gray-500 cursor-not-allowed">N/A</div>
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-2">Current Plan</h3>
          <div className="inline-block bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm">
            Free Plan
          </div>
        </div>
      </div>
    </div>
  )
}