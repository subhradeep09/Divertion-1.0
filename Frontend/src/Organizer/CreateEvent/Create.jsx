import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { organizerAxios } from '../../utils/axiosInstance';
import { showSuccess, showError } from '../../utils/toaster';

const CreateEvent = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    theme: 'custom',
    isPublished: false,
    isPaid: false,
    price: 0,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'isPaid') {
      setForm((prevForm) => ({
        ...prevForm,
        isPaid: checked,
        price: checked ? '' : 0  // clear price if switching to paid
      }));
    } else if (name === 'price') {
      const numericPrice = Number(value);
      setForm((prevForm) => ({
        ...prevForm,
        price: isNaN(numericPrice) ? '' : numericPrice
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
    try {
      const response = await organizerAxios.post('/events', form);
      showSuccess('Event created successfully!');
      navigate('/organizer/my-events');
    } catch (error) {
      const msg = error?.response?.data?.message || 'Failed to create event';
      showError(msg);
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
            type="datetime-local"
            name="date"
            className="w-full p-2 bg-[#0f0c29] rounded border border-pink-500"
            value={form.date}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            className="w-full p-2 bg-[#0f0c29] rounded border border-pink-500"
            value={form.location}
            onChange={handleChange}
            required
          />
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
            className="w-full py-2 bg-pink-500 hover:bg-pink-600 rounded font-semibold"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;