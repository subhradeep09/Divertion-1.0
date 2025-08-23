import React, { useState } from 'react';
import { FiSearch, FiFilter, FiDownload, FiEye, FiEdit, FiTrash2, FiUserCheck, FiUserX } from 'react-icons/fi';

function Register() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", event: "Tech Conference", status: "Confirmed", date: "2023-10-15" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", event: "Music Fest", status: "Pending", date: "2023-10-16" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", event: "Art Exhibition", status: "Confirmed", date: "2023-10-17" },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", event: "Tech Conference", status: "Cancelled", date: "2023-10-18" },
    { id: 5, name: "David Brown", email: "david@example.com", event: "Music Fest", status: "Pending", date: "2023-10-19" }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.event.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const statusStyles = {
      Confirmed: "bg-gradient-to-r from-green-500 to-emerald-600",
      Pending: "bg-gradient-to-r from-amber-500 to-orange-600",
      Cancelled: "bg-gradient-to-r from-rose-600 to-red-700"
    };
    
    const statusIcons = {
      Confirmed: <FiUserCheck className="mr-1" />,
      Pending: <FiEye className="mr-1" />,
      Cancelled: <FiUserX className="mr-1" />
    };

    return (
      <span className={`${statusStyles[status]} text-white text-xs px-3 py-1.5 rounded-full flex items-center justify-center`}>
        {statusIcons[status]}
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 mt-20">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            User Registrations
          </h1>
          <p className="text-gray-400 mt-2">Manage and track all event registrations</p>
        </div>

        {/* Controls */}
        <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 mb-6 border border-pink-500/20">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-400" />
              <input
                type="text"
                placeholder="Search registrations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-700/60 text-white placeholder-gray-400 rounded-xl border-2 border-gray-700 focus:border-pink-500 focus:ring-4 focus:ring-pink-500/20 transition-all"
              />
            </div>
            
            <div className="flex gap-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 bg-gray-700/60 text-white rounded-xl border-2 border-gray-700 focus:border-pink-500 focus:ring-4 focus:ring-pink-500/20 transition-all"
              >
                <option value="all">All Status</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Pending">Pending</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              
              <button className="px-4 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-xl hover:from-pink-700 hover:to-purple-700 transition-all flex items-center">
                <FiDownload className="mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl overflow-hidden border border-pink-500/20 shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-pink-600/20 to-purple-600/20">
                  <th className="px-6 py-4 text-left text-pink-300 font-semibold">User</th>
                  <th className="px-6 py-4 text-left text-pink-300 font-semibold">Event</th>
                  <th className="px-6 py-4 text-left text-pink-300 font-semibold">Registration Date</th>
                  <th className="px-6 py-4 text-left text-pink-300 font-semibold">Status</th>
                  <th className="px-6 py-4 text-left text-pink-300 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-700/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-white group-hover:text-pink-300 transition-colors">
                          {user.name}
                        </div>
                        <div className="text-gray-400 text-sm">{user.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-white">{user.event}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-300">{user.date}</span>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(user.status)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-pink-300 hover:text-pink-200" title="View Details">
                          <FiEye />
                        </button>
                        <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-blue-400 hover:text-blue-300" title="Edit">
                          <FiEdit />
                        </button>
                        <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-rose-400 hover:text-rose-300" title="Delete">
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-pink-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiUserX className="text-2xl text-pink-400" />
              </div>
              <p className="text-gray-400">No registrations found</p>
              <p className="text-gray-500 text-sm mt-1">Try adjusting your search or filters</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <div className="text-gray-400 text-sm">
            Showing {filteredUsers.length} of {users.length} registrations
          </div>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors">
              Previous
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg">
              1
            </button>
            <button className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors">
              2
            </button>
            <button className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;