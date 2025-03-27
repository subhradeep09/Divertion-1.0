import React, { useContext, useState } from 'react';
import { ThemeContext } from '../Context/ThemeContext';
import { useLocation } from 'react-router-dom';

function Register() {
  const { state } = useLocation(); 
  const { isDarkMode } = useContext(ThemeContext);

  // State for error messages
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    terms: ''
  });

  const showTerms = () => {
    alert("Terms and Conditions: \n\n1. You agree to provide accurate information.\n2. You agree to our privacy policy.\n3. You agree to our terms of service.");
  };

  const knowMore = () => {
    alert("Event Details: \n\nJoin us for an exciting event in New York, NY. The event will take place from 10:00 AM to 4:00 PM. The price for the event is $50. Don't miss out!");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dob: '',
      gender: '',
      terms: ''
    };

    // Validate fields
    const form = event.target;
    if (!form.firstName.value) newErrors.firstName = 'First Name is required';
    if (!form.lastName.value) newErrors.lastName = 'Last Name is required';
    if (!form.email.value) newErrors.email = 'Email is required';
    if (!form.phone.value) newErrors.phone = 'Phone Number is required';
    if (!form.dob.value) newErrors.dob = 'Date of Birth is required';
    if (!form.gender.value) newErrors.gender = 'Gender is required';
    if (!form.terms.checked) newErrors.terms = 'You must agree to the terms';

    // Set errors if any
    if (Object.values(newErrors).some(error => error)) {
      setErrors(newErrors);
      return;
    }

    alert("Registration successful!");
  };

  const handleInputChange = (field) => {
    setErrors((prevErrors) => ({ ...prevErrors, [field]: '' }));
  };

  const handleTermsChange = (event) => {
    if (event.target.checked) {
      setErrors((prevErrors) => ({ ...prevErrors, terms: '' }));
    }
  };

  return (
    <div className={`flex items-center justify-center min-h-screen `}>
      <div className={`p-8 rounded-lg border shadow-lg w-full max-w-4xl ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Event Details */}
          <div className="flex flex-col items-center justify-center">
            <h2 className={`text-2xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-black'}`}>{state.name}</h2>
            <img
              alt="Event photo"
              className="rounded-lg shadow-md"
              height="100"
              src={state.image}
              width="250"
            />
            <div className="mt-4 text-center">
              <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-gray-300' : 'text-black'}`}>Price: $50</h3>
              <h3 className={`text-xl font-semibold mt-2 ${isDarkMode ? 'text-gray-300' : 'text-black'}`}>Location: {state.place}</h3>
              <h3 className={`text-xl font-semibold mt-2 ${isDarkMode ? 'text-gray-300' : 'text-black'}`}>Timing: {state.date}</h3>
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
                    name="firstName"
                    className={`mt-1 block w-full px-3 py-2 border ${isDarkMode ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-black'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                    placeholder="Enter your first name"
                    type="text"
                    onChange={() => handleInputChange('firstName')}
                  />
                  {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                </div>
                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Last Name</label>
                  <input
                    name="lastName"
                    className={`mt-1 block w-full px-3 py-2 border ${isDarkMode ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-black'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                    placeholder="Enter your last name"
                    type="text"
                    onChange={() => handleInputChange('lastName')}
                  />
                  {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                </div>
                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
                  <input
                    name="email"
                    className={`mt-1 block w-full px-3 py-2 border ${isDarkMode ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-black'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                    placeholder="Enter your email"
                    type="email"
                    onChange={() => handleInputChange('email')}
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>
                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Phone Number</label>
                  <input
                    name="phone"
                    className={`mt-1 block w-full px-3 py-2 border ${isDarkMode ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-black'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                    placeholder="Enter your number"
                    type="text"
                    onChange={() => handleInputChange('phone')}
                  />
                  {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                </div>
                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>DOB</label>
                  <input
                    name="dob"
                    className={`mt-1 block w-full px-3 py-2 border ${isDarkMode ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-black'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                    placeholder="Enter your date of birth"
                    type="date"
                    onChange={() => handleInputChange('dob')}
                  />
                  {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
                </div>
                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>User  Type</label>
                  <select
                    name="userType"
                    className={`mt-1 block w-full px-3 py-2 border ${isDarkMode ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300 bg-white text-black'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                    onChange={() => handleInputChange('userType')}
                  >
                    <option value="regular">Regular</option>
                    <option value="student">Student</option>
                    <option value="vip">Vip</option>
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
                        onChange={() => handleInputChange('gender')}
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
                        onChange={() => handleInputChange('gender')}
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
                        onChange={() => handleInputChange('gender')}
                      />
                      <label className={`ml-2 block text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`} htmlFor="prefer-not-to-say">
                        Prefer not to say
                      </label>
                    </div>
                  </div>
                  {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
                </div>
              </div>
              <div className="mt-6">
                <div className="flex items-center">
                  <input
                    name="terms"
                    className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                    id="terms"
                    type="checkbox"
                    onChange={handleTermsChange} // Add the onChange handler here
                  />
                  <label className={`ml-2 block text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`} htmlFor="terms">
                    I agree to the{' '}
                    <a className="text-indigo-600 hover:underline" href="#" onClick={showTerms}>
                      terms and conditions
                    </a>
                  </label>
                </div>
                {errors.terms && <p className="text-red-500 text-sm">{errors.terms}</p>}
              </div>
              <div className="mt-6">
                <button
                  className={`w-full bg-transparent border border-blue-500 py-3 rounded-md hover:bg-blue-600 hover:text-white transition-all duration-300 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}`}
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