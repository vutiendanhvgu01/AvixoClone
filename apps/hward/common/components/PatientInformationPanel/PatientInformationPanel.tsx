import { PatientInfoIcon } from 'share-components';
import { Box, Button, Divider, styled } from '@mui/material';
import useIsMobile from 'common/hooks/useIsMobile';
import PatientInformation from './PatientInformation';
import { Patient } from './types';
import ContentPanel from '../ContentPanel/content-panel';

const FooterBox = styled(Box)<{ isMobile: boolean }>(({ isMobile }) => ({
  marginBottom: isMobile ? 1 : 0,
  position: 'sticky',
  bottom: 0,
  backgroundColor: 'white',
}));

const PatientInformationPanel = ({ patient }: { patient: Patient }) => {
  const isMobile = useIsMobile();
  const xMargin = isMobile ? -2 : -3;
  const { avixoUrl } = patient;
  const Body = <PatientInformation patient={patient} />;

  const Footer = (
    <FooterBox isMobile={isMobile}>
      <Divider sx={{ mt: 2, mb: 3, mx: xMargin }} />
      <Box width="100%" display="flex" justifyContent="flex-end">
        <Button variant="outlined" color="primary" href={avixoUrl} target="_blank">
          Open in CMS
        </Button>
      </Box>
    </FooterBox>
  );

  return (
    <ContentPanel
      title="Patient Information"
      Icon={PatientInfoIcon}
      Footer={Footer}
      sx={{ overflowY: 'auto', overflowX: 'hidden' }}
    >
      {Body}
    </ContentPanel>
  );
};

export default PatientInformationPanel;
