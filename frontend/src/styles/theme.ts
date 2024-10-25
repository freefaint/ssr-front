import { createTheme, css, Theme } from "@mui/material";

export const theme = createTheme({
  shadows: new Array(25).fill("none") as Theme['shadows'],

  typography: {
    fontFamily: "Roboto Condensed",

    body1: {
      fontSize: 14
    },

    body2: {
      fontSize: 12
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
    },

    h6: {
      fontSize: "68px",
      lineHeight: "80px"
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
          primary: "rgba(255, 255, 255, 1)",
          secondary: "rgba(255, 255, 255, 0.55)",
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
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          background: "rgba(255, 255, 255, 0.05)",
          border: "solid 2px rgba(255, 255, 255, 0.05)",
          borderRadius: "2px",
          height: "4px"
        },
        bar: {
          background: "rgba(73, 179, 255, 1)",
          height: "4px",
          borderRadius: "2px",
        }
      }
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          padding: "1rem",
          borderRadius: "0.5rem",
          
          "&.Mui-selected": {
            background: "rgba(255, 255, 255, 0.1)",
          }
        }
      }
    },
    MuiDrawer: {
      defaultProps: {
        transitionDuration: 300,
        slotProps: {
          backdrop: {
            style: {
              backdropFilter: 'blur(72px)',
            },
          },
        }
      },
      styleOverrides: {
        paper: css`
          box-sizing: border-box;
          padding: 40px 16px 16px;
          gap: 10px;

          width: 300px;
          
          /* left: 0px;
          top: 0px; */

          /* BG/Surface */
          background: #232227;
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 0px 20px 20px 0px;
        `,
      }
    },
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
        },
        {
          props: {
            variant: "outlined",
            size: "large"
          },
          style: {
            borderRadius: "0.75rem",
            width: "100%",
            height: "56px",
            border: "none",
            backgroundColor: "rgba(0, 65, 160, 1)"
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
    },

    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          fontSize: "18px",
          lineHeight: "21.6px",
          flexDirection: 'row-reverse',    
          justifyContent: 'space-between',
          margin: 0,
          marginLeft: '16px',
        }
      },
    },
    
    MuiSwitch: {
      styleOverrides: {
        root: {
          fontSize: "18px",
          lineHeight: "21.6px",
          flexDirection: 'row-reverse',    
          justifyContent: 'space-between',
          margin: 0,
          marginLeft: '16px',
          padding: '9px',
        },
        switchBase: {
          margin: '2px',
          color: '#131313',
          opacity: 1,
          '&.Mui-checked': {
            color: '#FFFFFF',
            '& + .MuiSwitch-track': {
              opacity: 1,
            }
          }
        },
        thumb: {
          width: '16px',
          height: '16px',
        },
        track: {
          backgroundColor: '#FFFFFF26',
          borderRadius: '20px',
        },
      },
    }
  },

  defaultColorScheme: 'dark'
});