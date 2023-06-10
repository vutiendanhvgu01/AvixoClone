import { CheckboxProps, TableCellProps, TableHeadProps, TableProps } from '@mui/material';
import * as React from 'react';
import { Order } from '../../utils/sortUtils';

/**
 * Properties of column in table
 */
interface AvixoTableColumnProps<T = any> {
  id: any;
  field: string;
  label?: string;
  sort?: boolean;
  display?: boolean;
  alignLabel?: TableCellProps['align'];
  disablePadding?: boolean;
  customRender?: (value: T, iRecord: number) => React.ReactNode;
  tableCellBaseProps?: TableCellProps;
}

/**
 * Properties of column header in table
 */
interface AvixoHeaderTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof any) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string | number | symbol;
  rowCount: number;
  headers: Array<AvixoTableColumnProps>;
  tableCellHeaderBaseProps?: TableCellProps;
  checkBoxBase?: Partial<CheckboxProps>;
  tableHeadPropsBase?: Partial<TableHeadProps>;
}

/**
 * Properties of data in table
 */
interface AvixoDataTableProps {
  records: Array<Record<string, any>>;
}

/**
 * Properties of pagination
 */
interface AvixoPaginationProps {
  pageSize?: number;
  pageSizeOptions?: Array<number>;
  currentPage?: number;
  total?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
}

/**
 * Type of mode when data render in table.
 * - Offline when loading once and then the handling of pagination and sorting
 * is only in the frontend
 * - Remote means that the paging and sorting will need the backend to process
 * and return the results, this means that the data needs to be retransmitted
 * every time the page is turned or the sort is clicked.
 */
type TableMode = 'offline' | 'remote';

/**
 * Properties of table
 */
interface AvixoTableProps {
  columns: Array<AvixoTableColumnProps>;
  data: AvixoDataTableProps;
  hasSelectedFn?: boolean;
  primaryKey?: string;
  onSelectedItems?: (records: Array<string | any>) => void;
  onSort?: (field: string | number | symbol, sortType: Order) => void;
  pagination?: AvixoPaginationProps;
  hasPagination?: boolean;
  mode: TableMode;
  headerProps?: AvixoHeaderTableProps;
  hasCheckBoxHeader?: boolean;
  hasCollapseRow?: boolean;
  emptyText?: string | React.ReactNode;
  tableCellHeaderBaseProps?: TableCellProps;
  tableBaseProps?: Partial<TableProps>;
  onRowClick?: (rowData: any) => void;
  name?: string;
  checkBoxBase?: Partial<CheckboxProps>;
  tableContainerStyle?: React.CSSProperties;
  titleToolTip?: string;
  loading?: boolean;
  orderByField?: string;
  initOrder?: Order;
  ssr?: boolean;
}
export type { AvixoTableColumnProps, AvixoHeaderTableProps, AvixoPaginationProps };
export default AvixoTableProps;
