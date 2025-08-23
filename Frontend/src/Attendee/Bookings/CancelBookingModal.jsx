import React, { useState } from "react";
import attendeeAxios from "../../utils/attendeeAxios";

const CancelBookingModal = ({ bookingId, onClose }) => {
  const [loading, setLoading] = useState(false);

  const handleCancel = async () => {
    setLoading(true);
    try {
      await attendeeAxios.delete(`/events/cancel-booking/${bookingId}`);
      alert("Booking cancelled successfully.");
      window.location.reload();
    } catch (err) {
      console.error("Cancel error:", err);
      alert("Failed to cancel booking.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 p-6 rounded-xl shadow-xl w-full max-w-md border border-gray-800">
        <div className="text-center mb-2">
          <div className="text-red-500 text-4xl mb-3">❌</div>
          <h2 className="text-xl font-bold text-white mb-2">Cancel Booking</h2>
          <p className="text-gray-300">Are you sure you want to cancel this booking?</p>
          <p className="text-gray-400 text-sm mt-2">This action cannot be undone.</p>
        </div>
        
        <div className="flex justify-center mt-6 space-x-3">
          <button 
            onClick={onClose}
            className="px-5 py-2.5 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors font-medium"
          >
            Close
          </button>
          <button
            onClick={handleCancel}
            disabled={loading}
            className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium disabled:opacity-70 disabled:cursor-not-allowed flex items-center"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Cancelling...
              </>
            ) : (
              "Yes, Cancel"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelBookingModal;