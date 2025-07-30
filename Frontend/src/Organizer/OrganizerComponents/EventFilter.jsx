import React, { useState } from 'react';

const categories = [
  'Music',
  'Art',
  'Technology',
  'Sports',
  'Education',
  'Health',
  'Business',
];

const sortOptions = [
  { value: 'date', label: 'Date' },
  { value: 'popularity', label: 'Popularity' },
  { value: 'revenue', label: 'Revenue' },
];

const EventFilter = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [sortBy, setSortBy] = useState('date');

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleReset = () => {
    setSelectedCategories([]);
    setLocation('');
    setStartDate('');
    setEndDate('');
    setSortBy('date');
  };

  const handleApplyFilters = (e) => {
    e.preventDefault();
    console.log({
      selectedCategories,
      location,
      startDate,
      endDate,
      sortBy,
    });
  };

  return (
    <form
      onSubmit={handleApplyFilters}
      className="p-6 bg-transparent rounded-xl max-w-sm flex flex-col gap-6 font-sans text-white border border-pink-500 shadow-lg"
    >
      <fieldset className="border-none p-0 m-0">
        <legend className="font-semibold mb-2 text-lg">Category / Tags</legend>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <label key={category} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                value={category}
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                className="accent-pink-500"
              />
              {category}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="flex flex-col gap-1 text-sm">
        Location
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter location"
          className="p-2 rounded-md border border-gray-400 bg-transparent text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      </label>

      <fieldset className="border-none p-0 m-0">
        <legend className="font-semibold mb-2 text-lg">Date range</legend>
        <div className="flex flex-wrap gap-3 items-center">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="p-2 rounded-md border border-gray-400 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-pink-500 flex-1"
          />
          <span className="text-white">to</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="p-2 rounded-md border border-gray-400 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-pink-500 flex-1"
          />
        </div>
      </fieldset>

      <label className="flex flex-col gap-1 text-sm">
        Sort by
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-2 rounded-md border border-gray-400 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value} className="text-black">
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={handleReset}
          className="px-4 py-2 rounded-md border border-gray-400 text-white hover:bg-gray-700 transition"
        >
          Reset
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-md bg-pink-600 hover:bg-pink-700 text-white transition"
        >
          Apply Filters
        </button>
      </div>
    </form>
  );
};

export default EventFilter;
