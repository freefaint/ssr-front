import { Button, ButtonBase, Chip, createTheme, IconButton, ListItem, Paper, PaperProps, Stack, Theme, ThemeProvider, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import React, { CSSProperties, ReactNode, useMemo, useState } from 'react';
import { ChevronIcon, DriveIcon, FilterIcon, MenuIcon } from './icons';

const theme = createTheme({
  shadows: new Array(25).fill("none") as Theme['shadows'],

  typography: {
    fontFamily: "Roboto Condensed",

    body1: {
      fontSize: 14
    },

    body2: {

    },

    h1: {
      fontSize: "28px",
      lineHeight: "32.81px",
      fontWeight: 400,
    },

    h2: {
      fontSize: "16px",
      lineHeight: "19.2px"
    },

    h3: {
      fontSize: "18px",
      lineHeight: "21.6px"
    }
  },

  colorSchemes: {
    dark: {
      palette: {
        background: {
          default: "var(--dark)",
          paper: "rgba(35, 34, 39, 1)"
        },
        text: {
          disabled: "rgba(255, 255, 255, 0.10)"
        },
        primary: {
          dark: "rgba(73, 179, 255, 1)",
          main: "rgba(73, 179, 255, 1)",
        },
        secondary: {
          dark: "rgba(255, 255, 255, 0.55)",
          main: "rgba(255, 255, 255, 0.55)"
        },
        success: {
          dark: "rgba(4, 144, 86, 1)",
          main: "rgba(4, 144, 86, 1)"
        },
        warning: {
          dark: "rgba(218, 169, 44, 1)",
          main: "rgba(218, 169, 44, 1)"
        },
        info: {
          dark: "rgba(246, 70, 21, 1)",
          main: "rgba(246, 70, 21, 1)",
        },
        error: {
          dark: "rgba(185, 23, 51, 1)",
          main: "rgba(185, 23, 51, 1)"
        },
        action: {
          active: "rgba(111, 111, 111, 1)"
        }
      }
    }
  },

  components: {
    MuiButton: {
      variants: [
        {
          props: {
            color: "inherit",
            variant: "contained"
          },
          style: {
            backgroundColor: "rgba(255, 255, 255, 0.05)"
          }
        }
      ],
      styleOverrides: {
        root: {
          textTransform: "none"
        }
      }
    },

    MuiSvgIcon: {
      defaultProps: {
        color: "action"
      }
    },

    MuiChip: {
      variants: [
        {
          props: {
            variant: "filled",
          },
          style: {
            borderRadius: "4px"
          }
        },
        {
          props: {
            size: "small",
          },
          style: {
            fontSize: "0.75rem",
            fontWeight: 400,
            lineHeight: "14.4px",
          }
        },
        {
          props: {
            variant: "outlined",
            color: "success",
          },
          style: {
            color: '#fff',
            backgroundImage: `repeating-linear-gradient(45deg, rgba(4, 144, 86, 0.2) 0 5px, rgba(19, 19, 19, 1) 5px 10px)`
          }
        },
      ]
    },

    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          padding: "0.25rem",
          background: "rgba(255, 255, 255, 0.05)",
          borderRadius: "0.625rem",
        }
      }
    },

    MuiToggleButton: {
      styleOverrides: {
        root: {
          flexGrow: 1,
          border: "none",
          borderRadius: "0.5rem!important",

          "&.Mui-selected": {
            backgroundColor: "rgba(0, 65, 160, 1)!important",
            borderRadius: "0.5rem",
          }
        },
      }
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          padding: "0.75rem",
          borderRadius: "1rem",
          boxShadow: "none",
          backgroundImage: "none",

          "&.MuiPaper-outlined": {

          }
        }
      },

      variants: [
        {
          props: {
            variant: "outlined"
          },
          style: {
            borderRadius: "0.5rem",
            // background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.05)",
          }
        },
        {
          props: {
            color: "warning"
          },
          style: {
            background: "rgba(218, 169, 44, 1)",
          }
        },
        {
          props: {
            color: "error"
          },
          style: {
            background: "rgba(185, 23, 51, 1)",
          }
        }
      ]
    }
  },

  defaultColorScheme: 'dark'
});

