import Scene from "./components/Scene";
import { MainContainer } from "./App.styled";
import IconsContainer from "./components/IconsContainer";
import ColorsContainer from "./components/ColorsContainer";
function App() {
  return (
    <MainContainer>
      <IconsContainer />
      <ColorsContainer />
      <Scene />
    </MainContainer>
  );
}

export default App;
