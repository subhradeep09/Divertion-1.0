import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MyEvents from '../MyEvents/EventList';
import CreateEvent from '../CreateEvent/Create';
import UpdateEvent from '../CreateEvent/Update';
import ErrorBoundary from './ErrorBoundary';

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
            <ErrorBoundary>
              <MyEvents />
            </ErrorBoundary>
          </RequireOrganizerAuth>
        }
      />
      <Route
        path="/create-event"
        element={
          <RequireOrganizerAuth>
            <ErrorBoundary>
              <CreateEvent />
            </ErrorBoundary>
          </RequireOrganizerAuth>
        }
      />
      <Route
        path="/update-event/:eventId"
        element={
          <RequireOrganizerAuth>
            <ErrorBoundary>
              <UpdateEvent />
            </ErrorBoundary>
          </RequireOrganizerAuth>
        }
      />
    </Routes>
  );
};

export default OrganizerRoutes;