function App() {

  return (
    <ThemeProvider theme={theme}>
      <header style={{ position: "sticky", top: 0, background: "linear-gradient(to bottom, var(--dark), var(--dark) 80%, transparent 100%)", zIndex: 1 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <IconButton>
            <MenuIcon viewBox="0 0 38 38" />
          </IconButton>

          <Typography variant="h2" textTransform="uppercase">Главная</Typography>

          <IconButton>
            <DriveIcon viewBox="0 0 38 38" />
          </IconButton>
        </Stack>
      </header>

      <main>
        <Stack spacing={2}>
          <Section />
          <Alert color="warning" title="ВЭСП" status={ALERT_STATUS["warning"]} text="00:00:00" />
          <Section />
          <Section />
          <Alert color="error" title="ВЭСП" status={ALERT_STATUS["error"]} text="00:00:00" />
          <Section />
          <Section />
        </Stack>
      </main>
    </ThemeProvider>
  );
}

const Section = () => {
  const [format, setFormat] = useState('slot');

  return (
    <Paper style={{ overflow: "hidden" }}>
      <Stack spacing={2}>
        <ButtonBase style={{ margin: "-0.75rem -0.75rem", padding: "0.75rem 0.75rem" }}>
          <Stack direction="row" flexGrow={1} justifyContent="space-between" alignItems="center">
            <Typography variant="h3">Рудник подземный</Typography>

            <Button style={{ width: "1.75rem", minWidth: "auto" }} variant="contained" color="inherit" size="small">
              <ChevronIcon sx={{ width: "7px", height: "10px" }} viewBox='0 0 7 10' />
            </Button>
          </Stack>
        </ButtonBase>

        <Stack direction="row" spacing={2}>
          <Block />

          <Block />
        </Stack>

        <Rating
          items={[
            {
              value: 250,
              label: (
                <Stack>
                  <Typography variant="body2">16:00</Typography>
                  <Typography variant="body2">18:00</Typography>
                </Stack>
              )
            },
            {
              value: 160,
              label: (
                <Stack>
                  <Typography variant="body2">16:00</Typography>
                  <Typography variant="body2">18:00</Typography>
                </Stack>
              )
            },
            {
              value: 40,
              label: (
                <Stack>
                  <Typography variant="body2">16:00</Typography>
                  <Typography variant="body2">18:00</Typography>
                </Stack>
              )
            },
            {
              value: 0,
              label: (
                <Stack>
                  <Typography variant="body2">16:00</Typography>
                  <Typography variant="body2">18:00</Typography>
                </Stack>
              )
            },
            {
              value: 200,
              label: (
                <Stack>
                  <Typography variant="body2">16:00</Typography>
                  <Typography variant="body2">18:00</Typography>
                </Stack>
              )
            },
            {
              value: 100,
              label: (
                <Stack>
                  <Typography variant="body2">16:00</Typography>
                  <Typography variant="body2">18:00</Typography>
                </Stack>
              )
            },
            {
              value: 0,
              label: (
                <Stack>
                  <Typography variant="body2">16:00</Typography>
                  <Typography variant="body2">18:00</Typography>
                </Stack>
              )
            }
          ]}
        />

        <Stack direction="row" spacing={2}>
          <Stack flexGrow={1}>
            <MiniBlock />
          </Stack>
          
          <Stack flexGrow={1}>
            <MiniBlock />
          </Stack>
        </Stack>

        <Stack>
          <ToggleButtonGroup
            size="small"
            value={format}
            exclusive
            onChange={(_e: React.MouseEvent<HTMLElement>, value: string) => {
              console.log(123, value);
              setFormat(value)
            }}
            aria-label="text formatting"
          >
            <ToggleButton value="slot" aria-label="bold">
              Смена
            </ToggleButton>
            <ToggleButton value="hout" aria-label="italic">
              Час
            </ToggleButton>
            <ToggleButton value="day" aria-label="underlined">
              Сутки
            </ToggleButton>
            <ToggleButton value="week" aria-label="underlined">
              Неделя
            </ToggleButton>
            <ToggleButton value="month" aria-label="underlined">
              Месяц
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>
        
        <Chip variant="outlined" color="success" label={<>ЛК-1</>} />
      </Stack>
    </Paper>
  )
}

const MiniBlock = () => {

  return (
    <Paper variant="outlined">
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

const Block = () => {
  return (
    <Paper variant="outlined">
      <Stack spacing={1}>
        <Stack spacing={1} direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h3">Б-1</Typography> 

          <Typography variant="h3">4М</Typography> 
        </Stack>

        <Stack position="relative">
          <Graph />

          <Stack width="0" height="0" overflow="visible" justifyContent="center" alignItems="center" position="absolute" left="50%" top="50%">
            <Stack direction="row" spacing={1}>
              <Typography variant='h3' color="primary">{`${Number(12345.45).toLocaleString()} `}</Typography>
              <Typography variant='h3' color="primary" style={{ opacity: 0.5 }}>т</Typography>
            </Stack>

            <Stack position="absolute" direction="row" spacing={1} top="0.5rem">
              <FilterIcon sx={{ width: "1rem", height: "1rem" }} color="success" viewBox="0 0 16 16" />
              <FilterIcon sx={{ width: "1rem", height: "1rem" }} viewBox="0 0 16 16" />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  )
}

const Rating = ({ items, spacing = 0.5, crit, height = 85, min = 8 }: { items: { value: number, label: ReactNode }[], spacing?: number, crit?: number, height?: number, min?: number }) => {
  const max = Math.max(...items.map(i => i.value));

  return (
    <Stack spacing={spacing} direction="row" alignItems="flex-end">
      {items.map((i, j) => {
        const style: CSSProperties = {
          height: `${min + (height - min) * (i.value / max)}px`,
          background: !i.value ? 'rgba(255, 255, 255, 0.1)' : (crit ? i.value < crit : max / i.value > 4) ? 'linear-gradient(180deg, #DAA92C 0%, #7A5B0B 100%)' : 'linear-gradient(180deg, #49B3FF 0%, #0041A0 100%)',
          borderRadius: '0.25rem',
        }

        return (
          <Stack flexGrow={1} spacing={1}>
            <Typography style={{ opacity: !i.value ? 0.25 : 1 }} align='center'>{i.value}</Typography>

            <div style={style} />

            <Stack style={{ opacity: !i.value ? 0.25 : 0.5 }} alignItems="center">
              {i.label}
            </Stack>
          </Stack>
        )
      })}
    </Stack>
  )
}

const ALERT_STATUS: Record<string, string> = {
  warning: "Ревизия",
  error: "Авария"
}

const Alert = ({ title, status, text, color }: { title: string, status: string, text: string, color: PaperProps['color'] }) => {
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

const Graph = () => {
  return (
    <svg style={{ margin: "-0.4325rem" }} width={132} height={132} viewBox='0 0 132 132'>
      <Circle value={75} coords={{ x: 66, y: 66 }} />
    </svg>
  )
}

const Circle = ({ value, radius = 62, coords: { x, y }, color = "rgba(4, 144, 86, 1)", light = false }: { value: number, radius?: number; coords: { x: number; y: number; }; color?: string, light?: boolean }) => {
  let angle = value * 360 / 100;

  const circumference = 2 * Math.PI * radius;

  const strokeOffset = - (1 / 4) * circumference;
  const strokeDasharray = (angle / 360) * circumference;

  console.log(strokeOffset, strokeDasharray, circumference)
  
  return (
    <g>
      <circle
        cx={x}
        cy={y}
        r={radius}
        stroke="rgba(19, 19, 19, 1)"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill-opacity="0"
        stroke-opacity="1"
      />
      <circle
        cx={x}
        cy={y}
        r={radius}
        stroke={color}
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill-opacity="0"
        stroke-opacity="1"
        stroke-dasharray ={`${strokeDasharray} ${circumference - strokeDasharray}`}
        stroke-dashoffset={strokeOffset}
      />
    </g>
  )
}

export default App;
