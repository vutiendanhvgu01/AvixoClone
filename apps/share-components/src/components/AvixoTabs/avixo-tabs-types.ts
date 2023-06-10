import { SxProps } from '@mui/material/styles';
import { TabsProps } from '@mui/material/Tabs';

interface AvixoTabData {
  label: string;
  url?: string;
  component?: React.ReactNode;
  sx?: SxProps;
}

interface AvixoTabsProps {
  tabsData: Array<AvixoTabData>;
  defaultActiveTab?: number;
  sxProps?: {
    container?: SxProps;
    tabs?: SxProps;
    tab?: SxProps;
  };
  handleChangeTabs?: (activeTab: number) => void;
  tabsProps?: TabsProps;
}

interface AvixoTabPanelProps {
  children?: React.ReactNode;
  childrenSx?: SxProps;
  index: number;
  value: number;
  key: string;
}

interface AvixoTabProps {
  index: number;
}

export type { AvixoTabsProps, AvixoTabPanelProps, AvixoTabProps, AvixoTabData };
