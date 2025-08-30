import { Canvas } from "@react-three/fiber";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Suspense } from "react";
import { useMediaQuery } from "react-responsive";
import CanvasLoader from "../components/hero/CanvasLoader";
import Cube from "../components/hero/Cube";
import HackerRoom from "../components/hero/HackerRoom";
import HeroCamera from "../components/hero/HeroCamera";
import ReactLogo from "../components/hero/ReactLogo";
import Rings from "../components/hero/Rings";
import Target from "../components/hero/Target";
import { calculateSizes } from "../constants";
import Button from "../utils/Button";
// import { Leva, useControls } from "leva";

const sentence = "Building amazing things with React.";

const Hero = () => {
  //   const controls = useControls("Hacker Room", {
  //     positionX: {
  //       value: 2.5,
  //       min: -10,
  //       max: 10,
  //     },
  //     positionY: {
  //       value: 2.5,
  //       min: -10,
  //       max: 10,
  //     },
  //     positionZ: {
  //       value: 2.5,
  //       min: -10,
  //       max: 10,
  //     },
  //     rotationX: {
  //       value: 0,
  //       min: -10,
  //       max: 10,
  //     },
  //     rotationY: {
  //       value: 0,
  //       min: -10,
  //       max: 10,
  //     },
  //     rotationZ: {
  //       value: 0,
  //       min: -10,
  //       max: 10,
  //     },
  //     scale: {
  //       value: 1,
  //       min: 0.1,
  //       max: 10,
  //     },
  //   });
  const words = sentence.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.75,
        when: "beforeChildren",
        staggerChildren: 0.15,
      },
    },
  };

  const child = {
    hidden: { y: -30, opacity: 0, },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const isSmall = useMediaQuery({ maxWidth: 480 });
  const isTablet = useMediaQuery({ maxWidth: 1024 });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isExtraLarge = useMediaQuery({ minWidth: 1536 });
  const sizes = calculateSizes(isSmall, isMobile, isTablet, isExtraLarge);

  return (
    <section className="min-h-screen w-full flex flex-col relative">
      {/* overlay texture */}
      <span className="navSlide absolute w-full opacity-0">
        <div className="overlay_glow">
          <img src="/assets/spotlight1.png" alt="spotlight" />
        </div>
        <div className="overlay_glow">
          <img src="/assets/spotlight1.png" alt="spotlight" />
        </div>
        <div className="overlay_glow">
          <img src="/assets/spotlight1Reverse.png" alt="spotlight" />
        </div>
        <div className="overlay_glow">
          <img src="/assets/spotlight1Reverse.png" alt="spotlight" />
        </div>
      </span>
      <span className="rings-bg"></span>
      <span className="rings-bg_big"></span>
      {/* end of overlay texture */}

      <div className="container flex flex-col sm:mt-36 mt-20 c-space ">
        <p className="sm:text-3xl nameAnim opacity-0 text-2xl font-bold text-white text-center font-orbitron">
          Hello I'm Mortis
          <span className="waving-hand">👋</span>
        </p>
        <motion.div
          className="hero_tag bluringAnim text-gray_gradient font-orbitron will-change-[transform,opacity,filter] capitalize"
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
      <div className="w-full h-full absolute inset-0">
        {/* <Leva /> */}
        <Canvas className="w-full h-full">
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
                rotation={[0, Math.PI / 3, 0]}
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
        <div className="absolute buttonSlide opacity-0 left-0 bottom-7 right-0 mx-auto z-100">
          <a
            href="#contact"
            className="block sm:w-fit w-[min(90%,24rem)]  mx-auto"
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
};

export default Hero;
