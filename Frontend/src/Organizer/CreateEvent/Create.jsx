// CreateEvent.js - Modern Black & Pink Themed Component
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { organizerAxios } from '../../utils/organizerAxios';
import { showSuccess, showError } from '../../utils/toaster';
import { FiCalendar, FiClock, FiMapPin, FiLink, FiDollarSign, FiImage, FiUsers, FiType, FiFileText } from 'react-icons/fi';

const CreateEvent = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    date: '',
    startTime: '',
    location: '',
    venueDetails: '',
    theme: 'custom',
    isPublished: false,
    isPaid: false,
    price: 0,
    isOnline: false,
    eventLink: '',
    capacity: '',
    bannerImage: null,
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (name === 'bannerImage' && files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(files[0]);
      
      setForm((prevForm) => ({
        ...prevForm,
        bannerImage: files[0]
      }));
    } else if (name === 'isPaid') {
      setForm((prevForm) => ({
        ...prevForm,
        isPaid: checked,
        price: checked ? '' : 0
      }));
    } else if (name === 'price') {
      const numericPrice = Number(value);
      setForm((prevForm) => ({
        ...prevForm,
        price: isNaN(numericPrice) ? '' : numericPrice
      }));
    } else if (name === 'capacity') {
      const numericCapacity = Number(value);
      setForm((prevForm) => ({
        ...prevForm,
        capacity: isNaN(numericCapacity) ? '' : numericCapacity
      }));
    } else if (name === 'isOnline') {
      setForm((prevForm) => ({
        ...prevForm,
        isOnline: checked,
        location: checked ? 'Online' : prevForm.location,
        eventLink: checked ? prevForm.eventLink : ''
      }));
    } else {
      const val = type === 'checkbox' ? checked : value;
      setForm((prevForm) => ({
        ...prevForm,
        [name]: val
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, val]) => {
        if (key === 'bannerImage') {
          if (val) formData.append("bannerImage", val);
        } else {
          formData.append(key, val);
        }
      });
      
      const response = await organizerAxios.post('/events', formData);
      showSuccess('Event created successfully!');
      navigate('/');
    } catch (error) {
      console.error("Create Event Error:", error.response ? error.response.data : error);
      const msg = error?.response?.data?.message || 'Failed to create event';
      showError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-gray-800/50 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-2xl border border-pink-500/20 mt-20">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Create New Event
          </h2>
          <p className="text-gray-400 mt-2">Fill in the details to create an unforgettable experience</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Banner Image Upload */}
          <div className="flex flex-col items-center">
            <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4 border-2 border-dashed border-pink-500/30">
              {previewImage ? (
                <img 
                  src={previewImage} 
                  alt="Event banner preview" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex flex-col items-center justify-center text-pink-400">
                  <FiImage className="text-4xl mb-2" />
                  <p className="text-sm">Upload banner image</p>
                </div>
              )}
            </div>
            <label className="cursor-pointer bg-gradient-to-r from-pink-600 to-purple-600 text-white px-4 py-2 rounded-lg transition-all hover:scale-105 flex items-center">
              <FiImage className="mr-2" />
              Select Banner Image
              <input
                type="file"
                name="bannerImage"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Event Title */}
            <div className="md:col-span-2">
              <label className="flex items-center text-gray-300 mb-2">
                <FiType className="mr-2 text-pink-400" /> Event Title*
              </label>
              <input
                type="text"
                name="title"
                placeholder="Amazing Event Name"
                className="w-full p-3 bg-gray-700/50 rounded-xl border border-pink-500/30 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 transition-all"
                value={form.title}
                onChange={handleChange}
                required
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="flex items-center text-gray-300 mb-2">
                <FiFileText className="mr-2 text-pink-400" /> Description
              </label>
              <textarea
                name="description"
                placeholder="Describe your event in detail..."
                rows="4"
                className="w-full p-3 bg-gray-700/50 rounded-xl border border-pink-500/30 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 transition-all"
                value={form.description}
                onChange={handleChange}
              />
            </div>

            {/* Date & Time */}
            <div>
              <label className="flex items-center text-gray-300 mb-2">
                <FiCalendar className="mr-2 text-pink-400" /> Date*
              </label>
              <input
                type="date"
                name="date"
                className="w-full p-3 bg-gray-700/50 rounded-xl border border-pink-500/30 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 transition-all"
                value={form.date}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="flex items-center text-gray-300 mb-2">
                <FiClock className="mr-2 text-pink-400" /> Start Time*
              </label>
              <input
                type="time"
                name="startTime"
                className="w-full p-3 bg-gray-700/50 rounded-xl border border-pink-500/30 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 transition-all"
                value={form.startTime}
                onChange={handleChange}
                required
              />
            </div>

            {/* Capacity */}
            <div>
              <label className="flex items-center text-gray-300 mb-2">
                <FiUsers className="mr-2 text-pink-400" /> Capacity*
              </label>
              <input
                type="number"
                name="capacity"
                placeholder="100"
                className="w-full p-3 bg-gray-700/50 rounded-xl border border-pink-500/30 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 transition-all"
                value={form.capacity}
                onChange={handleChange}
                min="1"
                required
              />
            </div>

            {/* Theme */}
            <div>
              <label className="flex items-center text-gray-300 mb-2">
                <FiImage className="mr-2 text-pink-400" /> Theme
              </label>
              <select
                name="theme"
                className="w-full p-3 bg-gray-700/50 rounded-xl border border-pink-500/30 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 transition-all"
                value={form.theme}
                onChange={handleChange}
              >
                {['business', 'music', 'tech', 'art', 'sports', 'education', 'health', 'custom'].map((t) => (
                  <option key={t} value={t} className="bg-gray-800">{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                ))}
              </select>
            </div>

            {/* Online Event Toggle */}
            <div className="md:col-span-2 flex items-center space-x-4 p-3 bg-gray-700/30 rounded-xl">
              <label className="flex items-center">
                <div className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="isOnline" 
                    checked={form.isOnline} 
                    onChange={handleChange} 
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
                </div>
                <span className="ml-3 text-gray-300">Online Event</span>
              </label>
            </div>

            {/* Location or Event Link based on Online status */}
            {!form.isOnline ? (
              <>
                <div>
                  <label className="flex items-center text-gray-300 mb-2">
                    <FiMapPin className="mr-2 text-pink-400" /> Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    placeholder="123 Event Street, City"
                    className="w-full p-3 bg-gray-700/50 rounded-xl border border-pink-500/30 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 transition-all"
                    value={form.location}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="flex items-center text-gray-300 mb-2">
                    <FiMapPin className="mr-2 text-pink-400" /> Venue Details
                  </label>
                  <input
                    type="text"
                    name="venueDetails"
                    placeholder="Floor 3, Room B"
                    className="w-full p-3 bg-gray-700/50 rounded-xl border border-pink-500/30 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 transition-all"
                    value={form.venueDetails}
                    onChange={handleChange}
                  />
                </div>
              </>
            ) : (
              <div className="md:col-span-2">
                <label className="flex items-center text-gray-300 mb-2">
                  <FiLink className="mr-2 text-pink-400" /> Event Link*
                </label>
                <input
                  type="url"
                  name="eventLink"
                  placeholder="https://your-event-platform.com/event-id"
                  className="w-full p-3 bg-gray-700/50 rounded-xl border border-pink-500/30 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 transition-all"
                  value={form.eventLink}
                  onChange={handleChange}
                  required={form.isOnline}
                />
              </div>
            )}

            {/* Paid Event Toggle */}
            <div className="md:col-span-2 flex items-center space-x-4 p-3 bg-gray-700/30 rounded-xl">
              <label className="flex items-center">
                <div className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="isPaid" 
                    checked={form.isPaid} 
                    onChange={handleChange} 
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
                </div>
                <span className="ml-3 text-gray-300">Paid Event</span>
              </label>
            </div>

            {/* Price if paid event */}
            {form.isPaid && (
              <div className="md:col-span-2">
                <label className="flex items-center text-gray-300 mb-2">
                  <FiDollarSign className="mr-2 text-pink-400" /> Price*
                </label>
                <input
                  type="number"
                  name="price"
                  placeholder="25.00"
                  className="w-full p-3 bg-gray-700/50 rounded-xl border border-pink-500/30 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 transition-all"
                  value={form.price}
                  onChange={handleChange}
                  min="1"
                  step="0.01"
                  required
                />
              </div>
            )}

            {/* Publish Toggle */}
            <div className="md:col-span-2 flex items-center space-x-4 p-3 bg-gray-700/30 rounded-xl">
              <label className="flex items-center">
                <div className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="isPublished" 
                    checked={form.isPublished} 
                    onChange={handleChange} 
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
                </div>
                <span className="ml-3 text-gray-300">Publish Immediately</span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 rounded-xl font-semibold text-white flex justify-center items-center transition-all hover:scale-[1.02] shadow-lg shadow-pink-500/20 hover:shadow-pink-500/40"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="animate-spin mr-2 border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
                Creating Event...
              </>
            ) : (
              'Create Event'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;