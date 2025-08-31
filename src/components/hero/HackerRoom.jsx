import { useGLTF, useTexture } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import { VideoTexture } from "three";

const HackerRoom = (props) => {
  const { nodes, materials } = useGLTF(
    `${import.meta.env.BASE_URL}models/hacker-room.glb`
  );

  const monitortxt = useTexture(
    `${import.meta.env.BASE_URL}textures/desk/monitor.png`
  );
  const videoRef = useRef(document.createElement("video"));
  const playedRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (playedRef.current) return;
    video.src = `${import.meta.env.BASE_URL}textures/desk/monitor.mp4`;
    video.crossOrigin = "Anonymous";
    video.loop = true;
    video.muted = true;

    video.play().catch(console.warn);
    playedRef.current = true;
  }, []);

  const videotxt = useMemo(() => new VideoTexture(videoRef.current), []);
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.screen_screens_0.geometry}
        material={materials.screens}
      >
        <meshMatcapMaterial map={videotxt} toneMapped={false} />
      </mesh>
      <mesh
        geometry={nodes.screen_glass_glass_0.geometry}
        material={materials.glass}
      />
      <mesh
        geometry={nodes.table_table_mat_0_1.geometry}
        material={materials.table_mat}
      />
      <mesh
        geometry={nodes.table_table_mat_0_2.geometry}
        material={materials.computer_mat}
      >
        {/* <meshMatcapMaterial map={monitortxt} /> */}
      </mesh>
      <mesh
        geometry={nodes.table_table_mat_0_3.geometry}
        material={materials.server_mat}
      />
      <mesh
        geometry={nodes.table_table_mat_0_4.geometry}
        material={materials.vhsPlayer_mat}
      />
      <mesh
        geometry={nodes.table_table_mat_0_5.geometry}
        material={materials.stand_mat}
      />
      <mesh
        geometry={nodes.table_table_mat_0_6.geometry}
        material={materials.mat_mat}
      />
      <mesh
        geometry={nodes.table_table_mat_0_7.geometry}
        material={materials.arm_mat}
      />
      <mesh
        geometry={nodes.table_table_mat_0_8.geometry}
        material={materials.tv_mat}
      >
        <meshMatcapMaterial map={monitortxt} />
      </mesh>
      <mesh
        geometry={nodes.table_table_mat_0_9.geometry}
        material={materials.cables_mat}
      />
      <mesh
        geometry={nodes.table_table_mat_0_10.geometry}
        material={materials.props_mat}
      />
      <mesh
        geometry={nodes.table_table_mat_0_11.geometry}
        material={materials.ground_mat}
      />
      <mesh
        geometry={nodes.table_table_mat_0_12.geometry}
        material={materials.key_mat}
      />
    </group>
  );
};

useGLTF.preload(`${import.meta.env.BASE_URL}models/hacker-room.glb`);

export default HackerRoom;
