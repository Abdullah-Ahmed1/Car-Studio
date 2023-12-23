import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
const ModelLoader = () => {
  const gltf = useLoader(GLTFLoader, "/nissan1.glb", (loader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.3/");
    loader.setDRACOLoader(dracoLoader);
  });
  console.log("gltf is", gltf);

  return (
    <primitive object={gltf.scene}>
      {gltf.scene &&
        gltf.scene.traverse((child: any) => {
          if (child instanceof THREE.Mesh) {
            console.log("child>>>>>", child);
            if (child.name == "Object_15") {
              child.material.color = new THREE.Color("#3d34eb");
            }
            if (child.name == "Object_17") {
              child.material.color = new THREE.Color("#050506");
            }
            if (child.name == "Object_14") {
              child.material.color = new THREE.Color("#eb34a8");
            }
            if (child.name == "Object_38") {
              child.material.color = new THREE.Color("#eb34a8");
            }
          }
        })}
    </primitive>
  );
};

export default ModelLoader;
