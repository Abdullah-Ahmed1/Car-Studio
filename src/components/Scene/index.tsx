import { Canvas } from "@react-three/fiber";

import { CanvasWrapper } from "./index.styled";
import ModelContainer from "../ModelContainer";
import { XR, VRButton } from "@react-three/xr";

const Scene = () => {
  return (
    <>
      <CanvasWrapper>
        <VRButton />
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
