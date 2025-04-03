import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UpcomingEventDetails = () => {
  const { state: event } = useLocation(); // Get the event data passed from the previous component
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedFAQ, setExpandedFAQ] = useState(null); // Track which FAQ is expanded
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const agenda = [
    {
      time: "9:00 AM",
      title: "Opening Keynote",
      speaker: "Dr. John Doe",
      location: "Main Hall",
      description: "The Future of AI: Trends and Transformations",
    },
    {
      time: "10:30 AM",
      title: "Technical Workshop",
      speaker: "Jane Smith",
      location: "Workshop Room A",
      description: "Hands-on Neural Network Training",
    },
    {
      time: "2:00 PM",
      title: "Panel Discussion",
      speaker: "Multiple Speakers",
      location: "Conference Room B",
      description: "AI Ethics and Responsibility",
    },
  ];

  const speakers = [
    {
      name: "Dr. Merry Elise",
      title: "AI Expert",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      bio: "Leading expert in AI with over 20 years of experience.",
    },
    {
      name: "Jane Smith",
      title: "Data Scientist",
      image: "https://images.pexels.com/photos/7328174/pexels-photo-7328174.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      bio: "Specializes in machine learning and data analytics.",
    },
  ];

  const faqs = [
    {
      question: "What is the event about?",
      answer: "The event focuses on the latest trends and innovations in technology, featuring industry leaders.",
    },
    {
      question: "How can I register?",
      answer: "You can register by clicking the 'Register Now' button at the top of the page.",
    },
    {
      question: "Is there a virtual attendance option?",
      answer: "Yes, we will provide a live stream for those who cannot attend in person.",
    },
  ];

  const toggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index); // Toggle the expanded state
  };

  // Simulate data fetching
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate an API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setLoading(false);
      } catch (err) {
        setError("Failed to load event details.");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  // Countdown Timer
  const eventDate = new Date(event.date);
  const now = new Date();
  const timeRemaining = eventDate - now;

  const daysRemaining = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hoursRemaining = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutesRemaining = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <nav className="bg-white shadow-lg dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/events" className="text-gray-800 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
            Back to Events
          </Link>
          <button onClick={() => navigate("/Register", { state: event })} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200">
            Register Now
          </button>
        </div>
      </nav>

      {/* Main Heading with Background Image */}
      <div
        className="relative w-full h-96"
        style={{ backgroundImage: `url(${event.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center">
          <div className="max-w-7xl mx-auto px-4 text-white">
            <h1 className="text-5xl font-bold mb-4">{event.name}</h1>
            <div className="flex items-center space-x-6 text-lg">
              <span>📅 {event.date}</span>
              <span>📍 {event.place}</span>
              <span>👥 {event.attendees}</span>
            </div>
            <div className="mt-4 text-lg">
              <span className="font-bold">Time Remaining: </span>
              <span>{daysRemaining} days, {hoursRemaining} hours, {minutesRemaining} minutes</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex space-x-4 mb-8 border-b">
          {["overview", "agenda", "speakers", "faqs"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium text-gray-600 hover:text-blue-600 border-b-2 -mb-px cursor-pointer whitespace-nowrap transition duration-200 ${
                activeTab === tab ? "border-blue-600 text-blue-600" : "border-transparent"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <div className="bg-white rounded-lg shadow-lg p-6 dark:bg-gray-800 dark:text-gray-300">
            <h2 className="text-2xl font-bold mb-4">Event Overview</h2>
            <p>
              Join us for the {event.name} on {event.date} at {event.place}. 
              This event will feature industry leaders discussing the latest trends and innovations in technology.
            </p>
          </div>
        )}

        {activeTab === "agenda" && (
          <div className="bg-white rounded-lg shadow-lg p-6 dark:bg-gray-800 dark:text-gray-300">
            <h2 className="text-2xl font-bold mb-6">Event Schedule</h2>
            <div className="space-y-6">
              {agenda.map((session, index) => (
                <div key={index} className="flex border-l-4 border-blue-600 pl-4">
                  <div className="w-32 flex-shrink-0">
                    <div className="font-bold text-blue-600">{session.time}</div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{session.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{session.speaker}</p>
                    <p className="text-gray-500 dark:text-gray-400">
                      <i className="fas fa-map-marker-alt mr-2"></i>
                      {session.location}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">{session.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "speakers" && (
          <div className="bg-white rounded-lg shadow-lg p-6 dark:bg-gray-800 dark:text-gray-300">
            <h2 className="text-2xl font-bold mb-6">Featured Speakers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {speakers.map((speaker, index) => (
                <div key={index} className="bg-gray-100 rounded-lg p-4 dark:bg-gray-700 shadow transition duration-200 hover:shadow-lg">
                  <img src={speaker.image} alt={speaker.name} className="w-full h-48 object-cover rounded-t-lg" />
                  <h3 className="text-lg font-bold mt-2">{speaker.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{speaker.title}</p>
                  <p className="text-gray-500 dark:text-gray-400 mt-1">{speaker.bio}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "faqs" && (
          <div className="bg-white rounded-lg shadow-lg p-6 dark:bg-gray-800 dark:text-gray-300">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className={`p-4 rounded-lg shadow-md transition duration-200 ${expandedFAQ === index ? 'bg-gray-200 dark:bg-gray-700' : 'bg-gray-100 dark:bg-gray-600'} cursor-pointer`} onClick={() => toggleFAQ(index)} aria-expanded={expandedFAQ === index}>
                  <h3 className="font-semibold flex justify-between items-center">
                    {faq.question}
                    <span className="ml-2 text-blue-600">{expandedFAQ === index ? '-' : '+'}</span>
                  </h3>
                  {expandedFAQ === index && (
                    <p className="text-gray-600 dark:text-gray-400 mt-1">{faq.answer}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Social Sharing Buttons */}
        <div className="mt-8 flex space-x-4">
          <a href={`https://twitter.com/share?url=${window.location.href}`} target="_blank" rel="noopener noreferrer" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
            Share on Twitter
          </a>
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`} target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200">
            Share on Facebook
          </a>
          <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200">
            Share on WhatsApp
          </a>
          <a href={`https://www.instagram.com/?url=${window.location.href}`} target="_blank" rel="noopener noreferrer" className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition duration-200">
            Share on Instagram
          </a>
        </div>
      </div>
    </div>
  );
};

export default UpcomingEventDetails;