"use client";

import { useState } from 'react';

export default function ReportsPage() {
  const [reportType, setReportType] = useState('monthly');
  const [dateRange, setDateRange] = useState('last30');

  const handleExport = (format: string) => {
    alert(`Exporting ${reportType} report as ${format}`);
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Reports & Analytics</h2>
        <p className="text-gray-500 mt-1">Generate and export business reports</p>
      </div>

      {/* Report Controls */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
            >
              <option value="monthly">Monthly Report</option>
              <option value="quarterly">Quarterly Report</option>
              <option value="annual">Annual Report</option>
              <option value="occupancy">Occupancy Report</option>
              <option value="revenue">Revenue Report</option>
              <option value="guest">Guest Satisfaction Report</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
            >
              <option value="last7">Last 7 Days</option>
              <option value="last30">Last 30 Days</option>
              <option value="last90">Last 90 Days</option>
              <option value="last365">Last 12 Months</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">&nbsp;</label>
            <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
              Generate Report
            </button>
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <i className="fas fa-download text-green-600"></i> Export Options
          </h3>
          <div className="space-y-3">
            <button onClick={() => handleExport('PDF')} className="w-full bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 transition flex items-center justify-center gap-2">
              <i className="fas fa-file-pdf"></i> Export as PDF
            </button>
            <button onClick={() => handleExport('Excel')} className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2">
              <i className="fas fa-file-excel"></i> Export as Excel
            </button>
            <button onClick={() => handleExport('CSV')} className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2">
              <i className="fas fa-file-csv"></i> Export as CSV
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <i className="fas fa-chart-line text-green-600"></i> Available Reports
          </h3>
          <ul className="space-y-3">
            <li className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span>Monthly Financial Summary</span>
              <button className="text-blue-600 text-sm">View</button>
            </li>
            <li className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span>Occupancy Rate Analysis</span>
              <button className="text-blue-600 text-sm">View</button>
            </li>
            <li className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span>Guest Satisfaction Scores</span>
              <button className="text-blue-600 text-sm">View</button>
            </li>
            <li className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span>Revenue by Room Type</span>
              <button className="text-blue-600 text-sm">View</button>
            </li>
          </ul>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-gradient-to-r from-green-900 to-green-800 rounded-xl p-6 text-white">
        <h3 className="font-bold text-lg mb-4">Quick Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-2xl font-bold">128</p>
            <p className="text-sm opacity-90">Total Bookings</p>
          </div>
          <div>
            <p className="text-2xl font-bold">72%</p>
            <p className="text-sm opacity-90">Avg Occupancy</p>
          </div>
          <div>
            <p className="text-2xl font-bold">4.8★</p>
            <p className="text-sm opacity-90">Guest Rating</p>
          </div>
          <div>
            <p className="text-2xl font-bold">R845</p>
            <p className="text-sm opacity-90">Avg Daily Rate</p>
          </div>
        </div>
      </div>
    </div>
  );
}