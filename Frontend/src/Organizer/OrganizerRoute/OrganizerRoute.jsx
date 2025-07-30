

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MyEvents from '../MyEvents/MyEvents';
import CreateEvent from '../CreateEvent/Create';

const RequireOrganizerAuth = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const isAuthenticated = user && user.role === 'organizer';
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const OrganizerRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RequireOrganizerAuth>
            <MyEvents />
          </RequireOrganizerAuth>
        }
      />
      <Route
        path="/create-event"
        element={
          <RequireOrganizerAuth>
            <CreateEvent />
          </RequireOrganizerAuth>
        }
      />
    </Routes>
  );
};

export default OrganizerRoutes;