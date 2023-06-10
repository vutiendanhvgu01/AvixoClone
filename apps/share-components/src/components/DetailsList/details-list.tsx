import * as React from 'react';
import { Box } from '@mui/material';
import DetailsListProps, { ListDataProps } from './details-list-types';
import DetailsHeader from './details-header';
import DetailsFooter from './details-footer';
import DataSection from './data-section';

const DetailsList: React.FC<DetailsListProps> = props => {
  const { showHeader, title, listFooter, headerRight, data } = props;
  return (
    <Box sx={{ p: 2 }}>
      {showHeader && <DetailsHeader title={title}>{headerRight}</DetailsHeader>}
      <Box>
        {data.map((item: ListDataProps) => (
          <DataSection data={item} key={item.name} />
        ))}
      </Box>
      {listFooter && <DetailsFooter>{listFooter}</DetailsFooter>}
    </Box>
  );
};

export default DetailsList;
