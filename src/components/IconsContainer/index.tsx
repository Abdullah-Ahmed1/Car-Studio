import { useAtom } from "jotai";
import { IconZoomOut, IconZoomIn, PauseIcon, MainContainer, PlayIcon, ZoomIconsContainer, IconVisibility } from "./index.styled";
import { RotationAtom } from "../../atoms/rotation.atom";
import { CameraAtom } from "../../atoms/camera.atom";
import { useAtomValue } from "jotai";
import gsap from "gsap";
const IconsContainer = () => {
  const [rotation, setRotation] = useAtom(RotationAtom);
  const camera = useAtom(CameraAtom);

  const handleZoomIn = () => {
    console.log("here?????");
    gsap.to(camera, {
      y: "-10",
      duration: 10,
      // repeat: -1,
      ease: "linear",
      //  paused: false,
    });
  };
  const handleZoomOut = () => {};

  return (
    <MainContainer>
      {rotation && <PauseIcon onClick={() => setRotation(false)} />}
      {!rotation && <PlayIcon onClick={() => setRotation(true)} />}
      <ZoomIconsContainer>
        <IconZoomIn onClick={handleZoomIn} />
        <IconZoomOut onClick={handleZoomOut} />
      </ZoomIconsContainer>
      <IconVisibility />
    </MainContainer>
  );
};
export default IconsContainer;
