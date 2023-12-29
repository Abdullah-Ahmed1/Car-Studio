import { Canvas } from "@react-three/fiber";

import { CanvasWrapper } from "./index.styled";
import ModelContainer from "../ModelContainer";

const Scene = () => {
  return (
    <>
      <CanvasWrapper>
        <Canvas camera={{ fov: 35 }}>
          <ModelContainer />
        </Canvas>
      </CanvasWrapper>
    </>
  );
};

export default Scene;
