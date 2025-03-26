import React from 'react';
import { NavLink } from 'react-router-dom';

function AccountSidebar() {
  return (
    <div className="flex flex-col space-y-2">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Account Settings</h2>
      <NavLink
        to="/account"
        className={({ isActive }) =>
          `px-4 py-2 rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-800 ${
            isActive ? 'bg-pink-100 text-pink-700 font-semibold' : ''
          }`
        }
      >
        Profile
      </NavLink>
      <NavLink
        to="/account/subscription"
        className={({ isActive }) =>
          `px-4 py-2 rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-800 ${
            isActive ? 'bg-pink-100 text-pink-700 font-semibold' : ''
          }`
        }
      >
        Subscription
      </NavLink>
      <button className="mt-4 bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-1">
        Sign Out
      </button>
    </div>
  );
}

export default AccountSidebar;