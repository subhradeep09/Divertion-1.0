

import React, { useState } from 'react';
import UserTable from './UserTable';
import UserDetailsModal from './UserDetailsModal';

const ManageUsers = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleEdit = (user) => {
    alert(`Edit user: ${user.name}`);
  };

  const handleDelete = (user) => {
    alert(`Delete user: ${user.name}`);
  };

  const handleToggleStatus = (user) => {
    alert(`Toggle status for user: ${user.name}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Users</h1>
      <UserTable />
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