import { ThemeOptions } from '@mui/material';
import { createBreakpoints } from '@mui/system';

interface Neutral {
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}

interface Chart {
  purple3: string;
  blue4: string;
  green4: string;
  blue5: string;
  purple5: string;
  yellow5: string;
}

interface Card {
  main: string;
}

interface Calendar {
  pink: string;
}

declare module '@mui/material/Chip' {
  interface ChipPropsColorOverrides {
    successLight: true;
    primaryLight: true;
    warningLight: true;
    discharged: true;
    disabled: true;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    black: true;
    neutral: true;
    whiteLight: true;
  }
  interface ButtonPropsVariantOverrides {
    hward: true;
    'hward-ghost': true;
    'hward-text': true;
    'hward-outlined': true;
    'hward-unstyled': true;
  }
}

declare module '@mui/material/styles' {
  interface Palette {
    black: Palette['primary'];
    chart?: Chart;
    neutral?: Neutral;
    whiteLight: Palette['primary'];
    card?: Card;
    calendar?: Calendar;
    discharged: Palette['primary'];
    disabled: Palette['primary'];
    primaryLight?: Palette['primary'];
  }
  interface PaletteOptions {
    black: PaletteOptions['primary'];
    chart?: Chart;
    neutral?: Neutral;
    whiteLight: PaletteOptions['primary'];
    card?: Card;
    successLight: PaletteOptions['primary'];
    primaryLight: PaletteOptions['primary'];
    warningLight: PaletteOptions['primary'];
    calendar?: Calendar;
    discharged?: PaletteOptions['primary'];
    disabled?: PaletteOptions['primary'];
  }
}

export const neutral = {
  main: '#F3F4F6',
  dark: '#E5E7EB',
  contrastText: '#32358C',
  100: '#F3F4F6',
  200: '#E5E7EB',
  300: '#D1D5DB',
  400: '#9CA3AF',
  500: '#6B7280',
  600: '#4B5563',
  700: '#374151',
  800: '#1F2937',
  900: '#111827',
};

const card = {
  main: '#FBFBFB',
};

const divider = '#E6E8F0';
export const tableHeader = '#EEEDFC';

const primary = {
  main: '#32358C',
  contrastText: '#fff',
  light: '#7681F3',
  states: {
    hoverBackground: '#5048E50A',
  },
};

const whiteLight = {
  main: 'rgba(255, 255, 255, 0.2)',
  dark: '#232562',
  contrastText: '#fff',
};

const black = {
  main: '#111827',
  dark: '#000',
  contrastText: '#fff',
};

const secondary = {
  main: '#10B981',
  contrastText: '#fff',
};

const action = {
  hoverOpacity: 0.3,
};

const error = {
  main: '#D14343',
  light: '#DA6868',
  alert: {
    background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), #D14343;',
  },
};

const warning = {
  main: '#FFB020',
  contrastText: '#fff',
};

const discharged = {
  main: '#6E7AD8',
  contrastText: '#fff',
};

const disabled = {
  main: '#374151',
  contrastText: '#fff',
};

export const chart = {
  purple3: '#6E7AD8',
  blue4: '#2096F3',
  green4: '#9FD5A1',
  blue5: '#0C7CD5',
  purple5: '#2F3EB1',
  yellow5: '#F8A52C',
};

const calendar = {
  pink: '#D5A6B7',
  green: '#5FC3A1',
  purple: '#B35BCA',
  black: '#000000',
  black1: '#323232',
};

const success = {
  main: '#14B8A6',
  alert: {
    background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), #14B8A6;',
  },
};

const successLight = {
  main: 'linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), #14B8A6',
  contrastText: '#14B8A6',
};

const primaryLight = {
  main: 'rgba(80, 72, 229, 0.04)',
  contrastText: '#32358C',
};

const warningLight = {
  main: 'linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), #FFB020',
  contrastText: '#FFB020',
};

const info = {
  main: '#64B6F7',
  dark: '#467FAC',
  contrastText: '#fff',
  alert: {
    background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), #64B6F7;',
  },
};

const breakpoints = createBreakpoints({});

