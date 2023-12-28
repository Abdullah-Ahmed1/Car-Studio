import { useAtom } from "jotai";
import { IconZoomOut, IconZoomIn, PauseIcon, MainContainer, PlayIcon, ZoomIconsContainer, IconVisibility } from "./index.styled";
import { RotationAtom } from "../../atoms/rotation.atom";
import { CameraAtom } from "../../atoms/camera.atom";
import { useAtomValue } from "jotai";
// import { gsap } from "gsap";
import SideSelection from "../SideSelectionComponent";
const IconsContainer = () => {
  const [rotation, setRotation] = useAtom(RotationAtom);
  const camera = useAtomValue(CameraAtom);

  const handleZoomIn = () => {
    if (!camera) return;
    camera.fov -= 1;
    camera?.updateProjectionMatrix();
  };
  const handleZoomOut = () => {
    if (!camera) return;
    camera.fov += 1;
    camera?.updateProjectionMatrix();
  };
  const handleViewChange = () => {
    // gsap.to(camera.position, {
    //   x: 20,
    //   // y: -20,
    //   duration: 1,
    //   // repeat: -1,
    //   ease: "Power1.easeInOut",
    //   paused: false,
    // });
    // gsap.to(camera.position, {
    //   x: 0,
    //   y: 0,
    //   z: 3,
    //   // repeat: -1,
    //   ease: "Power1.easeInOut",
    //   // paused: false,
    // });
    // gsap.to(camera.position, {
    //   x: 0,
    //   y: 10,
    //   z: 0,
    //   // repeat: -1,
    //   ease: "Power1.easeInOut",
    //   // paused: false,
    // });
    // gsap.to(camera.position, {
    //   x: 0,
    //   y: 0,
    //   z: -7,
    //   // repeat: -1,
    //   ease: "Power1.easeInOut",
    //   // paused: false,
    // });
  };

  return (
    <MainContainer>
      {rotation && <PauseIcon onClick={() => setRotation(false)} />}
      {!rotation && <PlayIcon onClick={() => setRotation(true)} />}
      <ZoomIconsContainer>
        <IconZoomIn onClick={handleZoomIn} />
        <IconZoomOut onClick={handleZoomOut} />
      </ZoomIconsContainer>
      <IconVisibility onClick={handleViewChange} />
      <SideSelection />
    </MainContainer>
  );
};
export default IconsContainer;
