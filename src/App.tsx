import Scene from "./components/Scene";
import { MainContainer } from "./App.styled";
import IconsContainer from "./components/IconsContainer";

function App() {
  return (
    <MainContainer>
      <IconsContainer />
      <Scene />
    </MainContainer>
  );
}

export default App;
