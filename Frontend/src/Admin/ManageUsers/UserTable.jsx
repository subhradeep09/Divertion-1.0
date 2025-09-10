import React from "react";
import UserActions from "./UserActions";

const UserTable = ({ users, userType, onEdit, onToggleBan }) => {
  console.log("UserTable received users:", users); // Debug log
  
  // Validate users is an array
  if (!Array.isArray(users)) {
    console.error("Users is not an array:", users);
    return (
      <div className="text-center py-12 text-red-400">
        Error: Invalid users data received
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        No {userType} found
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl shadow-lg border border-pink-500/30 bg-gray-800/50 backdrop-blur-md">
      <table className="min-w-full text-sm text-left text-gray-300">
        <thead className="bg-gradient-to-r from-pink-600 to-purple-600 text-white">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Role</th>
            <th className="px-4 py-3">Status</th>
            {userType === "attendees" && (
              <th className="px-4 py-3">Cancellations</th>
            )}
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            // Add validation for each user
            if (typeof user !== 'object' || user === null) {
              console.error("Invalid user object:", user);
              return null; // Skip rendering invalid users
            }
            
            // Ensure we have the required properties with fallbacks
            const safeUser = {
              _id: user._id || Math.random().toString(),
              fullname: user.fullname || user.username || "N/A",
              username: user.username || "N/A",
              email: user.email || "N/A",
              role: user.role || "N/A",
              phoneNumber: user.phoneNumber || "N/A",
              isBanned: Boolean(user.isBanned),
              totalCancelledBookings: user.totalCancelledBookings || 0,
              createdAt: user.createdAt || null
            };

            return (
              <tr
                key={safeUser._id}
                className="border-t border-gray-700 hover:bg-gray-700/50 transition"
              >
                <td className="px-4 py-3 font-semibold text-white">
                  {safeUser.fullname}
                </td>
                <td className="px-4 py-3">{safeUser.email}</td>
                <td className="px-4 py-3 capitalize">{safeUser.role}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      safeUser.isBanned
                        ? "bg-red-600/30 text-red-400"
                        : "bg-green-600/30 text-green-400"
                    }`}
                  >
                    {safeUser.isBanned ? "Banned" : "Active"}
                  </span>
                </td>
                {userType === "attendees" && (
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-yellow-600/30 text-yellow-400 rounded-full text-xs">
                      {safeUser.totalCancelledBookings}
                    </span>
                  </td>
                )}
                <td className="px-4 py-3">
                  <UserActions
                    user={safeUser}
                    onEdit={() => onEdit(user)} // Pass original user for editing
                    onToggleBan={() => onToggleBan(user)} // Pass original user for toggle
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;