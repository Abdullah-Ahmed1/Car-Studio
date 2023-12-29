import { FC } from "react";

const Lights: FC = () => {
  return (
    <mesh>
      <ambientLight intensity={5.1} />
      <directionalLight args={["white", 5]} castShadow position={[-5, 5, 7]} shadow-mapSize={[1024, 1024]}>
        <orthographicCamera attach="shadow-camera" args={[-10, 10, 10, -10]} />
      </directionalLight>
      <directionalLight args={["white", 5]} castShadow position={[5, -5, 7]} shadow-mapSize={[1024, 1024]}>
        <orthographicCamera attach="shadow-camera" args={[-10, 10, 10, -10]} />
      </directionalLight>
      <directionalLight args={["white", 5]} castShadow position={[5, 5, 7]} shadow-mapSize={[1024, 1024]}>
        <orthographicCamera attach="shadow-camera" args={[-10, 10, 10, -10]} />
      </directionalLight>
      <directionalLight args={["white", 5]} castShadow position={[5, 5, -7]} shadow-mapSize={[1024, 1024]}>
        <orthographicCamera attach="shadow-camera" args={[-10, 10, 10, -10]} />
      </directionalLight>
    </mesh>
  );
};

export default Lights;
