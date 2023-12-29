import { useAtom } from "jotai";
import { IconZoomOut, IconZoomIn, PauseIcon, MainContainer, PlayIcon, ZoomIconsContainer } from "./index.styled";
import { RotationAtom } from "../../atoms/rotation.atom";
import { CameraAtom } from "../../atoms/camera.atom";
import { useAtomValue } from "jotai";
import SideSelection from "../SideSelectionComponent";
import { PerspectiveCamera } from "three";
import { RotationCameraAtom } from "../../atoms/rotationCamera.atom";
const IconsContainer = () => {
  const [rotation, setRotation] = useAtom(RotationAtom);
  const camera = useAtomValue(CameraAtom);
  const rotationCamera = useAtomValue(RotationCameraAtom);

  const handleZoomIn = () => {
    if (!camera) return;
    (camera as PerspectiveCamera).fov -= 1;
    camera?.updateProjectionMatrix();
  };
  const handleZoomOut = () => {
    if (!camera) return;
    (camera as PerspectiveCamera).fov += 1;
    camera?.updateProjectionMatrix();
  };

  const handlePlayRotation = () => {
    if (!rotationCamera) return;
    rotationCamera.autoRotate = true;
    setRotation(true);
  };
  const handlePauseRotation = () => {
    if (!rotationCamera) return;
    rotationCamera.autoRotate = false;
    setRotation(false);
  };

  return (
    <MainContainer>
      {rotation && <PauseIcon onClick={handlePauseRotation} />}
      {!rotation && <PlayIcon onClick={handlePlayRotation} />}
      <ZoomIconsContainer>
        <IconZoomIn onClick={handleZoomIn} />
        <IconZoomOut onClick={handleZoomOut} />
      </ZoomIconsContainer>
      <SideSelection />
    </MainContainer>
  );
};
export default IconsContainer;
