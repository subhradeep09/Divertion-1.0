import React, { useContext, useState } from 'react';
import { ThemeContext } from '../Context/ThemeContext';
import { useLocation } from 'react-router-dom';

function Register() {
  const { state } = useLocation();
  const { isDarkMode } = useContext(ThemeContext);

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

    const form = event.target;
    if (!form.firstName.value) newErrors.firstName = 'First Name is required';
    if (!form.lastName.value) newErrors.lastName = 'Last Name is required';
    if (!form.email.value) newErrors.email = 'Email is required';
    if (!form.phone.value) newErrors.phone = 'Phone Number is required';
    if (!form.dob.value) newErrors.dob = 'Date of Birth is required';
    if (!form.gender.value) newErrors.gender = 'Gender is required';
    if (!form.terms.checked) newErrors.terms = 'You must agree to the terms';

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

  const inputStyle = `mt-1 block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none sm:text-sm`;
  const darkInput = `bg-gray-800 text-white border border-gray-600 focus:ring-blue-500 focus:border-blue-500`;
  const lightInput = `bg-white text-black border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500`;

  return (
    <div className={`flex items-center justify-center min-h-screen ${isDarkMode ? 'bg-[#0F172A]' : 'bg-gray-100'}`}>
      <div className={`p-8 rounded-xl shadow-xl w-full max-w-4xl ${isDarkMode ? 'bg-gray-900 border border-gray-700' : 'bg-white border border-gray-300'}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Event Details */}
          <div className="flex flex-col items-center justify-center">
            <h2 className={`text-2xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-black'}`}>{state.name}</h2>
            <img
              alt="Event"
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
                {[
                  { label: 'First Name', name: 'firstName', type: 'text', placeholder: 'Enter your first name' },
                  { label: 'Last Name', name: 'lastName', type: 'text', placeholder: 'Enter your last name' },
                  { label: 'Email', name: 'email', type: 'email', placeholder: 'Enter your email' },
                  { label: 'Phone Number', name: 'phone', type: 'text', placeholder: 'Enter your number' },
                  { label: 'DOB', name: 'dob', type: 'date' }
                ].map(({ label, name, type, placeholder }) => (
                  <div key={name}>
                    <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{label}</label>
                    <input
                      name={name}
                      type={type}
                      placeholder={placeholder}
                      onChange={() => handleInputChange(name)}
                      className={`${inputStyle} ${isDarkMode ? darkInput : lightInput}`}
                    />
                    {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
                  </div>
                ))}

                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>User Type</label>
                  <select
                    name="userType"
                    className={`${inputStyle} ${isDarkMode ? darkInput : lightInput}`}
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
                    {['Male', 'Female', 'Prefer not to say'].map((gender, idx) => {
                      const value = gender.toLowerCase().replace(/\s+/g, '-');
                      return (
                        <div className="flex items-center" key={value}>
                          <input
                            id={value}
                            name="gender"
                            type="radio"
                            onChange={() => handleInputChange('gender')}
                            className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                          />
                          <label htmlFor={value} className={`ml-2 block text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            {gender}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                  {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center">
                  <input
                    name="terms"
                    id="terms"
                    type="checkbox"
                    onChange={handleTermsChange}
                    className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                  />
                  <label htmlFor="terms" className={`ml-2 block text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
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
                  type="submit"
                  className={`w-full py-3 rounded-md transition-all duration-300 font-medium ${
                    isDarkMode
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
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
