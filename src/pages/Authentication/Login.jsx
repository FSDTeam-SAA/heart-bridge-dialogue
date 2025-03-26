import { Link } from "react-router-dom";

export default function Login() {
    return (
      <div className="flex min-h-[calc(100vh-66px)] items-center justify-center">
        <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold text-center">Welcome back</h2>
          <p className="text-center mb-6 mt-3 text-gray-500 font-medium">
          Enter your email to log in to your account
          </p>
          
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email<span className="text-red-500">*</span></label>
              <input 
                type="email" 
                placeholder="name@example.com" 
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">Password<span className="text-red-500">*</span></label>

                <Link to={'/forgot-password'}>
                    <h1 className="block text-sm cursor-pointer hover:text-pink-500 font-semibold text-gray-500">Forgot password?<span className="text-red-500">*</span></h1>
                </Link>
              </div>
              <input 
                type="password" 
                placeholder="Create a password" 
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-pink-700 text-white py-2 rounded-md hover:bg-pink-700 transition">
              Sign in
            </button>
          </form>
          
          <p className="text-center text-sm text-gray-600 mt-4">
            Do not have an account? <Link to="/signup" className="text-pink-500 hover:underline">Sign Up</Link>
          </p>
        </div>
      </div>
    );
  }
  