import { Stack, Typography } from '@mui/material';
import { CSSProperties, ReactNode } from 'react';

export type RatingProps = {
  items: { value?: number, label: ReactNode }[];
  spacing?: number;
  crit?: number;
  height?: number;
  min?: number;
}

const WARNING = 'linear-gradient(180deg, #DAA92C 0%, #7A5B0B 100%)';
const DEFAULT = 'linear-gradient(180deg, #49B3FF 0%, #0041A0 100%)';
const UNFILLED = 'rgba(255, 255, 255, 0.1)';
const NO_DATA = 'rgba(185, 23, 51, 1)';

const Rating = ({ items, spacing = 0.5, crit, height = 85, min = 8 }: RatingProps) => {
  const max = Math.max(...items.map(i => i.value ?? 0));

  return (
    <Stack spacing={spacing} direction="row" alignItems="flex-end">
      {items.map((i, j) => {
        const style: CSSProperties = {
          height: `${min + (height - min) * ((i.value ?? 0) / max)}px`,
          background: i.value === undefined ? NO_DATA : !i.value ? UNFILLED : (crit ? i.value < crit : max / i.value > 4) ? WARNING : DEFAULT,
          borderRadius: '0.25rem',
        }

        return (
          <Stack flexGrow={1} spacing={0.5}>
            <Typography style={{ opacity: !i.value && i.value !== undefined ? 0.25 : 1 }} color={i.value === undefined ? "error" : "textPrimary"} align='center'>
              {i.value === undefined ? "Н/Д" : i.value}
            </Typography>

            <div style={style} />

            <Stack style={{ opacity: !i.value ? 0.25 : 0.5 }} alignItems="center">
              {i.label}
            </Stack>
          </Stack>
        )
      })}
    </Stack>
  )
}

export default Rating;
