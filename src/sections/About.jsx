import {
  forwardRef,
  lazy,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import toast from 'react-hot-toast';
import { useMediaQuery } from 'react-responsive';
import { useInView } from '../hooks/useInView';
import Button from '../utils/Button';
import Header from '../utils/Header';
import ParticleDiv from '../utils/Particles';

const Globe = lazy(() => import('react-globe.gl'));

const About = forwardRef((props, ref) => {
  const globeRef = useRef(null);
  const viewRef = useRef(null);
  const isVisible = useInView(viewRef, { threshold: 0.1 });
  const [hasCopy, setHasCopy] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText('memaraaa123@gmail.com');
    setHasCopy(true);
    toast.success('Copied to clipboard! 😊');
    setTimeout(() => setHasCopy(false), 2000);
  }, []);

  // Globe setup only when visible
  useEffect(() => {
    if (!isVisible || !globeRef.current) return;

    const controls = globeRef.current.controls();
    if (controls) {
      controls.autoRotate = true;
      controls.autoRotateSpeed = 1;
      controls.enableZoom = false;
      controls.enablePan = true;
      controls.enableDamping = true;
    }
  }, [isVisible]);

  const mediumDevice = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
  const smallDevice = useMediaQuery({ maxWidth: 480 });

  const cards = document.querySelectorAll('#about figure');
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--x', `${x}px`);
      card.style.setProperty('--y', `${y}px`);
    });
  });

  return (
    <section ref={ref} id="about" className="c-space group my-20 text-white">
      <div className="container" ref={viewRef}>
        <Header headerText="About Me" />

        <div className="grid h-full grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 xl:grid-rows-4">
          {/* Card 1 */}
          <article className="tilt-wrapper col-span-1 duration-200 hover:brightness-120 xl:row-span-2">
            <figure className="grid-container">
              <img
                src={`${import.meta.env.BASE_URL}assets/grid1.webp`}
                alt="gridImg1"
                className="xs:h-[276px] h-fit w-full object-contain sm:scale-110"
                loading="lazy"
                decoding="async"
              />
              <p className="grid-headtext">Hi Im Mohammed</p>
              <p className="grid-subtext">
                With 3 years of experience, I have honed my skills in both
                frontend and UI/UX, creating dynamic and responsive websites.
              </p>
            </figure>
          </article>

          {/* Card 2 */}
          <article className="tilt-wrapper col-span-1 duration-200 hover:brightness-120 xl:row-span-2">
            <figure className="grid-container">
              <img
                src={`${import.meta.env.BASE_URL}assets/grid2.webp`}
                alt="grid2"
                loading="lazy"
                decoding="async"
                className="xs:scale-140 h-[276px] w-full scale-120 object-contain"
              />
              <p className="grid-headtext">Tech Stack</p>
              <p className="grid-subtext">
                I specialize in a variety of languages, frameworks, and tools
                that allow me to build robust and scalable applications
              </p>
            </figure>
          </article>

          {/* Card 3 (Globe) */}
          <article className="tilt-wrapper xs:max-h-none col-span-1 max-h-[540px] duration-200 hover:brightness-120 xl:row-span-3">
            <figure className="grid-container">
              <div className="relative isolate flex h-fit w-full items-center justify-center overflow-hidden rounded-3xl drop-shadow-[0px_0px_50px] drop-shadow-blue-400/45 sm:h-[326px] xl:mt-15">
                <Globe
                  ref={globeRef}
                  height={mediumDevice ? 375 : smallDevice ? 300 : 475}
                  width={mediumDevice ? 270 : 400}
                  backgroundColor="rgba(0,0,0,0)"
                  backgroundImageOpacity={0.5}
                  showAtmosphere
                  showGraticules
                  position={[0, 0, 4]}
                  globeImageUrl="https://unpkg.com/three-globe/example/img/earth-day.jpg"
                  labelsData={[
                    {
                      lat: 40,
                      lng: -100,
                      text: 'Im Here!',
                      color: 'white',
                      size: 200,
                    },
                  ]}
                />
              </div>

              <p className="grid-headtext mt-auto">
                I’m very flexible with time zone communications & locations
              </p>
              <p className="grid-subtext">
                I'm based in Egypt, Jordan and open to remote work worldwide.
              </p>

              <a
                href="#contact"
                onClick={e => {
                  e.preventDefault();
                  document
                    .querySelector('#contact')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full"
              >
                <Button name="Contact me!" isBeam containerClass="w-full" />
              </a>
            </figure>
          </article>

          {/* Card 4 */}
          <article className="tilt-wrapper duration-200 hover:brightness-120 xl:col-span-2 xl:row-span-2">
            <figure className="grid-container relative isolate overflow-hidden">
              <img
                src={`${import.meta.env.BASE_URL}assets/grid3.webp`}
                alt="grid3"
                loading="lazy"
                decoding="async"
                className="xs:scale-130 h-full min-h-[200px] w-full scale-175 object-contain md:scale-200 lg:scale-175 xl:scale-110"
              />
              <p className="grid-headtext">My Passion for Coding</p>
              <p className="grid-subtext">
                I love solving problems and building things through code.
                Programming isn't just my profession—it's my passion. I enjoy
                exploring new technologies, and enhancing my skills.
              </p>
            </figure>
          </article>

          {/* Card 5 */}
          <article className="tilt-wrapper relative isolate min-h-70 duration-200 hover:brightness-120 md:col-span-2 lg:col-span-1 lg:min-h-80 xl:col-span-1 xl:row-span-1 xl:max-h-60 xl:min-h-60">
            {isVisible && <ParticleDiv />}

            <figure className="grid-container relative isolate justify-end overflow-hidden">
              <img
                src={`${import.meta.env.BASE_URL}assets/grid4.webp`}
                alt="grid4"
                loading="lazy"
                decoding="async"
                className="xs:scale-200 -top-30 left-0 -z-10 h-40 w-full origin-top scale-160 object-contain lg:absolute lg:-top-3 lg:h-fit lg:scale-90 xl:-top-5"
              />
              <p className="grid-headtext text-center">Contact me</p>

              <div className="copy-container" onClick={handleCopy}>
                <img
                  src={
                    hasCopy
                      ? `${import.meta.env.BASE_URL}assets/tick.svg`
                      : `${import.meta.env.BASE_URL}assets/copy.svg`
                  }
                  className="h-[33px] w-[32px] scale-80 duration-200 hover:brightness-140"
                  alt="Copy email"
                  decoding="async"
                />
                <button
                  disabled={hasCopy}
                  className="text-gray_gradient font-medium text-white duration-200 select-none text-shadow-2xs hover:brightness-140 hover:text-shadow-white/50 md:text-xl"
                >
                  memaraaa123@gmail.com
                </button>
              </div>
            </figure>
          </article>
        </div>
      </div>
    </section>
  );
});

export default About;
