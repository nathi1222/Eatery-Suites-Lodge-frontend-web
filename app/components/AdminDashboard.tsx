"use client";

import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-green-900 text-white p-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p>Welcome to the administrator panel</p>
      </div>
      <div className="p-6">
        <div className="flex gap-4 mb-6 flex-wrap">
          <button onClick={() => setActiveTab('overview')} className={`px-4 py-2 rounded ${activeTab === 'overview' ? 'bg-green-900 text-white' : 'bg-white'}`}>Overview</button>
          <button onClick={() => setActiveTab('rooms')} className={`px-4 py-2 rounded ${activeTab === 'rooms' ? 'bg-green-900 text-white' : 'bg-white'}`}>Rooms</button>
          <button onClick={() => setActiveTab('bookings')} className={`px-4 py-2 rounded ${activeTab === 'bookings' ? 'bg-green-900 text-white' : 'bg-white'}`}>Bookings</button>
          <button onClick={() => setActiveTab('staff')} className={`px-4 py-2 rounded ${activeTab === 'staff' ? 'bg-green-900 text-white' : 'bg-white'}`}>Staff</button>
        </div>
        
        <div className="bg-white rounded-xl p-6">
          {activeTab === 'overview' && <h2>Dashboard Overview - Coming Soon</h2>}
          {activeTab === 'rooms' && <h2>Room Management - Coming Soon</h2>}
          {activeTab === 'bookings' && <h2>Booking Management - Coming Soon</h2>}
          {activeTab === 'staff' && <h2>Staff Management - Coming Soon</h2>}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;