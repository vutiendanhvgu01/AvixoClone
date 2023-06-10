import React, { useCallback, useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import { AvixoPagination, AvixoSearchBar } from 'share-components';
import { Immunisation } from './immunisation-types';
import ImmunisationDetailsCard from './immunisation-details-card';

export interface ImmunisationListProps {
  immunisations: Immunisation[];
}

const ImmunisationList: React.FC<ImmunisationListProps> = ({ immunisations }) => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [filteredImmunisations, setFilteredImmunisations] = useState<Immunisation[]>([]);
  const start = page * rowsPerPage;
  const end = page * rowsPerPage + rowsPerPage;

  useEffect(() => {
    setFilteredImmunisations(immunisations);
  }, [immunisations]);

  const handleChangePage = useCallback((newPage: number) => setPage(newPage), []);

  const handleChangeRowsPerPage = useCallback((newRowsPerPage: number) => {
    setPage(0);
    setRowsPerPage(newRowsPerPage);
  }, []);

  const handleSearch = useCallback(
    (searchStr: string) => {
      setFilteredImmunisations(
        searchStr.length === 0 ? immunisations : immunisations.filter(i => i.name?.includes(searchStr)),
      );
    },
    [immunisations],
  );

  return (
    <Box p={4}>
      <AvixoSearchBar placeholder="Search immunisation..." onSearchInputChange={handleSearch} />
      <Box py={4}>
        <Grid container spacing={4}>
          {filteredImmunisations.slice(start, end).map((immunisation: Immunisation) => (
            <Grid item lg={6} xl={4} key={immunisation.uuid}>
              <ImmunisationDetailsCard immunisation={immunisation} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <AvixoPagination
        total={filteredImmunisations.length}
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

export default ImmunisationList;
