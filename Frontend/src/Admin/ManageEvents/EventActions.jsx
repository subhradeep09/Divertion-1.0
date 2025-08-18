

import React from 'react';

const EventActions = ({ onEdit, onDelete, onToggleStatus }) => {
  return (
    <div className="flex space-x-2">
      <button
        className="bg-blue-500 text-white px-2 py-1 rounded"
        onClick={onEdit}
      >
        Edit
      </button>
      <button
        className="bg-red-500 text-white px-2 py-1 rounded"
        onClick={onDelete}
      >
        Delete
      </button>
      <button
        className="bg-green-500 text-white px-2 py-1 rounded"
        onClick={onToggleStatus}
      >
        Toggle Status
      </button>
    </div>
  );
};

export default EventActions;