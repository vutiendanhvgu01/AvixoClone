import React, { FC, useCallback } from 'react';
import { Stack, Typography } from '@mui/material';
import TablePagination from '@mui/material/TablePagination';
import AvixoPaginationProps from './avixo-pagination-types';

const AvixoPagination: FC<AvixoPaginationProps> = ({
  total,
  active,
  discharged,
  page,
  rowsPerPage,
  onChangePage,
  onChangeRowsPerPage,
}) => {
  const handleChangePage = useCallback((event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    onChangePage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChangeRowsPerPage(parseInt(event.target.value, 10));
  }, []);

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      border={1}
      borderColor="divider"
      px={3}
      py={1}
    >
      <Stack direction="row" spacing={3} color="#141414">
        <Typography fontSize={12}>Total List: {total}</Typography>
        {active ? <Typography fontSize={12}>Active: {active}</Typography> : null}
        {discharged ? <Typography fontSize={12}>Discharged: {discharged}</Typography> : null}
      </Stack>
      <TablePagination
        component="div"
        sx={{
          '& .MuiToolbar-root': {
            minHeight: 40,
          },
          '& .MuiTablePagination-selectLabel': {
            fontSize: 12,
            color: 'neutral.500',
            margin: 0,
          },
          '& .MuiTablePagination-displayedRows': {
            fontSize: 12,
            margin: 0,
          },
        }}
        count={total}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Stack>
  );
};

export default AvixoPagination;
