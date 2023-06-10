import { BreadcrumbsProps } from '@mui/material';

export type Breadcrumb = {
  label: string;
  url: string;
};

export interface AvixoBreadcrumbsProps extends BreadcrumbsProps {
  breadcrumbs?: Breadcrumb[];
}
