import React, { useState, useEffect } from "react";
import UserTable from "./UserTable";
import UserDetailsModal from "./UserDetailsModal";
import adminAxios from "../../utils/adminAxios";
import { showError, showSuccess } from "../../utils/toaster";

const ManageUsers = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState("attendees"); // "attendees", "organizers", or "banned"

  useEffect(() => {
    fetchUsers();
  }, [userType]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      let endpoint;
      if (userType === "attendees") {
        endpoint = "/events/all-Attendees";
      } else if (userType === "organizers") {
        endpoint = "/events/all-Organizers";
      } else if (userType === "banned") {
        endpoint = "/users/all-banned-users";
      }
      const response = await adminAxios.get(endpoint);
      // Validate response.data exists and filter for objects with _id
      let usersData = [];
      if (response && response.data && Array.isArray(response.data.message)) {
        usersData = response.data.message.filter(
          (item) => item && typeof item === "object" && item._id
        );
      }
      setUsers(usersData);
    } catch (error) {
      showError("Failed to fetch users");
      console.error("Error fetching users:", error);
      setUsers([]); // Set empty array on error to prevent crashes
    } finally {
      setLoading(false);
    }
  };

  const handleToggleBan = async (user) => {
    try {
      const response = await adminAxios.patch(`/users/toggle-Ban-Status/${user._id}`, {
        ban: !user.isBanned
      });
      
      if (response.data) {
        showSuccess(response.data.message || "User status updated successfully");

        // Refetch users to reflect updated status automatically
        fetchUsers();

        // Close modal if the selected user was updated
        if (selectedUser && selectedUser._id === user._id) {
          setSelectedUser(null);
        }
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to update user status";
      showError(errorMessage);
      console.error("Error toggling ban:", error);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <h1 className="text-3xl font-bold text-pink-500 mb-6 text-center mt-20">
        Manage Users
      </h1>
      
      {/* User Type Toggle */}
      <div className="flex justify-center mb-6">
        <div className="bg-gray-800 rounded-lg p-1 flex">
          <button
            onClick={() => setUserType("attendees")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              userType === "attendees" 
                ? "bg-pink-600 text-white" 
                : "text-gray-400 hover:text-white"
            }`}
          >
            Attendees
          </button>
          <button
            onClick={() => setUserType("organizers")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              userType === "organizers" 
                ? "bg-pink-600 text-white" 
                : "text-gray-400 hover:text-white"
            }`}
          >
            Organizers
          </button>
          <button
            onClick={() => setUserType("banned")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              userType === "banned" 
                ? "bg-pink-600 text-white" 
                : "text-gray-400 hover:text-white"
            }`}
          >
            Banned Users
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-pulse text-pink-500">Loading users...</div>
        </div>
      ) : (
        <UserTable
          users={users}
          userType={userType}
          onEdit={handleEdit}
          onToggleBan={handleToggleBan}
        />
      )}
      
      {selectedUser && (
        <UserDetailsModal
          user={selectedUser}
          onClose={handleCloseModal}
          onToggleBan={() => handleToggleBan(selectedUser)}
        />
      )}
    </div>
  );
};

export default ManageUsers;