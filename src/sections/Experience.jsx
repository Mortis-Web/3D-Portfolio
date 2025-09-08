import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React, {  Suspense, useCallback, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
// import ExperienceCanvas from '../components/experience/ExperienceCanvas';
import { workExperiences } from '../constants';
import CanvasLoader from '../hooks/CanvasLoader';
// import { useInView } from '../hooks/useInView';
import Header from '../utils/Header';
const ExperienceCanvas = React.lazy(() =>
  import('../components/experience/ExperienceCanvas')
);

const Experience = () => {
  const ref = useRef(null);
  // const isVisible = useInView(ref, { threshold: 0.2 });
  const [animName, setAnimName] = useState('idle');
  const mediumDevice = useMediaQuery({ maxWidth: 1024 });
  const handleItemInteraction = useCallback(animationName => {
    setAnimName(animationName.toLowerCase());
  }, []);

  const handleMouseLeave = useCallback(() => {
    setAnimName('idle');
  }, []);

  return (
    <section className="c-space group my-20" ref={ref}>
      <div className="text-white-600 container w-full">
        <Header headerText={'My Work Experience'} />
        <div className="work-container flex-wrap lg:flex-nowrap">
          <figure className="work-canvas max-h-100 min-h-100 w-full lg:max-h-full lg:flex-1">
              <Canvas
                className="max-h-150 max-w-100"
                resize={{ scroll: false, debounce: { scroll: 50, resize: 50 } }}
                style={{ width: '100%', height: '100%' }}
              >
                <ambientLight intensity={3} />
                <spotLight position={[10, 10, 10]} angle={15} penumbra={1} />
                <directionalLight position={[10, 10, 10]} intensity={1} />
                <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2} />
                <Suspense fallback={<CanvasLoader />}>
                  <ExperienceCanvas
                    position-y={-3}
                    scale={mediumDevice ? 3.5 : 3.25}
                    animationName={animName}
                  />
                </Suspense>
              </Canvas>
          </figure>
          <article className="work-content lg:flex-2">
            <div className="sm-py-10 px-2.5 py-5 sm:px-5">
              {workExperiences.map(item => {
                const hideBar = item.id === 3 ? 'hidden' : 'block';
                return (
                  <summary
                    onClick={() => handleItemInteraction(item.animation)}
                    onPointerOver={() => handleItemInteraction(item.animation)}
                    onPointerOut={handleMouseLeave}
                    key={item.id}
                    className="work-content_container group/child"
                  >
                    <div className="flex h-full flex-col items-center justify-start py-2">
                      <span className="work-content_logo">
                        <img
                          src={item.icon}
                          alt="Logo"
                          loading="lazy"
                          className="h-full w-full object-contain"
                        />
                      </span>
                      <div className={`work-content_bar ${hideBar}`} />
                    </div>

                    <div className="sm-p-5 px-2.5 py-5">
                      <p className="text-white-800 font-bold">{item.name}</p>
                      <p className="mb-5 text-sm">
                        {item.pos} -- {item.duration}
                      </p>
                      <p className="duration-500 ease-in-out group-hover/child:text-white">
                        {item.title}
                      </p>
                    </div>
                  </summary>
                );
              })}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Experience;
