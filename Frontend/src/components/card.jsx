import React from 'react';

const Card = ({ image, title, date, desc }) => (
  <div className="relative w-80 max-w-full rounded-3xl overflow-hidden shadow-2xl border border-white/30 bg-white/10 backdrop-blur-2xl group transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:shadow-[0_8px_32px_0_rgba(236,72,153,0.25)] hover:border-pink-400/60">
    {/* Gradient overlay for glass effect */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-pink-200/10 to-fuchsia-400/10 opacity-70 pointer-events-none z-0" />
    {/* Inner glow */}
    <div className="absolute inset-0 rounded-3xl border-2 border-pink-400/20 opacity-40 blur-[2px] pointer-events-none z-0" />
    <img src={image} alt={title} className="w-full h-48 object-cover z-10 relative" />
    <div className="relative z-10 p-6 flex flex-col gap-2">
      <div className="text-white font-extrabold text-xl mb-1 drop-shadow-lg tracking-tight leading-tight">
        {title}
      </div>
      <div className="text-white/80 text-xs mb-2 font-semibold tracking-wide uppercase">
        {date}
      </div>
      <div className="text-white/90 text-base leading-relaxed font-medium">
        {desc}
      </div>
    </div>
  </div>
);

export default Card; 