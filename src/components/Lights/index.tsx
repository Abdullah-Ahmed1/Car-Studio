import { FC } from "react";

const Lights: FC = () => {
  return (
    <mesh>
      <ambientLight intensity={0.1} />
    </mesh>
  );
};

export default Lights;
