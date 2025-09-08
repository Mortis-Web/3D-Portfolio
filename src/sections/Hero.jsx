import { Canvas } from '@react-three/fiber';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import React, { forwardRef, Suspense } from 'react';
import { useMediaQuery } from 'react-responsive';
import { calculateSizes } from '../constants';
import CanvasLoader from '../hooks/CanvasLoader';
import Button from '../utils/Button';

const sentence = 'Building amazing things with React.';
const Cube = React.lazy(() => import('../components/hero/Cube'));
const HackerRoom = React.lazy(() => import('../components/hero/HackerRoom'));
const HeroCamera = React.lazy(() => import('../components/hero/HeroCamera'));
const ReactLogo = React.lazy(() => import('../components/hero/ReactLogo'));
const Rings = React.lazy(() => import('../components/hero/Rings'));
const Target = React.lazy(() => import('../components/hero/Target'));
const Hero = forwardRef((props, ref) => {
  const words = sentence.split(' ');
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 2,
        when: 'beforeChildren',
        staggerChildren: 0.15,
      },
    },
  };

  const child = {
    hidden: { y: -30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const isSmall = useMediaQuery({ maxWidth: 480 });
  const isTablet = useMediaQuery({ maxWidth: 1024 });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isExtraLarge = useMediaQuery({ minWidth: 1536 });
  const sizes = calculateSizes(isSmall, isMobile, isTablet, isExtraLarge);

  return (
    <section
      ref={ref}
      id="home"
      className="hero_bg relative isolate flex min-h-dvh w-full flex-col lg:min-h-screen 2xl:min-h-[992px]"
    >
      {/* overlay texture */}
      <span className="navSlide absolute w-full opacity-0">
        <div className="overlay_glow">
          <img
            loading="lazy"
            src={`${import.meta.env.BASE_URL}assets/spotlight1.webp`}
            alt="bronze glowing spotlight texture"
          />
        </div>
        <div className="overlay_glow">
          <img
            loading="lazy"
            src={`${import.meta.env.BASE_URL}assets/spotlight1.webp`}
            alt="bronze glowing spotlight texture"
          />
        </div>
        <div className="overlay_glow">
          <img
            loading="lazy"
            src={`${import.meta.env.BASE_URL}assets/spotlight1Reverse.webp`}
            alt="bronze glowing spotlight texture"
          />
        </div>
        <div className="overlay_glow">
          <img
            loading="lazy"
            src={`${import.meta.env.BASE_URL}assets/spotlight1Reverse.webp`}
            alt="bronze glowing spotlight texture"
          />
        </div>
      </span>
      <span className="rings-bg"></span>
      <span className="rings-bg_big"></span>
      {/* end of overlay texture */}

      <div className="c-space orbitron container mt-20 flex flex-col sm:mt-36">
        <p className="nameAnim cool_shadow text-center text-2xl font-bold text-white/90 opacity-0 sm:text-3xl">
          Hello I'm Mohammed
          <span className="waving-hand">👋</span>
        </p>
        <motion.div
          className="hero_tag cool_shadow bluringAnim text-gray_gradient text-pretty capitalize will-change-[transform,opacity,filter]"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {words.map((word, i) => (
            <motion.span key={i} variants={child} className="inline-block">
              {word}&nbsp;
            </motion.span>
          ))}
        </motion.div>
      </div>
      <div className="absolute inset-0 h-full w-full">
        <Canvas className="h-full w-full">
          <Suspense fallback={<CanvasLoader />}>
            <perspectiveCamera makeDefault position={[0, 0, 20]} />
            <HeroCamera isMobile={isMobile}>
              <HackerRoom
                position={sizes.deskPosition}
                scale={sizes.deskScale}
                rotation={[0, -Math.PI, 0]}
              />
            </HeroCamera>
            <group>
              <Target
                position={sizes.targetPosition}
                rotation={[0, Math.PI / 2.5, 0]}
                scale={0.4}
              />
              <ReactLogo position={sizes.reactLogoPosition} />
              <Cube position={sizes.cubePosition} scale={0.5} />
              <Rings position={sizes.ringPosition} />
            </group>
            <ambientLight intensity={1} />
            <directionalLight
              position={[10, 10, 10]}
              intensity={0.5}
              castShadow
            />
          </Suspense>
        </Canvas>

        <div className="buttonSlide absolute right-0 bottom-7 left-0 z-100 mx-auto opacity-0">
          <a
            href="#contact"
            onClick={e => {
              e.preventDefault();
              const section = document.querySelector('#about');
              section?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="mx-auto block w-[min(90%,24rem)] sm:w-fit"
          >
            <Button
              name="Let's work together"
              isBeam
              containerClass="sm:w-fit w-[min(90%,24rem)] sm:min-w-96"
            ></Button>
          </a>
        </div>
      </div>
    </section>
  );
});

export default Hero;
