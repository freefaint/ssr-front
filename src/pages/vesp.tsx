import { Stack, Paper, Grid2, Typography, Chip } from "@mui/material";
import { BunkerProps, Bunker } from "../components/bunker";
import { GraphBlock } from "../components/graph";
import Section from "../components/section";
import { INFO_NODE } from "../mock";


const BUNKERS: BunkerProps[] = new Array(20).fill(true).map(i => ({
  title: 'р/с 12 бис',
  filled: Math.random() < 0.3,
  value: Math.random() < 0.2 ? undefined : Math.ceil(Math.random() * 100000) / 100,
  kovsh: Math.random() < 0.2 ? 0 : Math.round(Math.random() * 100),
  vagon: Math.random() < 0.2 ? 0 : Math.round(Math.random() * 100),
}));

const LastStop = ({ stopDate, startDate }: { startDate: string; stopDate: string }) => {
  return (
    <Paper>
      <Stack spacing={2}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography>Последнеяя остановка</Typography>

          <Chip
            size="small"
            variant="filled"
            color="error"
            label={`${Math.ceil((new Date(startDate).valueOf() - new Date(stopDate).valueOf()) / (1000 * 60 * 60))}мин`}
          />
        </Stack>

        <Stack direction="row" alignItems="center" spacing={2}>
          <Paper style={{ flexGrow: 1 }} variant="outlined">
            <Stack spacing={1}>
              <Typography variant="body1" color="secondary">Остановка</Typography>

              <Stack direction="row" spacing={0.5}>
                <Typography color="error">{new Date(stopDate).toLocaleDateString('il-IL')},</Typography>
                <Typography>{new Date(stopDate).toLocaleTimeString('il-IL').substring(0, 5)}</Typography>
              </Stack>
            </Stack>
          </Paper>

          <Paper style={{ flexGrow: 1 }} variant="outlined">
            <Stack spacing={1}>
              <Typography variant="body1" color="secondary">Запуск</Typography>

              <Stack direction="row" spacing={0.5}>
                <Typography color="success">{new Date(stopDate).toLocaleDateString('il-IL')},</Typography>
                <Typography>{new Date(stopDate).toLocaleTimeString('il-IL').substring(0, 5)}</Typography>
              </Stack>
            </Stack>
          </Paper>
        </Stack>
      </Stack>
    </Paper>
  )
}

const VespPage = () => {
  return (
    <Stack spacing={2}>
      <LastStop
        startDate={new Date(new Date().valueOf() - 1000 * 60 * 60 * 35).toISOString()}
        stopDate={new Date(new Date().valueOf() - 1000 * 60 * 60 * 58).toISOString()} 
      />

      <Stack direction="row" spacing={2}>
        <GraphBlock />

        <GraphBlock />
      </Stack>
      
      <Section
        bodies={[
          {
            name: "workday",
            label: "Смена",

            infoNode: INFO_NODE
          },

          {
            name: "hour",
            label: "Час",

            infoNode: INFO_NODE
          },

          {
            name: "day",
            label: "Сутки",

            infoNode: INFO_NODE
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

export default VespPage;