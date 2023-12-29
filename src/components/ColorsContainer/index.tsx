import { useAtom, useSetAtom } from "jotai";

import { ColorsAtom } from "../../atoms/colors.atom";
import { SelectedColorAtom } from "../../atoms/color.atom";
import { MainContainer, Color, ColorContainer, IconPallete } from "./index.styled";

const colors = ["#ff0000", "#FFFFFF", "#800080", "#FFA500", "#FFFF00", "#00FF00"];

const ColorsContainer = () => {
  const [colorsShow, setColorsShow] = useAtom(ColorsAtom);
  const setColor = useSetAtom(SelectedColorAtom);

  const handleColorClick = (item: string) => {
    setColor(item);
    setColorsShow(false);
  };

  return (
    <MainContainer>
      <IconPallete />
      <ColorContainer colorshow={colorsShow}>
        {colors.map((item, index) => {
          return <Color key={index} backgroundcolor={item} onClick={() => handleColorClick(item)} />;
        })}
      </ColorContainer>
    </MainContainer>
  );
};
export default ColorsContainer;
