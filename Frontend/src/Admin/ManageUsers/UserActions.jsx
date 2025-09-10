import React from "react";

const UserActions = ({ user, onEdit, onToggleBan }) => {
  return (
    <div className="flex space-x-2">
      <button
        className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-3 py-1 rounded-lg hover:scale-105 transition"
        onClick={onEdit}
      >
        View
      </button>
      <button
        className={`px-3 py-1 rounded-lg hover:scale-105 transition ${
          user.isBanned
            ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
            : "bg-gradient-to-r from-red-500 to-pink-600 text-white"
        }`}
        onClick={onToggleBan}
      >
        {user.isBanned ? "Unban" : "Ban"}
      </button>
    </div>
  );
};

export default UserActions;