import React from 'react';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Feedback from '../sections/Feedback';
import Projects from '../sections/Projects';
import Contact from '../sections/Contact';
import Footer from '../sections/Footer';
import Experience from '../sections/Experience';

const HomePage = () => {
  return (
    <main>
      <Hero />
      <About />
      <Projects />
      <Experience/>
      <Feedback />
      <Contact/>
      <Footer/>
    </main>
  );
};

export default HomePage;
