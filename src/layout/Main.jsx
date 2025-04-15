import React from 'react';
import Navbar from '../shared/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Analytics from '../components/Analytics';

const Main = () => {
    return (
      <div>
        <Navbar />
        <Analytics />
        <Outlet />
      </div>
    )
};

export default Main;