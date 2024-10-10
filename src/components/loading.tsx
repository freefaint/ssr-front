import { Stack, LinearProgress, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { IconSvg, LogoSvg } from "../icons";
import { Panel } from "./panel";

export const Loading = ({ open }: { open: boolean }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!open) {
      return;
    }

    const interval = setInterval(() => {
      setValue(val => val + (100 - val) / 2);
    }, 250);

    return () => {
      clearInterval(interval);
    }
  }, [open]);

  return (
    <Panel
      bg="rgba(1, 36, 82, 1)"
      open={open}
    >
      <Stack flexGrow={1} direction="column" alignItems="center" justifyContent="space-between">
        <Stack direction="column" alignItems="center">
        </Stack>

        <Stack direction="column" alignItems="center" spacing={5}>
          <Stack direction="column" alignItems="center">
            <IconSvg />
          </Stack>

          <Stack width="280px">
            <LinearProgress variant="determinate" value={value} />
          </Stack>
        </Stack>

        <Stack width="100%" direction="column" alignItems="center" spacing={1}>
          <LogoSvg />

          <Typography variant="body2" textAlign="center" color="rgba(255, 255, 255, 0.25)">
            Яковлевский
            <br />
            горно-обогатительный
            <br />
            комбинат
          </Typography>
        </Stack>
      </Stack>
    </Panel>
  )
}