import { Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { PlusOutlined } from 'share-components';
import { PAGE_URLS } from 'share-components/src/constants';

export const Actions = styled(Box)(() => ({
  flex: 1,
  display: 'flex',
  justifyContent: 'flex-end',
  '> button, > a, > form': {
    marginLeft: 16,
  },
}));

interface MedicalRecordActionButtonsProps {
  patientId: string | number;
}

const MedicalRecordActionButtons: React.FC<MedicalRecordActionButtonsProps> = ({ patientId }) => {
  const router = useRouter();
  const { query } = router;

  const medicalRecordUrl = PAGE_URLS.PATIENT_MEDICAL_RECORD(query.patientUUID?.toString() || '');

  return (
    <Actions>
      <Link href={`${medicalRecordUrl}?action=add-cdlens`}>
        <Button color="whiteLight" startIcon={<PlusOutlined />}>
          CDLENS
        </Button>
      </Link>
      <Link href={`${medicalRecordUrl}?action=add-allergy`}>
        <Button color="whiteLight" startIcon={<PlusOutlined />}>
          Allergy
        </Button>
      </Link>
      <Link href={`${medicalRecordUrl}?action=add-immunisation`}>
        <Button color="whiteLight" startIcon={<PlusOutlined />}>
          Immunisation
        </Button>
      </Link>
      <Link href={`${medicalRecordUrl}?action=add-medical-certificate`}>
        <Button color="whiteLight" startIcon={<PlusOutlined />}>
          MC
        </Button>
      </Link>
      <form method="POST">
        <input type="hidden" name="action" value="create-prescription" />
        <input type="hidden" name="isDraft" value="true" />
        <input type="hidden" name="patientId" value={patientId} />
        <Button type="submit" startIcon={<PlusOutlined />}>
          Prescription
        </Button>
      </form>
    </Actions>
  );
};

export default MedicalRecordActionButtons;
