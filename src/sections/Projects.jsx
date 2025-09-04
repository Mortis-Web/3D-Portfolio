import { forwardRef, Suspense, useEffect, useRef, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { myProjects } from '../constants';

import { Center, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import CanvasLoader from '../components/hero/CanvasLoader';
import DemoComputer from '../components/projects/DemoComputer';
import { useInView } from '../hooks/useInView';
import Header from '../utils/Header';

const Projects = forwardRef((props, ref) => {
  const [selectedProject, setSelectedProject] = useState(0);
  const [fadeKey, setFadeKey] = useState(0); // force re-mount for fade animation
  const titleRef = useRef(null);
  const projectRef = useRef(null);
  const intervalRef = useRef(null);
  const isVisible = useInView(projectRef, { threshold: 0.2 });
  const currentProject = myProjects[selectedProject];
  const glow = currentProject.logoStyle.backgroundColor;

  const handleSlide = direction => {
    setSelectedProject(prev =>
      direction === 'next'
        ? (prev + 1) % myProjects.length
        : (prev - 1 + myProjects.length) % myProjects.length
    );
    setFadeKey(prev => prev + 1);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        if (isVisible) handleSlide('next');
      }, 5000);
    }
  };

  const handleTitleColor = () => {
    if (titleRef.current) {
      titleRef.current.style.color = glow;
      titleRef.current.style.textShadow = `0px 0px 10px ${glow}`;
      titleRef.current.style.filter = `brightness(1.5)`;
    }
  };

  const handleTitleReset = () => {
    if (titleRef.current) {
      titleRef.current.style.textShadow = `none`;
      titleRef.current.style.color = 'white';
    }
  };

  useEffect(() => {
    const startSlideTimer = () => {
      intervalRef.current = setInterval(() => {
        if (isVisible) handleSlide('next');
      }, 5000);
    };

    const resetSlideTimer = () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      startSlideTimer();
    };

    startSlideTimer();

    const handleKeyDown = e => {
      if (!isVisible) return;
      if (e.key === 'ArrowRight') {
        handleSlide('next');
        resetSlideTimer();
      }
      if (e.key === 'ArrowLeft') {
        handleSlide('prev');
        resetSlideTimer();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isVisible]);

  return (
    <section id="work" ref={ref} className="c-space group">
      <div className="container">
        <Header headerText={'My Projects'} />
        <div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-2">
          <div
            ref={projectRef}
            key={fadeKey}
            onMouseEnter={handleTitleColor}
            onMouseLeave={handleTitleReset}
            className="project shadow-black-200 xs:px-10 relative flex flex-col gap-5 rounded-xl bg-gradient-to-r from-[#0E0E10] from-70% to-[#121215] p-5 shadow-2xl duration-200 sm:py-10 lg:max-h-none"
          >
            <span
              style={{
                backgroundImage: `conic-gradient(from var(--angle),transparent 80%,${glow})`,
              }}
              className="project-bullet absolute inset-0 -left-0.5 -z-10 m-auto h-[calc(100%_+_10px)] w-[calc(100%_+_10px)] rounded-[inherit]"
            ></span>

            <figure className="spotlight absolute top-0 right-0 opacity-0 duration-400">
              <img
                src={currentProject.spotlight}
                alt="spotlight"
                className="h-96 w-full rounded-xl object-cover"
              />
            </figure>

            {/* logo */}
            <div
              className="w-fit rounded-lg p-3 backdrop-blur-3xl duration-400"
              style={currentProject.logoStyle}
            >
              <img
                src={currentProject.logo}
                alt="logo"
                style={{ filter: `drop-shadow(0px 0px 10px ${glow}` }}
                className="logoSlide h-10 w-10 drop-shadow-sm"
              />
            </div>

            {/* Fade-in text block */}
            <article className="text-white-600 xs:my-0 my-2 flex flex-col gap-5 duration-400 sm:my-5">
              <p
                ref={titleRef}
                className="animatedText animate-fadeIn min-h-[64px] text-2xl font-semibold text-white opacity-0 duration-300 sm:min-h-0"
              >
                {currentProject.title}
              </p>
              <p className="animatedText animate-fadeIn_late xs:min-h-[96px] min-h-[144px] opacity-0">
                {currentProject.desc}
              </p>
              <p className="animatedText animate-fadeIn_later xs:flex hidden min-h-[120px] items-center justify-center opacity-0 sm:min-h-[72px]">
                {currentProject.subdesc}
              </p>

              <div className="animate-fadeIn_latest flex flex-wrap items-center justify-between gap-5 opacity-0">
                <div className="flex items-center gap-3">
                  {currentProject.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="tech-logo duration-300 hover:brightness-125"
                    >
                      <img src={tag.path} alt={tag.name} />
                    </span>
                  ))}
                </div>
                <a
                  href={currentProject.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white-600 group flex items-center gap-2 duration-600 ease-[var(--scale_easing)] hover:scale-110 hover:text-white"
                >
                  <p>Check Live Site</p>
                  <img
                    src={`${import.meta.env.BASE_URL}/assets/arrow-up.png`}
                    alt="arrow"
                    className="h-3 w-3"
                  />
                </a>
              </div>
            </article>

            {/* Keep buttons outside the fade animation */}
            <span className="xs:mt-5 mt-3.5 flex items-center justify-between duration-400">
              <button
                type="button"
                onClick={() => handleSlide('prev')}
                className="arrow-btn group flex items-center justify-center"
              >
                <FaArrowLeft className="text-white duration-200 group-hover:brightness-150" />
              </button>
              <button
                type="button"
                onClick={() => handleSlide('next')}
                className="arrow-btn group flex items-center justify-center"
              >
                <FaArrowRight className="text-white duration-200 group-hover:brightness-150" />
              </button>
            </span>
          </div>

          {/* 3D Model */}
          <article className="border-black-300 max-h-100 min-h-85 overflow-hidden rounded-xl border bg-gradient-to-l from-[#0E0E10] from-70% to-[#121215] duration-200 hover:brightness-120 md:h-full lg:max-h-full">
            <Canvas frameloop="demand" dpr={[1, 2]}>
              <ambientLight intensity={Math.PI} />
              <directionalLight position={[10, 10, 5]} />
              <Center>
                <Suspense fallback={<CanvasLoader />}>
                  <group
                    scale={2}
                    position={[0, -3, 0]}
                    rotation={[0, -0.1, 0]}
                  >
                    <DemoComputer texture={currentProject.texture} />
                  </group>
                </Suspense>
              </Center>
              <OrbitControls maxPolarAngle={Math.PI / 2} enableZoom={false} />
            </Canvas>
          </article>
        </div>
      </div>
    </section>
  );
});

export default Projects;
