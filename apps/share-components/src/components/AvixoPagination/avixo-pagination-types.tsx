interface AvixoPaginationProps {
  total: number;
  active?: number;
  discharged?: number;
  page: number;
  rowsPerPage: number;
  onChangePage: (newPage: number) => void;
  onChangeRowsPerPage: (newRowsPerPage: number) => void;
}

export default AvixoPaginationProps;
