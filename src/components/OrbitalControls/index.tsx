import { FC } from "react";
import { useAtom, useAtomValue } from "jotai";
import { OrbitControls } from "@react-three/drei";
import { EnableDragAtom } from "../../atoms/enableDrag.atom";
import { RotationCameraAtom } from "../../atoms/rotationCamera.atom";
import { RotationCheckAtom } from "../../atoms/rotationcheck.atom";

const OrbitControl: FC = () => {
  const [, setRotationCamera] = useAtom(RotationCameraAtom);
  const enableDrag = useAtomValue(EnableDragAtom);
  const [, setIsRotating] = useAtom(RotationCheckAtom);
  const handleStart = () => {
    // setColorsPallete(false);
    setIsRotating(true);
  };
  const handleEnd = () => {
    setIsRotating(false);
    // setIsDrag(false);
  };

  return (
    <OrbitControls
      ref={(_ref) => {
        setRotationCamera(_ref);
      }}
      autoRotate={true}
      minDistance={3}
      enableRotate={!enableDrag}
      maxDistance={5}
      rotateSpeed={0.75}
      minPolarAngle={Math.PI / 9}
      maxPolarAngle={Math.PI - Math.PI / 1.8}
      onStart={handleStart}
      onEnd={handleEnd}
    />
  );
};

export default OrbitControl;
