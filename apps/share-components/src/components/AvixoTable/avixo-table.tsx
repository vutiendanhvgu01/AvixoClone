import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import {
  Box,
  Checkbox,
  CircularProgress,
  Collapse,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import { styled } from '@mui/system';
import { visuallyHidden } from '@mui/utils';
import { useRouter } from 'next/router';
import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import useLoadingPage from '../../services/hooks/usePageLoading';
import { Order } from '../../utils/sortUtils';
import CustomTooltip from '../AvixoImageAnnotate/AnnoatateToolbar/toolTip';
import AvixoTableProps, { AvixoHeaderTableProps, AvixoTableColumnProps } from './avixo-table-types';

interface PaginationState {
  offset?: number;
  limit?: number;
}

const DEFAULT_OFFSET = 0;
const DEFAULT_LIMIT = 20;

const DEFAULT_CONFIG = {
  PAGE_SIZE: 5,
  PAGE: 0,
  PAGE_SIZE_OPTIONS: [5, 10, 20],
  MAX_PAGE_SIZE: 1000,
};

const TABLE_HEIGHT = 530;

const LoadingTable = styled(CircularProgress)(() => ({
  position: 'absolute',
  left: '48%',
  top: '48%',
}));

const INITIAL_PAGINATION = {
  offset: DEFAULT_OFFSET,
  limit: DEFAULT_LIMIT,
};

const TableHeader = (props: AvixoHeaderTableProps & { hasCheckBoxHeader?: boolean }) => {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    headers,
    hasCheckBoxHeader = true,
    tableCellHeaderBaseProps,
    checkBoxBase,
    tableHeadPropsBase,
  } = props;
  const createSortHandler = (property: keyof any) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead {...tableHeadPropsBase}>
      <TableRow>
        {hasCheckBoxHeader && (
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all desserts',
              }}
              {...checkBoxBase}
            />
          </TableCell>
        )}
        {headers.map((header: AvixoTableColumnProps) => (
          <TableCell key={header?.field} align={header.alignLabel || 'right'} {...tableCellHeaderBaseProps}>
            {header?.sort ? (
              <TableSortLabel
                active={orderBy === header.id}
                direction={orderBy === header.id ? order : 'asc'}
                onClick={createSortHandler(header.id)}
              >
                {header.label}
                {orderBy === header.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              header?.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
const TableEmptyBody = (props: {
  emptyRows: number;
  emptyText: AvixoTableProps['emptyText'];
  data: AvixoTableProps['data'];
  hasSelectedFn: AvixoTableProps['hasSelectedFn'];
  columns: AvixoTableProps['columns'];
}) => {
  const { emptyRows, emptyText, hasSelectedFn, data, columns } = props;
  const { records } = data;

  return (
    <>
      {/* {emptyRows > 0 && (
        <TableRow style={{ height: 53 * emptyRows }}>
          <TableCell colSpan={hasSelectedFn ? columns.length + 1 : columns.length} variant="head" />
        </TableRow>
      )} */}
      {emptyText && !records.length && (
        <TableRow style={{ height: TABLE_HEIGHT }}>
          <TableCell colSpan={hasSelectedFn ? columns.length + 1 : columns.length} variant="head">
            <Box sx={{ textAlign: 'center', color: 'neutral.500' }}>{emptyText}</Box>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

const AvixoTable: React.FC<AvixoTableProps> = props => {
  const router = useRouter();
  const [isPageLoading, setIsPageLoading] = useLoadingPage();
  const [paginationState, setPaginationState] = useState<PaginationState>(INITIAL_PAGINATION);

  const {
    columns,
    onRowClick,
    data,
    hasSelectedFn,
    primaryKey,
    pagination,
    onSelectedItems,
    onSort,
    mode,
    emptyText,
    hasCheckBoxHeader,
    hasPagination = true,
    tableCellHeaderBaseProps,
    name: tableName,
    tableBaseProps,
    checkBoxBase,
    tableContainerStyle = {},
    hasCollapseRow,
    titleToolTip = '',
    loading = false,
    orderByField,
    initOrder = 'asc',
    ssr = true,
  } = props;
  const { records } = data;
  const {
    pageSize,
    pageSizeOptions,
    // the currently this depend on total BE, so hard here
    total = 1000,
    onPageChange,
    onPageSizeChange,
    currentPage = DEFAULT_CONFIG.PAGE,
  } = pagination ?? {};
  const [emptyString, setEmptyString] = useState<string | ReactNode>(emptyText);
  const [expandRow, setExpandRow] = React.useState<
    {
      open?: boolean;
      position?: number;
    }[]
  >([{ open: false, position: 0 }]);
  const [order, setOrder] = React.useState<Order>(initOrder);
  const defaultOrder = columns && columns.length > 0 ? columns[0].field : '';
  const [orderBy, setOrderBy] = React.useState<keyof any>(orderByField ?? defaultOrder);
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(currentPage);

  const rows = useMemo(() => records, [records]);

  useEffect(() => {
    if (rows.length > 0) {
      setExpandRow(
        rows.map((row, index) => ({
          open: false,
          position: index,
        })),
      );
    }
  }, [rows]);

  useEffect(() => {
    if (onSelectedItems && typeof onSelectedItems === 'function') {
      const selectedItems = Array.from(selected);
      onSelectedItems(selectedItems);
    }
  }, [onSelectedItems, selected]);

  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  useEffect(() => {
    setIsPageLoading(!router.isReady);
    const { query } = router;
    if (hasPagination && router.isReady && query?.offset) {
      setPaginationState({
        offset: (parseInt(query?.offset as string, 10) as number) || DEFAULT_OFFSET,
        limit: (parseInt(query?.limit as string, 10) as number) || DEFAULT_LIMIT,
      });
      setEmptyString('Not found records');
    }
    return () => {
      setPaginationState(INITIAL_PAGINATION);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  const handleRouter = (newPaginationState: PaginationState) => {
    router.push({
      query: {
        ...router?.query,
        ...newPaginationState,
      },
    });
  };

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof any) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    if (onSort && typeof onSort === 'function') {
      onSort(property, isAsc ? 'desc' : 'asc');
    }
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = records.map(record => primaryKey && record[primaryKey]);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (record: any, index: number) => () => {
    if (hasCollapseRow && expandRow.length > 0) {
      const newExpandRow = expandRow;
      newExpandRow[index] = { ...newExpandRow[index], open: !newExpandRow[index].open };
      setExpandRow([...newExpandRow]);
      return;
    }
    const name = primaryKey && record[primaryKey];
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    const newOffset =
      (paginationState?.limit ?? DEFAULT_LIMIT) * (newPage + 1) - (paginationState?.limit ?? DEFAULT_LIMIT);

    setPaginationState({
      ...paginationState,
      offset: newOffset,
    });
    if (ssr) handleRouter({ ...paginationState, offset: newOffset });

    setPage(newPage);
    if (onPageChange && typeof onPageChange === 'function') {
      onPageChange(newPage);
    }
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPageSize = parseInt(event.target.value, 10);
    setPaginationState({
      ...paginationState,
      limit: newPageSize,
    });

    if (ssr) handleRouter({ ...paginationState, limit: newPageSize });
    setPage(0);
    if (onPageSizeChange && typeof onPageSizeChange === 'function') {
      onPageSizeChange(newPageSize);
    }
    if (onPageChange && typeof onPageChange === 'function') {
      onPageChange(0);
    }
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * (paginationState?.limit || DEFAULT_LIMIT) - records.length) : 0;

  const renderCell = (record: any, column: AvixoTableColumnProps, iColumn: number) => {
    const { field, customRender } = column;
    if (customRender && typeof customRender === 'function') {
      return customRender(record, iColumn);
    }
    if (!field) {
      return '';
    }
    return record[field];
  };
  const handleCellClick = (e: React.MouseEvent<HTMLTableCellElement>, record: any) => {
    if (e.target instanceof Element) {
      // if elemment is not a, button, svg or input
      const elements = ['a', 'button', 'svg', 'input'];
      const elementName = e.target.tagName.toLowerCase();
      const parentElementName = e.target.parentElement?.tagName.toLowerCase() || '';
      if (!elements.includes(elementName) && !elements.includes(parentElementName) && onRowClick) {
        onRowClick(record);
      }
    }
  };

  const renderTableBody = () =>
    rows.map((record: any, index: number) => {
      const isItemSelected = isSelected(primaryKey && record[primaryKey]);
      const labelId = `enhanced-table-checkbox-${index}`;

      return (
        <TableRow
          hover
          role="checkbox"
          aria-checked={isItemSelected}
          tabIndex={-1}
          key={record.uuid}
          selected={isItemSelected}
          sx={{
            cursor: onRowClick ? 'pointer' : 'default',
          }}
        >
          {(hasSelectedFn || hasCollapseRow) && (
            <TableCell padding="checkbox" onClick={e => handleCellClick(e, record)}>
              <Checkbox
                color="primary"
                checked={hasCollapseRow ? Boolean(expandRow[index] && expandRow[index].open) : isItemSelected}
                inputProps={{
                  'aria-labelledby': labelId,
                }}
                onClick={handleClick(record, index)}
                icon={hasCollapseRow && <AddBoxIcon />}
                checkedIcon={hasCollapseRow && <IndeterminateCheckBoxIcon color="action" />}
                {...checkBoxBase}
              />
            </TableCell>
          )}
          {columns.map((column: AvixoTableColumnProps) => (
            <CustomTooltip title={titleToolTip} followCursor enterDelay={2000} placement="top" key={column?.field}>
              <TableCell
                onClick={e => handleCellClick(e, record)}
                align={column.alignLabel || 'right'}
                {...column.tableCellBaseProps}
              >
                {hasCollapseRow ? (
                  <Collapse in={Boolean(expandRow[index] && expandRow[index].open)} collapsedSize={46}>
                    {renderCell(record, column, index)}
                  </Collapse>
                ) : (
                  renderCell(record, column, index)
                )}
              </TableCell>
            </CustomTooltip>
          ))}
        </TableRow>
      );
    });

  const isLoading = ssr ? isPageLoading : loading;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer
          sx={{
            position: 'relative',
            scrollbarWidth: 'thin',
            '&::-webkit-scrollbar': {
              width: '0.4em',
            },
            '&::-webkit-scrollbar-track': {
              background: 'white',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#E0E0E0',
            },
            ...tableContainerStyle,
          }}
        >
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
            stickyHeader
            data-cy={tableName}
            {...tableBaseProps}
          >
            <TableHeader
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={records.length}
              headers={columns}
              hasCheckBoxHeader={hasCheckBoxHeader}
              tableCellHeaderBaseProps={tableCellHeaderBaseProps}
              checkBoxBase={checkBoxBase}
            />
            {isLoading ? (
              <LoadingTable />
            ) : (
              <TableBody>
                <>
                  {renderTableBody()}
                  <TableEmptyBody
                    emptyRows={emptyRows}
                    hasSelectedFn={hasSelectedFn}
                    columns={columns}
                    data={data}
                    emptyText={emptyString}
                  />
                </>
              </TableBody>
            )}
          </Table>
        </TableContainer>
        {hasPagination && (
          <TablePagination
            rowsPerPageOptions={pageSizeOptions || DEFAULT_CONFIG.PAGE_SIZE_OPTIONS}
            component="div"
            count={total || records.length}
            rowsPerPage={paginationState?.limit || DEFAULT_LIMIT}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </Paper>
    </Box>
  );
};

export default AvixoTable;
