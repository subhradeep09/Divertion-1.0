import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { showSuccess } from '../utils/toaster';
import logo from '../assets/Logo.png';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleLogout = async () => {
    await logout();
    setDropdownOpen(false);
  };

  // Don't show header if user is banned
  if (user?.isBanned) {
    return null;
  }

  const adminLinks = [
    { label: 'Dashboard', href: '/' },
    { label: 'Manage Users', href: '/manage-users' },
    { label: 'Manage Events', href: '/manage-events' },
    { label: 'Reports', href: '/reports' },
  ];

  const organizerLinks = [
    { label: 'My Events', href: '/' },
    { label: 'Create Event', href: '/create-event' },
    { label: 'Registrations', href: '/registration' },
  ];

  const attendeeLinks = [
    { label: 'Home', href: '/' },
    { label: 'Browse Events', href: '/view-events' },
    { label: 'My Tickets', href: '/booking-history' },
  ];

  const navLinks = !user
    ? [
        { label: 'Home', href: '/' },
        { label: 'Browse Events', href: '/events' },
        { label: 'About', href: '/about' },
      ]
    : user.role === 'admin'
    ? adminLinks
    : user.role === 'organizer'
    ? organizerLinks
    : attendeeLinks;

  return (
    <header className="absolute top-0 left-0 w-full flex items-center justify-between px-8 py-4 z-50">
      <div className="flex items-center gap-3">
        <Link to={isAuthenticated ? `/${user.role}` : '/'}>
          <img src={logo} alt="Divertion Logo" className="h-20 w-auto object-contain" />
        </Link>
        <span className="sr-only">Divertion</span>
      </div>
      
      <nav className="flex items-center gap-6">
        {/* Show verification alert if user is not verified */}
        {isAuthenticated && !user.isVerified && (
          <div className="px-4 py-2 bg-yellow-500/20 text-yellow-300 rounded-lg text-sm">
            Please verify your account
          </div>
        )}
        
        {navLinks.map(link => {
          let className = "font-medium px-5 py-2 rounded-full transition";
          className += " text-white hover:bg-pink-500/80 hover:text-white";
          return (
            <Link
              key={link.label}
              to={link.href}
              className={className}
            >
              {link.label}
            </Link>
          );
        })}
        
        {isAuthenticated ? (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="font-medium px-5 py-2 rounded-full bg-pink-700/70 text-white flex items-center gap-2"
            >
              {user.username}
              <svg className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {dropdownOpen && (
              <div ref={dropdownRef} className="absolute right-0 mt-2 bg-white text-black rounded-md shadow-lg z-10 min-w-[180px] py-2">
                {user.role === 'admin' && (
                  <>
                    <Link to="/admin/profile" className="block px-4 py-2 hover:bg-pink-100" onClick={() => setDropdownOpen(false)}>Admin Profile</Link>
                    <Link to="/admin/settings" className="block px-4 py-2 hover:bg-pink-100" onClick={() => setDropdownOpen(false)}>Admin Settings</Link>
                  </>
                )}
                {user.role === 'organizer' && (
                  <>
                    <Link to="/organizer/profile" className="block px-4 py-2 hover:bg-pink-100" onClick={() => setDropdownOpen(false)}>Organizer Profile</Link>
                    <Link to="/organizer/settings" className="block px-4 py-2 hover:bg-pink-100" onClick={() => setDropdownOpen(false)}>Event Settings</Link>
                  </>
                )}
                {user.role === 'attendee' && (
                  <>
                    <Link to="/attendee/profile" className="block px-4 py-2 hover:bg-pink-100" onClick={() => setDropdownOpen(false)}>My Profile</Link>
                    <Link to="/attendee/settings" className="block px-4 py-2 hover:bg-pink-100" onClick={() => setDropdownOpen(false)}>Settings</Link>
                  </>
                )}
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-pink-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link
              to="/login"
              className="font-medium px-5 py-2 rounded-full bg-pink-500 text-white hover:bg-pink-600 shadow transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="font-medium px-5 py-2 rounded-full border border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white transition"
            >
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;