import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import ManageUsers from '../ManageUsers/ManageUsers';
import ManageEvents from '../ManageEvents/ManageEvents';
import Reports from '../Reports/Reports';
import ErrorBoundary from '../../Organizer/OrganizerRoute/ErrorBoundary';
import EventDetailsModal from '../ManageEvents/EventDetailsModal';

// Component to restrict access to admin users
function RequireAdminAuth({ children }) {
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('user'));
  } catch (e) {
    user = null;
  }
  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function RequireEventAuth({ children }) {
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('user'));
  } catch (e) {
    user = null;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

const AdminRoutes = () => (
  <Routes>
    <Route
      path="/"
      element={
        <RequireAdminAuth>
          <ErrorBoundary>
            <Dashboard />
          </ErrorBoundary>
        </RequireAdminAuth>
      }
    />
    <Route
      path="/manage-users"
      element={
        <RequireAdminAuth>
          <ErrorBoundary>
            <ManageUsers />
          </ErrorBoundary>
        </RequireAdminAuth>
      }
    />
    <Route
      path="/manage-events"
      element={
        <RequireAdminAuth>
          <ErrorBoundary>
            <ManageEvents />
          </ErrorBoundary>
        </RequireAdminAuth>
      }
    />
    <Route
      path="/reports"
      element={
        <RequireAdminAuth>
          <ErrorBoundary>
            <Reports />
          </ErrorBoundary>
        </RequireAdminAuth>
      }
    />
    <Route
      path="/events/:eventId"
      element={
        <RequireEventAuth>
          <ErrorBoundary>
            <EventDetailsModal />
          </ErrorBoundary>
        </RequireEventAuth>
      }
    />
  </Routes>
);

export default AdminRoutes;