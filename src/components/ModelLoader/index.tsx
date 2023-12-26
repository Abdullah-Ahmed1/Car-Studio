import gsap from "gsap";
import { useState, useRef, useEffect } from "react";
import { useLoader, useFrame, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { RotationAtom } from "../../atoms/rotation.atom";
import { ColorsAtom } from "../../atoms/colors.atom";
import { SelectedColorAtom } from "../../atoms/color.atom";
import { useSetAtom, useAtom, useAtomValue } from "jotai";

const ModelLoader = () => {
  const { raycaster } = useThree();
  const [hovered, setHovered] = useState(null);
  const [hovered2, setHovered2] = useState(null);
  const rotationRef = useRef(null);
  const [modelRotation, setModelRotation] = useAtom(RotationAtom);
  const [originalColor, setOriginalColor] = useState(null);
  const [originalColor2, setOriginalColor2] = useState(null);
  const setColorsShow = useSetAtom(ColorsAtom);
  const selectedColor = useAtomValue(SelectedColorAtom);

  const gltf = useLoader(GLTFLoader, "/nissan1.glb", (loader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.3/");
    loader.setDRACOLoader(dracoLoader);
  });

  const handleClick = () => {
    //todo : if one the mesh is already selected and then user click another mesh, previously selected mesh color should be reset to its original
    setHovered2(hovered);
    setOriginalColor2(originalColor);
    if (originalColor && hovered) {
      if (hovered !== hovered2) {
        setOriginalColor(originalColor2);
        hovered2?.material?.color.copy(originalColor2);
        setColorsShow(true);
      }
      setOriginalColor(hovered.material.color.clone());
    }
    if (rotationRef.current && modelRotation) {
      setModelRotation(false);
      rotationRef.current.paused(true);
      setTimeout(() => {
        rotationRef.current.paused(false);
      }, 5000);
    }
  };

  useEffect(() => {
    if (!selectedColor && !hovered2) return;
    hovered2.material.color.set(selectedColor);
    setOriginalColor(hovered2.material.color.clone());
    setOriginalColor2(hovered2.material.color.clone());
  }, [selectedColor]);

  useEffect(() => {
    if (!rotationRef.current) return;
    modelRotation ? rotationRef.current.paused(false) : rotationRef.current.paused(true);
  }, [modelRotation]);

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
