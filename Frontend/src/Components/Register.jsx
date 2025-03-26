import React, { useContext } from 'react';
import { ThemeContext } from '../Context/ThemeContext';

function Register() {
  const showTerms = () => {
    alert("Terms and Conditions: \n\n1. You agree to provide accurate information.\n2. You agree to our privacy policy.\n3. You agree to our terms of service.");
  };

  const { isDarkMode } = useContext(ThemeContext);

  const knowMore = () => {
    alert("Event Details: \n\nJoin us for an exciting event in New York, NY. The event will take place from 10:00 AM to 4:00 PM. The price for the event is $50. Don't miss out!");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Registration successful!");
  };

  return (
    <div className={`flex items-center justify-center min-h-screen `}>
      <div className={`p-8 rounded-lg border shadow-lg w-full max-w-4xl ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Event Details */}
          <div className="flex flex-col items-center justify-center">
            <h2 className={`text-2xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-black'}`}>Event Name</h2>
            <img
              alt="Event photo"
              className="rounded-lg shadow-md"
              height="100"
              src="https://storage.googleapis.com/a1aa/image/K4__kBnM3Cf2HzXm1Ap3X3TKHLbhlRJYYOT6PBU8Nzo.jpg"
              width="250"
            />
            <div className="mt-4 text-center">
              <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-gray-300' : 'text-black'}`}>Price: $50</h3>
              <h3 className={`text-xl font-semibold mt-2 ${isDarkMode ? 'text-gray-300' : 'text-black'}`}>Location: New York, NY</h3>
              <h3 className={`text-xl font-semibold mt-2 ${isDarkMode ? 'text-gray-300' : 'text-black'}`}>Timing: 10:00 AM - 4:00 PM</h3>
            </div>
            <div className="mt-4">
              <a href="#" onClick={knowMore} className="text-blue-500 hover:underline">
                Know More
              </a>
            </div>
          </div>
          {/* Registration Form */}
          <div>
            <h2 className={`text-2xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-black'}`}>Registration</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>First Name</label>
                  <input
                    className={`mt-1 block w-full px-3 py-2 border ${isDarkMode ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-black'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                    placeholder="Enter your first name"
                    type="text"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Last Name</label>
                  <input
                    className={`mt-1 block w-full px-3 py-2 border ${isDarkMode ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-black'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                    placeholder="Enter your last name"
                    type="text"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
                  <input
                    className={`mt-1 block w-full px-3 py-2 border ${isDarkMode ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-black'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                    placeholder="Enter your email"
                    type="email"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Phone Number</label>
                  <input
                    className={`mt-1 block w-full px-3 py-2 border ${isDarkMode ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-black'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                    placeholder="Enter your number"
                    type="text"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>DOB</label>
                  <input
                    className={`mt-1 block w-full px-3 py-2 border ${isDarkMode ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-black'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                    placeholder="Enter your date of birth"
                    type="date"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>User Type</label>
                  <select
                    className={`mt-1 block w-full px-3 py-2 border ${isDarkMode ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-black'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  >
                    <option value="student">Student</option>
                    <option value="regular">Regular</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Gender</label>
                  <div className="mt-2 flex items-center space-x-4">
                    <div className="flex items-center">
                      <input
                        className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                        id="male"
                        name="gender"
                        type="radio"
                      />
                      <label className={`ml-2 block text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`} htmlFor="male">
                        Male
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                        id="female"
                        name="gender"
                        type="radio"
                      />
                      <label className={`ml-2 block text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`} htmlFor="female">
                        Female
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                        id="prefer-not-to-say"
                        name="gender"
                        type="radio"
                      />
                      <label className={`ml-2 block text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`} htmlFor="prefer-not-to-say">
                        Prefer not to say
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <div className="flex items-center">
                  <input
                    className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                    id="terms"
                    type="checkbox"
                  />
                  <label className={`ml-2 block text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`} htmlFor="terms">
                    I agree to the{' '}
                    <a className="text-indigo-600 hover:underline" href="#" onClick={showTerms}>
                      terms and conditions
                    </a>
                  </label>
                </div>
              </div>
              <div className="mt-6">
                <button
                  className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-md shadow-md hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  type="submit"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;

