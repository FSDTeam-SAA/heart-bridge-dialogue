import React from 'react';
import AccountSidebar from './AccountSidebar';
import { Outlet } from 'react-router-dom';

function Account() {
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto bg-white rounded-lg shadow overflow-hidden">
        <div className="md:flex">
          <div className="w-full md:w-1/4 p-4">
            <AccountSidebar />
          </div>
          <div className="w-full md:w-3/4 p-6">
            <Outlet /> {/* Content of the active sub-route will be rendered here */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;