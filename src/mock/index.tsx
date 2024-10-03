import { Stack, Typography, Chip } from "@mui/material";
import Block from "../components/block";
import { BunkerProps } from "../components/bunker";
import { GraphBlock } from "../components/graph";
import Rating from "../components/rating";

export const BUNKERS: BunkerProps[] = new Array(20).fill(true).map(i => ({
  title: 'р/с 12 бис',
  filled: Math.random() < 0.3,
  value: Math.random() < 0.2 ? undefined : Math.ceil(Math.random() * 100000) / 100,
  kovsh: Math.random() < 0.2 ? 0 : Math.round(Math.random() * 100),
  vagon: Math.random() < 0.2 ? 0 : Math.round(Math.random() * 100),
}))

export const GRAPH_NODE = (
  <Stack direction="row" spacing={2}>
    <GraphBlock variant="outlined" />

    <GraphBlock variant="outlined" />
  </Stack>
);

export const RATING_NODE = (
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

export const INFO_NODE = (
  <Stack direction="row" spacing={2}>
    <Stack flexGrow={1}>
      <Block variant="outlined" />
    </Stack>
    
    <Stack flexGrow={1}>
      <Block variant="outlined" />
    </Stack>
  </Stack>
);

export const STATUS_NODE = (
  <Chip variant="outlined" color="success" label={<>ЛК-1</>} />
);
