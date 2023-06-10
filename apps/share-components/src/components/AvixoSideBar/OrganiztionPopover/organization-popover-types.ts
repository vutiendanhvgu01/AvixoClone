import { AvixoOrganisationProps } from '../avixo-sidebar-types';

interface OrganizationPopoverProps {
  anchorEl: null | Element;
  onChange?: (item: AvixoOrganisationProps) => void;
  onClose?: () => void;
  open?: boolean;
  organisations?: AvixoOrganisationProps[];
}

export default OrganizationPopoverProps;
