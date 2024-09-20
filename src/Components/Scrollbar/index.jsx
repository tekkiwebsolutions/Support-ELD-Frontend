import PropTypes from 'prop-types';
import { memo, forwardRef } from 'react';


import { StyledScrollbar, StyledRootScrollbar } from '../../themes/Styles';

// ----------------------------------------------------------------------

const Scrollbar = forwardRef(({ children, sx, ...other }, ref) => {
  const userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;

  const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

  if (mobile) {
    return (
      <div ref={ref} sx={{ overflow: 'auto', ...sx }} {...other}>
        {children}
      </div>
    );
  }

  return (
    <StyledRootScrollbar>
      <StyledScrollbar
        scrollableNodeProps={{
          ref,
        }}
        clickOnTrack={false}
        sx={sx}
        {...other}
      >
        {children}
      </StyledScrollbar>
    </StyledRootScrollbar>
  );
});

Scrollbar.propTypes = {
  children: PropTypes.node,
  sx: PropTypes.object,
};

export default memo(Scrollbar);
