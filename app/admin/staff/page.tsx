"use client";

import { useState } from 'react';

export default function StaffPage() {
  const [staff, setStaff] = useState([
    { id: 1, name: 'Sipho Dlamini', role: 'General Manager', email: 'sipho@eaterysuites.co.za', phone: '+27 79 400 1549', salary: 45000, hireDate: '2024-01-15', status: 'active', shift: 'Day' },
    { id: 2, name: 'Mary Johnson', role: 'Housekeeping Manager', email: 'mary@eaterysuites.co.za', phone: '+27 78 123 4567', salary: 25000, hireDate: '2024-02-10', status: 'active', shift: 'Day' },
    { id: 3, name: 'John Smith', role: 'Front Desk Supervisor', email: 'john@eaterysuites.co.za', phone: '+27 72 987 6543', salary: 22000, hireDate: '2024-03-05', status: 'active', shift: 'Rotating' },
    { id: 4, name: 'Thabo Nkosi', role: 'Chef', email: 'thabo@eaterysuites.co.za', phone: '+27 76 543 2109', salary: 28000, hireDate: '2024-01-20', status: 'active', shift: 'Evening' },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newStaff, setNewStaff] = useState({ name: '', role: '', email: '', phone: '', salary: 0, shift: 'Day' });

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700';
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Staff Management</h2>
          <p className="text-gray-500 mt-1">Manage your team members</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition flex items-center gap-2"
        >
          <i className="fas fa-user-plus"></i> Add Staff Member
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">Name</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">Role</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">Contact</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">Salary</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">Hire Date</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">Shift</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">Status</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {staff.map((member) => (
                <tr key={member.id} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium">{member.name}</td>
                  <td className="p-4">{member.role}</td>
                  <td className="p-4">
                    <div>{member.email}</div>
                    <div className="text-xs text-gray-500">{member.phone}</div>
                   </td>
                  <td className="p-4">R{member.salary.toLocaleString()}</td>
                  <td className="p-4">{member.hireDate}</td>
                  <td className="p-4">{member.shift} Shift</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(member.status)}`}>
                      {member.status}
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

      {/* Add Staff Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowAddModal(false)}>
          <div className="bg-white rounded-xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold mb-4">Add Staff Member</h3>
            <div className="space-y-4">
              <input type="text" placeholder="Full Name" className="w-full border rounded-lg px-4 py-2" onChange={(e) => setNewStaff({...newStaff, name: e.target.value})} />
              <input type="text" placeholder="Role" className="w-full border rounded-lg px-4 py-2" onChange={(e) => setNewStaff({...newStaff, role: e.target.value})} />
              <input type="email" placeholder="Email" className="w-full border rounded-lg px-4 py-2" onChange={(e) => setNewStaff({...newStaff, email: e.target.value})} />
              <input type="tel" placeholder="Phone" className="w-full border rounded-lg px-4 py-2" onChange={(e) => setNewStaff({...newStaff, phone: e.target.value})} />
              <input type="number" placeholder="Salary" className="w-full border rounded-lg px-4 py-2" onChange={(e) => setNewStaff({...newStaff, salary: parseInt(e.target.value)})} />
              <select className="w-full border rounded-lg px-4 py-2" onChange={(e) => setNewStaff({...newStaff, shift: e.target.value})}>
                <option>Day Shift</option>
                <option>Night Shift</option>
                <option>Rotating</option>
              </select>
              <div className="flex gap-3">
                <button onClick={() => setShowAddModal(false)} className="flex-1 bg-gray-300 py-2 rounded-lg">Cancel</button>
                <button className="flex-1 bg-green-600 text-white py-2 rounded-lg">Add Staff</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}