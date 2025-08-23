import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import organizerAxios from "../../utils/organizerAxios";

const EventStatus = () => {
  const [eventHistory, setEventHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
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
        return <span className="bg-green-600/20 text-green-400 text-xs px-3 py-1.5 rounded-full border border-green-600/30">Approved</span>;
      case "PENDING":
        return <span className="bg-yellow-600/20 text-yellow-400 text-xs px-3 py-1.5 rounded-full border border-yellow-600/30">Pending</span>;
      case "REJECTED":
        return <span className="bg-red-600/20 text-red-400 text-xs px-3 py-1.5 rounded-full border border-red-600/30">Rejected</span>;
      default:
        return <span className="bg-gray-600/20 text-gray-400 text-xs px-3 py-1.5 rounded-full border border-gray-600/30">Unknown</span>;
    }
  };

  const filteredEvents = filter === "all" 
    ? eventHistory 
    : eventHistory.filter(event => event.status === filter.toUpperCase());

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
      <div className="bg-red-900/30 border border-red-700 text-red-300 p-4 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h4 className="text-2xl font-semibold text-white mb-4 md:mb-0">Event Request History</h4>
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 text-sm rounded-lg transition-colors ${filter === "all" ? "bg-pink-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"}`}
          >
            All ({eventHistory.length})
          </button>
          <button
            onClick={() => setFilter("approved")}
            className={`px-4 py-2 text-sm rounded-lg transition-colors ${filter === "approved" ? "bg-green-600/30 text-green-300 border border-green-600/50" : "bg-gray-800 text-gray-300 hover:bg-gray-700"}`}
          >
            Approved ({eventHistory.filter(e => e.status === "APPROVED").length})
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`px-4 py-2 text-sm rounded-lg transition-colors ${filter === "pending" ? "bg-yellow-600/30 text-yellow-300 border border-yellow-600/50" : "bg-gray-800 text-gray-300 hover:bg-gray-700"}`}
          >
            Pending ({eventHistory.filter(e => e.status === "PENDING").length})
          </button>
          <button
            onClick={() => setFilter("rejected")}
            className={`px-4 py-2 text-sm rounded-lg transition-colors ${filter === "rejected" ? "bg-red-600/30 text-red-300 border border-red-600/50" : "bg-gray-800 text-gray-300 hover:bg-gray-700"}`}
          >
            Rejected ({eventHistory.filter(e => e.status === "REJECTED").length})
          </button>
        </div>
      </div>

      {filteredEvents.length === 0 ? (
        <div className="bg-gray-800/50 p-8 rounded-lg text-center">
          <div className="text-pink-500 text-5xl mb-4">📊</div>
          <h3 className="text-xl font-semibold text-white mb-2">
            {filter === "all" ? "No event requests found" : `No ${filter} events`}
          </h3>
          <p className="text-gray-400">
            {filter === "all" 
              ? "You haven't created any events yet." 
              : `You don't have any ${filter} events.`
            }
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-700">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Event Title</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Rejection Reason</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Created</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Updated</th>
              </tr>
            </thead>
            <tbody className="bg-gray-900 divide-y divide-gray-800">
              {filteredEvents.map((event) => (
                <tr key={event._id} className="hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                    {event.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {event.date ? new Date(event.date).toLocaleDateString() : "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {getStatusBadge(event.status)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300 max-w-xs">
                    {event.status === "REJECTED" ? (
                      event.rejectionReason || <span className="text-gray-500 italic">No reason provided</span>
                    ) : (
                      <span className="text-gray-500">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {new Date(event.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {new Date(event.updatedAt).toLocaleDateString()}
                  </td>
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