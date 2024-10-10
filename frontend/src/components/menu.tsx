import { Avatar, Divider, IconButton, List, ListItemButton, Stack, Typography } from "@mui/material"
import { ChevronIcon, CloseIcon } from "../icons"
import { Link, useLocation } from "react-router-dom";
import { PAGES } from "./constants";

export const Menu = ({ onClose }: { onClose: () => void }) => {
  const { pathname } = useLocation();
  
  return (
    <Stack spacing={2} flexGrow={1}>
      <Stack direction="row" pt={0.25} pl={0.25}>
        <IconButton size="small" onClick={onClose}>
          {/* <MenuIcon viewBox="0 0 38 38" /> */}
          <CloseIcon viewBox="0 0 38 38" />
        </IconButton>
      </Stack>

      <Stack direction="row" alignItems="center" spacing={2}>
        <Avatar>A</Avatar>
        <Typography variant="h2">Andrey Tereshchenko</Typography>
      </Stack>

      <Stack style={{ marginLeft: "-16px", marginRight: "-16px" }}>
        <Divider style={{ backgroundColor: "rgba(255, 255, 255, 0.05)", margin: 0, padding: 0, height: "1px" }} />
      </Stack>

      <Stack flexGrow={1}>
        <List component="nav" aria-label="Menu">
          <Stack spacing={1}>
            {PAGES.map(i => (
              <Link onClick={onClose} key={i.title} to={i.href} style={{ color: "inherit", textDecoration: "none" }}>
                <ListItemButton selected={pathname === i.href}>
                  <Typography variant="h3">{i.name}</Typography>
                </ListItemButton>
              </Link>
            ))}
          </Stack>
        </List>
      </Stack>

      <Stack style={{ marginLeft: "-16px", marginRight: "-16px" }}>
        <Divider style={{ backgroundColor: "rgba(255, 255, 255, 0.05)", margin: 0, padding: 0, height: "1px" }} />
      </Stack>

      <Stack>
        <Link onClick={onClose} to="/settings" style={{ color: "inherit", textDecoration: "none" }}>
          <ListItemButton>
            <Stack direction="row" alignItems="center" justifyContent="space-between" width="100%">
              <Typography variant="h3">Настроить уведомления</Typography>
              
              <ChevronIcon sx={{ width: "7px", height: "10px" }} viewBox='0 0 7 10' />
            </Stack>
          </ListItemButton>
        </Link>
      </Stack>
    </Stack>
  )
}