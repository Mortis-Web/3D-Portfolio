import { useState } from "react";
import NavItems from "./NavItems";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="fixed navSlide opacity-0 top-0 group right-0 left-0 z-100  backdrop-blur-lg  ">
      <div className="max-h-full absolute left-0 top-0 h-full w-full -z-10  overflow-hidden">
        <span className="absolute top-0 left-0 -z-10 mx-auto h-full w-50 -translate-x-[calc(100%+150px)] -skew-x-30 bg-white opacity-45 blur-3xl ease-in-out  group-hover:transition-transform  group-hover:translate-x-[calc(100vw+150px)] group-hover:duration-1000"></span>
      </div>
      <div className="container">
        <div className="flex justify-between items-center py-4 c-space mx-auto">
          <a
            href="/"
            className="text-neutral-400 font-bold text-xl  hover:text-white transition-colors"
          >
            Mortis-Web
          </a>
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="text-neutral-400 cursor-pointer hover:text-white focus:outline-none sm:hidden flex "
            aria-label="toggle menu"
          >
            <img
              src={isOpen ? "/assets/close.svg" : "/assets/menu.svg"}
              alt="toggle"
              className="w-8 h-8"
            />
          </button>
          <nav className="sm:flex hidden">
            <NavItems />
          </nav>
        </div>
      </div>
      <aside className={`nav-sidebar sm:hidden  ${isOpen ? "h-auto" : "h-0"}`}>
        <nav className="p-5">
          <NavItems />
        </nav>
      </aside>
    </header>
  );
};

export default Navbar;
