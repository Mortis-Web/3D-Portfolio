import { useAnimations, useFBX, useGLTF } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';

const ExperienceCanvas = ({ animationName = 'idle', ...props }) => {
  const group = useRef(null);

  // Load model
  const { scene, nodes, materials } = useGLTF(
    `${import.meta.env.BASE_URL}/models/3DMe-draco.glb`
  );

  // Load animations
  const { animations: idleAnimation } = useFBX(
    `${import.meta.env.BASE_URL}/models/animations/idle.fbx`
  );
  const { animations: saluteAnimation } = useFBX(
    `${import.meta.env.BASE_URL}/models/animations/salute.fbx`
  );
  const { animations: clappingAnimation } = useFBX(
    `${import.meta.env.BASE_URL}/models/animations/clapping.fbx`
  );
  const { animations: victoryAnimation } = useFBX(
    `${import.meta.env.BASE_URL}/models/animations/victory.fbx`
  );

  // Name animations
  idleAnimation[0].name = 'idle';
  saluteAnimation[0].name = 'salute';
  clappingAnimation[0].name = 'clapping';
  victoryAnimation[0].name = 'victory';

  // Bind animations
  const { actions } = useAnimations(
    [
      idleAnimation[0],
      saluteAnimation[0],
      clappingAnimation[0],
      victoryAnimation[0],
    ],
    group
  );

  // Switch animations
  useEffect(() => {
    if (actions && animationName) {
      const action = actions[animationName] || actions['idle'];

      Object.values(actions).forEach(a => {
        if (a && a !== action) {
          a.fadeOut(0.5);
          a.stop();
        }
      });

      if (action) {
        action.reset().fadeIn(0.5).play();
      }

      return () => {
        if (action) action.fadeOut(0.5);
      };
    }
  }, [animationName, actions]);

  // --- Responsive sizing (built-in) ---
  const isSmall = useMediaQuery({ maxWidth: 480 });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ maxWidth: 1024 });
  const isExtraLarge = useMediaQuery({ minWidth: 1536 });

  const calculateSizes = () => {
    if (isSmall) return { scale: 1.5, positionY: -2.2 };
    if (isMobile) return { scale: 2, positionY: -2.5 };
    if (isTablet) return { scale: 2.5, positionY: -2.8 };
    if (isExtraLarge) return { scale: 3.5, positionY: -3.2 };
    return { scale: 3, positionY: -3 }; // default desktop
  };

  const { scale, positionY } = calculateSizes();

  return (
    <group
      ref={group}
      dispose={null}
      scale={scale}
      position={[0, positionY, 0]}
      {...props}
    >
      <primitive object={scene} />
      <skinnedMesh
        name="EyeLeft"
        geometry={nodes.EyeLeft.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeLeft.skeleton}
        morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
      />
      <skinnedMesh
        name="EyeRight"
        geometry={nodes.EyeRight.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeRight.skeleton}
        morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Head"
        geometry={nodes.Wolf3D_Head.geometry}
        material={materials.Wolf3D_Skin}
        skeleton={nodes.Wolf3D_Head.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Teeth"
        geometry={nodes.Wolf3D_Teeth.geometry}
        material={materials.Wolf3D_Teeth}
        skeleton={nodes.Wolf3D_Teeth.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Hair.geometry}
        material={materials.Wolf3D_Hair}
        skeleton={nodes.Wolf3D_Hair.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Top.geometry}
        material={materials.Wolf3D_Outfit_Top}
        skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
        material={materials.Wolf3D_Outfit_Bottom}
        skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
        material={materials.Wolf3D_Outfit_Footwear}
        skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Body.geometry}
        material={materials.Wolf3D_Body}
        skeleton={nodes.Wolf3D_Body.skeleton}
      />
    </group>
  );
};

useGLTF.preload(`${import.meta.env.BASE_URL}/models/3DMe-draco.glb`);

export default ExperienceCanvas;
