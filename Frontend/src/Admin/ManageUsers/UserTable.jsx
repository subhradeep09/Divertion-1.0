import React from "react";
import UserActions from "./UserActions";

const UserTable = ({ onEdit, onDelete, onToggleStatus }) => {
  const users = [
    { id: 1, name: "Alice", email: "alice@example.com", role: "Organizer", status: "Active" },
    { id: 2, name: "Bob", email: "bob@example.com", role: "Attendee", status: "Suspended" },
    { id: 3, name: "Charlie", email: "charlie@example.com", role: "Admin", status: "Active" },
  ];

  return (
    <div className="overflow-x-auto rounded-2xl shadow-lg border border-pink-500/30 bg-gray-800/50 backdrop-blur-md">
      <table className="min-w-full text-sm text-left text-gray-300">
        <thead className="bg-gradient-to-r from-pink-600 to-purple-600 text-white">
          <tr>
            <th className="px-4 py-3">ID</th>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Role</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="border-t border-gray-700 hover:bg-gray-700/50 transition"
            >
              <td className="px-4 py-3">{user.id}</td>
              <td className="px-4 py-3 font-semibold text-white">{user.name}</td>
              <td className="px-4 py-3">{user.email}</td>
              <td className="px-4 py-3">{user.role}</td>
              <td className="px-4 py-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    user.status === "Active"
                      ? "bg-green-600/30 text-green-400"
                      : "bg-red-600/30 text-red-400"
                  }`}
                >
                  {user.status}
                </span>
              </td>
              <td className="px-4 py-3">
                <UserActions
                  onEdit={() => onEdit(user)}
                  onDelete={() => onDelete(user)}
                  onToggleStatus={() => onToggleStatus(user)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;