import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { FaSearch } from 'react-icons/fa';
import { ThemeContext } from '../Context/ThemeContext'; // Adjust the path as needed

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { isDarkMode, toggleTheme } = useContext(ThemeContext); // Use context
  const navigate = useNavigate(); // Hook for navigation

  // Authentication toggle function
  const toggleAuth = () => {
    if (isLoggedIn) {
      // Logout logic
      setIsLoggedIn(false);
      alert('You have been logged out.');
    } else {
      // Redirect to the Auth Page
      navigate('/auth');
    }
  };

  // Handle search
  const handleSearch = () => {
    alert(`Searching for: ${searchQuery}`);
  };

  return (
    <header className="w-full flex items-center justify-between p-6 shadow-lg bg-white dark:bg-gray-800 z-50">
      {/* Logo */}
      <div className="text-3xl font-bold">
        <Link to="/" className="text-gray-800 dark:text-white hover:text-blue-500 transition duration-300">
          Logo
        </Link>
      </div>

      {/* Search Bar and Navigation */}
      <div className="flex items-center gap-10 flex-1 justify-center mx-12">
        <div className="max-w-xl w-full relative">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 pr-12 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition duration-300"
          />
          <button
            onClick={handleSearch}
            className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 dark:text-gray-400 hover:text-blue-500 transition duration-300"
          >
            <FaSearch size={20} />
          </button>
        </div>

        <nav className="flex items-center gap-8">
          <Link to="/" className="text-gray-800 dark:text-white hover:text-blue-500 text-lg font-semibold transition duration-300">
            Home
          </Link>
          <Link to="/about" className="text-gray-800 dark:text-white hover:text-blue-500 text-lg font-semibold transition duration-300">
            About
          </Link>
          <Link to="/calendar" className="text-gray-800 dark:text-white hover:text-blue-500 text-lg font-semibold transition duration-300">
            Calendar
          </Link>
        </nav>
      </div>

      {/* Theme Toggle and Login Button */}
      <div className="flex items-center gap-6">
        <button
          onClick={toggleTheme}
          className="p-3 rounded-xl bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-300"
        >
          {isDarkMode ? (
            <span role="img" aria-label="Sun" className="text-xl">
              ☀️
            </span>
          ) : (
            <span role="img" aria-label="Moon" className="text-xl">
              🌙
            </span>
          )}
        </button>

        <button
          onClick={toggleAuth}
          className="px-6 py-3 text-white bg-blue-500 rounded-xl hover:bg-blue-600 text-lg font-semibold transition duration-300"
        >
          {isLoggedIn ? 'Logout' : 'Login'}
        </button>
      </div>
    </header>
  );
};

export default Header;