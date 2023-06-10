import { Chip } from '@mui/material';
import { FC } from 'react';
import AvixoColouredCapsuleCategoryProps from './coloured-capsule-category-types';

const AvixoColouredCapsuleCategory: FC<AvixoColouredCapsuleCategoryProps> = ({ size, sx, color, ...rest }) => {
  const mappingColor = {
    primary: '#6E7AD8',
    secondary: '#7BC67E',
    info: '#51ADF6',
    error: '#DA6868',
  };

  return (
    <Chip
      size={size}
      sx={{
        backgroundColor: mappingColor[color],
        height: '30px',
        borderRadius: '6px',
        '& .MuiChip-label': {
          fontSize: 12,
          fontWeight: 600,
          lineHeight: '30px',
          color: 'white',
          textTransform: 'uppercase',
          paddingLeft: '12px',
          paddingRight: '12px',
        },
        ...sx,
      }}
      {...rest}
    />
  );
};

export default AvixoColouredCapsuleCategory;
