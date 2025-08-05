import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { organizerAxios } from "../../utils/axiosInstance";

const UpdateEvent = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    theme: "custom",
    isPublished: false,
    isPaid: false,
    price: 0,
  });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await organizerAxios.get(`/events/${eventId}`);
        const event = response.data.message;
        setFormData({
          title: event.title || "",
          description: event.description || "",
          date: event.date ? event.date.slice(0, 16) : "",
          location: event.location || "",
          theme: event.theme || "custom",
          isPublished: event.isPublished ?? false,
          isPaid: event.isPaid ?? false,
          price: event.price ?? 0,
        });
      } catch (error) {
        console.error("Failed to fetch event:", error);
      }
    };
    fetchEvent();
  }, [eventId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: val });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await organizerAxios.put(`/events/${eventId}`, {
        ...formData,
        price: formData.isPaid ? Number(formData.price) : 0,
      });
      navigate("/"); // Navigate back to event list page
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update event.");
    }
  };

  return (
    <div className="max-w  mx-auto px-60 py-40 bg-[#0f0c29] bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
      <h2 className="text-2xl font-semibold mb-4">Update Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" className="w-full border p-2" required />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="w-full border p-2" />
        <input type="datetime-local" name="date" value={formData.date} onChange={handleChange} className="w-full border p-2" required />
        <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" className="w-full border p-2" required />
        <select name="theme" value={formData.theme} onChange={handleChange} className="w-full border p-2">
          <option value="business">Business</option>
          <option value="music">Music</option>
          <option value="tech">Tech</option>
          <option value="art">Art</option>
          <option value="sports">Sports</option>
          <option value="education">Education</option>
          <option value="health">Health</option>
          <option value="custom">Custom</option>
        </select>
        <label className="flex items-center">
          <input type="checkbox" name="isPublished" checked={formData.isPublished} onChange={handleChange} className="mr-2" />
          Published
        </label>
        <label className="flex items-center">
          <input type="checkbox" name="isPaid" checked={formData.isPaid} onChange={handleChange} className="mr-2" />
          Paid
        </label>
        {formData.isPaid && (
          <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" className="w-full border p-2" required />
        )}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Update Event</button>
      </form>
    </div>
  );
};

export default UpdateEvent;