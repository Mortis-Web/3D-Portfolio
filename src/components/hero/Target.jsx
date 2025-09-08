import { useGLTF } from '@react-three/drei';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';

const Target = props => {
  const targetRef = useRef();
  const { scene } = useGLTF(
    'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/target-stand/model.gltf'
  );

  useEffect(() => {
    if (!targetRef.current) return;

    const animation = gsap.to(targetRef.current.position, {
      y: targetRef.current.position.y + 0.5,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });

    // Cleanup animation on unmount
    return () => {
      animation.kill();
    };
  }, [scene]);

  return (
    <mesh ref={targetRef} {...props}>
      <primitive object={scene} />
    </mesh>
  );
};

export default Target;
