import * as THREE from "three";
import { useDrag } from "react-use-gesture";
import { useState, useRef, useEffect } from "react";
import { useSetAtom, useAtom, useAtomValue } from "jotai";
import { useLoader, useFrame, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

import { ColorsAtom } from "../../atoms/colors.atom";
import { CameraAtom } from "../../atoms/camera.atom";
import { LoadCheckAtom } from "../../atoms/loadCheck.atom";
import { SelectedColorAtom } from "../../atoms/color.atom";
import { EnableDragAtom } from "../../atoms/enableDrag.atom";
import { RotationCheckAtom } from "../../atoms/rotationcheck.atom";
import { DragAtom } from "../../atoms/drag.atom";

const ModelLoader = () => {
  const { raycaster, camera } = useThree();
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;
  const [originalColor, setOriginalColor] = useState<THREE.Color | null>(null);
  const [hovered, setHovered] = useState<THREE.Mesh | null>(null);
  const [hovered2, setHovered2] = useState<THREE.Mesh | null>(null);
  const [clicked, setClicked] = useState(false);
  const enableDrag = useAtomValue(EnableDragAtom);
  const [position, setPosition] = useState([0, 0, 0]);
  const isRotating = useAtomValue(RotationCheckAtom);
  const [isDrag, setIsDrag] = useAtom(DragAtom);
  const setCamera = useSetAtom(CameraAtom);
  const setColorsShow = useSetAtom(ColorsAtom);
  const [selectedColor, setSelectedColor] = useAtom(SelectedColorAtom);
  const [, setLoadCheck] = useAtom(LoadCheckAtom);

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
    // console.log("======>>>>>", isDrag);
    // if (isDrag) {
    //   setIsDrag(false);
    //   return;
    // }
    console.log(">>><<<<");
    // if (isRotating) return;
    setClicked(true);
    setHovered2(hovered);
    if (originalColor && hovered) {
      setColorsShow(true);
    }
  };

  // useEffect(() => {
  //   if (!isRotating) return;
  //   if (hovered && originalColor) (hovered.material as THREE.MeshBasicMaterial).color.copy(originalColor);
  // }, [isRotating]);

  useEffect(() => {
    gltf ? setLoadCheck(true) : setLoadCheck(false);
  }, [gltf]);

  useEffect(() => {
    console.log(isRotating);

    const handleMouseMove = () => {
      if (isRotating) {
        console.log("mouse moved=====>>");
        setIsDrag(true);
      }
    };
    document.body.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.body.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isRotating]);

  useEffect(() => {
    if (!clicked || !hovered2) return;
    setOriginalColor((hovered2?.material as THREE.MeshBasicMaterial).color.clone());
    setClicked(false);
  }, [clicked]);

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
    if (!isRotating) {
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
    }
  });
  const bind = useDrag(
    ({ offset: [x, y] }) => {
      const [, , z] = position;
      enableDrag && setPosition([x / aspect, -y / aspect, z / aspect]);
    },
    { pointerEvents: false }
  );

  return (
    <group>
      <primitive object={gltf.scene} position={position} onClick={handleClick} onPointerMove={() => console.log(">>>>>>????")} {...bind()}>
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
