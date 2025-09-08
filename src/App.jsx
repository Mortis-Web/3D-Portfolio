import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/nav/Navbar';
import PauseScroll from './hooks/PauseScroll';
import SEO from './hooks/SEO';
import useLenis from './hooks/SmoothScroll';
import use3DTilt from './hooks/Use3DTilt';
import HomePage from './Pages/HomePage';

const App = () => {
  useLenis();
  use3DTilt();

  return (
    <>
      <SEO
        description="Explore my interactive 3D projects built with React and Three.js."
        url="https://mohamedemara.site/"
        image="https://mohamedemara.site/preview.jpg"
      />

      <PauseScroll duration={5000} />
      <Toaster position="bottom-right" reverseOrder={false} />

      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
};

export default App;
