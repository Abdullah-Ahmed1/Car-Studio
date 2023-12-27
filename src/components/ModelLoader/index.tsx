import gsap from "gsap";
import * as THREE from "three";
import { useState, useRef, useEffect } from "react";
import { useSetAtom, useAtom, useAtomValue } from "jotai";
import { useLoader, useFrame, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

import { ColorsAtom } from "../../atoms/colors.atom";
import { CameraAtom } from "../../atoms/camera.atom";
import { RotationAtom } from "../../atoms/rotation.atom";
import { SelectedColorAtom } from "../../atoms/color.atom";

const ModelLoader = () => {
  const { raycaster, camera } = useThree();

  const [originalColor, setOriginalColor] = useState(null);
  const [originalColor2, setOriginalColor2] = useState(null);
  const [hovered, setHovered] = useState<THREE.Mesh | null>(null);
  const [hovered2, setHovered2] = useState<THREE.Mesh | null>(null);

  const setCamera = useSetAtom(CameraAtom);
  const setColorsShow = useSetAtom(ColorsAtom);
  const [selectedColor, setSelectedColor] = useAtom(SelectedColorAtom);
  const [modelRotation, setModelRotation] = useAtom(RotationAtom);

  const cameraRef = useRef<unknown>(null);
  const rotationRef = useRef<null | React.MutableRefObject<object>>(null);

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
    //todo : if one the mesh is already selected and then user click another mesh, previously selected mesh color should be reset to its
    setHovered2(hovered); //the mesh with red color
    setOriginalColor2(originalColor); //red
    setColorsShow(true);

    if (rotationRef.current && modelRotation) {
      setModelRotation(false);
      rotationRef.current.paused(true);
    }
  };

  useEffect(() => {
    if (!hovered2) return;

    setOriginalColor(new THREE.Color("#6d6d6d"));
    console.log("=====================", hovered2, hovered, hovered == hovered2);
    return () => {
      hovered?.material?.color.copy(originalColor);
    };
  }, [hovered2]);

  useEffect(() => {
    console.log("#####", hovered, selectedColor);
    if (!selectedColor) return;
    const temp = hovered2;
    temp.material?.color.copy(new THREE.Color(selectedColor));
    setOriginalColor2(new THREE.Color(selectedColor));
    setOriginalColor(new THREE.Color(selectedColor));
  }, [selectedColor]);

  useEffect(() => {
    console.log("test123");
  }, [originalColor, hovered]);

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
        setHovered(mesh); //saving the original hovered mesh into the state
        setOriginalColor(mesh.material.color.clone()); // and then setting the original color to the state also
        mesh.material.color.set("#6d6d6d"); // setting the color of the mesh to this hex
      }
    } else {
      if (hovered && originalColor) {
        hovered.material.color.copy(originalColor); // when mesh is unhovered then setting the mesh to its original color
        setHovered(null); // then setting the mesh to null
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
