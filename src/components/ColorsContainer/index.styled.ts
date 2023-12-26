import styled, { css } from "styled-components";
import PaletteIcon from "@mui/icons-material/Palette";

export const MainContainer = styled.div`
  position: absolute;
  top: 100px;
  right: 20px;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  gap: 10px;
  width: 300px;
  height: 50px;
  background-color: black;
`;

export const ColorContainer = styled.div<{ colorshow: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;

  ${({ colorshow }) => {
    if (!colorshow)
      return css`
        visibility: hidden;
        transition: visibility 0.2s linear, opacity 0.2s linear;
      `;
  }}
  visibility: "visible";
`;
export const Color = styled.div<{ backgroundcolor: string }>`
  background-color: ${({ backgroundcolor }) => backgroundcolor};
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 1;
`;
export const IconPallete = styled(PaletteIcon)`
  color: white;
  width: 50px;
  cursor: pointer;
  z-index: 1;
`;
