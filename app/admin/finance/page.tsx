"use client";

import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function FinancePage() {
  const revenueData = [
    { month: 'Jan', revenue: 185000, expenses: 120000 },
    { month: 'Feb', revenue: 192000, expenses: 118000 },
    { month: 'Mar', revenue: 210000, expenses: 125000 },
    { month: 'Apr', revenue: 228000, expenses: 132000 },
    { month: 'May', revenue: 248500, expenses: 145000 },
    { month: 'Jun', revenue: 235000, expenses: 140000 },
  ];

  const revenueByCategory = [
    { name: 'Room Bookings', value: 248500, color: '#16a34a' },
    { name: 'Food & Beverage', value: 85400, color: '#f59e0b' },
    { name: 'Other Services', value: 12500, color: '#3b82f6' },
  ];

  const transactions = [
    { id: 1, date: '2025-05-24', guest: 'Thando Maseko', description: 'Suite Booking', amount: 2850, status: 'completed' },
    { id: 2, date: '2025-05-23', guest: 'John Smith', description: 'Suite Booking', amount: 3750, status: 'completed' },
    { id: 3, date: '2025-05-22', guest: 'Sarah Johnson', description: 'Food Order', amount: 450, status: 'completed' },
    { id: 4, date: '2025-05-21', guest: 'Michael Chen', description: 'Suite Booking', amount: 1950, status: 'pending' },
  ];

  const totalRevenue = revenueData.reduce((sum, r) => sum + r.revenue, 0);
  const totalExpenses = revenueData.reduce((sum, r) => sum + r.expenses, 0);
  const netProfit = totalRevenue - totalExpenses;

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Payments & Finance</h2>
        <p className="text-gray-500 mt-1">Track revenue, expenses, and financial performance</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
        <div className="bg-white rounded-xl p-5 shadow-sm border-l-4 border-green-600">
          <p className="text-gray-500 text-sm">Total Revenue</p>
          <p className="text-2xl font-bold text-green-600">R{totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border-l-4 border-red-600">
          <p className="text-gray-500 text-sm">Total Expenses</p>
          <p className="text-2xl font-bold text-red-600">R{totalExpenses.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border-l-4 border-blue-600">
          <p className="text-gray-500 text-sm">Net Profit</p>
          <p className="text-2xl font-bold text-blue-600">R{netProfit.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border-l-4 border-amber-600">
          <p className="text-gray-500 text-sm">Profit Margin</p>
          <p className="text-2xl font-bold text-amber-600">{((netProfit / totalRevenue) * 100).toFixed(1)}%</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4">Revenue vs Expenses</h3>
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
          <h3 className="font-bold text-gray-800 mb-4">Revenue by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={revenueByCategory} cx="50%" cy="50%" labelLine={false} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} outerRadius={80} dataKey="value">
                {revenueByCategory.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `R${value.toLocaleString()}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <h3 className="font-bold text-gray-800 p-5 border-b">Recent Transactions</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Guest</th>
                <th className="p-3 text-left">Description</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id} className="border-b">
                  <td className="p-3">{t.date}</td>
                  <td className="p-3">{t.guest}</td>
                  <td className="p-3">{t.description}</td>
                  <td className="p-3 font-semibold">R{t.amount.toLocaleString()}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${t.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {t.status}
                    </span>
                   </td>
                 </tr>
              ))}
            </tbody>
           </table>
        </div>
      </div>
    </div>
  );
}