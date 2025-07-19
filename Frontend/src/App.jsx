import Header from './components/header';
import Footer from './components/footer';
import LandingPage from './pages/landing/landingpage';
import { useEffect } from 'react';
import Lenis from 'lenis';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1, // smoothness
      smooth: true,
    });

    // Expose globally
    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  return (
    <>
      <Header />
      <LandingPage />
      <Footer />
    </>
  );
}

export default App;
