import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomeAttendee from '../Home/HomeAttendee';
import ViewEvents from '../Events/ViewEvents';
import UpcomingBookings from '../Bookings/UpcomingBookings';
import BookingHistory from '../Bookings/BookingHistory';

const RequireAttendeeAuth = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const isAuthenticated = user && user.role === 'attendee';
  return isAuthenticated ? children : <Navigate to="/login" replace />;
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
    </Routes>
  );
};

export default AttendeeRoutes;