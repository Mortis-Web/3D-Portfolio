import { useState } from 'react';
import NavItems from './NavItems';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className={`navSlide ${isOpen ? 'close' : ''} duration-300  orbitron group fixed top-0 right-0 left-0 z-100 opacity-0 backdrop-blur-lg`}>
      <div className="absolute top-0 left-0 -z-10 h-full max-h-full w-full overflow-hidden">
        <span className="absolute top-0 left-0 -z-10 mx-auto h-full w-50 -translate-x-[calc(100%+150px)] -skew-x-30 bg-white opacity-45 blur-3xl ease-in-out group-hover:translate-x-[calc(100vw+150px)] group-hover:transition-transform group-hover:duration-1000"></span>
      </div>
      <div className="container">
        <div className="mx-auto flex items-center justify-between px-3 py-4 md:px-5">
          <a
            href="https://github.com/Mortis-Web/"
            className="text-xl font-bold text-neutral-400 transition-colors hover:text-white"
          >
            Mortis-Web
          </a>
          <button
            onClick={() => setIsOpen(prev => !prev)}
            className="flex cursor-pointer text-neutral-400 hover:text-white focus:outline-none sm:hidden"
            aria-label="toggle menu"
          >

            <div className='menu relative isolate w-8 h-6'>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
          <nav className="hidden sm:flex ">
            <NavItems />
          </nav>
        </div>
      </div>
      <aside className={`nav-sidebar sm:hidden ${isOpen ? 'h-auto' : 'h-0'}`}>
        <nav className="p-5 backdrop-blur-xl">
          <NavItems />
        </nav>
      </aside>
    </header>
  );
};

export default Navbar;
