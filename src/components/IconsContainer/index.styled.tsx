import styled, { css } from "styled-components";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import ControlCameraIcon from "@mui/icons-material/ControlCamera";

export const MainContainer = styled.div`
  position: absolute;
  top: 100px;
  z-index: 1;
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
  cursor: pointer;
`;
export const PauseIcon = styled(PauseCircleIcon)`
  color: White;
  cursor: pointer;
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

export const EnableMoveIcon = styled(ControlCameraIcon)<{ drag: boolean }>`
  color: #949494;
  cursor: pointer;

  ${({ drag }) => {
    if (drag)
      return css`
        color: white;
      `;
  }}
`;
