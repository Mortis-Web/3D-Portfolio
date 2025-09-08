import { useTexture } from '@react-three/drei';
import gsap from 'gsap';
import { useCallback, useEffect, useRef } from 'react';

const Rings = ({ position }) => {
  const refList = useRef([]);
  const groupRef = useRef();

  const getRef = useCallback(mesh => {
    if (mesh && !refList.current.includes(mesh)) {
      refList.current.push(mesh);
    }
  }, []);

  const texture = useTexture(
    'https://raw.githubusercontent.com/adrianhajdin/threejs-portfolio/refs/heads/main/public/textures/rings.png'
  );

  // Run GSAP once refs are populated
  useEffect(() => {
    if (refList.current.length === 0) return;

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });
    tl.to(
      refList.current.map(r => r.rotation),
      {
        y: `+=${Math.PI * 2}`,
        x: `-=${Math.PI * 2}`,
        duration: 2.5,
        stagger: { each: 0.15 },
      }
    );

    return () => tl.kill(); // cleanup
  }, [texture]);

  return (
    <group ref={groupRef} position={position} scale={0.25}>
      {Array.from({ length: 4 }, (_, index) => (
        <mesh key={index} ref={getRef}>
          <torusGeometry args={[(index + 1) * 0.5, 0.1]} />
          <meshMatcapMaterial matcap={texture} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
};

export default Rings;
