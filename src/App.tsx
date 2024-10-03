import { Chip, Grid2, IconButton, Paper, Stack, ThemeProvider, Typography } from '@mui/material';
import { DriveIcon, MenuIcon } from './icons';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Alert, { ALERT_STATUS } from './components/alert';
import { theme } from './styles/theme';
import Rating from './components/rating';
import { GraphBlock } from './components/graph';
import Block from './components/block';
import Section from './components/section';
import { Bunker, BunkerProps } from './components/bunker';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter basename='/'>
        <header style={{ position: "sticky", top: 0, background: "linear-gradient(to bottom, var(--dark), var(--dark) 80%, transparent 100%)", zIndex: 1 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <IconButton>
              <MenuIcon viewBox="0 0 38 38" />
            </IconButton>

            <Typography variant="h2" textTransform="uppercase">
              <Routes>
                <Route path='/' element={'Главная'} />
                <Route path='/rudnik' element={'Подземный рудник'} />
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
          </Routes>
        </main>
      </BrowserRouter>
    </ThemeProvider>
  );
}

const GRAPH_NODE = (
  <Stack direction="row" spacing={2}>
    <GraphBlock variant="outlined" />

    <GraphBlock variant="outlined" />
  </Stack>
);

const RATING_NODE = (
  <Rating
    items={[
      {
        value: 250,
        label: (
          <Stack>
            <Typography variant="body2">16:00</Typography>
            <Typography variant="body2">18:00</Typography>
          </Stack>
        )
      },
      {
        value: 160,
        label: (
          <Stack>
            <Typography variant="body2">16:00</Typography>
            <Typography variant="body2">18:00</Typography>
          </Stack>
        )
      },
      {
        value: 40,
        label: (
          <Stack>
            <Typography variant="body2">16:00</Typography>
            <Typography variant="body2">18:00</Typography>
          </Stack>
        )
      },
      {
        label: (
          <Stack>
            <Typography variant="body2">16:00</Typography>
            <Typography variant="body2">18:00</Typography>
          </Stack>
        )
      },
      {
        value: 200,
        label: (
          <Stack>
            <Typography variant="body2">16:00</Typography>
            <Typography variant="body2">18:00</Typography>
          </Stack>
        )
      },
      {
        value: 100,
        label: (
          <Stack>
            <Typography variant="body2">16:00</Typography>
            <Typography variant="body2">18:00</Typography>
          </Stack>
        )
      },
      {
        value: 0,
        label: (
          <Stack>
            <Typography variant="body2">16:00</Typography>
            <Typography variant="body2">18:00</Typography>
          </Stack>
        )
      }
    ]}
  />
);

const INFO_NODE = (
  <Stack direction="row" spacing={2}>
    <Stack flexGrow={1}>
      <Block variant="outlined" />
    </Stack>
    
    <Stack flexGrow={1}>
      <Block variant="outlined" />
    </Stack>
  </Stack>
);

const STATUS_NODE = (
  <Chip variant="outlined" color="success" label={<>ЛК-1</>} />
);

const MainPage = () => {
  return (
    <Stack spacing={2}>
      <Section
        title="Рудник подземный"
        href="/rudnik"
        bodies={[
          {
            name: "vagon",
            label: "Вагонов",

            graphNode: GRAPH_NODE,
            ratingNode: RATING_NODE,
            infoNode: INFO_NODE,
            statusNode: STATUS_NODE
          },

          {
            name: "kovsh",
            label: "Ковшей",

            graphNode: GRAPH_NODE,
            ratingNode: RATING_NODE,
            infoNode: INFO_NODE,
            statusNode: STATUS_NODE
          }
        ]}
      />

      <Alert color="warning" title="ВЭСП" status={ALERT_STATUS["warning"]} text="00:00:00" />
      <Alert color="error" title="ВЭСП" status={ALERT_STATUS["error"]} text="00:00:00" />
    </Stack>
  )
}

const BUNKERS: BunkerProps[] = new Array(20).fill(true).map(i => ({
  title: 'р/с 12 бис',
  filled: Math.random() < 0.3,
  value: Math.random() < 0.2 ? undefined : Math.ceil(Math.random() * 100000) / 100,
  kovsh: Math.random() < 0.2 ? 0 : Math.round(Math.random() * 100),
  vagon: Math.random() < 0.2 ? 0 : Math.round(Math.random() * 100),
}))

const RudnikPage = () => {
  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={2}>
        <GraphBlock />

        <GraphBlock />
      </Stack>
      
      <Section
        bodies={[
          {
            name: "vagon",
            label: "Вагонов",

            ratingNode: RATING_NODE,
            infoNode: INFO_NODE,
          },

          {
            name: "kovsh",
            label: "Ковшей",

            ratingNode: RATING_NODE,
            infoNode: INFO_NODE,
          }
        ]}
      />

      <Paper>
        <Grid2 container spacing={1}>
          {BUNKERS.map((i, j) => (
            <Grid2 key={j} size={3}>
              <Bunker {...i} />
            </Grid2>  
          ))}
        </Grid2>
      </Paper>
    </Stack>
  )
}

export default App;
