import React, { useState } from 'react';

const Filter = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [dateRange, setDateRange] = useState('');
  const [price, setPrice] = useState('');

  return (
    <div className="filter-bar flex flex-wrap gap-4 p-6 rounded-2xl border border-gray-200 shadow-md backdrop-blur-sm bg-white/50">
      <input
        type="text"
        placeholder="Search events, city, or organizer"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="px-4 py-2 bg-white/80 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-pink-500 w-full sm:w-auto"
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)} className="px-4 py-2 bg-white/80 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-pink-500 w-full sm:w-auto">
        <option value="">All Categories</option>
        <option value="music">Music</option>
        <option value="tech">Tech</option>
        <option value="arts">Arts</option>
        <option value="sports">Sports</option>
      </select>
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="px-4 py-2 bg-white/80 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-pink-500 w-full sm:w-auto"
      />
      <select value={dateRange} onChange={(e) => setDateRange(e.target.value)} className="px-4 py-2 bg-white/80 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-pink-500 w-full sm:w-auto">
        <option value="">Any Date</option>
        <option value="today">Today</option>
        <option value="weekend">This Weekend</option>
        <option value="custom">Custom Range</option>
      </select>
      <select value={price} onChange={(e) => setPrice(e.target.value)} className="px-4 py-2 bg-white/80 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-pink-500 w-full sm:w-auto">
        <option value="">Any Price</option>
        <option value="free">Free</option>
        <option value="paid">Paid</option>
      </select>
    </div>
  );
};

export default Filter;