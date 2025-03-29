import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import * as echarts from "echarts";

const EventDetails = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const chart = echarts.init(document.getElementById("attendeeChart"));
    const option = {
      animation: false,
      tooltip: {
        trigger: "item",
        formatter: "{b}: {c} ({d}%)",
      },
      series: [
        {
          type: "pie",
          radius: "70%",
          data: [
            { value: 235, name: "Technology" },
            { value: 185, name: "Finance" },
            { value: 148, name: "Healthcare" },
            { value: 102, name: "Education" },
            { value: 95, name: "Others" },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };
    chart.setOption(option);

    return () => {
      chart.dispose();
    };
  }, []);

  const eventDetails = {
    title: "AI Summit 2024: The Future of Intelligence",
    date: "March 15, 2024",
    location: "Tech Convention Center, San Francisco",
    attendees: "765 Attendees",
    speakers: "25 Industry Leaders",
    sessions: "32 Sessions",
    mainImage:
      "https://public.readdy.ai/ai/img_res/b80f7ca361449fd1e907343b940ba56b.jpg",
    overview:
      "The AI Summit 2024 brought together leading minds in artificial intelligence to explore groundbreaking developments and future trends. The event featured keynote speeches, interactive workshops, and networking sessions that fostered collaboration and innovation in the AI community.",
    highlights: [
      "Keynote by Dr. Sarah Chen on Neural Networks",
      "Panel discussion on Ethical AI Implementation",
      "Interactive AI Model Training Workshop",
      "Startup Innovation Showcase",
      "Industry-Academia Collaboration Forum",
    ],
  };

  const speakers = [
    {
      name: "Dr. Sarah Chen",
      title: "Chief AI Researcher, TechCorp",
      image:
        "https://public.readdy.ai/ai/img_res/3f5d4cae2efcd109f0cb6ba9819850ba.jpg",
      bio: "Leading expert in neural networks with over 15 years of research experience",
    },
    {
      name: "James Wilson",
      title: "Director of Innovation, AI Labs",
      image:
        "https://public.readdy.ai/ai/img_res/b520f189f3e6a4e18825e965df94047c.jpg",
      bio: "Pioneer in machine learning applications for enterprise solutions",
    },
    {
      name: "Dr. Maria Rodriguez",
      title: "AI Ethics Professor, Stanford",
      image:
        "https://public.readdy.ai/ai/img_res/4cf6274ec0b2495209dc6c55ca7135d9.jpg",
      bio: "Renowned expert in AI ethics and responsible innovation",
    },
  ];

  const agenda = [
    {
      time: "9:00 AM",
      title: "Opening Keynote",
      speaker: "Dr. Sarah Chen",
      location: "Main Hall",
      description: "The Future of AI: Trends and Transformations",
    },
    {
      time: "10:30 AM",
      title: "Technical Workshop",
      speaker: "James Wilson",
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

  const gallery = [
    {
      url: "https://public.readdy.ai/ai/img_res/dc204f0a8e606b3fa90f500f032fad6d.jpg",
      caption: "Opening Keynote Session",
    },
    {
      url: "https://public.readdy.ai/ai/img_res/8dfcdd44a447ccc6d4f62b8dd04a4a32.jpg",
      caption: "AI Workshop in Action",
    },
    {
      url: "https://public.readdy.ai/ai/img_res/532bd95d6f601239b146fe74114c8678.jpg",
      caption: "Networking Break",
    },
  ];


  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <a
            href="#"
            data-readdy="true"
            className="flex items-center space-x-2 text-gray-800 hover:text-blue-600"
          >
            <i className="fas fa-arrow-left"></i>
            <span>Back to Events</span>
          </a>
          <div className="flex items-center space-x-4">
            <button className="!rounded-button px-4 py-2 text-gray-600 hover:text-blue-600 cursor-pointer whitespace-nowrap">
              <i className="fas fa-share-alt mr-2"></i>
              Share
            </button>
          </div>
        </div>
      </nav>

      <div className="relative h-96">
        <img
          src={eventDetails.mainImage}
          alt={eventDetails.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center">
          <div className="max-w-7xl mx-auto px-4 text-white">
            <div className="inline-block bg-blue-600 text-sm px-3 py-1 rounded-full mb-4">
              Past Event
            </div>
            <h1 className="text-5xl font-bold mb-4">{eventDetails.title}</h1>
            <div className="flex items-center space-x-6 text-lg">
              <span>
                <i className="far fa-calendar-alt mr-2"></i>
                {eventDetails.date}
              </span>
              <span>
                <i className="fas fa-map-marker-alt mr-2"></i>
                {eventDetails.location}
              </span>
              <span>
                <i className="fas fa-users mr-2"></i>
                {eventDetails.attendees}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex space-x-4 mb-8 border-b">
          {["overview", "agenda", "speakers", "gallery", "materials"].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 font-medium text-gray-600 hover:text-blue-600 border-b-2 -mb-px cursor-pointer whitespace-nowrap !rounded-button ${
                  activeTab === tab
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            )
          )}
        </div>

        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Event Overview</h2>
                <p className="text-gray-600">{eventDetails.overview}</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Key Highlights</h2>
                <ul className="space-y-3">
                  {eventDetails.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <i className="fas fa-check-circle text-green-500 mr-3"></i>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-4">
                  Attendance Statistics
                </h2>
                <div id="attendeeChart" style={{ height: "300px" }}></div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "agenda" && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Event Schedule</h2>
            <div className="space-y-6">
              {agenda.map((session, index) => (
                <div
                  key={index}
                  className="flex border-l-4 border-blue-600 pl-4"
                >
                  <div className="w-32 flex-shrink-0">
                    <div className="font-bold text-blue-600">
                      {session.time}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{session.title}</h3>
                    <p className="text-gray-600">{session.speaker}</p>
                    <p className="text-gray-500">
                      <i className="fas fa-map-marker-alt mr-2"></i>
                      {session.location}
                    </p>
                    <p className="text-gray-600 mt-2">{session.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "speakers" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {speakers.map((speaker, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{speaker.name}</h3>
                  <p className="text-blue-600 mb-3">{speaker.title}</p>
                  <p className="text-gray-600">{speaker.bio}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "gallery" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gallery.map((image, index) => (
              <div
                key={index}
                className="cursor-pointer rounded-lg overflow-hidden shadow-lg"
                onClick={() => setSelectedImage(image.url)}
              >
                <img
                  src={image.url}
                  alt={image.caption}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 bg-white">
                  <p className="text-gray-600">{image.caption}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "materials" && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Presentation Materials</h2>
            <div className="space-y-4">
              {[
                {
                  name: "Keynote Presentation",
                  size: "15.2 MB",
                  downloads: 234,
                },
                { name: "Workshop Materials", size: "8.5 MB", downloads: 156 },
                { name: "Research Papers", size: "22.1 MB", downloads: 189 },
              ].map((material, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center">
                    <i className="far fa-file-pdf text-red-500 text-2xl mr-4"></i>
                    <div>
                      <h3 className="font-medium">{material.name}</h3>
                      <p className="text-sm text-gray-500">
                        {material.size} • {material.downloads} downloads
                      </p>
                    </div>
                  </div>
                  <button className="!rounded-button px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 cursor-pointer whitespace-nowrap">
                    <i className="fas fa-download mr-2"></i>
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Gallery"
            className="max-w-4xl w-full h-auto"
          />
        </div>
      )}
    </div>
  );
};

export default EventDetails;