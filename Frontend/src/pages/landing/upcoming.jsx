import React from 'react';
import Card from '../../components/card';

const events = [
  {
    title: 'DJ Night Party',
    date: 'Nov 19, 2024',
    image: 'https://placehold.co/300x200?text=DJ+Night',
    desc: 'Dance the night away with top DJs and a vibrant crowd.'
  },
  {
    title: 'The Mission',
    date: 'Nov 19, 2024',
    image: 'https://placehold.co/300x200?text=Mission',
    desc: 'A unique event experience with immersive activities.'
  },
  {
    title: 'Planet Ibiza',
    date: 'Nov 19, 2024',
    image: 'https://placehold.co/300x200?text=Ibiza',
    desc: 'Feel the Ibiza vibes with music, lights, and fun.'
  },
];

const Upcoming = () => (
  <section className="relative bg-gradient-to-br from-pink-500 via-pink-600 to-fuchsia-700 py-8 px-4 min-h-160 flex flex-col items-center justify-center overflow-hidden">
    {/* Lighting effect */}
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[30vw] max-w-4xl max-h-[500px] bg-pink-400/40 blur-3xl rounded-full z-0 shadow-[0_0_120px_60px_rgba(236,72,153,0.25)]" />
    <div className="absolute inset-0 bg-white/5 backdrop-blur-sm pointer-events-none z-0" />
    <h2 className="relative z-10 text-4xl md:text-5xl font-extrabold text-white text-center mb-14 drop-shadow-lg tracking-tight">
      Upcoming Events
    </h2>
    <div className="relative z-10 flex flex-wrap justify-center gap-10">
      {events.map((event, idx) => (
        <Card key={idx} {...event} index={idx + 1} />
      ))}
    </div>
  </section>
);

export default Upcoming; 