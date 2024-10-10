import { Stack, IconButton, Typography, Drawer } from "@mui/material"
import { Routes, Route } from "react-router-dom"
import { MenuIcon, DriveIcon } from "../icons"
import { useState } from "react";
import { theme } from "../styles/theme";
import { Menu } from "./menu";

const ALPHA_GRAD = "linear-gradient(to bottom, var(--dark), var(--dark) 80%, transparent 100%)";

export const Header = ({ error, loading }: { error?: boolean; loading?: boolean }) => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      <header style={{ position: "sticky", top: 0, background: ALPHA_GRAD, zIndex: 1, transition: "opacity 300ms ease-in-out", opacity: loading || error ? 0 : 1 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <IconButton onClick={toggleDrawer(true)}>
            <MenuIcon viewBox="0 0 38 38" />
          </IconButton>

          <Typography variant="h2" textTransform="uppercase">
            <Routes>
              <Route path='/' element={'Главная'} />
              <Route path='/rudnik' element={'Подземный рудник'} />
              <Route path='/vesp' element={'ВЭСП'} />
              <Route path='/fabric' element={'Фабрика'} />
            </Routes>
          </Typography>

          <IconButton>
            <DriveIcon viewBox="0 0 38 38" />
          </IconButton>
        </Stack>
      </header>

      <Drawer {...theme.components?.MuiDrawer?.defaultProps} open={open} onClose={toggleDrawer(false)}>
        <Menu onClose={toggleDrawer(false)} />
      </Drawer>
    </>
  )
}