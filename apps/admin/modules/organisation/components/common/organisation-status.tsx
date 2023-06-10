import { styled, useTheme } from '@mui/material/styles';
import { Box } from '@mui/system';
import { ORGANISATION_STATUS_COLOR } from 'modules/organisation/constants';
import { toTitleCase } from 'share-components/src/utils/stringUtils';

interface OrganisationStatusProps {
  status: 'active' | 'inactive' | 'suspended';
}

const Status = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
}));

const StatusColor = styled(Box)(() => ({
  display: 'inline-block',
  width: 8,
  height: 8,
  borderRadius: '50%',
  marginRight: 8,
}));

const OrganisationStatus: React.FC<OrganisationStatusProps> = ({ status }) => {
  const theme = useTheme();
  return (
    <Status>
      <StatusColor
        sx={{
          backgroundColor: theme.palette[ORGANISATION_STATUS_COLOR[status]].main,
        }}
      />
      {toTitleCase(status)}
    </Status>
  );
};

export default OrganisationStatus;
