import React from 'react';
import { useNavigate } from 'react-router-dom';

const categories = [
  {
    label: 'Comedy Shows',
    filter: 'comedy',
    image: 'https://images.pexels.com/photos/3071456/pexels-photo-3071456.jpeg',
    count: '30+ Events'
  },
  {
    label: 'Theatre Shows',
    filter: 'theatre',
    image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg',
    count: '10+ Events'
  },
  {
    label: 'Music Shows',
    filter: 'music',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4',
    count: '35+ Events'
  },
  {
    label: 'Amusement Parks',
    filter: 'parks',
    image: 'https://images.pexels.com/photos/26551246/pexels-photo-26551246.jpeg',
    count: '8 Events'
  },
  {
    label: 'Kids',
    filter: 'kids',
    image: 'https://images.pexels.com/photos/7031302/pexels-photo-7031302.jpeg',
    count: '4 Events'
  },
  {
    label: 'Art & Craft',
    filter: 'art',
    image: 'https://images.pexels.com/photos/1047540/pexels-photo-1047540.jpeg',
    count: '125+ Events'
  },
  {
    label: 'Food Festivals',
    filter: 'food',
    image: 'https://images.pexels.com/photos/29992351/pexels-photo-29992351.jpeg',
    count: '20+ Events'
  },
  {
    label: 'Fashion Shows',
    filter: 'fashion',
    image: 'https://images.pexels.com/photos/4023351/pexels-photo-4023351.jpeg',
    count: '15+ Events'
  }
];

const CategoryGrid = () => {
  const navigate = useNavigate();

  const handleClick = (filter) => {
    navigate(`/events?category=${filter}`);
  };

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-pink-500 opacity-30 blur-3xl z-0" style={{filter:'blur(120px)'}}></div>
      <div className="pointer-events-none absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-blue-500 opacity-25 blur-3xl z-0" style={{filter:'blur(100px)'}}></div>
      <div className="pointer-events-none absolute bottom-0 left-1/2 w-[350px] h-[350px] rounded-full bg-purple-500 opacity-20 blur-3xl z-0" style={{filter:'blur(90px)'}}></div>
      <section className="px-6 md:px-12 py-12 bg-[#111113]">
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-1 mb-4 text-xs font-semibold tracking-wider text-pink-600 uppercase bg-pink-200 rounded-full">
            Discover by Interest
          </span>
          <h2 className="text-5xl font-bold text-white mb-4 font-serif">Event Categories</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-pink-600 mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {categories.map((cat) => (
            <div
              key={cat.filter}
              className="relative rounded-xl overflow-hidden shadow-lg cursor-pointer group"
              onClick={() => handleClick(cat.filter)}
              style={{
                backgroundImage: `url(${cat.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '180px'
              }}
            >
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition duration-300 ease-in-out flex flex-col justify-center items-center">
                <h3 className="text-white font-bold text-lg">{cat.label}</h3>
                <p className="text-white text-sm">{cat.count}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CategoryGrid;