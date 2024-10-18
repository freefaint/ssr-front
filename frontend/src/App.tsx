import { ThemeProvider } from "@emotion/react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Navigate } from "react-router-dom";
import { theme } from "./styles/theme";
import { useEffect, useMemo, useState } from "react";
import { Header } from "./components/header";
import { Error } from "./components/error";
import { Loading } from "./components/loading";
import { COMPONENTS } from "./components/constants";
import { Href } from "./components/types";
import { ready, Bridge } from "@expressms/smartapp-sdk";
import { store } from "./infrastructure/redux/app/store";
import {Provider} from 'react-redux';
import { ConfigurationsProvider } from "./infrastructure/configurations/configurations-context/configurations-provider";
import { SignalRConnectorProvider } from "./infrastructure/hub-connector/signal-r-connector-provider";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter basename='/'>
        <Provider store={store}>
          <ConfigurationsProvider>
            <SignalRConnectorProvider>
              <Site />
            </SignalRConnectorProvider>
          </ConfigurationsProvider>
        </Provider>
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

  const path = useMemo(() => pathname.indexOf("/api/v1") === 0 ? "/" : pathname, [pathname]);

  const error = useMemo(() => !COMPONENTS[path as Href], [path]);

  return (
    <>
      <Header error={error} loading={loading} />

      <main style={{ transition: "opacity 300ms ease-in-out", opacity: loading || error ? 0 : 1 }}>
        <Routes>
          {Object.keys(COMPONENTS).map(i => (
            <Route key={i} path={i} Component={COMPONENTS[i as Href]} />
          ))}
            
          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
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
