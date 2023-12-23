import { FC } from "react";
import { OrbitControls } from "@react-three/drei";

const OrbitControl: FC = () => {
  return (
    <OrbitControls minDistance={3} maxDistance={3} rotateSpeed={0.75} minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} enablePan={false} />
  );
};

export default OrbitControl;
