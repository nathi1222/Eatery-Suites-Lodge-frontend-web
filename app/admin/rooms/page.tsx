"use client";

import { useState } from 'react';

export default function RoomsPage() {
  const [rooms, setRooms] = useState([
    { id: 1, name: 'Standard Suite', price: 650, capacity: 2, size: '35m²', status: 'available', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=400&auto=format' },
    { id: 2, name: 'Deluxe Suite', price: 950, capacity: 2, size: '45m²', status: 'occupied', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=400&auto=format' },
    { id: 3, name: 'Executive Suite', price: 1250, capacity: 3, size: '65m²', status: 'cleaning', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=400&auto=format' },
    { id: 4, name: 'Family Suite', price: 1500, capacity: 4, size: '75m²', status: 'available', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=400&auto=format' },
    { id: 5, name: 'Presidential Suite', price: 2500, capacity: 4, size: '120m²', status: 'maintenance', image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=400&auto=format' },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newRoom, setNewRoom] = useState({ name: '', price: 0, capacity: 2, size: '' });

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      available: 'bg-green-100 text-green-700',
      occupied: 'bg-blue-100 text-blue-700',
      cleaning: 'bg-yellow-100 text-yellow-700',
      maintenance: 'bg-red-100 text-red-700',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Rooms & Suites Management</h2>
          <p className="text-gray-500 mt-1">Manage your property inventory</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition flex items-center gap-2"
        >
          <i className="fas fa-plus"></i> Add New Room
        </button>
      </div>

      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <div key={room.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition">
            <img src={room.image} alt={room.name} className="h-48 w-full object-cover" />
            <div className="p-5">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{room.name}</h3>
                  <p className="text-gray-500 text-sm">{room.size} • {room.capacity} guests</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(room.status)}`}>
                  {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
                </span>
              </div>
              <p className="text-2xl font-bold text-green-600">R{room.price}<span className="text-sm text-gray-500">/night</span></p>
              <div className="flex gap-2 mt-4">
                <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm hover:bg-blue-700 transition">Edit</button>
                <button className="flex-1 bg-gray-600 text-white py-2 rounded-lg text-sm hover:bg-gray-700 transition">View Bookings</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Room Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowAddModal(false)}>
          <div className="bg-white rounded-xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold mb-4">Add New Room</h3>
            <div className="space-y-4">
              <input type="text" placeholder="Room Name" className="w-full border rounded-lg px-4 py-2" onChange={(e) => setNewRoom({...newRoom, name: e.target.value})} />
              <input type="number" placeholder="Price per night" className="w-full border rounded-lg px-4 py-2" onChange={(e) => setNewRoom({...newRoom, price: parseInt(e.target.value)})} />
              <input type="number" placeholder="Capacity" className="w-full border rounded-lg px-4 py-2" onChange={(e) => setNewRoom({...newRoom, capacity: parseInt(e.target.value)})} />
              <input type="text" placeholder="Size (e.g., 45m²)" className="w-full border rounded-lg px-4 py-2" onChange={(e) => setNewRoom({...newRoom, size: e.target.value})} />
              <div className="flex gap-3">
                <button onClick={() => setShowAddModal(false)} className="flex-1 bg-gray-300 py-2 rounded-lg">Cancel</button>
                <button className="flex-1 bg-green-600 text-white py-2 rounded-lg">Add Room</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}