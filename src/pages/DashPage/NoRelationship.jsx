import { MessageCircle } from "lucide-react"
import { Link } from "react-router-dom"

const NoRelationship = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full px-4 text-center">
      <h1 className="text-4xl font-bold text-[#C62553] mb-4">HeartBridge</h1>
      <p className="text-gray-500 mb-8 text-xl">
        What relationship would you like to discuss?
      </p>

      <div className="bg-pink-50 rounded-full p-4 mb-4">
        <MessageCircle className="h-8 w-8 text-pink-400" />
      </div>

      <h2 className="text-xl font-semibold mb-3">No relationships yet</h2>
      <p className="text-gray-500 max-w-md mb-8">
        Create your first relationship analysis to get personalized AI insights.
      </p>

      <Link
        to="/"
        className="bg-gradient-to-r from-pink-500 to-[#C62553] text-white font-medium py-2 px-6 rounded-full transition-colors"
      >
        Create Your First Relationship
      </Link>
    </div>
  );
};

export default NoRelationship;
