import { forwardRef, useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';
import { useMediaQuery } from 'react-responsive';
import Button from '../utils/Button';
import Header from '../utils/Header';
import ParticleDiv from '../utils/Particles';

const About = forwardRef((props, ref) => {
  const globeRef = useRef();
  const [hasCopy, setHasCopy] = useState(false);

  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) return;

    const controls = globe.controls();
    controls.autoRotate = true; // spins the globe
    controls.autoRotateSpeed = 0.5; // adjust for slower/faster
    controls.enableZoom = false; // allow zoom
    controls.enablePan = true; // allow pan
    controls.enableDamping = true; // smoother motion
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText('memaraaa123@gmail.com');
    setHasCopy(true);
    setTimeout(() => {
      setHasCopy(false);
    }, 2000);
  };

  const mediumDevice = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
  const smallDevice = useMediaQuery({ maxWidth: 480 });

  return (
    <section ref={ref} id="about" className="c-space group my-20 text-white">
      <div className="container">
        <Header headerText={'About Me'} />
        <div className="grid h-full grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 xl:grid-rows-4">
          <article className="tilt-wrapper col-span-1 duration-200 hover:brightness-120 xl:row-span-2">
            <div className="">
              <figure className="grid-container">
                <img
                  src={`${import.meta.env.BASE_URL}assets/grid1.png`}
                  alt="gridImg1"
                  className="xs:h-[276px] h-fit w-full object-contain sm:scale-110"
                />
                <div>
                  <p className="grid-headtext">Hi Im Mohammed</p>
                </div>
                <div>
                  <p className="grid-subtext">
                    With 3 years of experience, I have honed my skills in both
                    frontend and UI/UX, creating dynamic and responsive
                    websites.{' '}
                  </p>
                </div>
              </figure>
            </div>
          </article>

          <article className="tilt-wrapper col-span-1 duration-200 hover:brightness-120 xl:row-span-2">
            <div className="">
              <figure className="grid-container">
                <img
                  src={`${import.meta.env.BASE_URL}assets/grid2.png`}
                  alt="grid1"
                  className="xs:h-[276px] scale-120 xs:scale-140 h-fit w-full object-contain"
                />
                <div>
                  <p className="grid-headtext">Tech Stack</p>
                </div>
                <div>
                  <p className="grid-subtext">
                    I specialize in a variety of languages, frameworks, and
                    tools that allow me to build robust and scalable
                    applications
                  </p>
                </div>
              </figure>
            </div>
          </article>
          <article className="tilt-wrapper xs:max-h-none max-h-[540px] col-span-1 duration-200 hover:brightness-120 xl:row-span-3">
            <div className="w-full">
              <figure className="grid-container">
                <div className="relative isolate flex h-fit w-full items-center justify-center overflow-hidden rounded-3xl sm:h-[326px] xl:mt-15">
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
                <div className="mt-auto">
                  <p className="grid-headtext">
                    I’m very flexible with time zone communications & locations
                  </p>
                </div>
                <div>
                  <p className="grid-subtext">
                    I'm based in Egypt, Jordan and open to remote work
                    worldwide.
                  </p>
                </div>
                <div>
                  <a
                    href="#contact"
                    onClick={e => {
                      e.preventDefault();
                      const section = document.querySelector('#contact');
                      section?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full"
                  >
                    <Button
                      name="Contact me!"
                      isBeam
                      containerClass=" w-full"
                    ></Button>
                  </a>
                </div>
              </figure>
            </div>
          </article>

          <article className="tilt-wrapper duration-200 hover:brightness-120 xl:col-span-2 xl:row-span-2">
            <div className="w-full">
              <figure className="grid-container relative isolate overflow-hidden">
                <img
                  src={`${import.meta.env.BASE_URL}assets/grid3.png`}
                  alt="grid3"
                  className="xs:scale-130 h-full min-h-[200px] w-full scale-175 object-contain md:scale-200 lg:scale-175 xl:scale-110"
                />
                <div className="">
                  <p className="grid-headtext">My Passion for Coding </p>
                </div>
                <div>
                  <p className="grid-subtext">
                    I love solving problems and building things through code.
                    Programming isn't just my profession—it's my passion. I
                    enjoy exploring new technologies, and enhancing my skills.
                  </p>
                </div>
              </figure>
            </div>
          </article>

          <article className="tilt-wrapper relative isolate min-h-70 duration-200 hover:brightness-120 md:col-span-2 lg:col-span-1 lg:min-h-80 xl:col-span-1 xl:row-span-1 xl:max-h-60 xl:min-h-60">
            <ParticleDiv />
            <div className="w-full">
              <figure className="grid-container relative isolate justify-end overflow-hidden">
                <img
                  src={`${import.meta.env.BASE_URL}assets/grid4.png`}
                  alt="grid4"
                  className="xs:scale-200 -top-30 left-0 -z-10 h-40 w-full origin-top scale-160 object-contain lg:absolute lg:-top-3 lg:h-fit lg:scale-90 xl:-top-5"
                />
                <div className="space-y-2">
                  <p className="grid-headtext text-center">Contact me</p>
                </div>
                <div className="copy-container" onClick={handleCopy}>
                  <img
                    src={
                      hasCopy
                        ? `${import.meta.env.BASE_URL}assets/tick.svg`
                        : `${import.meta.env.BASE_URL}assets/copy.svg`
                    }
                    className="h-[33px] w-[32px] scale-80 duration-200 hover:brightness-140"
                    alt="Copy email"
                  />
                  <p className="text-gray_gradient font-medium text-white duration-200 text-shadow-2xs hover:brightness-140 hover:text-shadow-white/50 md:text-xl">
                    memaraaa123@gmail.com
                  </p>
                </div>
              </figure>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
});

export default About;
