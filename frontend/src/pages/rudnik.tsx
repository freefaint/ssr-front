import { Stack, Paper, Grid2 } from "@mui/material";
import { BunkerProps, Bunker } from "../components/bunker";
import { GraphBlock } from "../components/graph";
import Section from "../components/section";
import { RATING_NODE, INFO_NODE } from "../mock";
import { ElementIds } from "../business/monitoring/configurations/elements/element-ids";
import { useBunker } from "hooks/useRudnik";


const BUNKERS: BunkerProps[] = new Array(20).fill(true).map(i => ({
  title: 'р/с 12 бис',
  filled: Math.random() < 0.3,
  value: Math.random() < 0.2 ? undefined : Math.ceil(Math.random() * 100000) / 100,
  kovsh: Math.random() < 0.2 ? 0 : Math.round(Math.random() * 100),
  vagon: Math.random() < 0.2 ? 0 : Math.round(Math.random() * 100),
}))

const RudnikPage = () => {
  const { rand: rand1 } = useBunker(ElementIds.MINE_BUNKER_1);
  const { rand: rand2 } = useBunker(ElementIds.MINE_BUNKER_2);

  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={2}>
        <GraphBlock value={rand1.toNumber()} max={5000} />

        <GraphBlock value={rand2.toNumber()} max={5000} />
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
              {/* <MineBunkerData
                id={ElementIds.MINE_BUNKER_1}
                configName={'Бункер 1'}
                label={'Бункер 1'}
                measure={'т'}
              /> */}
              <Bunker {...i} />
            </Grid2>  
          ))}
        </Grid2>
      </Paper>
    </Stack>
  )
}

export default RudnikPage;