import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';

import { palette } from '../palette';
import { shadows } from '../shadow';
import { overrides } from '../overrides';
import { typography } from '../typography';
import { customShadows } from '../custom-shadows';

// ----------------------------------------------------------------------

export default function ThemeProvider({ children }) {
  // Define state to store the memoized theme
  const [cachedTheme, setCachedTheme] = useState(null);

  // Generate the theme object and memoize it
  const memoizedValue = useMemo(
    () => ({
      palette: palette(),
      typography,
      shadows: shadows(),
      customShadows: customShadows(),
      shape: { borderRadius: 8 },
    }),
    []
  );

  // Check if the theme is already cached; if not, generate and cache it
  const theme = useMemo(() => {
    if (!cachedTheme) {
      const newTheme = createTheme(memoizedValue);
      newTheme.components = overrides(newTheme);
      setCachedTheme(newTheme);
      return newTheme;
    } else {
      return cachedTheme;
    }
  }, [cachedTheme, memoizedValue]);

  // Render the ThemeProvider with the cached theme
  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node,
};
