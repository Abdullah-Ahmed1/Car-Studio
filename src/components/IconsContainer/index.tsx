import { useAtom } from "jotai";
import { IconZoomOut, IconZoomIn, PauseIcon, MainContainer, PlayIcon, ZoomIconsContainer } from "./index.styled";
import { RotationAtom } from "../../atoms/rotation.atom";
import { CameraAtom } from "../../atoms/camera.atom";
import { useAtomValue } from "jotai";
import SideSelection from "../SideSelectionComponent";
import { PerspectiveCamera } from "three";
const IconsContainer = () => {
  const [rotation, setRotation] = useAtom(RotationAtom);
  const camera = useAtomValue(CameraAtom);

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

  return (
    <MainContainer>
      {rotation && <PauseIcon onClick={() => setRotation(false)} />}
      {!rotation && <PlayIcon onClick={() => setRotation(true)} />}
      <ZoomIconsContainer>
        <IconZoomIn onClick={handleZoomIn} />
        <IconZoomOut onClick={handleZoomOut} />
      </ZoomIconsContainer>
      <SideSelection />
    </MainContainer>
  );
};
export default IconsContainer;
