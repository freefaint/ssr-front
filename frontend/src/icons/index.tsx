import { createSvgIcon } from "@mui/material";

import { ReactComponent as MenuIconSvg } from "./menu.svg";
import { ReactComponent as DriveIconSvg } from "./drive.svg";
import { ReactComponent as FilterIconSvg } from "./filter.svg";
import { ReactComponent as ChevronIconSvg } from "./chevron.svg";
import { ReactComponent as KovshIconSvg } from "./kovsh.svg";
import { ReactComponent as VagonIconSvg } from "./vagon.svg";
import { ReactComponent as BlowIconSvg } from "./blow.svg";
import { ReactComponent as HumanIconSvg } from "./human.svg";
import { ReactComponent as ToolIconSvg } from "./tool.svg";
import { ReactComponent as CloseIconSvg } from "./close.svg";

import BG from "./BG.png";

export const BGSrc = BG;
export { ReactComponent as LogoSvg } from "./logo.svg";
export { ReactComponent as IconSvg } from "./icon.svg";

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

export const KovshIcon = createSvgIcon(
  <KovshIconSvg />,
  'KovshIcon'
);

export const VagonIcon = createSvgIcon(
  <VagonIconSvg />,
  'VagonIcon'
);

export const BlowIcon = createSvgIcon(
  <BlowIconSvg />,
  'BlowIcon'
);

export const ToolIcon = createSvgIcon(
  <ToolIconSvg />,
  'ToolIcon'
);

export const HumanIcon = createSvgIcon(
  <HumanIconSvg />,
  'HumanIcon'
);

export const CloseIcon = createSvgIcon(
  <CloseIconSvg />,
  'CloseIcon'
);
