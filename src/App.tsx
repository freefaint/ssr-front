import { ThemeProvider } from "@emotion/react";
import { Stack, IconButton, Typography } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MenuIcon, DriveIcon } from "./icons";
import { theme } from "./styles/theme";
import MainPage from "./pages/main";
import RudnikPage from "./pages/rudnik";
import VespPage from "./pages/vesp";
import FabricPage from "./pages/fabric";

const ALPHA_GRAD = "linear-gradient(to bottom, var(--dark), var(--dark) 80%, transparent 100%)";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter basename='/'>
        <header style={{ position: "sticky", top: 0, background: ALPHA_GRAD, zIndex: 1 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <IconButton>
              <MenuIcon viewBox="0 0 38 38" />
            </IconButton>

            <Typography variant="h2" textTransform="uppercase">
              <Routes>
                <Route path='/' element={'Главная'} />
                <Route path='/rudnik' element={'Подземный рудник'} />
                <Route path='/vesp' element={'ВЭСП'} />
                <Route path='/fabric' element={'Фабрика'} />
              </Routes>
            </Typography>

            <IconButton>
              <DriveIcon viewBox="0 0 38 38" />
            </IconButton>
          </Stack>
        </header>

        <main>
          <Routes>
            <Route path='/' Component={MainPage} />
            <Route path='/rudnik' Component={RudnikPage} />
            <Route path='/vesp' Component={VespPage} />
            <Route path='/fabric' Component={FabricPage} />
          </Routes>
        </main>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
