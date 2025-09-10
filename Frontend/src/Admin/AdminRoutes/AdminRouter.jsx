import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import ManageUsers from '../ManageUsers/ManageUsers';
import ManageEvents from '../ManageEvents/ManageEvents';
import Reports from '../Reports/Reports';
import ErrorBoundary from '../../Organizer/OrganizerRoute/ErrorBoundary';
import { useAuth } from '../../context/AuthContext';
import Banned from '../../pages/Banned';
import VerifyAccount from '../../pages/VerifyAccount';

// Component to restrict access to admin users
function RequireAdminAuth({ children }) {
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
  
  if (user.role !== 'admin') {
    return <Navigate to="/unauthorized" replace />;
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
      path="/manage-events/:eventId"
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
    <Route path="/banned" element={<Banned />} />
    <Route path="/verify-account" element={<VerifyAccount />} />
  </Routes>
);

export default AdminRoutes;