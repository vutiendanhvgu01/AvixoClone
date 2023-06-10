import { Grid, Box } from '@mui/material';
import { AvixoSearchBar } from 'share-components';
import OrganisationCard from '../organisation-card';
import type { Organisation } from '../organisation-types';

interface OrganisationsListProps {
  organisations: Organisation[];
}

const OrganisationsList: React.FC<OrganisationsListProps> = ({ organisations = [] }) => (
  <Box pt={1} px={1}>
    <Box pb={4} data-cy="organisation-search-box">
      <AvixoSearchBar placeholder="Search organisation..." />
    </Box>
    <Grid container spacing={4}>
      {organisations?.map((organisation: Organisation) => (
        <Grid xs={12} md={6} lg={6} xl={4} item key={organisation.id}>
          <OrganisationCard organisation={organisation} />
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default OrganisationsList;
