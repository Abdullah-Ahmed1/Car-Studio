import styled from "styled-components";

export const MainContainer = styled.div`
  position: absolute;
  top: 100px;
  right: 20px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  width: 300px;
  height: 100px;
  background-color: black;
`;

export const Color = styled.div<{ backgroundColor: string }>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 1;
`;
