import { OrbitControls, Environment, OrbitControlsProps } from "@react-three/drei";
import { useEffect } from "react";
import ModelLoader from "../ModelLoader";
import { RotationCameraAtom } from "../../atoms/rotationCamera.atom";
import { useAtom } from "jotai";
import { useRef } from "react";
const ModelContainer = () => {
  const rotationCameraRef = useRef<OrbitControlsProps | null>(null);
  const [, setRotationCamera] = useAtom(RotationCameraAtom);

  // useEffect(() => {
  //   setRotationCamera(rotationCameraRef);
  // }, [rotationCameraRef]);
  return (
    <>
      <mesh>
        <ModelLoader />
      </mesh>
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
      <OrbitControls
        ref={(_ref) => {
          setRotationCamera(_ref);
        }}
        autoRotate={false}
        minDistance={3}
        maxDistance={5}
        rotateSpeed={0.75}
        minPolarAngle={Math.PI / 9}
        maxPolarAngle={Math.PI - Math.PI / 1.8}
        enablePan={false}
      />
      <Environment background={false} files="/autoshop.hdr" />
    </>
  );
};

export default ModelContainer;
