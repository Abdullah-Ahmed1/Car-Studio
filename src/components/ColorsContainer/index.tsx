import { useAtom, useSetAtom } from "jotai";

import { ColorsAtom } from "../../atoms/colors.atom";
import { SelectedColorAtom } from "../../atoms/color.atom";
import { MainContainer, Color, ColorContainer, IconPallete } from "./index.styled";
import { ColorPicker, useColor, IColor } from "react-color-palette";
import "react-color-palette/css";

const colors = ["#ff0000", "#FFFFFF", "#800080", "#FFA500", "#FFFF00", "#00FF00"];

const ColorsContainer = () => {
  const [color, setMeshColor] = useColor("#123123");

  const [colorsShow, setColorsShow] = useAtom(ColorsAtom);
  const setColor = useSetAtom(SelectedColorAtom);

  const handleColorClick = (item: string) => {
    setColor(item);
    setColorsShow(false);
  };

  const handleMixerColorChange = (value: IColor) => {
    setMeshColor(value);
    setColor(value.hex);
  };
  return (
    <MainContainer>
      <IconPallete />
      <ColorContainer colorshow={colorsShow}>
        {colors.map((item, index) => {
          return <Color key={index} backgroundcolor={item} onClick={() => handleColorClick(item)} />;
        })}
      </ColorContainer>
      <div style={{ zIndex: 1, position: "absolute", top: "100px", right: "5px", visibility: `${colorsShow ? "visible" : "hidden"}` }}>
        <ColorPicker hideInput={["rgb", "hsv"]} color={color} onChange={handleMixerColorChange} />
      </div>
    </MainContainer>
  );
};
export default ColorsContainer;
