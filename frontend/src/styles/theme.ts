import { createTheme, Theme } from "@mui/material";

export const theme = createTheme({
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
          textTransform: "none",
          color: "#fff"
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
            color: "#fff",
            borderRadius: "0.5rem",
          }
        },
      }
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          color: 'inherit',
          padding: "0.75rem",
          borderRadius: "1rem",
          boxShadow: "none",
          backgroundImage: "none",
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