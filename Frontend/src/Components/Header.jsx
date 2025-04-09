import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import { ThemeContext } from '../Context/ThemeContext';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearchPanel, setShowSearchPanel] = useState(false);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleAuth = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
      alert('You have been logged out.');
    } else {
      navigate('/auth');
    }
  };

  const handleSearch = () => {
    alert(`Searching for: ${searchQuery}`);
    setShowSearchPanel(false);
  };

  return (
    <header
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/70 dark:bg-gray-900/70 backdrop-blur-md shadow-md'
          : 'bg-transparent'
      } text-black dark:text-white`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo + Nav */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <div className="text-2xl font-bold">
            <Link to="/" className="hover:text-blue-500 transition duration-300">
              Logo
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-lg font-medium">
            <Link to="/" className="hover:text-blue-500 transition">Home</Link>
            <Link to="/about" className="hover:text-blue-500 transition">About</Link>
            <Link to="/calendar" className="hover:text-blue-500 transition">Calendar</Link>
          </nav>
        </div>

        {/* Right Side: Search + Theme + Auth */}
        <div className="flex items-center gap-4">
          {/* Desktop Search */}
          <div className="hidden md:block w-60 relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2.5 pr-10 border-2 rounded-xl bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white text-black placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <button
              onClick={handleSearch}
              className="absolute inset-y-0 right-2 flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-500"
            >
              <FaSearch size={18} />
            </button>
          </div>

          {/* Mobile Search Icon */}
          <button
            className="md:hidden text-xl text-gray-700 dark:text-gray-300"
            onClick={() => setShowSearchPanel(true)}
          >
            <FaSearch />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>

          {/* Desktop Only Auth Button */}
          <button
            onClick={toggleAuth}
            className="hidden md:block px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 text-sm font-semibold transition"
          >
            {isLoggedIn ? 'Logout' : 'Login'}
          </button>

          {/* Hamburger Icon */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Sliding Search Panel */}
      {showSearchPanel && (
        <div className="md:hidden fixed top-16 left-0 w-full z-40 bg-white dark:bg-gray-900/95 backdrop-blur-md px-4 py-4 shadow-lg transition-all">
          <div className="relative">
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full p-2.5 pr-10 border-2 rounded-xl bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white text-black placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <button
              onClick={handleSearch}
              className="absolute inset-y-0 right-10 flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-500"
            >
              <FaSearch size={18} />
            </button>
            <button
              onClick={() => setShowSearchPanel(false)}
              className="absolute inset-y-0 right-2 flex items-center text-red-500 hover:text-red-700"
            >
              <FaTimes size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className={`md:hidden px-4 pb-4 pt-2 text-right space-y-4 transition-all duration-300 ${
            isScrolled
              ? 'bg-white/70 dark:bg-gray-900/70 backdrop-blur-md shadow-md'
              : 'bg-white dark:bg-gray-900'
          } text-black dark:text-white`}
        >
          <div className="flex flex-col items-end gap-3">
            <Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-blue-500">Home</Link>
            <Link to="/about" onClick={() => setMenuOpen(false)} className="hover:text-blue-500">About</Link>
            <Link to="/calendar" onClick={() => setMenuOpen(false)} className="hover:text-blue-500">Calendar</Link>
            <button
              onClick={toggleAuth}
              className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 text-sm font-semibold transition"
            >
              {isLoggedIn ? 'Logout' : 'Login'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
