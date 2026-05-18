"use client";

import { useState } from 'react';

export default function MarketingPage() {
  const [campaigns, setCampaigns] = useState([
    { id: 1, name: 'Summer Special', type: 'Email', budget: 5000, spent: 3200, conversions: 45, status: 'active' },
    { id: 2, name: 'Early Bird Discount', type: 'Social Media', budget: 3000, spent: 2800, conversions: 78, status: 'active' },
    { id: 3, name: 'Loyalty Program', type: 'Email', budget: 2000, spent: 1500, conversions: 120, status: 'completed' },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);

  const marketingChannels = [
    { channel: 'Direct', bookings: 58, revenue: 145000, roi: 72.5 },
    { channel: 'Airbnb', bookings: 32, revenue: 80000, roi: 10.0 },
    { channel: 'Booking.com', bookings: 26, revenue: 65000, roi: 10.0 },
    { channel: 'Google Ads', bookings: 8, revenue: 20000, roi: 5.0 },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Marketing</h2>
          <p className="text-gray-500 mt-1">Manage campaigns and track performance</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition flex items-center gap-2"
        >
          <i className="fas fa-plus"></i> Create Campaign
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <p className="text-gray-500 text-sm">Website Visits</p>
          <p className="text-2xl font-bold">12,500</p>
          <p className="text-green-600 text-sm mt-2">↑ 18% vs last month</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <p className="text-gray-500 text-sm">Conversion Rate</p>
          <p className="text-2xl font-bold">4.2%</p>
          <p className="text-green-600 text-sm mt-2">↑ 0.8% vs last month</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <p className="text-gray-500 text-sm">Social Reach</p>
          <p className="text-2xl font-bold">45K</p>
          <p className="text-green-600 text-sm mt-2">↑ 12% vs last month</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <p className="text-gray-500 text-sm">ROI</p>
          <p className="text-2xl font-bold text-green-600">325%</p>
          <p className="text-green-600 text-sm mt-2">↑ 45% vs last month</p>
        </div>
      </div>

      {/* Campaigns Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
        <h3 className="font-bold text-gray-800 p-5 border-b">Active Campaigns</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-left">Campaign</th>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">Budget</th>
                <th className="p-3 text-left">Spent</th>
                <th className="p-3 text-left">Conversions</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((campaign) => (
                <tr key={campaign.id} className="border-b">
                  <td className="p-3 font-medium">{campaign.name}</td>
                  <td className="p-3">{campaign.type}</td>
                  <td className="p-3">R{campaign.budget.toLocaleString()}</td>
                  <td className="p-3">R{campaign.spent.toLocaleString()}</td>
                  <td className="p-3">{campaign.conversions}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${campaign.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                      {campaign.status}
                    </span>
                   </td>
                  <td className="p-3">
                    <button className="text-blue-600 mr-2">Edit</button>
                    <button className="text-red-600">Delete</button>
                   </td>
                 </tr>
              ))}
            </tbody>
           </table>
        </div>
      </div>

      {/* Channel Performance */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="font-bold text-gray-800 mb-4">Channel Performance</h3>
        <div className="space-y-3">
          {marketingChannels.map((ch, idx) => (
            <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">{ch.channel}</p>
                <p className="text-sm text-gray-500">{ch.bookings} bookings</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-green-600">R{ch.revenue.toLocaleString()}</p>
                <p className="text-sm text-gray-500">ROI: {ch.roi}x</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SEO Section */}
      <div className="mt-6 bg-gradient-to-r from-blue-900 to-blue-800 rounded-xl p-6 text-white">
        <h3 className="font-bold text-lg mb-4">SEO Performance</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm opacity-90">Top Keywords</p>
            <p className="font-semibold">Johannesburg luxury suites, Airbnb Sandton, Executive Lodge</p>
          </div>
          <div>
            <p className="text-sm opacity-90">Bounce Rate</p>
            <p className="font-semibold">35%</p>
          </div>
          <div>
            <p className="text-sm opacity-90">Avg Session Duration</p>
            <p className="font-semibold">3m 24s</p>
          </div>
          <div>
            <p className="text-sm opacity-90">Pages per Session</p>
            <p className="font-semibold">2.8</p>
          </div>
        </div>
        <button className="mt-4 bg-white text-blue-900 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100 transition">
          Run SEO Audit
        </button>
      </div>

      {/* Add Campaign Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowAddModal(false)}>
          <div className="bg-white rounded-xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold mb-4">Create Campaign</h3>
            <div className="space-y-4">
              <input type="text" placeholder="Campaign Name" className="w-full border rounded-lg px-4 py-2" />
              <select className="w-full border rounded-lg px-4 py-2">
                <option>Email</option>
                <option>Social Media</option>
                <option>Google Ads</option>
              </select>
              <input type="number" placeholder="Budget" className="w-full border rounded-lg px-4 py-2" />
              <div className="flex gap-3">
                <button onClick={() => setShowAddModal(false)} className="flex-1 bg-gray-300 py-2 rounded-lg">Cancel</button>
                <button className="flex-1 bg-green-600 text-white py-2 rounded-lg">Create Campaign</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}