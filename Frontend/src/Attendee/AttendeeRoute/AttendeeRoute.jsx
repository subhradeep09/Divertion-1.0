import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomeAttendee from '../Home/HomeAttendee';
import ViewEvents from '../Events/ViewEvents';
import UpcomingBookings from '../Bookings/UpcomingBookings';
import BookingHistory from '../Bookings/BookingHistory';
import { useAuth } from '../../context/AuthContext';
import Banned from '../../pages/Banned';
import VerifyAccount from '../../pages/VerifyAccount';

const RequireAttendeeAuth = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (user.isBanned) {
    return <Navigate to="/banned" replace />;
  }
  
  if (!user.isVerified) {
    return <Navigate to="/verify-account" replace />;
  }
  
  if (user.role !== 'attendee') {
    return <Navigate to="/unauthorized" replace />;
  }
  
  return children;
};

const AttendeeRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RequireAttendeeAuth>
            <HomeAttendee />
          </RequireAttendeeAuth>
        }
      />
      <Route
        path="/view-events"
        element={
          <RequireAttendeeAuth>
            <ViewEvents />
          </RequireAttendeeAuth>
        }
      />
      <Route
        path="/upcoming-bookings"
        element={
          <RequireAttendeeAuth>
            <UpcomingBookings />
          </RequireAttendeeAuth>
        }
      />
      <Route
        path="/booking-history"
        element={
          <RequireAttendeeAuth>
            <BookingHistory />
          </RequireAttendeeAuth>
        }
      />
      <Route path="/banned" element={<Banned />} />
      <Route path="/verify-account" element={<VerifyAccount />} />
    </Routes>
  );
};

export default AttendeeRoutes;