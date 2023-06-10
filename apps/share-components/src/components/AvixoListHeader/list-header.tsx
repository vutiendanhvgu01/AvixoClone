import React from 'react';
import { Box, Typography } from '@mui/material';
import { ListHeaderType } from './list-header-types';

const ListHeader: React.FC<ListHeaderType> = ({
  subTitle,
  mainTitleComponent,
  detailTextComponent,
  buttonListComponent,
  widthLeftBox,
  widthRightBox,
}) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'flex-end',
      width: '100%',
      marginBottom: '24px',
      justifyContent: 'space-between',
    }}
  >
    <Box
      sx={{
        width: widthLeftBox || '50%',
      }}
    >
      <Typography
        sx={{
          color: 'white',
          fontWeight: 500,
          fontSize: '16px',
          lineHeight: '28px',
        }}
      >
        {subTitle}
      </Typography>
      {mainTitleComponent}
      {detailTextComponent}
    </Box>
    {buttonListComponent && (
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'flex-end',
          width: widthRightBox || '50%',
          mb: 0.5,
        }}
      >
        {buttonListComponent}
      </Box>
    )}
  </Box>
);

export default ListHeader;
