import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/landing/landingpage';
import About from '../pages/Explore/about';
import Contact from '../pages/Explore/contact';
import PrivacyPolicy from '../pages/legals/privacypolicy';
import CookiePolicy from '../pages/legals/cookiePolicy';
import TermsOfService from '../pages/legals/termsOfService';

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
    <Route path="/cookie-policy" element={<CookiePolicy />} />
    <Route path="/terms-of-service" element={<TermsOfService />} />
  </Routes>
);

export default AppRouter;