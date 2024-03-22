import { Canvas } from "@react-three/fiber";

import { CanvasWrapper } from "./index.styled";
import ModelContainer from "../ModelContainer";
import { XR, ARButton } from "@react-three/xr";

const Scene = () => {
  return (
    <>
      <CanvasWrapper>
        <ARButton />
        <Canvas camera={{ fov: 35 }}>
          <XR>
            <ModelContainer />
          </XR>
        </Canvas>
      </CanvasWrapper>
    </>
  );
};

export default Scene;
