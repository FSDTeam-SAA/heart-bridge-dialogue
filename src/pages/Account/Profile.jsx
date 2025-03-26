const Profile = () => {
    return (
      <div className="space-y-6">
        <div className="border-b border-gray-200 pb-4">
          <h2 className="text-xl font-bold text-gray-900">Profile Information</h2>
          <p className="text-gray-500 mt-1">Manage your account details and preferences</p>
        </div>
  
        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500">Email Address</h3>
            <div className="mt-1 flex items-center">
              <a 
                href="mailto:rifatbdcailing123@gmail.com" 
                className="text-blue-600 hover:text-blue-800 hover:underline"
              >
                rifatbdcailing123@gmail.com
              </a>
              <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">Verified</span>
            </div>
            <p className="mt-1 text-xs text-gray-500">Your email address cannot be changed</p>
          </div>
  
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500">Current Plan</h3>
            <p className="mt-1 text-gray-900">Free Plan</p>
          </div>
  
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500">Member Since</h3>
            <p className="mt-1 text-gray-900">N/A</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default Profile;