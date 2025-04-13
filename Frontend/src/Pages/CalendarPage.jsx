// src/components/Calendar/EventCalendar.jsx
import { useState,useEffect } from "react";
import {
  Calendar,
  Views,
  dateFnsLocalizer,
} from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

const locales = {
  "en-US": enUS,
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const eventColors = {
  Tech: "bg-blue-500",
  Cultural: "bg-pink-500",
  Sports: "bg-green-500",
};

const initialEvents = [
  {
    title: "Tech Talk",
    start: new Date(2025, 3, 10, 10, 0),
    end: new Date(2025, 3, 10, 12, 0),
    location: "Lecture Hall L7",
    type: "Tech",
  },
  {
    title: "Cultural Dance",
    start: new Date(2025, 3, 11, 14, 0),
    end: new Date(2025, 3, 11, 17, 0),
    location: "Auditorium",
    type: "Cultural",
  },
];

export default function EventCalendar() {
  useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, []);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [view, setView] = useState(Views.MONTH);
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState(initialEvents);
  const [filters, setFilters] = useState({ Tech: true, Cultural: true, Sports: true });
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: new Date(),
    end: new Date(),
    location: "",
    type: "Tech",
    description: "",
  });

  const handleAddEvent = () => {
    if (!newEvent.title) return;
    setEvents([...events, { ...newEvent }]);
    setShowAddModal(false);
    setNewEvent({
      title: "",
      start: new Date(),
      end: new Date(),
      location: "",
      type: "Tech",
      description: "",
    });
  };

  const filteredEvents = events.filter((event) => filters[event.type]);

  const handleNavigate = (newDate) => {
    setDate(newDate);
  };

  const handleMonthChange = (e) => {
    const newMonth = parseInt(e.target.value);
    const updatedDate = new Date(date);
    updatedDate.setMonth(newMonth);
    setDate(updatedDate);
  };

  const handleYearChange = (e) => {
    const newYear = parseInt(e.target.value);
    const updatedDate = new Date(date);
    updatedDate.setFullYear(newYear);
    setDate(updatedDate);
  };

  const generateYearOptions = () => {
    const years = [];
    const currentYear = new Date().getFullYear();
    for (let i = currentYear - 5; i <= currentYear + 5; i++) {
      years.push(i);
    }
    return years;
  };

  return (
    <motion.div
      className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-4 transition-all"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="flex flex-col lg:flex-row gap-6"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Sidebar */}
        <aside className="mt-20 w-full lg:w-1/4 space-y-6">
          <button
            onClick={() => setShowAddModal(true)}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl shadow hover:scale-105 transition"
          >
            + Add Event
          </button>

          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-5 shadow">
            <h2 className="text-lg font-bold mb-4">Filters</h2>
            {Object.keys(eventColors).map((type) => (
              <label key={type} className="block mb-2">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={filters[type]}
                  onChange={() =>
                    setFilters((prev) => ({ ...prev, [type]: !prev[type] }))
                  }
                />
                {type}
              </label>
            ))}
            <hr className="my-3 border-gray-300 dark:border-gray-600" />
            <label className="block mb-2">
              <input type="checkbox" className="mr-2" /> Registered Events
            </label>
            <label className="block mb-2">
              <input type="checkbox" className="mr-2" /> Created Events
            </label>

            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">Month</label>
              <select
                value={date.getMonth()}
                onChange={handleMonthChange}
                className="w-full p-2 rounded border bg-white dark:bg-gray-800"
              >
                {[...Array(12).keys()].map((month) => (
                  <option key={month} value={month}>
                    {format(new Date(2023, month), "LLLL")}
                  </option>
                ))}
              </select>

              <label className="block text-sm font-medium mt-3 mb-1">Year</label>
              <select
                value={date.getFullYear()}
                onChange={handleYearChange}
                className="w-full p-2 rounded border bg-white dark:bg-gray-800"
              >
                {generateYearOptions().map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </aside>

        {/* Calendar */}
        <main className="mt-20 flex-1 overflow-hidden min-w-0">
          <div className="mb-4 flex flex-wrap justify-between items-center">
            <div className="space-x-2">
              {[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA].map((v) => (
                <button
                  key={v}
                  className={clsx(
                    "px-4 py-2 rounded-lg text-sm font-medium transition",
                    view === v
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 dark:bg-gray-700 dark:text-white hover:bg-gray-300"
                  )}
                  onClick={() => setView(v)}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          <Calendar
            localizer={localizer}
            events={filteredEvents}
            startAccessor="start"
            endAccessor="end"
            view={view}
            onView={(v) => setView(v)}
            date={date}
            onNavigate={handleNavigate}
            style={{ height: "calc(100vh - 200px)" }}
            selectable
            popup
            toolbar
            onSelectSlot={(slotInfo) => setSelectedDate(slotInfo.start)}
            eventPropGetter={(event) => {
              const bg = eventColors[event.type] || "bg-gray-300";
              return {
                className: `${bg} rounded px-2 py-1 text-sm text-white font-medium`,
              };
            }}
            className="rounded-xl shadow-lg"
          />
        </main>
      </motion.div>

      {/* Day View Modal with Background Video */}
      <AnimatePresence>
        {selectedDate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <video
              className="absolute inset-0 w-full h-full object-cover z-[-1]"
              autoPlay
              loop
              muted
              playsInline
            >
              <source
                src="https://videos.pexels.com/video-files/9057559/9057559-uhd_2560_1440_25fps.mp4"
                type="video/mp4"
              />
            </video>

            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md relative z-10"
            >
              <button
                className="absolute top-4 right-4 text-gray-600 hover:text-red-500"
                onClick={() => setSelectedDate(null)}
              >✕</button>
              <h2 className="text-xl font-bold mb-4">
                Events on {format(selectedDate, "PPP")}
              </h2>
              <ul className="space-y-4">
                {events
                  .filter(
                    (event) =>
                      new Date(event.start).toDateString() ===
                      selectedDate.toDateString()
                  )
                  .map((event, idx) => (
                    <li key={idx} className="p-3 rounded bg-gray-100 dark:bg-gray-700">
                      <div className="font-semibold">{event.title}</div>
                      <div className="text-sm">
                        {format(new Date(event.start), "hh:mm a")} - {format(new Date(event.end), "hh:mm a")}
                      </div>
                      <div className="text-sm">📍 {event.location}</div>
                      <div className="text-xs mt-1 text-gray-500 dark:text-gray-300">
                        {event.description || "No description"}
                      </div>
                      <div className="mt-2 space-x-2">
                        <button className="text-sm text-blue-600 hover:underline">Register</button>
                        <button className="text-sm text-green-600 hover:underline">Set Reminder</button>
                      </div>
                    </li>
                  ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Event Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <video
              className="absolute inset-0 w-full h-full object-cover z-[-1]"
              autoPlay
              loop
              muted
              playsInline
            >
              <source
                src="https://videos.pexels.com/video-files/9057559/9057559-uhd_2560_1440_25fps.mp4"
                type="video/mp4"
              />
            </video>

            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white dark:bg-gray-900 p-6 rounded-lg w-full max-w-xl relative shadow-lg z-10"
            >
              <h2 className="text-2xl font-bold mb-4">Add New Event</h2>
              <button
                className="absolute top-4 right-4 text-gray-600 hover:text-red-500"
                onClick={() => setShowAddModal(false)}
              >
                ✕
              </button>

              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Event Name"
                  className="w-full p-2 rounded border dark:border-gray-600 bg-gray-50 dark:bg-gray-800"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                />
                <input
                  type="datetime-local"
                  className="w-full p-2 rounded border dark:border-gray-600 bg-gray-50 dark:bg-gray-800"
                  value={format(new Date(newEvent.start), "yyyy-MM-dd'T'HH:mm")}
                  onChange={(e) => setNewEvent({ ...newEvent, start: new Date(e.target.value) })}
                />
                <input
                  type="datetime-local"
                  className="w-full p-2 rounded border dark:border-gray-600 bg-gray-50 dark:bg-gray-800"
                  value={format(new Date(newEvent.end), "yyyy-MM-dd'T'HH:mm")}
                  onChange={(e) => setNewEvent({ ...newEvent, end: new Date(e.target.value) })}
                />
                <input
                  type="text"
                  placeholder="Location"
                  className="w-full p-2 rounded border dark:border-gray-600 bg-gray-50 dark:bg-gray-800"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                />
                <select
                  className="w-full p-2 rounded border dark:border-gray-600 bg-gray-50 dark:bg-gray-800"
                  value={newEvent.type}
                  onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
                >
                  {Object.keys(eventColors).map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <textarea
                  placeholder="Description"
                  className="w-full p-2 rounded border dark:border-gray-600 bg-gray-50 dark:bg-gray-800"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                />
                <button
                  type="button"
                  onClick={handleAddEvent}
                  className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Save Event
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
