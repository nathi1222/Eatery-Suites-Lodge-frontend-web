"use client";

import { useState } from 'react';

export default function SettingsPage() {
  const [hotelSettings, setHotelSettings] = useState({
    name: 'Eatery Suites & Lodge',
    email: 'reservations@eaterysuites.co.za',
    phone: '+27 79 400 1549',
    address: '123 Main Street, Sandton, Johannesburg',
    checkInTime: '14:00',
    checkOutTime: '11:00',
    currency: 'ZAR',
    taxRate: 15,
  });

  const [notificationSettings, setNotificationSettings] = useState({
    newBookingEmail: true,
    cancellationEmail: true,
    reviewNotification: true,
    dailyReport: true,
    smsAlerts: false,
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
        <p className="text-gray-500 mt-1">Manage your property settings and preferences</p>
      </div>

      {saved && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-xl flex items-center gap-2">
          <i className="fas fa-check-circle"></i> Settings saved successfully!
        </div>
      )}

      <div className="space-y-6">
        {/* General Settings */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
            <i className="fas fa-building text-green-600"></i> General Settings
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hotel Name</label>
              <input
                type="text"
                value={hotelSettings.name}
                onChange={(e) => setHotelSettings({...hotelSettings, name: e.target.value})}
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
              <input
                type="email"
                value={hotelSettings.email}
                onChange={(e) => setHotelSettings({...hotelSettings, email: e.target.value})}
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                value={hotelSettings.phone}
                onChange={(e) => setHotelSettings({...hotelSettings, phone: e.target.value})}
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
              <select
                value={hotelSettings.currency}
                onChange={(e) => setHotelSettings({...hotelSettings, currency: e.target.value})}
                className="w-full border rounded-lg px-4 py-2"
              >
                <option>ZAR</option>
                <option>USD</option>
                <option>EUR</option>
                <option>GBP</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <textarea
                value={hotelSettings.address}
                onChange={(e) => setHotelSettings({...hotelSettings, address: e.target.value})}
                className="w-full border rounded-lg px-4 py-2"
                rows={2}
              />
            </div>
          </div>
        </div>

        {/* Property Policies */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
            <i className="fas fa-file-alt text-green-600"></i> Property Policies
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Check-in Time</label>
              <input
                type="time"
                value={hotelSettings.checkInTime}
                onChange={(e) => setHotelSettings({...hotelSettings, checkInTime: e.target.value})}
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Check-out Time</label>
              <input
                type="time"
                value={hotelSettings.checkOutTime}
                onChange={(e) => setHotelSettings({...hotelSettings, checkOutTime: e.target.value})}
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tax Rate (%)</label>
              <input
                type="number"
                value={hotelSettings.taxRate}
                onChange={(e) => setHotelSettings({...hotelSettings, taxRate: parseInt(e.target.value)})}
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
            <i className="fas fa-bell text-green-600"></i> Notification Settings
          </h3>
          <div className="space-y-3">
            {Object.entries(notificationSettings).map(([key, value]) => (
              <label key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() => setNotificationSettings({...notificationSettings, [key]: !value})}
                  className="w-5 h-5"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="bg-green-900 hover:bg-green-800 text-white px-6 py-3 rounded-xl font-semibold transition flex items-center gap-2"
          >
            <i className="fas fa-save"></i> Save All Settings
          </button>
        </div>
      </div>
    </div>
  );
}