import * as THREE from "three";
import { useState, useRef, useEffect } from "react";
import { useSetAtom, useAtom } from "jotai";
import { useLoader, useFrame, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

import { ColorsAtom } from "../../atoms/colors.atom";
import { CameraAtom } from "../../atoms/camera.atom";
import { SelectedColorAtom } from "../../atoms/color.atom";

const ModelLoader = () => {
  const { raycaster, camera } = useThree();

  const [originalColor, setOriginalColor] = useState<THREE.Color | null>(null);
  const [hovered, setHovered] = useState<THREE.Mesh | null>(null);
  const [hovered2, setHovered2] = useState<THREE.Mesh | null>(null);

  const setCamera = useSetAtom(CameraAtom);
  const setColorsShow = useSetAtom(ColorsAtom);
  const [selectedColor, setSelectedColor] = useAtom(SelectedColorAtom);

  const cameraRef = useRef<unknown>(null);

  const gltf = useLoader(GLTFLoader, "/nissan1.glb", (loader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.3/");
    loader.setDRACOLoader(dracoLoader);
  });

  useEffect(() => {
    cameraRef.current == camera;
    setCamera(camera);
  }, [camera]);

  const handleClick = () => {
    setHovered2(hovered);
    if (originalColor && hovered) {
      setColorsShow(true);
    }
  };
  useEffect(() => {
    if (selectedColor) return;
  }, [hovered2]);

  useEffect(() => {
    // TODO : if the mesh color is changed once and if we clickk on the very same mesh on very next time, it will not keep the color grey until the color is selected(it chnages back to the changed color(that was the new original)). fix that
    if (!selectedColor && !hovered2) return;
    if (selectedColor) (hovered2?.material as THREE.MeshBasicMaterial).color.set(selectedColor); //here if the selected color is null it will set to the previous mesh color
    setOriginalColor((hovered2?.material as THREE.MeshBasicMaterial).color.clone());
    setSelectedColor(null);
    return () => {
      if (!selectedColor && originalColor) {
        (hovered2?.material as THREE.MeshBasicMaterial).color.set(originalColor);
      }
    };
  }, [selectedColor, hovered2]);

  useFrame(() => {
    const intersects: THREE.Intersection[] = raycaster.intersectObject(gltf.scene, true);

    if (intersects.length > 0) {
      const mesh = intersects[0].object;

      if (mesh instanceof THREE.Mesh && mesh !== hovered) {
        if (hovered && originalColor) {
          (hovered.material as THREE.MeshBasicMaterial).color.copy(originalColor);
        }
        setHovered(mesh);
        setOriginalColor(mesh.material.color.clone());
        mesh.material.color.set("#6d6d6d");
      }
    } else {
      if (hovered && originalColor) {
        (hovered.material as THREE.MeshBasicMaterial).color.copy(originalColor);
        setHovered(null);
      }
    }
  });

  return (
    <group>
      <primitive object={gltf.scene} onClick={handleClick}>
        {gltf.scene &&
          gltf.scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.material.envMapIntensity = 0.25;
              // child.material.metalness = 0.9;
              // child.material.needsUpdate = true;
            }
          })}
      </primitive>
    </group>
  );
};

export default ModelLoader;
