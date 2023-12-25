import styled from "styled-components";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";

export const MainContainer = styled.div`
  position: absolute;
  top: 100px;
  left: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50px;
  height: 100px;
  background-color: black;
  gap: 20px;
`;

export const PlayIcon = styled(PlayCircleFilledIcon)`
  color: White;
`;

export const ZoomIconsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const IconZoomIn = styled(ZoomInIcon)`
  color: white;
  cursor: pointer;
`;
export const IconZoomOut = styled(ZoomOutIcon)`
  color: white;
  cursor: pointer;
`;

export const IconVisibility = styled(VisibilityIcon)`
  color: white;
  cursor: pointer;
`;
