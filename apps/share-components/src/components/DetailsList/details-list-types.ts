interface ListItemProps {
  name: string;
  detail: string;
}

interface ArrayItemProps {
  name: string;
  detail: Array<ListItemProps>;
}

type ListDataProps = ListItemProps | ArrayItemProps;

interface DetailsListProps {
  showHeader: boolean;
  title: string;
  listFooter: React.ReactNode;
  headerRight: React.ReactNode;
  data: Array<ListDataProps>;
}

interface DetailsHeaderProps {
  title: string;
  children: React.ReactNode;
}

interface DetailsFooterProps {
  children: React.ReactNode;
}

interface DataSectionProps {
  data: ListDataProps;
}

export type { DetailsHeaderProps, DetailsFooterProps, ListDataProps, ListItemProps, DataSectionProps };
export default DetailsListProps;
