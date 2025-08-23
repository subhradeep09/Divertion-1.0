import React, { useEffect, useState } from 'react';
import logo from '../assets/Logo.png';
import { scrollToTop } from '../utils/ScrollToTop';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Footer = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser && storedUser !== "undefined") {
        try {
          const parsedUser = JSON.parse(storedUser);
          if (parsedUser && parsedUser.username) {
            setUser(parsedUser);
          } else {
            localStorage.removeItem('user');
            setUser(null);
          }
        } catch (err) {
          console.warn("Failed to parse user from localStorage:", storedUser, err);
          localStorage.removeItem('user');
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    loadUser();
    window.addEventListener('storage', loadUser);
    return () => window.removeEventListener('storage', loadUser);
  }, []);

  // Helper for smooth scroll with lenis fallback
  function getLenis() {
    return window.lenis || {
      scrollTo: (el, opts) => el.scrollIntoView({ behavior: 'smooth' }),
    };
  }

  // Define navigation links based on user role
  const getNavLinks = () => {
    if (!user) {
      return [
        { label: 'Home', href: '/' },
        { label: 'Browse Events', href: '/events' },
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' },
      ];
    }
    
    if (user.role === 'admin') {
      return [
        { label: 'Dashboard', href: '/' },
        { label: 'Manage Users', href: '/manage-users' },
        { label: 'Manage Events', href: '/manage-events' },
        { label: 'Reports', href: '/reports' },
      ];
    }
    
    if (user.role === 'organizer') {
      return [
        { label: 'My Events', href: '/' },
        { label: 'Create Event', href: '/create-event' },
        { label: 'Registrations', href: '/organizer/registrations' },
      ];
    }
    
    // Default to attendee links
    return [
      { label: 'Home', href: '/' },
      { label: 'Browse Events', href: '/view-events' },
      { label: 'My Tickets', href: '/booking-history' },
      { label: 'Upcoming Events', href: '/upcoming-bookings' },
    ];
  };

  const navLinks = getNavLinks();
  
  const legalLinks = [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Service', href: '/terms-of-service' },
    { label: 'Cookie Policy', href: '/cookie-policy' },
  ];

  const socialLinks = [
    { label: 'Twitter', href: 'https://twitter.com', icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.47.69a4.3 4.3 0 001.88-2.37 8.59 8.59 0 01-2.72 1.04A4.28 4.28 0 0016.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.99C7.69 9.13 4.07 7.38 1.64 4.7c-.37.64-.58 1.39-.58 2.19 0 1.51.77 2.84 1.95 3.62-.72-.02-1.39-.22-1.98-.55v.06c0 2.11 1.5 3.87 3.5 4.27-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.68 2.11 2.9 3.97 2.93A8.6 8.6 0 012 19.54c-.29 0-.57-.02-.85-.05A12.13 12.13 0 007.29 21.5c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.18 8.18 0 0024 4.59a8.36 8.36 0 01-2.54.7z" /></svg>
    ) },
    { label: 'LinkedIn', href: 'https://linkedin.com', icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z" /></svg>
    ) },
    { label: 'Instagram', href: 'https://instagram.com', icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.584.012 4.85.07 1.17.056 1.97.24 2.43.41.59.22 1.01.48 1.45.92.44.44.7.86.92 1.45.17.46.354 1.26.41 2.43.058 1.266.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.056 1.17-.24 1.97-.41 2.43-.22.59-.48 1.01-.92 1.45-.44.44-.86.7-1.45.92-.46.17-1.26.354-2.43.41-1.266.058-1.65.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.056-1.97-.24-2.43-.41-.59-.22-1.01-.48-1.45-.92-.44-.44-.7-.86-.92-1.45-.17-.46-.354-1.26-.41-2.43C2.212 15.634 2.2 15.25 2.2 12s.012-3.584.07-4.85c.056-1.17.24-1.97.41-2.43.22-.59.48-1.01.92-1.45.44-.44.86-.7 1.45-.92.46-.17 1.26-.354 2.43-.41C8.416 2.212 8.8 2.2 12 2.2zm0-2.2C8.736 0 8.332.012 7.052.07 5.77.128 4.77.312 4.01.54c-.77.23-1.42.54-2.07 1.19-.65.65-.96 1.3-1.19 2.07-.23.76-.412 1.76-.47 3.04C.012 8.332 0 8.736 0 12c0 3.264.012 3.668.07 4.948.058 1.28.24 2.28.47 3.04.23.77.54 1.42 1.19 2.07.65.65 1.3.96 2.07 1.19.76.23 1.76.412 3.04.47C8.332 23.988 8.736 24 12 24s3.668-.012 4.948-.07c1.28-.058 2.28-.24 3.04-.47.77-.23 1.42-.54 2.07-1.19.65-.65.96-1.3 1.19-2.07.23-.76.412-1.76.47-3.04.058-1.28.07-1.684.07-4.948s-.012-3.668-.07-4.948c-.058-1.28-.24-2.28-.47-3.04-.23-.77-.54-1.42-1.19-2.07-.65-.65-1.3-.96-2.07-1.19-.76-.23-1.76-.412-3.04-.47C15.668.012 15.264 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm7.844-10.406a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" /></svg>
    ) },
    { label: 'GitHub', href: 'https://github.com', icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.20.7-3.88-1.54-3.88-1.54-.53-1.34-1.30-1.70-1.30-1.70-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.20 1.78 1.20 1.04 1.78 2.73 1.27 3.40.97.11-.75.41-1.27.74-1.56-2.55-.29-5.23-1.28-5.23-5.70 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 012.90-.39c.98.01 1.97.13 2.90.39 2.20-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.80 1.19 1.83 1.19 3.09 0 4.43-2.69 5.41-5.25 5.70.42.36.79 1.09.79 2.20 0 1.59-.01 2.87-.01 3.26 0 .31.21.68.80.56C20.71 21.39 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z" /></svg>
    ) },
    { label: 'Facebook', href: 'https://facebook.com', icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.405 24 24 23.408 24 22.674V1.326C24 .592 23.405 0 22.675 0" /></svg>
    ) },
  ];

  return (
    <footer className="relative overflow-hidden py-10 px-4 bg-black/90 text-white border-t border-gray-800 backdrop-blur-md shadow-lg">
      {/* Colored shadow */}
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 w-2/3 h-32 bg-pink-500/40 blur-2xl rounded-full z-0 pointer-events-none" />
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
        {/* Brand/Logo */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <img src={logo} alt="Logo" className="h-25 w-auto mb-1" />
          <span className="text-lg font-bold tracking-wide">Divertion</span>
          <span className="text-sm text-pink-400">Your gateway to extraordinary events.</span>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-2 items-center md:items-start">
          <span className="font-semibold mb-2 text-pink-400">Navigation</span>
          {navLinks.map(link => {
            if (link.href === '#features') {
              // Special logic for Features anchor
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-white/80 hover:text-pink-400 text-sm transition cursor-pointer"
                  onClick={e => {
                    e.preventDefault();
                    scrollToTop();
                    const scrollToFeatures = () => {
                      const el = document.getElementById('features');
                      if (el) {
                        const lenis = getLenis();
                        lenis.scrollTo(el, { duration: 1.2, easing: t => 1 - Math.pow(1 - t, 3) });
                      }
                    };

                    if (location.pathname !== '/') {
                      navigate('/', {
                        state: { scrollTo: 'features' },
                      });
                      setTimeout(scrollToFeatures, 300);
                    } else {
                      scrollToFeatures();
                    }
                  }}
                >
                  {link.label}
                </a>
              );
            } else if (link.href.startsWith('/')) {
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-white/80 hover:text-pink-400 text-sm transition"
                  onClick={scrollToTop}
                >
                  {link.label}
                </Link>
              );
            } else {
              // Internal section anchor
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-white/80 hover:text-pink-400 text-sm transition cursor-pointer"
                  onClick={e => {
                    e.preventDefault();
                    scrollToTop();
                    const el = document.getElementById(link.href.replace('#', ''));
                    if (window.lenis && el) {
                      window.lenis.scrollTo(el, { duration: 1.2, easing: t => 1 - Math.pow(1 - t, 3) });
                    } else if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  {link.label}
                </a>
              );
            }
          })}
        </nav>

        {/* Legal Links */}
        <nav className="flex flex-col gap-2 items-center md:items-start">
          <span className="font-semibold mb-2 text-pink-400">Legal</span>
          {legalLinks.map(link => (
            <Link
              key={link.label}
              to={link.href}
              className="text-white/80 hover:text-pink-400 text-sm transition"
              onClick={scrollToTop}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Social Media & Contact */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <div>
            <span className="font-semibold mb-2 block text-pink-400">Connect With Us</span>
            <div className="flex gap-4">
              {socialLinks.map(link => (
                <a 
                  key={link.label} 
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white/80 hover:text-pink-400 transition"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
          
          <div className="mt-4">
            <span className="font-semibold mb-2 block text-pink-400">Contact</span>
            <p className="text-sm text-white/80">support@divertion.com</p>
            <p className="text-sm text-white/80">+1 (555) 123-4567</p>
          </div>
        </div>
      </div>
      
      <div className="mt-8 pt-6 border-t border-gray-700/50 text-xs text-white/60 text-center relative z-10">
        &copy; {new Date().getFullYear()} Divertion. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;