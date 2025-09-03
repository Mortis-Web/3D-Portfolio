import { Route, Routes } from 'react-router-dom';
import Navbar from './components/nav/Navbar';
import PauseScroll from './hooks/PauseScroll';
import useLenis from './hooks/SmoothScroll';
import use3DTilt from './hooks/Use3DTilt';
import HomePage from './Pages/HomePage';
import { Toaster } from 'react-hot-toast';

const App = () => {
  useLenis();
  use3DTilt();

  return (
    <>
      <PauseScroll duration={5000} />
      <Toaster position="top-left" reverseOrder={false} />

      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
};

export default App;
