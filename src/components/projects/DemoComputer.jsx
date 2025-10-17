import { useGSAP } from '@gsap/react';
import { useGLTF, useVideoTexture } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { useEffect, useMemo, useRef } from 'react';

const DemoComputer = props => {
  const group = useRef();
  const { invalidate } = useThree();

  const { nodes, materials } = useGLTF(
    `${import.meta.env.BASE_URL}models/computer.glb`
  );

  // Memoize the texture URL to prevent unnecessary re-renders
  const textureUrl = useMemo(
    () =>
      props.texture ||
      `${import.meta.env.BASE_URL}textures/project/project1.mp4`,
    [props.texture]
  );

  const computertxt = useVideoTexture(textureUrl, {
    muted: true,
    loop: true,
    playsInline: true,
  });

  // Fix texture orientation
  useEffect(() => {
    if (computertxt) {
      computertxt.flipY = false;
    }
  }, [computertxt]);

  useGSAP(() => {
    if (group.current) {
      gsap.fromTo(
        group.current.rotation,
        { y: Math.PI / 2 },
        {
          y: 0,
          duration: 1,
          ease: 'power3.inOut',
          onUpdate: () => invalidate(), // 🔑 force re-render
        }
      );
    }
  }, [props.texture]);

  // Optimize the massive group list - use a loop instead of manual entries
  const screenGroups = useMemo(() => {
    const groups = [];
    for (let i = 1; i <= 148; i++) {
      groups.push(
        <group
          key={`screen-${i}`}
          name={`Screen${i.toString().padStart(3, '0')}`}
          position={[5.658, 1.644, 0.812]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.923, 0.855, 0.855]}
        />
      );
    }
    return groups;
  }, []);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh
          name="monitor-screen"
          castShadow
          receiveShadow
          geometry={nodes['monitor-screen'].geometry}
          material={nodes['monitor-screen'].material}
          position={[0.127, 1.831, 0.511]}
          rotation={[1.571, -0.005, 0.031]}
          scale={[0.661, 0.608, 0.401]}
        >
          <meshBasicMaterial map={computertxt} toneMapped={false} />
        </mesh>

        <group
          name="RootNode"
          position={[0, 1.093, 0]}
          rotation={[-Math.PI / 2, 0, -0.033]}
          scale={0.045}
        >
          {screenGroups}

          <group
            name="Tower-light-007"
            position={[16.089, -3.47, -14.495]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.963}
          />
          <group
            name="Tower-light-008"
            position={[15.155, -3.47, -14.495]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.963}
          />
        </group>

        <group
          name="Monitor-B-_computer_0"
          position={[0.266, 1.132, 0.051]}
          rotation={[0, -0.033, 0]}
          scale={[0.042, 0.045, 0.045]}
        >
          <mesh
            name="Monitor-B-_computer_0_1"
            castShadow
            receiveShadow
            geometry={nodes['Monitor-B-_computer_0_1'].geometry}
            material={materials.computer}
          />
          <mesh
            name="Monitor-B-_computer_0_2"
            castShadow
            receiveShadow
            geometry={nodes['Monitor-B-_computer_0_2'].geometry}
            material={materials.base__0}
          />
          <mesh
            name="Monitor-B-_computer_0_3"
            castShadow
            receiveShadow
            geometry={nodes['Monitor-B-_computer_0_3'].geometry}
            material={materials.Material_36}
          />
          <mesh
            name="Monitor-B-_computer_0_4"
            castShadow
            receiveShadow
            geometry={nodes['Monitor-B-_computer_0_4'].geometry}
            material={materials.Material_35}
          />
          <mesh
            name="Monitor-B-_computer_0_5"
            castShadow
            receiveShadow
            geometry={nodes['Monitor-B-_computer_0_5'].geometry}
            material={materials.Material_34}
          />
          <mesh
            name="Monitor-B-_computer_0_6"
            castShadow
            receiveShadow
            geometry={nodes['Monitor-B-_computer_0_6'].geometry}
            material={materials.keys}
          />
          <mesh
            name="Monitor-B-_computer_0_7"
            castShadow
            receiveShadow
            geometry={nodes['Monitor-B-_computer_0_7'].geometry}
            material={materials.keys2}
          />
          <mesh
            name="Monitor-B-_computer_0_8"
            castShadow
            receiveShadow
            geometry={nodes['Monitor-B-_computer_0_8'].geometry}
            material={materials.Material_37}
          />
        </group>
      </group>
    </group>
  );
};

useGLTF.preload(`${import.meta.env.BASE_URL}models/computer.glb`);

export default DemoComputer;
