"use client";

import { useState, useEffect } from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const revenueData = [
    { month: 'Jan', revenue: 185000, expenses: 120000 },
    { month: 'Feb', revenue: 192000, expenses: 118000 },
    { month: 'Mar', revenue: 210000, expenses: 125000 },
    { month: 'Apr', revenue: 228000, expenses: 132000 },
    { month: 'May', revenue: 248500, expenses: 145000 },
    { month: 'Jun', revenue: 235000, expenses: 140000 },
  ];

  const occupancyData = [
    { name: 'Standard', occupancy: 78 },
    { name: 'Deluxe', occupancy: 82 },
    { name: 'Executive', occupancy: 75 },
    { name: 'Presidential', occupancy: 55 },
  ];

  const bookingSourceData = [
    { name: 'Direct', value: 45, color: '#16a34a' },
    { name: 'Airbnb', value: 25, color: '#ff385c' },
    { name: 'Booking.com', value: 20, color: '#003580' },
    { name: 'Expedia', value: 10, color: '#00a2e8' },
  ];

  const stats = {
    totalBookings: 128,
    occupancyRate: 72,
    totalRevenue: 248500,
    avgDailyRate: 845,
    pendingBookings: 12,
    checkInsToday: 8,
  };

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
        <p className="text-gray-500">Welcome back, Administrator</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">
        <div className="bg-white rounded-xl p-5 shadow-sm border-l-4 border-green-600">
          <p className="text-gray-500 text-sm">Total Bookings</p>
          <p className="text-2xl font-bold text-gray-800">{stats.totalBookings}</p>
          <p className="text-green-600 text-sm mt-2">↑ 18.6% vs last month</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border-l-4 border-blue-600">
          <p className="text-gray-500 text-sm">Occupancy Rate</p>
          <p className="text-2xl font-bold text-gray-800">{stats.occupancyRate}%</p>
          <p className="text-red-600 text-sm mt-2">↓ 12.4% vs last month</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border-l-4 border-amber-600">
          <p className="text-gray-500 text-sm">Total Revenue</p>
          <p className="text-2xl font-bold text-gray-800">R{stats.totalRevenue.toLocaleString()}</p>
          <p className="text-green-600 text-sm mt-2">↑ 24.7% vs last month</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border-l-4 border-purple-600">
          <p className="text-gray-500 text-sm">Avg Daily Rate</p>
          <p className="text-2xl font-bold text-gray-800">R{stats.avgDailyRate}</p>
          <p className="text-green-600 text-sm mt-2">↑ 8.2% vs last month</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border-l-4 border-pink-600">
          <p className="text-gray-500 text-sm">Check-ins Today</p>
          <p className="text-2xl font-bold text-gray-800">{stats.checkInsToday}</p>
          <p className="text-blue-600 text-sm mt-2">{stats.pendingBookings} pending</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4">Revenue Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value: number) => `R${value.toLocaleString()}`} />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#16a34a" strokeWidth={2} />
              <Line type="monotone" dataKey="expenses" stroke="#dc2626" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4">Occupancy by Room Type</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={occupancyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="occupancy" fill="#16a34a" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4">Booking Sources</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={bookingSourceData} cx="50%" cy="50%" labelLine={false} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} outerRadius={80} dataKey="value">
                {bookingSourceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2">
              <i className="fas fa-plus"></i> New Booking
            </button>
            <button className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2">
              <i className="fas fa-bed"></i> Add Room
            </button>
            <button className="bg-amber-600 text-white p-3 rounded-lg hover:bg-amber-700 transition flex items-center justify-center gap-2">
              <i className="fas fa-tag"></i> Create Offer
            </button>
            <button className="bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition flex items-center justify-center gap-2">
              <i className="fas fa-file-alt"></i> Generate Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}