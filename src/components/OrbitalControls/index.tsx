import { FC } from "react";
import { OrbitControls } from "@react-three/drei";
import { RotationCameraAtom } from "../../atoms/rotationCamera.atom";
import { useAtom } from "jotai";

const OrbitControl: FC = () => {
  const [, setRotationCamera] = useAtom(RotationCameraAtom);

  return (
    <OrbitControls
      ref={(_ref) => {
        setRotationCamera(_ref);
      }}
      autoRotate={true}
      minDistance={3}
      maxDistance={5}
      rotateSpeed={0.75}
      minPolarAngle={Math.PI / 9}
      maxPolarAngle={Math.PI - Math.PI / 1.8}
      enablePan={false}
    />
  );
};

export default OrbitControl;
