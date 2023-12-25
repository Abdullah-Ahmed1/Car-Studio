import { IconZoomOut, IconZoomIn, MainContainer, PlayIcon, ZoomIconsContainer, IconVisibility } from "./index.styled";

const IconsContainer = () => {
  return (
    <MainContainer>
      <PlayIcon />
      <ZoomIconsContainer>
        <IconZoomIn />
        <IconZoomOut />
      </ZoomIconsContainer>
      <IconVisibility />
    </MainContainer>
  );
};
export default IconsContainer;
