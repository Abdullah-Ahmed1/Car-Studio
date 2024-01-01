import { useAtomValue } from "jotai";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import Scene from "./components/Scene";
import { MainContainer } from "./App.styled";
import { LoadCheckAtom } from "./atoms/loadCheck.atom";
import ColorsContainer from "./components/ColorsContainer";
import IconsContainer from "./components/IconsContainer";
function App() {
  const loadcheck = useAtomValue(LoadCheckAtom);
  return (
    <MainContainer>
      <Backdrop sx={{ color: "#fb0707", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={!loadcheck}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <IconsContainer />
      <ColorsContainer />
      <Scene />
    </MainContainer>
  );
}

export default App;
