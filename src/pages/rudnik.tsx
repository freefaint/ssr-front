import { Stack, Paper, Grid2 } from "@mui/material";
import { BunkerProps, Bunker } from "../components/bunker";
import { GraphBlock } from "../components/graph";
import Section from "../components/section";
import { RATING_NODE, INFO_NODE } from "../mock";


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

export default RudnikPage;