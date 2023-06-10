import { ExpandMore } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { PractitionerStatus } from 'modules/practitioner/types/practitioner';
import { PremiseStatus } from 'modules/premise/components/premise-types';
import { useRouter } from 'next/router';
import { AvixoMenuButton, MenuItemData, PlusOutlined } from 'share-components';
import { OrganisationStatus } from '../organisation-types';
import OrganisationStatusC from './organisation-status';

export const Actions = styled(Box)(() => ({
  flex: 1,
  display: 'flex',
  justifyContent: 'flex-end',
  marginBottom: 4,
  '> button, > a': {
    marginLeft: 16,
  },
}));

type StatusType = {
  label: string;
  key: string;
};
interface OrganisationStatusMenuDataProps {
  onMenuItemClick: (action: string) => void;
  statusType: StatusType;
}

const getOrganisationStatusMenuData = ({
  onMenuItemClick,
  statusType,
}: OrganisationStatusMenuDataProps): MenuItemData[] => [
  {
    label: <OrganisationStatusC status="active" />,
    value: 'active',
  },
  {
    label: <OrganisationStatusC status="suspended" />,
    value: 'suspended',
  },
  {
    label: <OrganisationStatusC status="inactive" />,
    value: 'inactive',
  },
  {
    label: statusType.label,
    value: 'delete',
    onClick: () => {
      onMenuItemClick(statusType.key);
    },
  },
];

export interface OrganisationActionButtonsProps {
  organisationStatus?: OrganisationStatus;
  premiseStatus?: PremiseStatus;
  practitionerStatus?: PractitionerStatus;
}

const OrganisationActionButtons: React.FC<OrganisationActionButtonsProps> = props => {
  const router = useRouter();
  const { query } = router;
  const { organisationStatus, premiseStatus, practitionerStatus } = props;

  const onButtonClick = (action: string) => {
    router.push({ pathname: router.pathname, query: { ...query, action } });
  };

  const statusType = (): StatusType => {
    if (premiseStatus)
      return {
        label: 'Delete Premise',
        key: 'delete-premise',
      };
    if (practitionerStatus)
      return {
        label: 'Delete Practitioner',
        key: 'delete-practitioner',
      };
    return {
      label: 'Delete Organisation',
      key: 'delete-organisation',
    };
  };

  return (
    <Actions>
      {(organisationStatus || premiseStatus || practitionerStatus) && (
        <AvixoMenuButton
          ButtonProps={{
            startIcon: null,
            endIcon: <ExpandMore />,
            color: 'whiteLight',
          }}
          AvixoMenuBaseProps={{
            menuData: getOrganisationStatusMenuData({ onMenuItemClick: onButtonClick, statusType: statusType() }),
          }}
          label={<OrganisationStatusC status={organisationStatus || premiseStatus || practitionerStatus || 'active'} />}
        />
      )}
      <Button
        startIcon={<PlusOutlined />}
        color="whiteLight"
        onClick={() => onButtonClick('add-premise')}
        data-cy="add-premise-button"
      >
        Premise
      </Button>
      <Button
        startIcon={<PlusOutlined />}
        color="whiteLight"
        onClick={() => onButtonClick('add-practitioner')}
        data-cy="add-practitioner-button"
      >
        Practitioner
      </Button>
      <Button
        startIcon={<PlusOutlined />}
        onClick={() => onButtonClick('add-organisation')}
        data-cy="add-organisation-button"
      >
        Organisation
      </Button>
    </Actions>
  );
};

export default OrganisationActionButtons;
