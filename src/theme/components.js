import { alpha } from "@mui/material/styles";
import { dark, grey, orange, secondary, success } from "./theme-colors";
import { typography } from "./typography";
import { classes } from "./utils";


// ========================================================


// =========================================================

export const components = {
  MuiCssBaseline: {
    styleOverrides: {
      html: {
        scrollBehavior: "smooth"
      },
      "*": {
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
        scrollBehavior: "smooth"
      },
      button: {
        fontSize: 14,
        fontFamily: typography.fontFamily
      },
      a: {
        color: "inherit",
        textDecoration: "none"
      },
      ul: {
        margin: 0,
        padding: 0,
        listStyle: "none"
      },
      ".bg-white": {
        backgroundColor: "white"
      },
      ...classes()
    }
  },
  MuiDialog: {
    styleOverrides: {
      paper: {
        borderRadius: 12,
        boxShadow: "0px 8px 24px rgba(139, 117, 72, 0.15)", // Heritage bronze shadow for dialogs
        border: "1px solid #EFE6D5", // Light heritage border
      }
    }
  },
  MuiDialogTitle: {
    styleOverrides: {
      root: {
        color: "#2C2416", // Deep warm brown for dialog titles
        fontWeight: 600,
        fontSize: "1.25rem",
        borderBottom: "1px solid #EFE6D5", // Light heritage border
        paddingBottom: "12px",
        fontFamily: '"Times New Roman", Times, serif', // Elegant font for dialog titles
      }
    }
  },
  MuiDialogContent: {
    styleOverrides: {
      root: {
        paddingTop: "20px !important", // Override MUI default
        color: "#2C2416", // Deep warm brown for dialog content
      }
    }
  },
  MuiCard: {
    defaultProps: {
      elevation: 6
    },
    styleOverrides: {
      root: {
        borderRadius: 12,
        backgroundColor: "#FFFFFF", // White background for cards
        boxShadow: "0px 2px 8px rgba(139, 117, 72, 0.08)", // Subtle heritage bronze shadow
        border: "1px solid #EFE6D5", // Light heritage border
      }
    }
  },
  MuiPagination: {
    defaultProps: {
      color: "primary",
      shape: "rounded",
      variant: "outlined"
    }
  },
  MuiPaginationItem: {
    styleOverrides: {
      rounded: {
        borderRadius: 8
      },
      outlined: {
        borderColor: grey[300]
      }
    }
  },
  MuiMenuItem: {
    styleOverrides: {
      root: {
        paddingTop: 8,
        paddingBottom: 8
      }
    }
  },
  MuiSvgIcon: {
    styleOverrides: {
      root: {
        "& .secondary": {
          opacity: 0.4
        }
      }
    }
  },
  MuiTextField: {
    defaultProps: {
      size: "small",
      variant: "outlined"
    }
  },
  MuiInputLabel: {
    styleOverrides: {
      root: {
        zIndex: 0,
        color: "#6B5D4F", // Medium brown for labels
        "&.Mui-focused": {
          color: "#8B7548", // Heritage bronze when focused
        },
      },
      sizeSmall: {
        lineHeight: "1.8em"
      }
    }
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "#8B7548", // Heritage bronze on hover
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "#8B7548", // Heritage bronze when focused
          borderWidth: 2,
        },
      },
      sizeSmall: {
        lineHeight: "1.8em"
      },
      inputSizeSmall: {
        height: "1.8em"
      },
      notchedOutline: {
        borderColor: "#EFE6D5" // Light heritage border
      }
    }
  },
  MuiButton: {
    variants: [{
      props: {
        color: "dark"
      },
      style: {
        color: "#fff",
        transition: "all 0.3s",
        backgroundColor: dark.main,
        ":hover": {
          backgroundColor: dark[800]
        }
      }
    }, {
      props: {
        color: "dark",
        variant: "outlined"
      },
      style: {
        color: dark.main,
        borderRadius: 12,
        transition: "all 0.3s",
        backgroundColor: "transparent",
        ":hover": {
          backgroundColor: alpha(dark.main, 0.1)
        }
      }
    }, {
      props: {
        color: "orange"
      },
      style: {
        color: "white",
        backgroundColor: orange.main
      }
    }, {
      props: {
        color: "success"
      },
      style: {
        color: "white",
        backgroundColor: success.main
      }
    }, {
      props: {
        color: "info",
        variant: "contained"
      },
      style: {
        color: "#FFFFFF",
        backgroundColor: "#8B7548", // Heritage bronze
        transition: "all 0.3s",
        ":hover": {
          backgroundColor: "#6B5D4F" // Darker brown on hover
        }
      }
    }, {
      props: {
        color: "info",
        variant: "outlined"
      },
      style: {
        color: "#8B7548", // Heritage bronze
        borderColor: "#8B7548",
        transition: "all 0.3s",
        ":hover": {
          borderColor: "#6B5D4F",
          backgroundColor: "rgba(139, 117, 72, 0.08)"
        }
      }
    }],
    defaultProps: {
      color: "inherit"
    },
    styleOverrides: {
      sizeSmall: {
        borderRadius: 6
      },
      sizeMedium: {
        borderRadius: 8
      },
      sizeLarge: {
        padding: ".6rem 2.5rem",
        borderRadius: 12
      },
      root: {
        minWidth: 0,
        minHeight: 0,
        fontWeight: 500,
        textTransform: "capitalize"
      }
    }
  },
  MuiChip: {
    defaultProps: {
      color: "primary"
    },
    styleOverrides: {
      labelSmall: {
        paddingInline: 12
      },
      colorSuccess: {
        color: success.main,
        backgroundColor: success[100]
      },
      colorSecondary: {
        color: secondary[500],
        backgroundColor: secondary[100]
      }
    }
  },
  MuiContainer: {
    defaultProps: {
      maxWidth: "xl"
    }
  },
  MuiBackdrop: {
    styleOverrides: {
      invisible: {
        background: "transparent",
        backdropFilter: "none"
      },
      root: {
        backdropFilter: "blur(4px)",
        background: "-webkit-linear-gradient(90deg, rgba(75, 85, 99, 0.8) 0%, rgba(55, 65, 81, 0.4) 100%)"
      }
    }
  },
  MuiIconButton: {
    styleOverrides: {
      root: {
        borderRadius: 12
      }
    }
  },
  MuiAvatar: {
    styleOverrides: {
      rounded: {
        borderRadius: 12
      }
    }
  },
  MuiPopover: {
    defaultProps: {
      elevation: 5
    },
    styleOverrides: {
      paper: {
        borderRadius: 8,
        marginTop: 4
      }
    }
  },
  MuiSlider: {
    styleOverrides: {
      valueLabel: {
        borderRadius: 8
      }
    }
  },
  MuiRating: {
    styleOverrides: {
      sizeSmall: {
        fontSize: 16
      }
    }
  }
};