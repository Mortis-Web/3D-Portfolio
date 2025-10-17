import { Suspense, lazy } from 'react';
import Footer from '../sections/Footer';
import Hero from '../sections/Hero';

// 🧩 Lazy-loaded sections
const About = lazy(() => import('../sections/About'));
const Projects = lazy(() => import('../sections/Projects'));
const Experience = lazy(() => import('../sections/Experience'));
const Feedback = lazy(() => import('../sections/Feedback'));
const Contact = lazy(() => import('../sections/Contact'));

const HomePage = () => {
  return (
    <main>
      <Hero />

      <Suspense fallback={<>Loading...</>}>
        <About />
      </Suspense>

      <Suspense fallback={<>Loading...</>}>
        <Projects />
      </Suspense>

      <Suspense fallback={<>Loading...</>}>
        <Experience />
      </Suspense>

      <Suspense fallback={<>Loading...</>}>
        <Feedback />
      </Suspense>

      <Suspense fallback={<>Loading...</>}>
        <Contact />
      </Suspense>

      <Footer />
    </main>
  );
};

export default HomePage;
