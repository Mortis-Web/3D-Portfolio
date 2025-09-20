import { Center, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React, {
  forwardRef,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { myProjects } from '../constants';
import CanvasLoader from '../hooks/CanvasLoader';
import { useInView } from '../hooks/useInView';
import Header from '../utils/Header';

const DemoComputer = React.lazy(
  () => import('../components/projects/DemoComputer')
);
const Projects = forwardRef((props, ref) => {
  const [selectedProject, setSelectedProject] = useState(0);
  const [fadeKey, setFadeKey] = useState(0);
  const titleRef = useRef(null);
  const projectRef = useRef(null);
  const intervalRef = useRef(null);
  const isVisible = useInView(projectRef, { threshold: 0.2 });

  // Touch swipe variables
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const minSwipeDistance = useRef(50);

  const currentProject = useMemo(
    () => myProjects[selectedProject],
    [selectedProject]
  );
  const glow = currentProject.logoStyle.backgroundColor;

  // Memoized event handlers
  const handleSlide = useCallback(direction => {
    setSelectedProject(prev =>
      direction === 'next'
        ? (prev + 1) % myProjects.length
        : (prev - 1 + myProjects.length) % myProjects.length
    );
    setFadeKey(prev => prev + 1);
  }, []);

  // Reset and restart the slide timer
  const resetSlideTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (isVisible) {
      intervalRef.current = setInterval(() => {
        handleSlide('next');
      }, 5000);
    }
  }, [isVisible, handleSlide]);

  // Touch event handlers
  const handleTouchStart = useCallback(e => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const handleTouchMove = useCallback(e => {
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    const distance = touchStartX.current - touchEndX.current;
    const absDistance = Math.abs(distance);

    if (absDistance > minSwipeDistance.current) {
      if (distance > 0) {
        handleSlide('next');
      } else {
        handleSlide('prev');
      }
      resetSlideTimer(); // Reset timer on swipe
    }
  }, [handleSlide, resetSlideTimer]);

  const handleManualNavigation = useCallback(
    direction => {
      handleSlide(direction);
      resetSlideTimer(); // Reset timer on button click
    },
    [handleSlide, resetSlideTimer]
  );

  const handleTitleColor = useCallback(() => {
    if (titleRef.current) {
      titleRef.current.style.color = glow;
      titleRef.current.style.textShadow = `0px 0px 10px ${glow}`;
    }
  }, [glow]);

  const handleTitleReset = useCallback(() => {
    if (titleRef.current) {
      titleRef.current.style.textShadow = `none`;
      titleRef.current.style.color = 'white';
    }
  }, []);

  useEffect(() => {
    const node = projectRef.current;
    if (!node) return;

    node.addEventListener('touchstart', handleTouchStart, { passive: true });
    node.addEventListener('touchmove', handleTouchMove, { passive: true });
    node.addEventListener('touchend', handleTouchEnd);

    return () => {
      node.removeEventListener('touchstart', handleTouchStart);
      node.removeEventListener('touchmove', handleTouchMove);
      node.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  // Memoize tags to prevent re-renders
  const projectTags = useMemo(
    () => (
      <div className="flex items-center gap-3">
        {currentProject.tags.map((tag, index) => (
          <span
            key={`${tag.name}-${index}-${selectedProject}`}
            className="tech-logo duration-300 hover:brightness-125"
          >
            <img
              src={tag.path}
              alt={tag.name}
              loading="lazy"
              width={24}
              height={24}
            />
          </span>
        ))}
      </div>
    ),
    [currentProject.tags, selectedProject]
  );

  // Memoized project content to prevent re-renders
  const projectContent = useMemo(
    () => (
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
        />

        {/* Swipe indicator for mobile */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 transform lg:hidden">
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <FaArrowLeft className="animate-pulse text-xs" />
            <span>Swipe to navigate</span>
            <FaArrowRight className="animate-pulse text-xs" />
          </div>
        </div>

        <figure className="spotlight absolute top-0 right-0 opacity-0 duration-400">
          <img
            src={currentProject.spotlight}
            alt="spotlight"
            className="h-96 w-full rounded-xl object-cover"
            loading="lazy"
            width={400}
            height={384}
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
            loading="lazy"
            width={40}
            height={40}
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
            {projectTags}
            <a
              href={currentProject.href}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-white-600 group flex items-center gap-2 duration-600 ease-[var(--scale_easing)] hover:scale-110 hover:text-white"
            >
              <p>Check Live Site</p>
              <img
                src={`${import.meta.env.BASE_URL}/assets/arrow-up.png`}
                alt="arrow"
                className="h-3 w-3"
                loading="lazy"
                width={12}
                height={12}
              />
            </a>
          </div>
        </article>

        {/* Navigation buttons */}
        <span className="mt-auto flex items-center justify-between pt-6 duration-400 sm:pt-0">
          <button
            type="button"
            onClick={() => handleManualNavigation('prev')}
            className="arrow-btn group flex items-center justify-center"
            aria-label="Previous project"
          >
            <FaArrowLeft className="text-white duration-200 group-hover:brightness-150" />
          </button>
          <div className="bullets">
            {Array.from({ length: myProjects.length }).map((_, index) => (
              <span
                key={index}
                onClick={() => {
                  setSelectedProject(index);
                  setFadeKey(prev => prev + 1);
                  resetSlideTimer();
                }}
                className={`${index === selectedProject ? 'scale-102 bg-white drop-shadow-2xl drop-shadow-white' : 'bg-black/40'}`}
              ></span>
            ))}
          </div>
          <button
            type="button"
            onClick={() => handleManualNavigation('next')}
            className="arrow-btn group flex items-center justify-center"
            aria-label="Next project"
          >
            <FaArrowRight className="text-white duration-200 group-hover:brightness-150" />
          </button>
        </span>
      </div>
    ),
    [
      fadeKey,
      currentProject,
      glow,
      handleTitleColor,
      handleTitleReset,
      handleManualNavigation,
      projectTags,
      handleTouchStart,
      handleTouchMove,
      handleTouchEnd,
      selectedProject,
      resetSlideTimer,
    ]
  );

  // Memoized 3D canvas to prevent unnecessary re-renders
  const threeDCanvas = useMemo(
    () => (
      <article
        className="border-black-300 max-h-100 min-h-85 overflow-hidden rounded-xl border bg-gradient-to-l from-[#0E0E10] from-70% to-[#121215] duration-200 hover:brightness-120 md:h-full lg:max-h-full"
        aria-label="3D project visualization"
      >
        <Canvas frameloop="demand" dpr={[1, 2]}>
          <ambientLight intensity={Math.PI} />
          <directionalLight position={[10, 10, 5]} intensity={2} />
          <Center>
            <Suspense fallback={<CanvasLoader />}>
              <group scale={2} position={[0, -3, 0]} rotation={[0, -0.1, 0]}>
                <DemoComputer
                  texture={currentProject.texture}
                  isVisible={isVisible}
                />
              </group>
            </Suspense>
          </Center>
          <OrbitControls
            maxPolarAngle={Math.PI / 2}
            enableZoom={false}
            enablePan={false}
          />
        </Canvas>
      </article>
    ),
    [currentProject.texture, isVisible]
  );

  // Optimized useEffect for interval and keyboard events
  useEffect(() => {
    if (!isVisible) return;

    const startSlideTimer = () => {
      intervalRef.current = setInterval(() => {
        handleSlide('next');
      }, 5000);
    };

    startSlideTimer();

    const handleKeyDown = e => {
      if (e.key === 'ArrowRight') {
        handleManualNavigation('next');
      } else if (e.key === 'ArrowLeft') {
        handleManualNavigation('prev');
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isVisible, handleSlide, handleManualNavigation]);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <section id="work" ref={ref} className="c-space group">
      <div className="container">
        <Header headerText={'My Projects'} />
        <div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-2">
          {projectContent}
          {threeDCanvas}
        </div>
      </div>
    </section>
  );
});

Projects.displayName = 'Projects';

export default Projects;
