import React, { useCallback, useEffect, useState } from 'react';
import { Box, Divider, Grid, Typography } from '@mui/material';
import { AvixoPagination, AvixoSearchBar } from 'share-components';
import Link from 'next/link';
import { PAGE_URLS } from 'share-components/src/constants';
import { useRouter } from 'next/router';
import { Allergy } from './allergy-types';
import AllergyDetailsCard from './allergy-details-card';

export interface AllergyListProps {
  allergies: Allergy[];
}

const AllergyList: React.FC<AllergyListProps> = ({ allergies }) => {
  const router = useRouter();
  const patientUUID = router.query.patientUUID?.toString() || '';
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [filteredAllergies, setFilteredAllergies] = useState<Allergy[]>([]);
  const otherSourcesAllergies = filteredAllergies.filter(allergy => allergy.informationSource !== 'practitioner');
  const directlyObservedAllergies = filteredAllergies.filter(allergy => allergy.informationSource === 'practitioner');
  const start = page * rowsPerPage;
  const end = page * rowsPerPage + rowsPerPage;

  useEffect(() => {
    setFilteredAllergies(allergies);
  }, [allergies]);

  const handleChangePage = useCallback((newPage: number) => setPage(newPage), []);

  const handleChangeRowsPerPage = useCallback((newRowsPerPage: number) => {
    setPage(0);
    setRowsPerPage(newRowsPerPage);
  }, []);

  const handleSearch = useCallback((searchStr: string) => {
    if (searchStr.length === 0) {
      setFilteredAllergies(allergies);
    } else setFilteredAllergies(allergies.filter(i => i.name?.includes(searchStr)));
  }, []);

  return (
    <Box p={4}>
      <AvixoSearchBar placeholder="Search allergy..." onSearchInputChange={handleSearch} />
      <Box py={4}>
        <Box mb={4}>
          <Typography variant="h6" sx={{ marginBottom: 3 }}>
            Other Sources
          </Typography>
          <Divider sx={{ marginBottom: 4 }} />
          <Grid container spacing={4}>
            {otherSourcesAllergies.slice(start, end).map((allergy: Allergy) => (
              <Grid item lg={6} xl={4} key={`allergy-${allergy.id}`}>
                <AllergyDetailsCard allergy={allergy} />
              </Grid>
            ))}
          </Grid>
          {otherSourcesAllergies.length === 0 && (
            <Box sx={{ textAlign: 'center' }} mt={4}>
              <Typography>The list you are viewing is empty.</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
                <Typography>Click to </Typography>
                <Link href={PAGE_URLS.PATIENT_ALLERGY_ADD(patientUUID)} scroll={false}>
                  <Typography variant="subtitle2" sx={{ color: 'chart.blue5' }}>
                    add new allergy
                  </Typography>
                </Link>
              </Box>
            </Box>
          )}
        </Box>
        <Box>
          <Typography variant="h6" sx={{ marginBottom: 3 }}>
            Directly Observed
          </Typography>
          <Divider sx={{ marginBottom: 4 }} />
          <Grid container spacing={4}>
            {directlyObservedAllergies.slice(start, end).map((allergy: Allergy) => (
              <Grid item lg={6} xl={4} key={`allergy-${allergy.id}`}>
                <AllergyDetailsCard allergy={allergy} />
              </Grid>
            ))}
          </Grid>
          {directlyObservedAllergies.length === 0 && (
            <Box sx={{ textAlign: 'center' }} mt={4}>
              <Typography>The list you are viewing is empty.</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
                <Typography>Click to </Typography>
                <Link
                  href={`${PAGE_URLS.PATIENT_ALLERGY_ADD(patientUUID)}&informationSource=practitioner`}
                  scroll={false}
                >
                  <Typography variant="subtitle2" sx={{ color: 'chart.blue5' }}>
                    add new allergy
                  </Typography>
                </Link>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
      <AvixoPagination
        total={filteredAllergies.length}
        active={0}
        discharged={0}
        page={page}
        rowsPerPage={rowsPerPage}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default AllergyList;
