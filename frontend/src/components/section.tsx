import { ButtonBase, Stack, Typography, Button, Paper, ToggleButtonGroup, ToggleButton } from "@mui/material";
import { useState, useMemo, ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronIcon } from "../icons";

export type Body = {
  name: string;
  label: string;
  graphNode?: ReactNode;
  ratingNode?: ReactNode;
  infoNode?: ReactNode;
  statusNode?: ReactNode;
}

export type SectionProps = {
  title?: string;
  onClick?: () => void;
  href?: string;
  bodies: Body[];
}

const Section = ({ title, onClick, href, bodies }: SectionProps) => {
  const [bodyName, setBodyName] = useState(bodies?.[0]?.name);

  const body = useMemo(() => bodies.find(i => i.name === bodyName)!, [bodyName, bodies]);

  const head = useMemo(() => {
    return (
      <ButtonBase onClick={onClick} style={href ? { flexGrow: 1 } : { margin: "-0.75rem -0.75rem", padding: "0.75rem 0.75rem" }}>
        <Stack direction="row" flexGrow={1} justifyContent="space-between" alignItems="center">
          <Typography variant="h3">{title}</Typography>

          <Button style={{ width: "1.75rem", minWidth: "auto" }} variant="contained" color="inherit" size="small">
            <ChevronIcon sx={{ width: "7px", height: "10px" }} viewBox='0 0 7 10' />
          </Button>
        </Stack>
      </ButtonBase>
    );
  }, [href, onClick, title]);

  return (
    <Paper style={{ overflow: "hidden" }}>
      <Stack spacing={2}>
        {title && (
          <>
            {href ? (
              <Link style={{ color: "inherit", display: "flex", textDecoration: "none", margin: "-0.75rem -0.75rem", padding: "0.75rem 0.75rem" }} to={href}>
                {head}
              </Link>
            ) : head}
          </>
        )}

        {body.graphNode}
        {body.ratingNode}
        {body.infoNode}
        {body.statusNode}

        {bodies.length > 1 && (
          <Stack>
            <ToggleButtonGroup
              size="small"
              value={bodyName}
              exclusive
              onChange={(_e: React.MouseEvent<HTMLElement>, value: string) => {
                setBodyName(value)
              }}
              aria-label="text formatting"
            >
              {bodies.map(i => (
                <ToggleButton key={i.name} value={i.name}>
                  {i.label}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Stack>
        )}
      </Stack>
    </Paper>
  );
}

export default Section;
