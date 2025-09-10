import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MyEvents from '../MyEvents/EventList';
import CreateEvent from '../CreateEvent/Create';
import UpdateEvent from '../CreateEvent/Update';
import ErrorBoundary from './ErrorBoundary';
import EventDetails from '../CreateEvent/EventDetails';
import Registration from '../Registrations/Registration';
import RegistrationDetails from '../Registrations/RegistrationDetails';
import { useAuth } from '../../context/AuthContext';
import Banned from '../../pages/Banned';
import VerifyAccount from '../../pages/VerifyAccount';

const RequireOrganizerAuth = ({ children }) => {
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
  
  if (user.role !== 'organizer') {
    return <Navigate to="/unauthorized" replace />;
  }
  
  return children;
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
      <Route
        path="/event-details/:id"
        element={
          <RequireOrganizerAuth>
            <ErrorBoundary>
              <EventDetails />
            </ErrorBoundary>
          </RequireOrganizerAuth>
        }
      />
      <Route
        path="/registration"
        element={
          <RequireOrganizerAuth>
            <ErrorBoundary>
              <Registration />
            </ErrorBoundary>
          </RequireOrganizerAuth>
        }
      />
      <Route
        path="/registration/:eventId"
        element={
          <RequireOrganizerAuth>
            <ErrorBoundary>
              <RegistrationDetails />
            </ErrorBoundary>
          </RequireOrganizerAuth>
        }
      />
      <Route path="/banned" element={<Banned />} />
      <Route path="/verify-account" element={<VerifyAccount />} />
    </Routes>
  );
};

export default OrganizerRoutes;