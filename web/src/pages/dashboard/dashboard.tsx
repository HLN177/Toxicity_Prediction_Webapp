import React from 'react';
import { Link, Outlet } from "react-router-dom";

function DashboardPage() {
  return (
    <div className='dashboard-container'>
      DashboardPage
      <Outlet />
    </div>
  );
}

export default DashboardPage;