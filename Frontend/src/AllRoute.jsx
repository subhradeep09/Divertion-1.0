import { useEffect, useState } from 'react';
import AppRouter from './layouts/AppRouter';
import AttendeeRoutes from '../src/Attendee/AttendeeRoute/AttendeeRoute';
import OrganizerRoutes from './Organizer/OrganizerRoute/OrganizerRoute';
import AdminRoutes from './Admin/AdminRoutes/AdminRouter';
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivacyPolicy from './pages/legals/privacypolicy';
import CookiePolicy from './pages/legals/cookiePolicy';
import TermsOfService from './pages/legals/termsOfService';
import BrowseEvents from './pages/Events/BrowseEvents';
import Banned from './pages/Banned';
import VerifyAccount from './pages/VerifyAccount';
import { useAuth } from './context/AuthContext';

const AllRoute = () => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      {/* Always available routes */}
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/cookie-policy" element={<CookiePolicy />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
      <Route path="/events" element={<BrowseEvents />} />
      
      {/* Banned user route */}
      <Route path="/banned" element={<Banned />} />
      
      {/* Verification route */}
      <Route path="/verify-account" element={<VerifyAccount />} />

      {/* Role-based or unauthenticated routing */}
      {!isAuthenticated && <Route path="/*" element={<AppRouter />} />}
      
      {isAuthenticated && user.isBanned && (
        <Route path="/*" element={<Navigate to="/banned" replace />} />
      )}
      
      {isAuthenticated && !user.isVerified && (
        <Route path="/*" element={<Navigate to="/verify-account" replace />} />
      )}
      
      {isAuthenticated && user.role === 'attendee' && !user.isBanned && user.isVerified && (
        <Route path="/*" element={<AttendeeRoutes />} />
      )}
      
      {isAuthenticated && user.role === 'organizer' && !user.isBanned && user.isVerified && (
        <Route path="/*" element={<OrganizerRoutes />} />
      )}
      
      {isAuthenticated && user.role === 'admin' && !user.isBanned && user.isVerified && (
        <Route path="/*" element={<AdminRoutes />} />
      )}
      
      {/* Fallback for unexpected roles */}
      {isAuthenticated && !user.isBanned && user.isVerified && 
       user.role !== 'attendee' && user.role !== 'organizer' && user.role !== 'admin' && (
        <Route path="/*" element={<AppRouter />} />
      )}
    </Routes>
  );
};

export default AllRoute;