const baseThemeOptions: ThemeOptions = {
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        size: 'medium',
      },
      variants: [
        {
          props: { variant: 'hward' },
          style: {
            color: 'white',
            backgroundColor: '#482393',
            '&:hover': {
              backgroundColor: '#6531cf',
            },
            '&:disabled': {
              backgroundColor: '#C1AFE8',
            },
            [breakpoints.down('md')]: {
              backgroundColor: '#2A2C75',
              '&:hover': {
                backgroundColor: '#2A2C75',
              },
              '&:disabled': {
                backgroundColor: '#C1AFE8',
                color: '#7f7aa0',
              },
            },
            [breakpoints.down('sm')]: {
              padding: '8px 12px',
            },
          },
        },
        {
          props: { variant: 'hward-ghost' },

          style: {
            color: 'white',
            backgroundColor: '#a15ebd',
            '&:hover': {
              backgroundColor: '#ad73c6',
            },
            '&:disabled': {
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              color: 'rgba(255, 255, 255, 0.5)',
            },
            [breakpoints.down('md')]: {
              color: 'white',
              backgroundColor: '#2096F3',
              '&:hover': {
                backgroundColor: '#0C7CD5',
              },
              '&:disabled': {
                color: 'white',
                backgroundColor: '#81C4F8',
              },
            },
            [breakpoints.down('sm')]: {
              padding: '8px 12px',
            },
          },
        },
        {
          props: { variant: 'hward-text' },
          style: {
            backgroundColor: 'white',
            color: '#32358C',
            '&:hover': {
              backgroundColor: '#f8f8fe',
            },
            '&:disabled': {
              color: '#9fa4ac',
            },
            [breakpoints.down('sm')]: {
              padding: '8px 12px',
            },
          },
        },
        {
          props: { variant: 'hward-outlined' },
          style: {
            backgroundColor: 'white',
            borderColor: '#32358C',
            borderWidth: '1px',
            borderStyle: 'solid',
            color: '#32358C',
            '&:hover': {
              backgroundColor: 'rgba(80, 72, 229, 0.1)',
            },
            '&:disabled': {
              color: '#9fa4ac',
              borderColor: '#9fa4ac',
            },
            [breakpoints.down('sm')]: {
              padding: '8px 12px',
            },
          },
        },
        {
          props: { variant: 'hward-unstyled' },
          style: {
            backgroundColor: '#2A2C75',
            color: 'white',
            '&:hover': {
              backgroundColor: '#2A2C75',
            },
            '&:disabled': {
              color: '#9398a1',
              backgroundColor: '#E7E8EA',
            },
            [breakpoints.down('sm')]: {
              padding: '8px 12px',
            },
          },
        },
      ],
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontFamily: '"Inter"',
          boxShadow: 'none',
          '&:hover ': {
            boxShadow: 'none',
          },
        },
        sizeSmall: {
          padding: '6px 16px',
          fontSize: '13px',
          lineHeight: '22px',
        },
        sizeMedium: {
          padding: '8px 20px',
          fontSize: '14px',
          lineHeight: '24px',
        },
        sizeLarge: {
          padding: '11px 24px',
          fontSize: '15px',
          lineHeight: '26px',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontSize: '14px',
          fontWeight: 500,
          lineHeight: '22px',
          height: 24,
          color: 'white',
          textTransform: 'capitalize',
          '&.MuiChip-filledSuccessLight': {
            background: successLight.main,
          },
          '&.MuiChip-colorSuccessLight': {
            color: success.main,
          },
          '&.MuiChip-filledPrimaryLight': {
            background: primaryLight.main,
          },
          '&.MuiChip-colorPrimaryLight': {
            color: primary.main,
          },
        },
        sizeSmall: {
          fontSize: '12px',
          height: 22,
          fontWeight: 500,
          lineHeight: '20px',
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          minHeight: '500px',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${divider}`,
          fontSize: '14px',
          fontWeight: 400,
          lineHeight: '22px',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: neutral[100],
          '.MuiTableCell-root': {
            color: '#111827',
            fontSize: '12px',
            lineHeight: '30px',
            fontWeight: 600,
            textTransform: 'uppercase',

            '.MuiTableSortLabel-icon': {
              fontSize: 14,
            },
          },
        },
      },
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          '.MuiTableCell-paddingCheckbox': {
            paddingLeft: 16,
          },
        },
      },
    },
    MuiBreadcrumbs: {
      styleOverrides: {
        root: {
          '.MuiBreadcrumbs-li a': {
            color: 'rgba(255, 255, 255, 0.5)',
            fontSize: 14,
            '&:hover': {
              color: 'white',
            },
          },
          '.MuiBreadcrumbs-separator': {
            color: 'rgba(255, 255, 255, 0.5)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          borderRadius: 16,
          '.MuiCardHeader-root': {
            padding: '25px 32px 0',
            '.MuiCardHeader-action': {
              margin: 'auto',
            },
          },
          '.MuiCardContent-root': {
            color: neutral[900],
            padding: '8px 32px 12px',
          },
          '.MuiCardActions-root': {
            padding: '0 32px 25px',
          },
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        popper: {
          boxShadow: '0px 2px 4px rgba(31, 41, 55, 0.06), 0px 4px 6px rgba(100, 116, 139, 0.12)',
          border: '1px solid #D1D5DB',
          borderRadius: 8,
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          color: 'red',
        },
      },
    },
    // Fix for iOs zoom on input focus if fontSize is smaller than 16px
    MuiInputBase: {
      styleOverrides: {
        root: {
          [breakpoints.down('sm')]: { fontSize: 16 },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          [breakpoints.down('sm')]: { '&.MuiInputLabel-root': { fontSize: 16 } },
          '& .MuiFormLabel-asterisk': {
            position: 'relative',
            left: '-2px',
          },
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          '&.address-field, &.phoneNumber-field, &.email-field': {
            marginBottom: 0,

            '&.MuiInputLabel-root': {
              backgroundColor: 'white',
              color: 'red',
              fontSize: 16,
              '&.Mui-error': {
                color: error.main,
              },
              '&.MuiFormLabel-root': {
                fontSize: 16,
              },
            },
            '.MuiOutlinedInput-root fieldset': {
              border: 'none',
              borderRadius: 0,
            },
            '.MuiFormLabel-asterisk': {
              color: error.main,
            },
            '&.border-b': {
              '.MuiOutlinedInput-root fieldset': {
                borderBottom: `1px solid ${divider}`,
              },
            },
            '&.border-r': {
              '.MuiOutlinedInput-root fieldset': {
                borderRight: `1px solid ${divider}`,
              },
            },
          },
          '&.email-field': {
            '.MuiOutlinedInput-root fieldset': {
              border: 'none !important',
            },
          },
          '&.phone-field': {
            '.MuiOutlinedInput-notchedOutline': {
              borderBottomLeftRadius: 0,
              borderTopLeftRadius: 0,
            },
          },
          '.Mui-disabled .MuiOutlinedInput-notchedOutline': {
            borderColor: '#E6E8F0',
          },
        },
      },
    },
    MuiContainer: {
      defaultProps: {
        disableGutters: true,
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        asterisk: {
          color: '#D14343',
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          height: 4,
          borderRadius: '4px 4px 0 0',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          margin: '0 16px 0 48px',
          height: '71px',
          minWidth: 'unset',
          padding: 0,
          fontSize: 16,
          lineHeight: '19px',
          fontWeight: 500,
          textTransform: 'none',

          '> a': {
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            height: '100%',
          },
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: '0 !important',
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          '& .MuiTableHead-root .MuiTableCell-head': {
            padding: '10px 15px',
            backgroundColor: tableHeader,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          '&.MuiFormControl-fullWidth': {
            marginBottom: 24,
          },
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        root: {
          '& .MuiMenu-paper': {
            boxShadow: '0px 2px 4px rgba(31, 41, 55, 0.06), 0px 4px 6px rgba(100, 116, 139, 0.12)',
          },
          '& .MuiMenu-list': {
            border: `1px solid ${neutral[300]}`,
            borderRadius: 8,
          },
        },
      },
    },
    MuiCheckbox: {
      defaultProps: {
        color: 'primary',
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontWeight: 400,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '0 16px',

          '& .MuiAlert-message': {
            lineHeight: '28px',
          },
        },
        standardError: {
          background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), #D14343',
          color: error.main,
        },
        standardInfo: {
          background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), #64B6F7',
          color: info.main,
        },
        standardWarning: {
          background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), #FFB020',
          color: warning.main,
          padding: '0 16px',
          '& .MuiAlert-message': {
            lineHeight: '12px',
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontSize: 14,
          fontWeight: 600,
        },
      },
    },
  },
  direction: 'ltr',
  shape: {
    borderRadius: 8,
  },
  typography: {
    button: {
      fontWeight: 600,
    },
    subtitle1: {
      fontWeight: 500,
      fontSize: 16,
      lineHeight: '28px',
    },
    subtitle2: {
      fontWeight: 500,
      fontSize: 14,
      lineHeight: '22px',
    },
    body1: {
      fontWeight: 500,
      fontSize: 14,
      lineHeight: '22px',
    },
    body2: {
      fontWeight: 400,
      fontSize: 14,
      lineHeight: '22px',
    },
    caption: {
      fontSize: '12px',
      lineHeight: '20px',
      fontWeight: 400,
      color: neutral[500],
    },
    h4: {
      fontWeight: 600,
      fontSize: '32px',
      lineHeight: '44px',
    },
    h5: {
      fontWeight: 600,
      fontSize: '24px',
      lineHeight: '33px',
    },
    h6: {
      fontWeight: 600,
      fontSize: '18px',
      lineHeight: '25px',
    },
    overline: {
      fontWeight: 600,
      fontSize: '12px',
      lineHeight: '30px',
      color: neutral[500],
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
    },

    fontFamily: [
      '"Inter"',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  palette: {
    primary,
    secondary,
    action,
    divider,
    black,
    neutral,
    error,
    warning,
    chart,
    success,
    info,
    whiteLight,
    card,
    successLight,
    calendar,
    discharged,
    primaryLight,
    warningLight,
    disabled,
  },
};

export default baseThemeOptions;
