import { Stack, Typography, Button } from "@mui/material";
import { ReactNode } from "react";
import { LogoSvg } from "../icons";
import { Panel } from "./panel";

export const Error = ({ open, code, title, text, onClose }: { open: boolean, code: number, title: ReactNode, text: ReactNode, onClose: () => void; }) => {
  return (
    <Panel
      bg="rgba(194, 48, 48, 0.3)"
      open={open}
    >
      <Stack flexGrow={1} direction="column" alignItems="center" justifyContent="space-between">
        <Stack direction="column" alignItems="center" spacing={1}>
          <LogoSvg />

          <Typography variant="body2" textAlign="center" color="rgba(255, 255, 255, 0.25)">
            Яковлевский
            <br />
            горно-обогатительный
            <br />
            комбинат
          </Typography>
        </Stack>


        <Stack direction="column" alignItems="center" spacing={2}>
          <Stack direction="column" alignItems="center">
            <Typography variant="h6" textAlign="center">{code}</Typography>
            <Typography variant="h1" textAlign="center" textTransform="uppercase">Ошибка</Typography>
          </Stack>

          <Stack direction="column" alignItems="center" spacing={1}>
            <Typography variant="h3" textAlign="center">{title}</Typography>
            <Typography textAlign="center" color="secondary">{text}</Typography>
          </Stack>
        </Stack>

        <Stack width="100%" direction="column" alignItems="center">
          <Button variant="outlined" size="large" onClick={onClose}>
            <Typography>Вернуться на главный экран</Typography>
          </Button>
        </Stack>
      </Stack>
    </Panel>
  )
}