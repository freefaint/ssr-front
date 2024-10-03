import { PaperProps, Paper, Stack, Typography } from "@mui/material";
import { FilterIcon } from "../icons";

export interface GraphProps {
  
}

const Graph = () => {
  return (
    <svg width={132} height={132} viewBox='0 0 132 132'>
      <Circle value={75} coords={{ x: 66, y: 66 }} />
    </svg>
  )
}

const Circle = ({ value, radius = 62, coords: { x, y }, color = "rgba(4, 144, 86, 1)", light = false }: { value: number, radius?: number; coords: { x: number; y: number; }; color?: string, light?: boolean }) => {
  let angle = value * 360 / 100;

  const circumference = 2 * Math.PI * radius;

  const strokeOffset = - (1 / 4) * circumference;
  const strokeDasharray = (angle / 360) * circumference;
  
  return (
    <g>
      <circle
        cx={x}
        cy={y}
        r={radius}
        stroke="rgba(19, 19, 19, 1)"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill-opacity="0"
        stroke-opacity="1"
      />
      <circle
        cx={x}
        cy={y}
        r={radius}
        stroke={color}
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill-opacity="0"
        stroke-opacity="1"
        stroke-dasharray ={`${strokeDasharray} ${circumference - strokeDasharray}`}
        stroke-dashoffset={strokeOffset}
      />
    </g>
  )
}

export const GraphBlock = ({ variant }: Pick<PaperProps, 'variant'>) => {
  return (
    <Paper variant={variant}>
      <Stack spacing={1}>
        <Stack spacing={1} direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h3">Б-1</Typography> 

          <Typography variant="h3">4М</Typography> 
        </Stack>

        <Stack position="relative">
          <Stack style={variant === "outlined" ? { margin: "-0.4325rem" } : undefined}>
            <Graph />
          </Stack>

          <Stack width="0" height="0" overflow="visible" justifyContent="center" alignItems="center" position="absolute" left="50%" top="50%">
            <Stack direction="row" spacing={1}>
              <Typography variant='h3' color="primary">{`${Number(12345.45).toLocaleString()} `}</Typography>
              <Typography variant='h3' color="primary" style={{ opacity: 0.5 }}>т</Typography>
            </Stack>

            <Stack position="absolute" direction="row" spacing={1} top="0.5rem">
              <FilterIcon sx={{ width: "1rem", height: "1rem" }} color="success" viewBox="0 0 16 16" />
              <FilterIcon sx={{ width: "1rem", height: "1rem" }} viewBox="0 0 16 16" />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  )
}

export default Graph;
