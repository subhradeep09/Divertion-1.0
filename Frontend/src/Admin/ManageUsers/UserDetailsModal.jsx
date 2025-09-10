import React from "react";

const UserDetailsModal = ({ user, onClose, onToggleBan }) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
      <div className="bg-gray-900 text-white rounded-2xl shadow-2xl w-96 p-6 border border-pink-500/30">
        <h2 className="text-2xl font-bold mb-4 text-pink-400">User Details</h2>
        <div className="space-y-3 text-sm">
          <p><strong>Name:</strong> {user.fullname || user.username || "N/A"}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> <span className="capitalize">{user.role}</span></p>
          <p><strong>Phone:</strong> {user.phoneNumber || "N/A"}</p>
          <p>
            <strong>Status:</strong> 
            <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
              user.isBanned 
                ? "bg-red-600/30 text-red-400" 
                : "bg-green-600/30 text-green-400"
            }`}>
              {user.isBanned ? "Banned" : "Active"}
            </span>
          </p>
          {user.role === "attendee" && (
            <p><strong>Cancelled Bookings:</strong> {user.totalCancelledBookings || 0}</p>
          )}
          {user.createdAt && (
            <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
          )}
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onToggleBan}
            className={`px-4 py-2 rounded-lg transition ${
              user.isBanned
                ? "bg-green-600 hover:bg-green-700"
                : "bg-red-600 hover:bg-red-700"
            } text-white`}
          >
            {user.isBanned ? "Unban User" : "Ban User"}
          </button>
          <button
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;