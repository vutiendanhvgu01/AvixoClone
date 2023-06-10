import { Account } from '../AvixoNavbar/AccountButton/account-type';
import { Breadcrumb } from '../AvixoNavbar/Breadcrumbs/breadcrumbs-types';
import { AvixoOrganisationProps } from '../AvixoSideBar/avixo-sidebar-types';
import { SidebarSectionProps } from '../AvixoSideBar/SidebarSection/sidebar-section-types';

export interface AvixoDashboardLayoutProps {
  children?: React.ReactNode;
  breadcrumbs?: Breadcrumb[];
  extraMainHeight?: number;
  withTopbar?: boolean;
  sidebarSection?: SidebarSectionProps[];
  organisations?: AvixoOrganisationProps[];
  account: Account;
}
