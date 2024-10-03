import { Button, ButtonBase, Paper, PaperProps, Stack, Typography } from '@mui/material';

export const ALERT_STATUS: Record<string, string> = {
  warning: "Ревизия",
  error: "Авария"
}

export type AlertProps = {
  title: string;
  status: string;
  text: string;
  color: PaperProps['color'];
};

const Alert = ({ title, status, text, color }: AlertProps) => {
  return (
    <Paper color={color}>
      <Stack spacing={2}>
        <ButtonBase style={{ margin: "-0.75rem -0.75rem", padding: "0.75rem 0.75rem" }}>
          <Stack direction="row" flexGrow={1} justifyContent="space-between" alignItems="center">
            <Typography variant="h3">{title}</Typography>

            <Button variant="contained" color="inherit" size="small">
              {status}
            </Button>
          </Stack>
        </ButtonBase>

        <Stack direction="row" spacing={1}>
          <Typography variant="h1">{text}</Typography>
        </Stack>
      </Stack>
    </Paper>
  )
}

export default Alert;
