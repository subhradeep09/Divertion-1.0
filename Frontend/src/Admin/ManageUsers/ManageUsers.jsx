import React, { useState } from "react";
import UserTable from "./UserTable";
import UserDetailsModal from "./UserDetailsModal";

const ManageUsers = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleEdit = (user) => {
    setSelectedUser(user);
  };

  const handleDelete = (user) => {
    alert(`Delete user: ${user.name}`);
  };

  const handleToggleStatus = (user) => {
    alert(`Toggle status for user: ${user.name}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <h1 className="text-3xl font-bold text-pink-500 mb-6 text-center mt-20">
        Manage Users
      </h1>
      <UserTable
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleStatus={handleToggleStatus}
      />
      {selectedUser && (
        <UserDetailsModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
};

export default ManageUsers;