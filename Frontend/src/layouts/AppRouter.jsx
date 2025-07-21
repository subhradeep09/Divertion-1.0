import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/landing/landingpage';
import PrivacyPolicy from '../pages/legals/privacypolicy';

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
  </Routes>
);

export default AppRouter; 