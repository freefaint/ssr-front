import { Drawer } from "@mui/material"
import { PropsWithChildren } from "react"
import { BGSrc } from "../icons"
import { theme } from "../styles/theme"

export const Panel = ({ open, bg, children }: PropsWithChildren<{ bg: string, open: boolean }>) => {
  return (
    <Drawer
      anchor="right"
      {...theme.components?.MuiDrawer?.defaultProps}

      slotProps={{
        backdrop: {
          style: {
            background: bg
          }
        }
      }}

      PaperProps={{
        style: {
          backgroundImage: `url(${BGSrc})`,
          backgroundSize: 'cover',
          backgroundColor: "transparent",
          border: "none",
          width: "100%",
          borderRadius: 0
        }
      }}
      transitionDuration={300}
      open={open}
    >
      {children}
    </Drawer>
  )
}