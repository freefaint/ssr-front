import { PaperProps, Paper, Stack, Typography, Chip } from "@mui/material";

const Block = ({ variant }: Pick<PaperProps, 'variant'>) => {
  return (
    <Paper variant={variant}>
      <Stack spacing={1}>
        <Stack spacing={1} direction="row" alignItems="center">
          <Typography color="secondary">Ковшей</Typography>
          <Chip size="small" variant="filled" color="success" label={<>Груз 15 м/с</>} />
        </Stack>
        
        <Stack direction="row" spacing={1}>
          <Typography variant="h1" color="primary">{Number(12356).toLocaleString()}</Typography>
          <Typography variant='h1' color="primary" style={{ opacity: 0.5 }}>т</Typography>
        </Stack>
      </Stack>
    </Paper>
  )
}

export default Block;
