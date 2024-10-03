import { Stack, Typography } from "@mui/material";
import { CSSProperties, useMemo } from "react";
import { BLACK, GREEN, ORANGE, RED } from "../styles/colors";
import { KovshIcon, VagonIcon } from "../icons";

export type BunkerProps = {
  kovsh?: number;
  vagon?: number;
  filled?: boolean;
  value?: number;
  title: string;
}

const BLOCK_STYLE: CSSProperties = {
  borderRadius: "0.25rem",
  backgroundColor: BLACK,
  height: "7rem",
  overflow: "hidden"
}

const LINES_BG: CSSProperties = {
  backgroundImage: `repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.05) 0 5px, transparent 5px 10px)`
};

const RED_BORDER_BG: CSSProperties = {
  border: `0.0625rem solid ${RED}`
};

const ORANGE_BG: CSSProperties = {
  backgroundColor: `${ORANGE}`
};

const GREEN_BG: CSSProperties = {
  backgroundColor: `${GREEN}`
};

export const Bunker = ({ value, title, kovsh, vagon, filled }: BunkerProps) => {
  const unavailable = useMemo(() => !value, [value]);

  const padding = useMemo(() => unavailable ? '0.1875rem' : '0.25rem', [unavailable]);

  const blockStyle = useMemo(() => ({ ...BLOCK_STYLE, ...(unavailable ? RED_BORDER_BG : {}) }), [unavailable]);

  return (
    <Stack style={blockStyle}>
      <Stack style={unavailable ? undefined : LINES_BG}>
        <Stack style={{ padding: padding, height: "2rem", ...(filled && !unavailable ? ORANGE_BG : {}) }}>
          <Typography align="center">{title}</Typography>
        </Stack>

        <Stack style={{ padding: padding, height: "2rem", justifyContent: "flex-end", ...(unavailable ? {} : filled ? ORANGE_BG : GREEN_BG) }}>
          {filled && !unavailable && (
            <>
              <Typography align="center" color="secondary">{value}</Typography>
              <Typography align="center">Заполнен</Typography>
            </>
          )}

          {(!filled || unavailable) && (
            <>
              <Typography align="center" variant="h3" color={unavailable ? "error" : "textPrimary"}>{unavailable ? 'Н/Д' : value}</Typography>
            </>
          )}
        </Stack>
      </Stack>

      {!unavailable && (
        <Stack style={{ padding, margin: "-0.5rem 0" }} spacing={-1}>
          <Stack direction="row" alignItems="flex-end" spacing={1}>
            <KovshIcon sx={{ width: "13px" }} viewBox="0 0 13 14"  color={kovsh ? "success" : "secondary"} />
            <Typography color={!kovsh ? "secondary" : "textPrimary"}>{kovsh ?? 0}</Typography>
          </Stack>

          <Stack direction="row" alignItems="flex-end" spacing={1}>
            <VagonIcon sx={{ width: "13px" }} viewBox="0 0 13 14" color={vagon ? "success" : "secondary"} />
            <Typography color={!vagon ? "secondary" : "textPrimary"}>{vagon ?? 0}</Typography>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
}