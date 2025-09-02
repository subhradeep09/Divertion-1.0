import React, { useEffect, useState } from "react";
import attendeeAxios from "../../utils/attendeeAxios";
import BookingCard from "./BookingCard";
import CancelBookingModal from "./CancelBookingModal";
import { FiDownload } from "react-icons/fi";
import { MdQrCode } from "react-icons/md";

const BookingHistory = () => {
  const [history, setHistory] = useState([]);
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [cancelledBookings, setCancelledBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [upcomingLoading, setUpcomingLoading] = useState(true);
  const [cancelledLoading, setCancelledLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [qrImage, setQrImage] = useState("");
  const [activeSection, setActiveSection] = useState("history"); // 'history', 'upcoming', or 'cancelled'

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setUpcomingLoading(true);
        setCancelledLoading(true);
        
        // Fetch booking history, upcoming bookings, and cancelled bookings
        const [historyRes, upcomingRes, cancelledRes] = await Promise.all([
          attendeeAxios.get("/events/booking-History"),
          attendeeAxios.get("/events/upcoming-Booked-Events"),
          attendeeAxios.get("/events/view-cancelled-booking")
        ]);
        
        setHistory(historyRes.data?.message || []);
        setUpcomingBookings(upcomingRes.data?.message || []);
        setCancelledBookings(cancelledRes.data?.message || []);
      } catch (err) {
        console.error("Error fetching booking data:", err);
        setError("Failed to load booking data. Please try again.");
      } finally {
        setLoading(false);
        setUpcomingLoading(false);
        setCancelledLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const filteredHistory = history.filter(booking => {
    const matchesSearch = booking.event?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.event?.location?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const now = new Date();
    const eventDate = new Date(booking.event?.date);
    
    if (filter === "upcoming") {
      return eventDate >= now && matchesSearch;
    } else if (filter === "past") {
      return eventDate < now && matchesSearch;
    }
    
    return matchesSearch;
  });

  const handleCancelBooking = (booking) => {
    setSelectedBooking(booking);
    setShowCancelModal(true);
  };

  const handleShowQrCode = async (booking) => {
    try {
      if (booking.qrCodeUrl) {
        setQrImage(booking.qrCodeUrl);
        setSelectedBooking(booking);
        setShowQrModal(true);
        return;
      }

      const response = await attendeeAxios.get(`/events/booking-qr/${booking._id}`);
      setQrImage(response.data.qrCodeUrl);
      setSelectedBooking(booking);
      setShowQrModal(true);
    } catch (err) {
      console.error("Error fetching QR code:", err);
      alert("Failed to load QR code. Please try again.");
    }
  };

  const handleDownloadQrCode = () => {
    if (!qrImage) return;

    const link = document.createElement('a');
    link.href = qrImage;
    link.download = `qr-code-${selectedBooking.ticketId || selectedBooking._id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const refreshBookings = () => {
    const fetchData = async () => {
      try {
        const [historyRes, upcomingRes, cancelledRes] = await Promise.all([
          attendeeAxios.get("/events/booking-History"),
          attendeeAxios.get("/events/upcoming-Booked-Events"),
          attendeeAxios.get("/events/view-cancelled-booking")
        ]);
        
        setHistory(historyRes.data?.message || []);
        setUpcomingBookings(upcomingRes.data?.message || []);
        setCancelledBookings(cancelledRes.data?.message || []);
      } catch (err) {
        console.error("Error refreshing booking data:", err);
      }
    };
    fetchData();
  };

  if (loading && upcomingLoading && cancelledLoading) {
    return (
      <div className="min-h-screen bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gray-900 rounded-xl p-8 text-center border border-gray-800">
            <div className="text-pink-500 text-5xl mb-4">😢</div>
            <h2 className="text-2xl font-bold text-white mb-2">Something went wrong</h2>
            <p className="text-gray-300 mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header with Tabs */}
        <div className="text-center mb-10 mt-20">
          <h1 className="text-4xl font-bold text-white mb-3">Your Bookings</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Manage and view all your event bookings in one place
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-10">
          <div className="bg-gray-900 rounded-xl p-2 border border-gray-800 inline-flex flex-wrap justify-center">
            <button
              onClick={() => setActiveSection("upcoming")}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeSection === "upcoming" 
                  ? "bg-pink-600 text-white" 
                  : "bg-transparent text-gray-300 hover:text-white"
              }`}
            >
              Upcoming Events Tickets
              <span className="ml-2 bg-gray-800 text-gray-300 text-xs py-1 px-2 rounded-full">
                {upcomingBookings.length}
              </span>
            </button>
            <button
              onClick={() => setActiveSection("history")}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeSection === "history" 
                  ? "bg-pink-600 text-white" 
                  : "bg-transparent text-gray-300 hover:text-white"
              }`}
            >
              Booking History
              <span className="ml-2 bg-gray-800 text-gray-300 text-xs py-1 px-2 rounded-full">
                {history.length}
              </span>
            </button>
            <button
              onClick={() => setActiveSection("cancelled")}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeSection === "cancelled" 
                  ? "bg-pink-600 text-white" 
                  : "bg-transparent text-gray-300 hover:text-white"
              }`}
            >
              Cancelled Events
              <span className="ml-2 bg-gray-800 text-gray-300 text-xs py-1 px-2 rounded-full">
                {cancelledBookings.length}
              </span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="flex items-center">
              <div className="rounded-full bg-pink-500/10 p-3 mr-4">
                <span className="text-2xl text-pink-500">📅</span>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Bookings</p>
                <p className="text-2xl font-bold text-white">{history.length + upcomingBookings.length + cancelledBookings.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="flex items-center">
              <div className="rounded-full bg-pink-500/10 p-3 mr-4">
                <span className="text-2xl text-pink-500">🚀</span>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Upcoming Events</p>
                <p className="text-2xl font-bold text-white">{upcomingBookings.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="flex items-center">
              <div className="rounded-full bg-pink-500/10 p-3 mr-4">
                <span className="text-2xl text-pink-500">✅</span>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Past Events</p>
                <p className="text-2xl font-bold text-white">
                  {history.filter(b => new Date(b.event?.date) < new Date()).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="flex items-center">
              <div className="rounded-full bg-pink-500/10 p-3 mr-4">
                <span className="text-2xl text-pink-500">❌</span>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Cancelled Events</p>
                <p className="text-2xl font-bold text-white">{cancelledBookings.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* UPCOMING EVENTS SECTION */}
        {activeSection === "upcoming" && (
          <>
            {upcomingBookings.length === 0 ? (
              <div className="bg-gray-900 rounded-xl p-12 text-center border border-gray-800">
                <div className="text-pink-500 text-6xl mb-4">🎭</div>
                <h3 className="text-2xl font-semibold text-white mb-2">No upcoming bookings</h3>
                <p className="text-gray-400 max-w-md mx-auto">
                  You don't have any upcoming events. Explore events to book your next experience!
                </p>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <p className="text-gray-400">
                    You have {upcomingBookings.length} upcoming event ticket{upcomingBookings.length !== 1 ? 's' : ''}
                  </p>
                </div>
                
                <div className="grid gap-6">
                  {upcomingBookings.map((booking) => (
                    <BookingCard 
                      key={booking._id} 
                      booking={booking} 
                      onCancel={() => handleCancelBooking(booking)}
                      onShowQrCode={() => handleShowQrCode(booking)}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {/* BOOKING HISTORY SECTION */}
        {activeSection === "history" && (
          <>
            <div className="bg-gray-900 rounded-xl p-6 mb-8 border border-gray-800">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setFilter("all")}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      filter === "all" 
                        ? "bg-pink-600 text-white" 
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    All Bookings
                  </button>
                  <button
                    onClick={() => setFilter("upcoming")}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      filter === "upcoming" 
                        ? "bg-pink-600 text-white" 
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    Upcoming
                  </button>
                  <button
                    onClick={() => setFilter("past")}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      filter === "past" 
                        ? "bg-pink-600 text-white" 
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    Past Events
                  </button>
                </div>
                
                <div className="relative w-full md:w-64">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search events..."
                    className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {filteredHistory.length === 0 ? (
              <div className="bg-gray-900 rounded-xl p-12 text-center border border-gray-800">
                <div className="text-pink-500 text-6xl mb-4">🎫</div>
                <h3 className="text-2xl font-semibold text-white mb-2">
                  {searchTerm || filter !== "all" ? "No matching bookings" : "No bookings yet"}
                </h3>
                <p className="text-gray-400 max-w-md mx-auto mb-6">
                  {searchTerm || filter !== "all" 
                    ? "Try adjusting your search or filters" 
                    : "Start exploring events and make your first booking!"}
                </p>
                {(searchTerm || filter !== "all") && (
                  <button 
                    onClick={() => {
                      setSearchTerm("");
                      setFilter("all");
                    }}
                    className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors font-medium"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            ) : (
              <>
                <div className="mb-6 flex justify-between items-center">
                  <p className="text-gray-400">
                    Showing {filteredHistory.length} of {history.length} bookings
                  </p>
                  {(searchTerm || filter !== "all") && (
                    <button 
                      onClick={() => {
                        setSearchTerm("");
                        setFilter("all");
                      }}
                      className="text-pink-500 hover:text-pink-400 text-sm font-medium"
                    >
                      Clear all filters
                    </button>
                  )}
                </div>
                
                <div className="grid gap-6">
                  {filteredHistory.map((booking) => (
                    <BookingCard 
                      key={booking._id} 
                      booking={booking} 
                      isHistory 
                      onCancel={() => handleCancelBooking(booking)}
                      onShowQrCode={() => handleShowQrCode(booking)}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {/* CANCELLED EVENTS SECTION */}
        {activeSection === "cancelled" && (
          <>
            {cancelledBookings.length === 0 ? (
              <div className="bg-gray-900 rounded-xl p-12 text-center border border-gray-800">
                <div className="text-pink-500 text-6xl mb-4">✅</div>
                <h3 className="text-2xl font-semibold text-white mb-2">No cancelled bookings</h3>
                <p className="text-gray-400 max-w-md mx-auto">
                  You haven't cancelled any event bookings yet.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <p className="text-gray-400">
                    You have {cancelledBookings.length} cancelled booking{cancelledBookings.length !== 1 ? 's' : ''}
                  </p>
                </div>
                
                <div className="grid gap-6">
                  {cancelledBookings.map((cancelledBooking) => (
                    <div key={cancelledBooking._id} className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-2">
                            Cancelled Booking
                          </h3>
                          <p className="text-gray-400 text-sm">
                            Booking ID: {cancelledBooking.bookingId}
                          </p>
                        </div>
                        <span className="px-3 py-1 bg-red-500/20 text-red-300 text-xs rounded-full">
                          Cancelled
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-gray-400 text-sm">Cancelled On</p>
                          <p className="text-white">
                            {new Date(cancelledBooking.cancelledAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Refund Status</p>
                          <p className="text-white capitalize">
                            {cancelledBooking.refundStatus?.toLowerCase().replace('_', ' ') || 'Not applicable'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="bg-gray-800/50 p-4 rounded-lg">
                        <p className="text-gray-400 text-sm mb-2">Event Information</p>
                        <p className="text-white">
                          Event ID: {cancelledBooking.eventId}
                        </p>
                        <p className="text-gray-300 text-sm mt-1">
                          For detailed event information, please contact support.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {/* Modals */}
        {showCancelModal && selectedBooking && (
          <CancelBookingModal 
            bookingId={selectedBooking._id}
            onClose={() => {
              setShowCancelModal(false);
              setSelectedBooking(null);
            }}
            onSuccess={refreshBookings}
          />
        )}

        {showQrModal && selectedBooking && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 p-6 rounded-xl shadow-xl w-full max-w-md border border-gray-800">
              <div className="text-center mb-4">
                <h2 className="text-xl font-bold text-white mb-2">Your Event QR Code</h2>
                <p className="text-gray-300 text-sm">
                  Show this QR code at the event entrance for check-in
                </p>
              </div>
              
              <div className="flex justify-center mb-6">
                {qrImage ? (
                  <img 
                    src={qrImage} 
                    alt="Event QR Code" 
                    className="w-48 h-48 border-4 border-white rounded-lg"
                  />
                ) : (
                  <div className="w-48 h-48 border-4 border-white rounded-lg flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-pink-600"></div>
                  </div>
                )}
              </div>

              <div className="text-center mb-4">
                <p className="text-gray-300 font-mono text-sm">
                  Ticket ID: {selectedBooking.ticketId || selectedBooking._id}
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  Event: {selectedBooking.event?.title}
                </p>
              </div>

              <div className="flex justify-center space-x-3">
                <button 
                  onClick={handleDownloadQrCode}
                  disabled={!qrImage}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors font-medium flex items-center disabled:opacity-50"
                >
                  <FiDownload className="mr-2" />
                  Download
                </button>
                <button 
                  onClick={() => {
                    setShowQrModal(false);
                    setSelectedBooking(null);
                    setQrImage("");
                  }}
                  className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingHistory;