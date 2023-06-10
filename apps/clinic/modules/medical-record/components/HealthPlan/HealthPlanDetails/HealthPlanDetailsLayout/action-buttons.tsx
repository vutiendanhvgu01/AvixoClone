import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { EditSquareIcon, PrintIcon } from 'share-components';
import { PAGE_URLS } from 'share-components/src/constants';

export const Actions = styled(Box)(() => ({
  flex: 1,
  display: 'flex',
  justifyContent: 'flex-end',
  '> button, > a': {
    marginLeft: 16,
  },
}));

const HealthPlanActionButtons = () => {
  const router = useRouter();
  const { patientUUID, carePlanUUID } = router.query;

  return (
    <Actions>
      <Link
        href={PAGE_URLS.PATIENT_MEDICAL_RECORD_HEALTH_PLAN(
          patientUUID?.toString() || '',
          'edit',
          carePlanUUID?.toString() || '',
        )}
      >
        <Button color="whiteLight" startIcon={<EditSquareIcon />}>
          Edit
        </Button>
      </Link>

      <Button startIcon={<PrintIcon />}>Print</Button>
    </Actions>
  );
};

export default HealthPlanActionButtons;
