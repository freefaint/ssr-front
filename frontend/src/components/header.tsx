import { Stack, IconButton, Typography, Drawer, Button } from "@mui/material"
import { Routes, Route, useLocation, useNavigate } from "react-router-dom"
import { MenuIcon, DriveIcon, ChevronIcon } from "../icons"
import { useMemo, useState } from "react";
import { theme } from "../styles/theme";
import { Menu } from "./menu";

const ALPHA_GRAD = "linear-gradient(to bottom, var(--dark), var(--dark) 80%, transparent 100%)";

export const Header = ({ error, loading }: { error?: boolean; loading?: boolean }) => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  let navigate = useNavigate();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };  
  const channelName = useMemo(() => pathname.includes('/channels/') ? decodeURIComponent(pathname.slice(pathname.lastIndexOf('/')+1, pathname.length)) : '', [pathname]);
  const menuOrBackIcon = () => {
    return pathname.split('/').length > 2 ? 
      <Button style={{ width: '38px', minWidth: 'auto', height: '38px', borderRadius: '50%'}} variant="contained" color="inherit" size="small"  onClick={() => navigate(-1)}>
        <ChevronIcon sx={{ 
          width: "7px", 
          height: "10px", 
          transform: 'rotate(180deg)',
        }} viewBox='0 0 7 10' />
      </Button>
      : 
      <IconButton onClick={toggleDrawer(true)}>
        <MenuIcon viewBox="0 0 38 38" />
      </IconButton>   
  };

  return (
    <>
      <header style={{ position: "sticky", top: 0, background: ALPHA_GRAD, zIndex: 1, transition: "opacity 300ms ease-in-out", opacity: loading || error ? 0 : 1 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          {menuOrBackIcon()}

          <Typography variant="h2" textTransform="uppercase">
            <Routes>
              <Route path='/' element={'Главная'} />
              <Route path='/rudnik' element={'Подземный рудник'} />
              <Route path='/vesp' element={'ВЭСП'} />
              <Route path='/fabric' element={'Фабрика'} />
              <Route path='/channels' element={'Уведомления'}/>
              <Route path='/channels/:id/:name' element={channelName}/>
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