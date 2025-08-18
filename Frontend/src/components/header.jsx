import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { showSuccess } from '../utils/toaster';
import logo from '../assets/Logo.png';


const Header = () => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem('user');
      // console.log("Raw storedUser from localStorage:", storedUser);
      if (storedUser && storedUser !== "undefined") {
        try {
          const parsedUser = JSON.parse(storedUser);
          if (parsedUser && parsedUser.username) {
            // console.log("Parsed user set:", parsedUser);
            setUser(parsedUser);
            showSuccess("Login successful");
          } else {
            console.warn("Parsed user is invalid or missing username:", parsedUser);
            localStorage.removeItem('user');
            setUser(null);
          }
        } catch (err) {
          console.warn("Failed to parse user from localStorage:", storedUser, err);
          localStorage.removeItem('user');
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    loadUser(); // Initial load

    const handleStorage = () => {
      loadUser();
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

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
    try {
      await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }
    localStorage.removeItem('user');
    showSuccess("Logout successful");
    setUser(null);
    console.log("Toaster: Logout successful");
    setDropdownOpen(false);
    window.location.href = '/login'; 
  };

  const adminLinks = [
    { label: 'Dashboard', href: '/' },
    { label: 'Manage Users', href: '/manage-users' },
    { label: 'Manage Events', href: '/manage-events' },
    { label: 'Reports', href: '/reports' },
  ];

  const organizerLinks = [
    { label: 'My Events', href: '/' },
    { label: 'Create Event', href: '/create-event' },
    { label: 'Registrations', href: '/organizer/registrations' },
  ];

  const attendeeLinks = [
    { label: 'Home', href: '/' },
    { label: 'Browse Events', href: '/events' },
    { label: 'My Tickets', href: '/attendee/tickets' },
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

  // console.log("Current user state in Header:", user);

  return (
    <header className="absolute top-0 left-0 w-full flex items-center justify-between px-8 py-4 z-50">
      <div className="flex items-center gap-3">
        <img src={logo} alt="Divertion Logo" className="h-20 w-auto object-contain" />
        <span className="sr-only">Divertion</span>
      </div>
      <nav className="flex gap-6">
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
        {user ? (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="font-medium px-5 py-2 rounded-full bg-pink-700/70 text-white"
            >
              {user.username}
            </button>
            {dropdownOpen && (
              <div ref={dropdownRef} className="absolute right-0 mt-2 bg-white text-black rounded-md shadow-lg z-10 min-w-[180px]">
                {user.role === 'admin' && (
                  <>
                    <Link to="/admin/profile" className="block px-4 py-2 hover:bg-pink-100">Admin Profile</Link>
                    <Link to="/admin/settings" className="block px-4 py-2 hover:bg-pink-100">Admin Settings</Link>
                  </>
                )}
                {user.role === 'organizer' && (
                  <>
                    <Link to="/organizer/profile" className="block px-4 py-2 hover:bg-pink-100">Organizer Profile</Link>
                    <Link to="/organizer/settings" className="block px-4 py-2 hover:bg-pink-100">Event Settings</Link>
                  </>
                )}
                {user.role === 'attendee' && (
                  <>
                    <Link to="/attendee/profile" className="block px-4 py-2 hover:bg-pink-100">My Profile</Link>
                    <Link to="/attendee/settings" className="block px-4 py-2 hover:bg-pink-100">Settings</Link>
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
