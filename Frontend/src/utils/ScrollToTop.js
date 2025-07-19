import Lenis from 'lenis';

// Create a singleton Lenis instance
let lenisInstance = null;

export function getLenis() {
  if (!lenisInstance) {
    lenisInstance = new Lenis();
  }
  return lenisInstance;
}

export function scrollToTop(options = { duration: 1.2, easing: t => 1 - Math.pow(1 - t, 3) }) {
  if (window.lenis) {
    window.lenis.scrollTo(0, options);
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
} 