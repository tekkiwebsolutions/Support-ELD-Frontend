import PropTypes from 'prop-types';
import { useResponsive } from '../../hooks/useresponsive';
import { NAV, HEADER } from '../../themes/config-layout';
import { Grid } from '@mui/material'; // Import Grid from MUI

const SPACING = 8;

export default function Main({ children, sx, ...other }) {
  const lgUp = useResponsive('up', 'lg');

  return (
    <Grid
      container
      direction="column"
      style={{
        flexGrow: 1,
        minHeight: 1,
       
        paddingY: `${HEADER.H_MOBILE + SPACING}px`,
        ...(lgUp && {
          paddingX: 2,
          paddingY: `${HEADER.H_DESKTOP + SPACING}px`,
          width: `calc(100% - ${NAV.WIDTH}px)`,
        }),
        ...sx,
      }}
      {...other}
    >
      {children}
    </Grid>
  );
}

Main.propTypes = {
  children: PropTypes.node,
  sx: PropTypes.object,
};
