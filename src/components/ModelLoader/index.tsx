import { useState, useRef, useEffect } from "react";
import { useLoader, useFrame, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import gsap from "gsap";

const ModelLoader = () => {
  const { raycaster } = useThree();
  const [hovered, setHovered] = useState(null);
  const rotationRef = useRef(null);
  const [originalColor, setOriginalColor] = useState(null);
  const gltf = useLoader(GLTFLoader, "/nissan1.glb", (loader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.3/");
    loader.setDRACOLoader(dracoLoader);
  });

  const handleClick = () => {
    if (rotationRef.current) {
      rotationRef.current.paused(true);
      setTimeout(() => {
        rotationRef.current.paused(false);
      }, 5000);
    }
  };

  useEffect(() => {
    rotationRef.current = gsap.to(gltf.scene.rotation, {
      y: "+=6.283",
      duration: 55,
      repeat: -1,
      ease: "linear",
      paused: false,
    });
  }, [gltf.scene]);

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
      <primitive object={gltf.scene} onClick={handleClick} />
    </group>
  );
};

export default ModelLoader;
