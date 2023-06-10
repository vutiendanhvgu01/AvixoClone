import { Grid, Box } from '@mui/material';
import { AvixoSearchBar } from 'share-components';
import PremiseCard from './premise-card';
import type Premise from './premise-types';

interface PremiseListProps {
  premises: Premise[];
}

const PremiseList: React.FC<PremiseListProps> = ({ premises }) => (
  <Box pt={1} px={1}>
    <Box pb={4} data-cy="premise-search-box">
      <AvixoSearchBar placeholder="Search premise..." />
    </Box>
    <Grid container spacing={4}>
      {premises?.length > 0 &&
        premises.map((premise: Premise) => (
          <Grid xs={4} item key={premise.uuid} data-cy="premise-item">
            <PremiseCard premise={premise} />
          </Grid>
        ))}
    </Grid>
  </Box>
);

export default PremiseList;
