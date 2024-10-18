import { Stack, Paper, Grid2 } from "@mui/material";
import { BunkerProps, Bunker } from "../components/bunker";
import { GraphBlock } from "../components/graph";
import Section from "../components/section";
import { RATING_NODE, INFO_NODE } from "../mock";
import { ElementIds } from "../business/monitoring/configurations/elements/element-ids";
import { useBunker } from "hooks/useRudnik";
import { useFunnel } from "hooks/useFunnel";


const BUNKERS: BunkerProps[] = new Array(20).fill(true).map(i => ({
  title: 'р/с 12 бис',
  filled: Math.random() < 0.3,
  value: Math.random() < 0.2 ? undefined : Math.ceil(Math.random() * 100000) / 100,
  kovsh: Math.random() < 0.2 ? 0 : Math.round(Math.random() * 100),
  vagon: Math.random() < 0.2 ? 0 : Math.round(Math.random() * 100),
}))

const RudnikPage = () => {
  const { state: state1, model: model1, max: max1 } = useBunker(ElementIds.MINE_BUNKER_1);
  const { state: state2, model: model2, max: max2 } = useBunker(ElementIds.MINE_BUNKER_2);
  const { state: state11 } = useFunnel(ElementIds.UNDERGROUND_MINE_FUNNEL_1);
  const { state: state12 } = useFunnel(ElementIds.UNDERGROUND_MINE_FUNNEL_2);
  const { state: state21 } = useFunnel(ElementIds.UNDERGROUND_MINE_FUNNEL_3);
  const { state: state22 } = useFunnel(ElementIds.UNDERGROUND_MINE_FUNNEL_4);

  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={2}>
        <GraphBlock value={model1.weight.toDP(2).toNumber()} max={max1} />

        <GraphBlock value={model2.weight.toDP(2).toNumber()} max={max2} />
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