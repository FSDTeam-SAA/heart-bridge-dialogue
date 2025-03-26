import React from 'react';

function Subscription() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-700">Subscription Plan</h2>
        <span className="bg-pink-100 text-pink-700 text-sm font-semibold py-1 px-2 rounded-full">Free Plan</span>
      </div>
      <p className="text-gray-600 mb-4">Manage your subscription and usage</p>

      <div className="bg-gray-100 rounded-md p-4 mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Free Plan</h3>
        <p className="text-gray-600">Basic access to relationship insights</p>
        <div className="mt-2 flex items-center space-x-2">
          <span className="text-sm text-gray-500">Message usage (0/10)</span>
          <div className="bg-gray-300 rounded-full h-2 w-24">
            <div className="bg-pink-500 rounded-full h-2 w-0"></div> {/* Dynamic width based on usage */}
          </div>
          <span className="text-sm text-gray-500">0%</span>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Plan Benefits</h3>
        <ul className="space-y-1 text-gray-600">
          <li className="flex items-center">
            <svg className="w-4 h-4 mr-2 text-pink-500 fill-current" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
            10 messages per month
          </li>
          <li className="flex items-center">
            <svg className="w-4 h-4 mr-2 text-pink-500 fill-current" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
            Basic relationship analysis
          </li>
          <li className="flex items-center">
            <svg className="w-4 h-4 mr-2 text-pink-500 fill-current" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
            Text - based insights
          </li>
        </ul>
        <button className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-md mt-4 focus:outline-none focus:shadow-outline">
          Upgrade Your Plan →
        </button>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Message Usage</h3>
        <p className="text-gray-600 mb-4">Your usage history for the current billing cycle</p>
        <div className="bg-gray-100 rounded-md p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-700 font-semibold">Total Messages</span>
            <span className="text-gray-700 font-semibold">10</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">0 out of 10 messages used</span>
            <span className="text-gray-600">Messages remaining</span>
          </div>
          <div className="bg-gray-300 rounded-full h-3 mt-2">
            <div className="bg-pink-500 rounded-full h-3 w-0"></div> {/* Dynamic width based on usage */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Subscription;