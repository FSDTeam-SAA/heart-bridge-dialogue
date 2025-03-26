import { Link } from "react-router-dom";

export default function SignUp() {
    return (
      <div className="flex min-h-[calc(100vh-66px)] items-center justify-center">
        <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold text-center">Create an account</h2>
          <p className="text-gray-500 font-medium text-center mb-6 mt-3">
            Enter your email below to create your account
          </p>
          
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name<span className="text-red-500">*</span></label>
              <input 
                type="text" 
                placeholder="Enter your name" 
                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email<span className="text-red-500">*</span></label>
              <input 
                type="email" 
                placeholder="name@example.com" 
                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password<span className="text-red-500">*</span></label>
              <input 
                type="password" 
                placeholder="Create a password" 
                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-pink-700 text-white py-2 rounded-md hover:bg-pink-700 transition">
              Create account
            </button>
          </form>
          
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account? <Link to="/login" className="text-pink-500 hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    );
  }
  