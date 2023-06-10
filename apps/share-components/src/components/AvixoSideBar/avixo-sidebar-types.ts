import type { SidebarSectionProps } from './SidebarSection/sidebar-section-types';

export interface AvixoOrganisationProps {
  id: string;
  organisationId: string;
  uuid: string;
  name: string;
}
export interface AvixoSidebarProps {
  userName?: string;
  userTier?: string;
  /**
   * Type of SideBar section list
   */
  sections?: SidebarSectionProps[];
  onChange?: (org: AvixoOrganisationProps) => void;
  onClose?: () => void;
  isCollapsed?: boolean;
  open?: boolean;
  withTopbar?: boolean;
  organisations?: AvixoOrganisationProps[];
  children?: React.ReactNode;
  onChildrenClick?: () => void;
}

export interface AvixoSideBarContentProps {
  userName?: string;
  userTier?: string;
  sections?: SidebarSectionProps[];
  organisations?: AvixoOrganisationProps[];
  onChange?: (org: AvixoOrganisationProps) => void;
  isCollapsed?: boolean;
  onChildrenClick?: () => void;
}
