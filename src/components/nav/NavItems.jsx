import { useEffect, useRef, useState } from 'react';
import { AiFillHome } from 'react-icons/ai';
import { FaInfoCircle } from 'react-icons/fa';
import { MdPermContactCalendar } from 'react-icons/md';
import { TbBrandReact } from 'react-icons/tb';
import { navLinks } from '../../constants';

const icons = {
  AiFillHome,
  FaInfoCircle,
  TbBrandReact,
  MdPermContactCalendar,
};

const NavItems = () => {
  const [active, setActive] = useState('home'); // default section
  const activeRef = useRef(null);
  const liRefs = useRef({});

  // Move the active indicator
  useEffect(() => {
    if (activeRef.current && liRefs.current[active]) {
      const { offsetLeft } = liRefs.current[active];
      activeRef.current.style.transform = `translateX(${offsetLeft}px)`;
    }
  }, [active]);

  // IntersectionObserver to update active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0,
      }
    );

    navLinks.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // Smooth scroll helper
  const handleClick = id => {
    setActive(id);
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <ul className="nav-ul relative">
      <span
        className="active_indicator absolute bottom-0 h-1 w-10 bg-white transition-transform"
        ref={activeRef}
      />
      {navLinks.map(({ id, name, icon }) => {
        const Icon = icons[icon];
        return (
          <li
            key={id}
            ref={el => (liRefs.current[id] = el)}
            className={`nav-li relative isolate ${active === id ? 'active' : ''}`}
          >
            <a
              href={`#${id}`}
              className="nav-li_a flex w-fit items-center gap-1 text-lg"
              onClick={e => {
                e.preventDefault();
                handleClick(id);
              }}
            >
              <Icon className="min-w-4" /> {name}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default NavItems;
