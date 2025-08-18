import { useEffect, useState } from 'react';
import AppRouter from './layouts/AppRouter';
import AttendeeRoutes from '../src/Attendee/AttendeeRoute/AttendeeRoute';
import OrganizerRoutes from './Organizer/OrganizerRoute/OrganizerRoute';
import AdminRoutes from './Admin/AdminRoutes/AdminRouter';
import { Routes, Route } from 'react-router-dom';
import PrivacyPolicy from './pages/legals/privacypolicy';
import CookiePolicy from './pages/legals/cookiePolicy';
import TermsOfService from './pages/legals/termsOfService';
import BrowseEvents from './pages/Events/BrowseEvents';

const AllRoute = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse user:", error);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, []);

  return (
    <Routes>
      {/* Always available routes */}
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/cookie-policy" element={<CookiePolicy />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
      <Route path="/events" element={<BrowseEvents />} />

      {/* Role-based or unauthenticated routing */}
      {!user && <Route path="/*" element={<AppRouter />} />}
      {user && user.role === 'attendee' && <Route path="/*" element={<AttendeeRoutes />} />}
      {user && user.role === 'organizer' && <Route path="/*" element={<OrganizerRoutes />} />}
      {user && user.role === 'admin' && <Route path="/*" element={<AdminRoutes />} />}
      {user && user.role !== 'attendee' && user.role !== 'organizer' && user.role !== 'admin' && <Route path="/*" element={<AppRouter />} />}
    </Routes>
  );
};

export default AllRoute;