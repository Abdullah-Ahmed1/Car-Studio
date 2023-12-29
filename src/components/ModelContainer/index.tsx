import { Environment } from "@react-three/drei";

import ModelLoader from "../ModelLoader";
import OrbitControl from "../OrbitalControls";
import Lights from "../Lights";

const ModelContainer = () => {
  return (
    <>
      <mesh>
        <ModelLoader />
      </mesh>
      <Lights />
      <OrbitControl />
      <Environment background={false} files="/autoshop.hdr" />
    </>
  );
};

export default ModelContainer;
