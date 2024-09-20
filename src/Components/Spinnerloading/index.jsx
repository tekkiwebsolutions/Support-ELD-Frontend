import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const SpinnerLoading = ({ size = 20, color = 'secondary', thickness = 4 ,...rest}) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', }}>
      <CircularProgress size={size} color={color} thickness={thickness} {...rest}/>
    </div>
  );
};

export default SpinnerLoading;
