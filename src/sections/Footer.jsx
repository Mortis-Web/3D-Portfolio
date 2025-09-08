import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { IoLogoWhatsapp } from 'react-icons/io';

const Footer = () => {
  return (
    <footer className="c-space border-black-300 border-t px-3 pt-7 pb-2 select-none">
      {/* container */}
      <div className="container flex flex-wrap items-center justify-center xs:justify-between gap-5">
        <article className="text-white-500 flex gap-2">
          <p>Terms & Conditions</p>
          <p>|</p>
          <p>Privacy Policy</p>
        </article>

        <article className="flex gap-3 text-3xl">
          <div className="social-icon group bg-[#9e6dff]">
            <a
              href="https://github.com/Mortis-Web/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              title="Github"
            >
              <FaGithub className="duration-300 group-hover:text-[#9e6dff]" />
            </a>
          </div>
          <div className="social-icon group bg-[#0A66C2]">
            <a
              href="https://www.linkedin.com/in/mohamed-emara-1649a9327/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <FaLinkedin className="duration-300 group-hover:text-[#0A66C2]" />
            </a>{' '}
          </div>
          <div className="social-icon group bg-[#25D366]">
            <a
              href="https://wa.me/01097693049"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              title="WhatsApp"
            >
              <IoLogoWhatsapp className="duration-300 group-hover:text-[#25D366]" />
            </a>{' '}
          </div>
        </article>
      </div>
      <p className="text-white-500 mx-auto w-fit pt-3">
        © 2025 Mortis-Web. All Rights Reserved
      </p>
    </footer>
  );
};

export default Footer;
