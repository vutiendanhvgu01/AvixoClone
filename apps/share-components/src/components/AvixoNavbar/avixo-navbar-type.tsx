import { AppBarProps } from '@mui/material';
import { Account } from './AccountButton/account-type';
import { Breadcrumb } from './Breadcrumbs/breadcrumbs-types';

export interface AvixoNavbarProps extends AppBarProps {
  onOpenSidebar?: () => void;
  withTopbar?: boolean;
  breadcrumbs?: Breadcrumb[];
  account: Account;
}
