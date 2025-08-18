import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { organizerAxios } from '../../utils/organizerAxios';
import { showSuccess, showError } from '../../utils/toaster';

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
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (name === 'isPaid') {
      setForm((prevForm) => ({
        ...prevForm,
        isPaid: checked,
        price: checked ? '' : 0 // clear price if switching to paid
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
    } else if (name === 'bannerImage') {
      setForm((prevForm) => ({
        ...prevForm,
        bannerImage: files && files[0] ? files[0] : null
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
      // Debug: log all key-value pairs in formData
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }
      const response = await organizerAxios.post('/events', formData);
      showSuccess('Event created successfully!');
      navigate('/');
    } catch (error) {
      console.error("Create Event Error:", error.response ? error.response.data : error);
      console.log("Full error object:", error);
      const msg = error?.response?.data?.message || 'Failed to create event';
      showError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0c29] bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white p-8">
      <div className="max-w-4xl mx-auto bg-[#1a1a2e] p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-pink-400">Create New Event</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            className="w-full p-2 bg-[#0f0c29] rounded border border-pink-500"
            value={form.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            rows="4"
            className="w-full p-2 bg-[#0f0c29] rounded border border-pink-500"
            value={form.description}
            onChange={handleChange}
          />
          <input
            type="date"
            name="date"
            className="w-full p-2 bg-[#0f0c29] rounded border border-pink-500"
            value={form.date}
            onChange={handleChange}
            required
          />
          <input
            type="time"
            name="startTime"
            className="w-full p-2 bg-[#0f0c29] rounded border border-pink-500"
            value={form.startTime}
            onChange={handleChange}
            required
            placeholder="Start Time"
          />
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input type="checkbox" name="isOnline" checked={form.isOnline} onChange={handleChange} />
              <span className="ml-2">Online Event</span>
            </label>
          </div>
          {!form.isOnline && (
            <>
              <input
                type="text"
                name="location"
                placeholder="Location"
                className="w-full p-2 bg-[#0f0c29] rounded border border-pink-500"
                value={form.location}
                onChange={handleChange}
              />
              <input
                type="text"
                name="venueDetails"
                placeholder="Venue Details"
                className="w-full p-2 bg-[#0f0c29] rounded border border-pink-500"
                value={form.venueDetails}
                onChange={handleChange}
              />
            </>
          )}
          {form.isOnline && (
            <input
              type="url"
              name="eventLink"
              placeholder="Event Link (URL)"
              className="w-full p-2 bg-[#0f0c29] rounded border border-pink-500"
              value={form.eventLink}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="number"
            name="capacity"
            placeholder="Capacity"
            className="w-full p-2 bg-[#0f0c29] rounded border border-pink-500"
            value={form.capacity}
            onChange={handleChange}
            min="1"
            required
          />
          <label className="block">
            <span className="text-pink-300">Banner Image</span>
            <input
              type="file"
              name="bannerImage"
              accept="image/*"
              className="block w-full text-sm text-pink-500 mt-1"
              onChange={handleChange}
            />
          </label>
          <select
            name="theme"
            className="w-full p-2 bg-[#0f0c29] rounded border border-pink-500"
            value={form.theme}
            onChange={handleChange}
          >
            {['business', 'music', 'tech', 'art', 'sports', 'education', 'health', 'custom'].map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input type="checkbox" name="isPublished" checked={form.isPublished} onChange={handleChange} />
              <span className="ml-2">Published</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" name="isPaid" checked={form.isPaid} onChange={handleChange} />
              <span className="ml-2">Paid Event</span>
            </label>
          </div>
          {form.isPaid && (
            <input
              type="number"
              name="price"
              placeholder="Price"
              className="w-full p-2 bg-[#0f0c29] rounded border border-pink-500"
              value={form.price}
              onChange={handleChange}
              min="1"
              required
            />
          )}
          <button
            type="submit"
            className="w-full py-2 bg-pink-500 hover:bg-pink-600 rounded font-semibold flex justify-center items-center"
            disabled={loading}
          >
            {loading && <span className="animate-spin mr-2 border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>}
            {loading ? 'Creating...' : 'Create Event'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;