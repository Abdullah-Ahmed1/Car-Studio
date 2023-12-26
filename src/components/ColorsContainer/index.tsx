import { MainContainer, Color } from "./index.styled";

const colors = ["red", "white", "purple", "orange", "yellow", "green"];

const ColorsContainer = () => {
  return (
    <MainContainer>
      {colors.map((item, index) => {
        return <Color key={index} backgroundColor={item} />;
      })}
    </MainContainer>
  );
};
export default ColorsContainer;
