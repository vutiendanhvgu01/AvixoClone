import type { Theme, ThemeOptions } from '@mui/material';
import { createTheme as createMuiTheme } from '@mui/material/styles';
import baseThemeOptions from './default-theme';

/**
 * Create a theme for MUI, based on default theme of AvixoComponent
 * and combine with customTheme of each app if necessary.
 * @param customTheme
 * @returns {Theme}
 */
const createTheme = (customTheme: ThemeOptions = {}): Theme => {
  const theme = createMuiTheme({ ...baseThemeOptions, ...customTheme });

  return theme;
};

export default createTheme;
