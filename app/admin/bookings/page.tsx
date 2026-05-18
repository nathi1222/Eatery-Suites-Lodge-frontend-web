"use client";

import { useState } from 'react';

export default function BookingsPage() {
  const [bookings, setBookings] = useState([
    { id: 1, guest: 'Thando Maseko', email: 'thando@email.com', phone: '+27 71 234 5678', room: 'Deluxe Suite', checkIn: '2025-05-25', checkOut: '2025-05-28', guests: 2, total: 2850, status: 'confirmed' },
    { id: 2, guest: 'John Smith', email: 'john@email.com', phone: '+27 72 345 6789', room: 'Executive Suite', checkIn: '2025-05-26', checkOut: '2025-05-29', guests: 2, total: 3750, status: 'pending' },
    { id: 3, guest: 'Nomas Khumalo', email: 'nomas@email.com', phone: '+27 73 456 7890', room: 'Standard Suite', checkIn: '2025-05-27', checkOut: '2025-05-30', guests: 1, total: 1950, status: 'confirmed' },
    { id: 4, guest: 'David Brown', email: 'david@email.com', phone: '+27 74 567 8901', room: 'Presidential Suite', checkIn: '2025-06-01', checkOut: '2025-06-05', guests: 3, total: 10000, status: 'pending' },
  ]);

  const [filter, setFilter] = useState('all');

  const filteredBookings = filter === 'all' ? bookings : bookings.filter(b => b.status === filter);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      confirmed: 'bg-green-100 text-green-700',
      pending: 'bg-yellow-100 text-yellow-700',
      cancelled: 'bg-red-100 text-red-700',
      completed: 'bg-blue-100 text-blue-700',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Bookings Management</h2>
        <p className="text-gray-500 mt-1">View and manage all reservations</p>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-6 flex-wrap">
        {['all', 'confirmed', 'pending', 'cancelled', 'completed'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg capitalize transition ${filter === status ? 'bg-green-900 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">Guest</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">Room</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">Check In</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">Check Out</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">Guests</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">Total</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">Status</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <div className="font-medium">{booking.guest}</div>
                    <div className="text-xs text-gray-500">{booking.email}</div>
                    <div className="text-xs text-gray-500">{booking.phone}</div>
                  </td>
                  <td className="p-4">{booking.room}</td>
                  <td className="p-4">{booking.checkIn}</td>
                  <td className="p-4">{booking.checkOut}</td>
                  <td className="p-4">{booking.guests}</td>
                  <td className="p-4 font-semibold">R{booking.total.toLocaleString()}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-white rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-green-600">{bookings.length}</p>
          <p className="text-sm text-gray-500">Total Bookings</p>
        </div>
        <div className="bg-white rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-yellow-600">{bookings.filter(b => b.status === 'pending').length}</p>
          <p className="text-sm text-gray-500">Pending</p>
        </div>
        <div className="bg-white rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-green-600">{bookings.filter(b => b.status === 'confirmed').length}</p>
          <p className="text-sm text-gray-500">Confirmed</p>
        </div>
        <div className="bg-white rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-blue-600">
            R{bookings.reduce((sum, b) => sum + b.total, 0).toLocaleString()}
          </p>
          <p className="text-sm text-gray-500">Total Revenue</p>
        </div>
      </div>
    </div>
  );
}