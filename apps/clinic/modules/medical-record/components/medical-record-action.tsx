import { Typography } from '@mui/material';
import type { Patient } from 'modules/patient/types/patient';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { AvixoDrawerConfirm, AvixoFixedContainer } from 'share-components';
import { PAGE_URLS } from 'share-components/src/constants';
import { Catalog } from 'modules/catalog/types';
import { MEDICAL_RECORD_ACTIONS } from '../constants/medical-certificate';
import { MedicalCertificate } from '../types/medical-certificate';

interface MedicalRecordActionActionProps {
  patient: Patient;
  medicalCert?: MedicalCertificate;
  products: Catalog[];
}

const AllergyForm = dynamic(() => import('modules/allergy/components/allergy-form'), { ssr: false });
const AddEditImmunisationForm = dynamic(() => import('modules/immunisation/components/immunisation-form'), {
  ssr: false,
});
const MedicalCertificateForm = dynamic(
  () => import('modules/medical-record/components/MedicalCertificate/medical-certificate-form'),
  { ssr: false },
);
const CdLensForm = dynamic(() => import('modules/medical-record/components/CdLens/cdlens-form'), { ssr: false });

const MedicalRecordAction: React.FC<MedicalRecordActionActionProps> = ({ patient, medicalCert, products }) => {
  const router = useRouter();
  const action = router.query?.action;

  const goToMedicalRecordPage = useCallback(() => {
    router.push(PAGE_URLS.PATIENT_MEDICAL_RECORD(patient.uuid), undefined, { shallow: true });
  }, [router, patient]);

  switch (action) {
    case 'edit-important-note':
      return (
        /* NOTE: Move AvixoFixedContainer to Important Note Form Component */
        <AvixoFixedContainer title="Important Note" display onClose={goToMedicalRecordPage}>
          {/* Important Note Form */}
        </AvixoFixedContainer>
      );

    case 'add-cdlens':
      return <CdLensForm open onCancel={goToMedicalRecordPage} patientId={patient?.id} />;
    case 'add-allergy':
      return <AllergyForm open onCancel={goToMedicalRecordPage} patientId={patient?.id} />;
    case 'add-immunisation':
      return <AddEditImmunisationForm products={products} open onCancel={goToMedicalRecordPage} />;

    case 'edit-other-information':
      return (
        /* NOTE: Move AvixoFixedContainer to Other Information Form Component */
        <AvixoFixedContainer title="Other Information" display onClose={goToMedicalRecordPage}>
          {/* Other Information Form */}
        </AvixoFixedContainer>
      );

    case 'add-vital-chart':
      return (
        /* NOTE: Move AvixoFixedContainer to Vital Charting Form Component */
        <AvixoFixedContainer title="Vital Charting" display onClose={goToMedicalRecordPage}>
          {/* Vital Charting Form */}
        </AvixoFixedContainer>
      );

    case MEDICAL_RECORD_ACTIONS.ADD_MC:
      return <MedicalCertificateForm open onCancel={goToMedicalRecordPage} />;
    case MEDICAL_RECORD_ACTIONS.EDIT_MC:
      return <MedicalCertificateForm open initData={medicalCert} onCancel={goToMedicalRecordPage} />;
    case MEDICAL_RECORD_ACTIONS.EMAIL_MC:
      return (
        <MedicalCertificateForm
          open
          initData={{ ...medicalCert, sendToEmail: true }}
          onCancel={goToMedicalRecordPage}
        />
      );
    case MEDICAL_RECORD_ACTIONS.DELETE_MC:
      return (
        <AvixoDrawerConfirm
          open
          title="Delete Medical Certificate?"
          confirmContent={
            <Typography>
              <strong>Are you sure want to delete {medicalCert?.mcId}?</strong>
              <br />
              This action cannot be undone.
            </Typography>
          }
          id={medicalCert?.id}
          inputProps={{
            name: 'reason',
            label: 'Reason for deletion',
            required: true,
            defaultValues: 'Patient request to delete the medical certificate',
          }}
          footerProps={{
            confirmText: 'Yes, delete',
          }}
          handleClose={goToMedicalRecordPage}
        />
      );
    default:
      return null;
  }
};

export default MedicalRecordAction;
