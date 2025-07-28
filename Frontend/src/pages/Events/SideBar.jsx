import React, { useState } from 'react';

const SideBar = () => {
  const [price, setPrice] = useState(500);

  return (
    <aside className="hidden lg:block w-72 rounded-xl shadow-xl p-6 space-y-6 sticky top-24 bg-white/10 backdrop-blur-xl border border-white/20">
      <div>
        <h3 className="font-semibold text-lg mb-2 text-white">Categories</h3>
        <div className="space-y-2">
          {['Music', 'Tech', 'Arts', 'Sports', 'Workshops'].map((cat) => (
            <label key={cat} className="block text-sm text-white">
              <input type="checkbox" className="mr-2 accent-pink-500" /> {cat}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-lg mb-2 text-white">Date</h3>
        <input type="date" className="w-full border rounded px-2 py-1 text-white placeholder-white bg-transparent border-white/20" />
      </div>

      <div>
        <h3 className="font-semibold text-lg mb-2 text-white">Price Range</h3>
        <input
          type="range"
          min="0"
          max="1000"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full accent-pink-500 cursor-pointer"
        />
        <div className="flex justify-between text-sm text-white mt-1">
          <span>$0</span>
          <span>${price}</span>
          <span>$1000+</span>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-lg mb-2 text-white">Location</h3>
        <input
          type="text"
          placeholder="Enter city or location"
          className="w-full border rounded px-2 py-1 text-white placeholder-white bg-transparent border-white/20"
        />
      </div>

      <div>
        <h3 className="font-semibold text-lg mb-2 text-white">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {['Outdoor', 'Free', 'Networking', 'Food', 'Live'].map((tag) => (
            <span
              key={tag}
              className="text-sm bg-pink-200 text-pink-800 px-3 py-1 rounded-full cursor-pointer hover:bg-pink-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default SideBar;