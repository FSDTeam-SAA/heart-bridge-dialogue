import React, { useEffect } from 'react';
import Navbar from '../shared/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import { usePageTracking } from '../hooks/usePageTracking';

const Main = () => {
    usePageTracking()
    return (
      <div>
        <Navbar />
        <Outlet />
      </div>
    )
};

export default Main;