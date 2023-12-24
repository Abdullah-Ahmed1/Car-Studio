import { useState } from "react";
import { useLoader, useFrame, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

const ModelLoader = () => {
  const { raycaster } = useThree();
  const [hovered, setHovered] = useState(null);
  const [originalColor, setOriginalColor] = useState(null);
  const gltf = useLoader(GLTFLoader, "/nissan1.glb", (loader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.3/");
    loader.setDRACOLoader(dracoLoader);
  });

  useFrame(() => {
    const intersects = raycaster.intersectObject(gltf.scene, true);

    if (intersects.length > 0) {
      const mesh = intersects[0].object;

      if (mesh !== hovered) {
        if (hovered && originalColor) {
          hovered.material.color.copy(originalColor);
        }

        setHovered(mesh);
        setOriginalColor(mesh.material.color.clone());
        mesh.material.color.set("#6d6d6d");
      }
    } else {
      if (hovered && originalColor) {
        hovered.material.color.copy(originalColor);
        setHovered(null);
      }
    }
  });

  return (
    <group>
      <primitive object={gltf.scene} />
    </group>
  );
};

export default ModelLoader;
