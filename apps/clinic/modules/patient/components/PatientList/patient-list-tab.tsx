import { Box, Divider, Grid } from '@mui/material';
import Link from 'next/link';
import { useState, useCallback, useEffect } from 'react';
import { AvixoCardNoResult, AvixoPagination, AvixoSearchBar } from 'share-components';
import { PAGE_URLS } from 'share-components/src/constants';
import PatientListCard from './patient-list-card';
import type { PatientListItem } from './patient-list-types';

const PatientListTab = (props: { items: Array<PatientListItem> }) => {
  const { items } = props;
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [filteredLists, setFilteredLists] = useState<PatientListItem[]>([]);
  const startIndex = page * rowsPerPage;
  const endIndex = page * rowsPerPage + rowsPerPage;

  useEffect(() => {
    setFilteredLists(items);
  }, [items]);

  const handleChangePage = useCallback((newPage: number) => setPage(newPage), []);

  const handleChangeRowsPerPage = useCallback((newRowsPerPage: number) => {
    setPage(0);
    setRowsPerPage(newRowsPerPage);
  }, []);

  const handleSearch = useCallback(
    (searchStr: string) => {
      if (searchStr.length === 0) {
        setFilteredLists(items);
      } else setFilteredLists(items.filter(list => list.name?.includes(searchStr)));
    },
    [items],
  );

  return (
    <Box sx={{ pt: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <AvixoSearchBar searchIcon filterIcon placeholder="Search List..." onSearchInputChange={handleSearch} />
      </Box>
      <Divider sx={{ my: 4, mx: -3 }} />
      <Box sx={{ px: 1 }}>
        <Grid container spacing={4} sx={{ mb: 4 }}>
          {filteredLists && filteredLists.length > 0 ? (
            filteredLists
              .slice(startIndex, endIndex)
              .map((item: PatientListItem) => <PatientListCard key={item.uuid} item={item} />)
          ) : (
            <Grid item md={12} sx={{ minHeight: 320, display: 'flex', alignItems: 'center' }}>
              <AvixoCardNoResult
                title="The list you are viewing is empty"
                message={
                  <>
                    Click to{' '}
                    <Link href={PAGE_URLS.PATIENT_LIST_ADD()} passHref>
                      add new List
                    </Link>
                  </>
                }
              />
            </Grid>
          )}
        </Grid>
      </Box>
      <AvixoPagination
        total={items.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Box>
  );
};
export default PatientListTab;
