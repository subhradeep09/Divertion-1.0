import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Layout from './Layout.jsx';

import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import About from './Pages/About.jsx'
import Contact from './Pages/Contact.jsx';
import Organizers from './Pages/Organizers.jsx';
import Events from './Pages/Events.jsx';
import Security from './Pages/Security.jsx';
import CookiePolicy from './Pages/CookiePolicy.jsx';
import TermsofService from './Pages/TermsofService.jsx';
import PrivacyPolicy from './Pages/PrivacyPolicy.jsx';
import AuthPage from './Components/AuthPage.jsx';
import LoginPage from "./Components/LoginPage.jsx";
import Register from './Components/register.jsx';
import EventDetails from './Components/EventDetails.jsx';
import UpcomingEventDetails from './Components/UpcomingEventDetails.jsx';
import CalendarPage from './Pages/CalendarPage.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/calendar' element={<CalendarPage />} />
      <Route path='/events' element={<Events />} />
      <Route path='/organizers' element={<Organizers />} />
      <Route path='contact' element={<Contact />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy/>} />
      <Route path="/terms-of-service" element={<TermsofService />} />
      <Route path="/cookie-policy" element={<CookiePolicy/>} />
      <Route path="/security" element={<Security />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/EventDetails" element={<EventDetails />} />
      <Route path="/UpcomingEventDetails" element={<UpcomingEventDetails />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <AppProvider> */}
    <RouterProvider router={router} />
    {/* </AppProvider> */}
  </StrictMode>,
)