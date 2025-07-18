import React from 'react';
import logo from '../assets/Logo.png';
import { scrollToTop } from '../utils/ScrollToTop';

const navLinks = [
  { label: 'Home', href: '#' },
  { label: 'Browse Events', href: '#' },
  { label: 'About', href: '#about' },
  { label: 'Login', href: '#' },
  { label: 'Register', href: '#' },
];

const Header = () => {
  return (
    <header className="absolute top-0 left-0 w-full flex items-center justify-between px-8 py-4 z-50">
      <div className="flex items-center gap-3">
        <img src={logo} alt="Divertion Logo" className="h-20 w-auto object-contain" />
        <span className="sr-only">Divertion</span>
      </div>
      <nav className="flex gap-6">
        {navLinks.map(link => {
          let className = "font-medium px-5 py-2 rounded-full transition";
          if (link.label === 'Login') {
            className += " bg-pink-500 text-white hover:bg-pink-600 shadow";
          } else if (link.label === 'Register') {
            className += " border border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white";
          } else {
            className += " text-white hover:bg-pink-500/80 hover:text-white";
          }
          return (
            <a
              key={link.label}
              href={link.href}
              className={className}
              onClick={e => {
                e.preventDefault();
                scrollToTop();
              }}
            >
              {link.label}
            </a>
          );
        })}
      </nav>
    </header>
  );
};

export default Header;
