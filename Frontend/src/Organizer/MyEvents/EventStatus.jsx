import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import organizerAxios from "../../utils/organizerAxios";

const EventStatus = () => {
  const [eventHistory, setEventHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventStatus = async () => {
      try {
        setLoading(true);
        const response = await organizerAxios.get("/events/event-status");
        setEventHistory(response.data.message || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch event status");
        console.error("Failed to fetch event status", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEventStatus();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case "APPROVED":
        return <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">Approved</span>;
      case "PENDING":
        return <span className="bg-yellow-600 text-white text-xs px-2 py-1 rounded-full">Pending</span>;
      case "REJECTED":
        return <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">Rejected</span>;
      default:
        return <span className="bg-gray-600 text-white text-xs px-2 py-1 rounded-full">Unknown</span>;
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500 mb-4"></div>
        <p className="text-gray-400">Loading event status...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <h4 className="text-xl font-semibold text-white mb-6">Event Request History</h4>
      {eventHistory.length === 0 ? (
        <div className="bg-gray-800 text-gray-400 p-6 rounded-lg">
          No event requests found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Event Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Rejection Reason</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Created At</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Last Updated</th>
                {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Action</th> */}
              </tr>
            </thead>
            <tbody className="bg-gray-900 divide-y divide-gray-700">
              {eventHistory.map((event) => (
                <tr key={event._id} className="hover:bg-gray-800">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{event.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{new Date(event.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{getStatusBadge(event.status)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {event.status === "REJECTED" ? event.rejectionReason || "No reason provided" : "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{new Date(event.createdAt).toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{new Date(event.updatedAt).toLocaleString()}</td>
                  {/* <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                      onClick={() => navigate(`/update-event/${event._id}`)}
                    >
                      Update
                    </button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EventStatus;