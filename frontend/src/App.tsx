import { ThemeProvider } from "@emotion/react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { theme } from "./styles/theme";
import { useEffect, useMemo, useState } from "react";
import { Header } from "./components/header";
import { Error } from "./components/error";
import { Loading } from "./components/loading";
import { COMPONENTS } from "./components/constants";
import { Href } from "./components/types";
import { ready, Bridge } from "@expressms/smartapp-sdk";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter basename='/'>
        <Site />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export const Site = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Bridge?.sendClientEvent({ method: "ready", params: {} });

    setTimeout(() => {
      setLoading(false);
      ready();
    }, 2000);
  }, []);

  const error = useMemo(() => !COMPONENTS[pathname as Href], [pathname]);

  return (
    <>
      <Header error={error} loading={loading} />

      <main style={{ transition: "opacity 300ms ease-in-out", opacity: loading || error ? 0 : 1 }}>
        <Routes>
          {Object.keys(COMPONENTS).map(i => (
            <Route key={i} path={i} Component={COMPONENTS[i as Href]} />
          ))}
        </Routes>
      </main>

      <Error
        open={error}
        code={404}
        title="Страница не найдена"
        text="Ресурс недоступен по указанному адресу"
        onClose={() => navigate(Href.Main)}
      />

      <Loading open={loading} />
    </>
  );
}

export default App;
