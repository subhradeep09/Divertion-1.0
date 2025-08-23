import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { organizerAxios } from "../../utils/organizerAxios";
import { toast } from "react-toastify";
import { 
  FiCalendar, FiClock, FiMapPin, FiLink, FiDollarSign, 
  FiImage, FiUsers, FiType, FiFileText, FiEdit3, FiGlobe,
  FiHome, FiTag, FiSave, FiArrowLeft
} from "react-icons/fi";

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
  const isApproved = event?.status === "APPROVED";

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

      if (isApproved) {
        data.append("isOnline", formData.isOnline);
        data.append("eventLink", formData.eventLink);
        data.append("capacity", Number(formData.capacity));
        if (formData.bannerImage) {
          data.append("bannerImage", formData.bannerImage);
        }
      } else {
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

  const InputField = ({ icon, label, name, type = "text", placeholder, required = false, disabled = false, children, ...props }) => (
    <div className="relative">
      <label className="flex items-center text-pink-200 mb-2 font-medium">
        {icon}
        <span className="ml-2">{label}{required && "*"}</span>
      </label>
      {type === "select" ? (
        <select
          name={name}
          value={formData[name]}
          onChange={handleChange}
          required={required}
          disabled={disabled}
          className={`w-full p-4 bg-gray-800/60 text-white placeholder-gray-400 rounded-xl border-2 border-gray-700 focus:border-pink-500 focus:ring-4 focus:ring-pink-500/20 transition-all backdrop-blur-sm
            ${disabled ? 'opacity-60 cursor-not-allowed' : 'hover:border-pink-400'}`}
          {...props}
        >
          {children}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={`w-full p-4 bg-gray-800/60 text-white placeholder-gray-400 rounded-xl border-2 border-gray-700 focus:border-pink-500 focus:ring-4 focus:ring-pink-500/20 transition-all backdrop-blur-sm
            ${disabled ? 'opacity-60 cursor-not-allowed' : 'hover:border-pink-400'}`}
          {...props}
        />
      )}
    </div>
  );

  const ToggleSwitch = ({ name, label, disabled = false }) => (
    <label className="flex items-center justify-between p-3 bg-gray-800/40 rounded-xl border border-gray-700 hover:border-pink-400 transition-colors">
      <span className="text-pink-200 font-medium">{label}</span>
      <div className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          name={name}
          checked={formData[name]}
          onChange={handleChange}
          className="sr-only peer"
          disabled={disabled}
        />
        <div className="w-12 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
      </div>
    </label>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-8 px-4">
      {/* Background elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-pink-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8 mt-20">
          <div className="flex-1 text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Update Event
            </h1>
            <p className="text-gray-400 mt-1">
              {isApproved ? "Limited editing available for approved events" : "Edit your event details"}
            </p>
          </div>
        </div>

        <div className="bg-gray-800/30 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-pink-500/20">
          {/* Status Banner */}
          {isApproved && (
            <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 p-4 border-b border-green-500/30">
              <div className="flex items-center text-green-300">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                <span className="font-medium">This event is approved. Only limited fields can be edited.</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            {/* Banner Image Section */}
            <div className="text-center">
              <div className="relative w-full h-64 rounded-2xl overflow-hidden mb-4 border-2 border-dashed border-pink-500/30 group">
                {previewImage ? (
                  <img 
                    src={previewImage} 
                    alt="Event banner preview" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-pink-400">
                    <FiImage className="text-4xl" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <label className="cursor-pointer bg-pink-600/80 hover:bg-pink-600 text-white px-6 py-3 rounded-xl transition-all flex items-center backdrop-blur-sm">
                    <FiImage className="mr-2" />
                    Change Image
                    <input
                      type="file"
                      name="bannerImage"
                      accept="image/*"
                      onChange={handleChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Editable Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Always Editable Fields */}
              <InputField
                icon={<FiGlobe className="text-pink-400" />}
                label="Online Event"
                name="isOnline"
                type="checkbox"
                className="hidden"
              />

              {formData.isOnline && (
                <InputField
                  icon={<FiLink className="text-pink-400" />}
                  label="Event Link"
                  name="eventLink"
                  placeholder="https://your-event-link.com"
                  required={formData.isOnline}
                />
              )}

              <InputField
                icon={<FiUsers className="text-pink-400" />}
                label="Capacity"
                name="capacity"
                type="number"
                placeholder="Max attendees"
                min="1"
              />

              {/* Conditionally Editable Fields */}
              {!isApproved && (
                <>
                  <InputField
                    icon={<FiType className="text-pink-400" />}
                    label="Event Title"
                    name="title"
                    placeholder="Enter event title"
                    required
                  />

                  <InputField
                    icon={<FiCalendar className="text-pink-400" />}
                    label="Date"
                    name="date"
                    type="date"
                    required
                  />

                  <InputField
                    icon={<FiClock className="text-pink-400" />}
                    label="Start Time"
                    name="startTime"
                    type="time"
                    required
                  />

                  <InputField
                    icon={<FiMapPin className="text-pink-400" />}
                    label="Location"
                    name="location"
                    placeholder="Event location"
                    required
                  />

                  {!formData.isOnline && (
                    <InputField
                      icon={<FiHome className="text-pink-400" />}
                      label="Venue Details"
                      name="venueDetails"
                      placeholder="Specific venue information"
                    />
                  )}

                  <div className="col-span-2">
                    <label className="flex items-center text-pink-200 mb-2 font-medium">
                      <FiFileText className="text-pink-400" />
                      <span className="ml-2">Description</span>
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Describe your event"
                      rows="4"
                      className="w-full p-4 bg-gray-800/60 text-white placeholder-gray-400 rounded-xl border-2 border-gray-700 focus:border-pink-500 focus:ring-4 focus:ring-pink-500/20 transition-all backdrop-blur-sm hover:border-pink-400"
                    />
                  </div>

                  <InputField
                    icon={<FiTag className="text-pink-400" />}
                    label="Theme"
                    name="theme"
                    type="select"
                  >
                    <option value="business">Business</option>
                    <option value="music">Music</option>
                    <option value="tech">Tech</option>
                    <option value="art">Art</option>
                    <option value="sports">Sports</option>
                    <option value="education">Education</option>
                    <option value="health">Health</option>
                    <option value="custom">Custom</option>
                  </InputField>

                  <InputField
                    icon={<FiDollarSign className="text-pink-400" />}
                    label="Price"
                    name="price"
                    type="number"
                    placeholder="Ticket price"
                    min="0"
                    step="0.01"
                    required={formData.isPaid}
                    disabled={!formData.isPaid}
                  />
                </>
              )}
            </div>

            {/* Toggle Options */}
            {!isApproved && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-800/40 rounded-xl border border-gray-700">
                <ToggleSwitch name="isPublished" label="Publish Event" />
                <ToggleSwitch name="isPaid" label="Paid Event" />
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center group
                  ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:from-pink-700 hover:to-purple-700 hover:shadow-pink-500/30 hover:scale-[1.02]'}`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Updating...
                  </>
                ) : (
                  <>
                    <FiSave className="mr-2 group-hover:scale-110 transition-transform" />
                    Update Event
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateEvent;