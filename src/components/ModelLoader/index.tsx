import gsap from "gsap";
import { useState, useRef, useEffect } from "react";
import { useLoader, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { RotationAtom } from "../../atoms/rotation.atom";
import { ColorsAtom } from "../../atoms/colors.atom";
import { SelectedColorAtom } from "../../atoms/color.atom";
import { CameraAtom } from "../../atoms/camera.atom";
import { useSetAtom, useAtom, useAtomValue } from "jotai";

const ModelLoader = () => {
  const { raycaster, camera } = useThree();
  const [hovered, setHovered] = useState<THREE.Mesh | null>(null);
  const [hovered2, setHovered2] = useState<THREE.Mesh | null>(null);
  const [modelRotation, setModelRotation] = useAtom(RotationAtom);
  const [originalColor, setOriginalColor] = useState(null);
  const [originalColor2, setOriginalColor2] = useState(null);
  const setColorsShow = useSetAtom(ColorsAtom);
  const selectedColor = useAtomValue(SelectedColorAtom);
  const setCamera = useSetAtom(CameraAtom);

  const rotationRef = useRef<null | React.MutableRefObject<object>>(null);
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
    //todo : if one the mesh is already selected and then user click another mesh, previously selected mesh color should be reset to its original
    setHovered2(hovered);
    setOriginalColor2(originalColor);
    if (originalColor && hovered) {
      setOriginalColor(originalColor2);
      hovered2?.material?.color.copy(originalColor2);
      setColorsShow(true);
      setOriginalColor(hovered.material.color.clone());
    }
    if (rotationRef.current && modelRotation) {
      setModelRotation(false);
      rotationRef.current.paused(true);
      setTimeout(() => {
        rotationRef.current.paused(false);
        setModelRotation(true);
      }, 5000);
    }
  };

  useEffect(() => {
    if (!selectedColor && !hovered2 && !hovered2) return;
    hovered2?.material.color.set(selectedColor);
    setOriginalColor(hovered2?.material.color.clone());
    setOriginalColor2(hovered2?.material.color.clone());
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
    const intersects: THREE.Intersection[] = raycaster.intersectObject(gltf.scene, true);

    if (intersects.length > 0) {
      const mesh = intersects[0].object;

      if (mesh instanceof THREE.Mesh && mesh !== hovered) {
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
