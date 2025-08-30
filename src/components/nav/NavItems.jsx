import { useEffect, useRef, useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { FaInfoCircle } from "react-icons/fa";
import { MdPermContactCalendar } from "react-icons/md";
import { TbBrandReact } from "react-icons/tb";
import { navLinks } from "../../constants";

const icons = {
  AiFillHome,
  FaInfoCircle,
  TbBrandReact,
  MdPermContactCalendar,
};

const NavItems = () => {
  const [active, setActive] = useState("home");
  const activeRef = useRef(null);
  const liRefs = useRef({});

  useEffect(() => {
    if (activeRef.current && liRefs.current[active]) {
      const { offsetLeft } = liRefs.current[active];
      activeRef.current.style.transform = `translateX(${offsetLeft}px)`;
    }
  }, [active]);

  return (
    <ul className="nav-ul">
      <span className="active_indicator" ref={activeRef}></span>
      {navLinks.map(({ id, href, name, icon }) => {
        const Icon = icons[icon];
        return (
          <li
            ref={(el) => (liRefs.current[id] = el)}
            key={id}
            className={`nav-li relative isolate ${
              active === id ? "active" : ""
            }`}
          >
            <a
              href={href}
              className="nav-li_a items-center flex gap-1"
              onClick={() => setActive(id)}
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
