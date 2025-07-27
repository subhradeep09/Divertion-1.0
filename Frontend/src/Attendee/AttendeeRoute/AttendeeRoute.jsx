import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomeAttendee from '../Home/HomeAttendee';

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
    </Routes>
  );
};

export default AttendeeRoutes;