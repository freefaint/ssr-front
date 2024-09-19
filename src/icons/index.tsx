import { createSvgIcon } from "@mui/material";

import { ReactComponent as MenuIconSvg } from "./menu.svg";
import { ReactComponent as DriveIconSvg } from "./drive.svg";
import { ReactComponent as FilterIconSvg } from "./filter.svg";
import { ReactComponent as ChevronIconSvg } from "./chevron.svg";

export const MenuIcon = createSvgIcon(
  <MenuIconSvg />,
  'MenuIcon'
);

export const DriveIcon = createSvgIcon(
  <DriveIconSvg />,
  'DriveIcon'
);

export const FilterIcon = createSvgIcon(
  <FilterIconSvg />,
  'FilterIcon'
);

export const ChevronIcon = createSvgIcon(
  <ChevronIconSvg />,
  'ChevronIcon'
);
