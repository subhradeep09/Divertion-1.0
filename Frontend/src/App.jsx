import Header from './components/header';
import Footer from './components/footer';
import { useEffect } from 'react';
import Lenis from 'lenis';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './layouts/AppRouter';

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
    <Router>
      <Header />
      <AppRouter />
      <Footer />
    </Router>
  );
}

export default App;
