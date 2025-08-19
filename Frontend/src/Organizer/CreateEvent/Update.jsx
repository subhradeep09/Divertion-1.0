import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { organizerAxios } from "../../utils/organizerAxios";
import { toast } from "react-toastify";
import { FiCalendar, FiClock, FiMapPin, FiLink, FiDollarSign, FiImage } from "react-icons/fi";

const UpdateEvent = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const event = location.state?.event;
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    startTime: "",
    location: "",
    theme: "custom",
    isPublished: false,
    isPaid: false,
    price: 0,
    isOnline: false,
    eventLink: "",
    venueDetails: "",
    capacity: 0,
    bannerImage: null,
  });
  const [previewImage, setPreviewImage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title || "",
        description: event.description || "",
        date: event.date ? event.date.slice(0, 10) : "",
        startTime: event.startTime || "",
        location: event.location || "",
        theme: event.theme || "custom",
        isPublished: event.isPublished ?? false,
        isPaid: event.isPaid ?? false,
        price: event.price ?? 0,
        isOnline: event.isOnline ?? false,
        eventLink: event.eventLink || "",
        venueDetails: event.venueDetails || "",
        capacity: event.capacity ?? 0,
        bannerImage: null,
      });
      setPreviewImage(event.bannerImage);
    }
  }, [event]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === "file" && files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(files[0]);
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : 
              type === "file" ? files[0] : 
              type === "number" ? Number(value) :
              value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate required fields
      if (!formData.title || !formData.date || !formData.startTime || !formData.location) {
        throw new Error("Please fill all required fields");
      }

      if (formData.isOnline && !formData.eventLink) {
        throw new Error("Event link is required for online events");
      }

      if (formData.isPaid && (!formData.price || formData.price <= 0)) {
        throw new Error("Price must be a positive number for paid events");
      }

      const data = new FormData();

      if (event?.status === "APPROVED") {
        // Only allowed fields
        data.append("isOnline", formData.isOnline);
        data.append("eventLink", formData.eventLink);
        data.append("capacity", Number(formData.capacity));
        if (formData.bannerImage) {
          data.append("bannerImage", formData.bannerImage);
        }
      } else {
        // Normal flow (PENDING / not approved yet)
        data.append("title", formData.title);
        data.append("description", formData.description);
        data.append("date", formData.date);
        data.append("startTime", formData.startTime);
        data.append("location", formData.location);
        data.append("venueDetails", formData.venueDetails);
        data.append("capacity", Number(formData.capacity));
        data.append("isOnline", formData.isOnline);
        data.append("eventLink", formData.eventLink);
        data.append("isPaid", formData.isPaid);
        data.append("price", Number(formData.price));
        data.append("theme", formData.theme);
        data.append("isPublished", formData.isPublished);

        if (formData.bannerImage) {
          data.append("bannerImage", formData.bannerImage);
        }
      }

      // Debug: Log FormData entries
      for (let [key, value] of data.entries()) {
        console.log(`${key}: ${value} | type: ${typeof value}`);
      }

      const response = await organizerAxios.put(
        `/events/${eventId}`,
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      toast.success(response.data.data || "Event updated successfully");
      navigate("/");
    } catch (error) {
      console.error("Update failed:", error);
      toast.error(
        error.response?.data?.message || 
        error.response?.data?.error?.message || 
        error.message ||
        "Failed to update event"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-pink-600 to-purple-600 p-6">
            <h2 className="text-2xl font-bold text-white">Update Event</h2>
            <p className="text-pink-100">Edit your event details below</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Info for approved events */}
            {event?.status === "APPROVED" && (
              <div className="bg-yellow-600 text-white p-3 rounded-lg text-sm mb-4">
                This event has been approved. Only <b>Online status</b>, <b>Event Link</b>, 
                <b>Capacity</b>, and <b>Banner Image</b> can be updated.
              </div>
            )}
            {/* Banner Image Preview */}
            <div className="flex flex-col items-center">
              <div className="relative w-full h-48 rounded-lg overflow-hidden mb-4 border-2 border-dashed border-gray-600">
                {previewImage ? (
                  <img 
                    src={previewImage} 
                    alt="Event banner preview" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                    <FiImage className="text-gray-500 text-4xl" />
                  </div>
                )}
              </div>
              <label className="cursor-pointer bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center">
                <FiImage className="mr-2" />
                Change Banner Image
                <input
                  type="file"
                  name="bannerImage"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div className="col-span-2">
                <label className="block text-gray-300 mb-2">Event Title*</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter event title"
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Description */}
              <div className="col-span-2">
                <label className="block text-gray-300 mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your event"
                  rows="4"
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>

              {/* Date & Time */}
              <div>
                <label className="flex items-center text-gray-300 mb-2">
                  <FiCalendar className="mr-2" /> Date*
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="flex items-center text-gray-300 mb-2">
                  <FiClock className="mr-2" /> Start Time*
                </label>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Location */}
              <div>
                <label className="flex items-center text-gray-300 mb-2">
                  <FiMapPin className="mr-2" /> Location*
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Event location"
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Capacity */}
              <div>
                <label className="block text-gray-300 mb-2">Capacity</label>
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  placeholder="Max attendees"
                  min="1"
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>

              {/* Theme */}
              <div>
                <label className="block text-gray-300 mb-2">Theme</label>
                <select
                  name="theme"
                  value={formData.theme}
                  onChange={handleChange}
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                >
                  <option value="business">Business</option>
                  <option value="music">Music</option>
                  <option value="tech">Tech</option>
                  <option value="art">Art</option>
                  <option value="sports">Sports</option>
                  <option value="education">Education</option>
                  <option value="health">Health</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
            </div>

            {/* Toggle Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="isPublished"
                  checked={formData.isPublished}
                  onChange={handleChange}
                  className="h-5 w-5 text-pink-600 rounded focus:ring-pink-500"
                />
                <span className="text-gray-300">Publish Event</span>
              </label>

              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="isPaid"
                  checked={formData.isPaid}
                  onChange={handleChange}
                  className="h-5 w-5 text-pink-600 rounded focus:ring-pink-500"
                />
                <span className="text-gray-300">Paid Event</span>
              </label>

              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="isOnline"
                  checked={formData.isOnline}
                  onChange={handleChange}
                  className="h-5 w-5 text-pink-600 rounded focus:ring-pink-500"
                />
                <span className="text-gray-300">Online Event</span>
              </label>
            </div>

            {/* Conditional Fields */}
            {formData.isOnline && (
              <div>
                <label className="flex items-center text-gray-300 mb-2">
                  <FiLink className="mr-2" /> Event Link*
                </label>
                <input
                  type="text"
                  name="eventLink"
                  value={formData.eventLink}
                  onChange={handleChange}
                  placeholder="https://your-event-link.com"
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required={formData.isOnline}
                />
              </div>
            )}

            {!formData.isOnline && (
              <div>
                <label className="block text-gray-300 mb-2">Venue Details</label>
                <input
                  type="text"
                  name="venueDetails"
                  value={formData.venueDetails}
                  onChange={handleChange}
                  placeholder="Specific venue information"
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
            )}

            {formData.isPaid && (
              <div>
                <label className="text-gray-300 mb-2 flex items-center">
                  <FiDollarSign className="mr-2" /> Price*
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Ticket price"
                  min="0"
                  step="0.01"
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required={formData.isPaid}
                />
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition-all ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105'}`}
              >
                {isSubmitting ? 'Updating...' : 'Update Event'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateEvent;