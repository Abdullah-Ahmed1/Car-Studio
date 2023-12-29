import { Environment } from "@react-three/drei";

import Lights from "../Lights";
import ModelLoader from "../ModelLoader";
import OrbitControl from "../OrbitalControls";

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
