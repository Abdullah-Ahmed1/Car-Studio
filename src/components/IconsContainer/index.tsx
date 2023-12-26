import { useAtom } from "jotai";
import { IconZoomOut, IconZoomIn, PauseIcon, MainContainer, PlayIcon, ZoomIconsContainer, IconVisibility } from "./index.styled";
import { RotationAtom } from "../../atoms/rotation.atom";

const IconsContainer = () => {
  const [rotation, setRotation] = useAtom(RotationAtom);

  return (
    <MainContainer>
      {rotation && <PauseIcon onClick={() => setRotation(false)} />}
      {!rotation && <PlayIcon onClick={() => setRotation(true)} />}
      <ZoomIconsContainer>
        <IconZoomIn />
        <IconZoomOut />
      </ZoomIconsContainer>
      <IconVisibility />
    </MainContainer>
  );
};
export default IconsContainer;
