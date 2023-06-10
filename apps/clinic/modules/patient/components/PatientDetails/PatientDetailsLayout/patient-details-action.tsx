import MedicalCertificateForm from 'modules/medical-record/components/MedicalCertificate/medical-certificate-form';
import type { Patient } from 'modules/patient/types/patient';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { AvixoDrawerConfirm, AvixoFixedContainer } from 'share-components';
import { Catalog } from 'modules/catalog/types';
import GovernmentSubsidies from '../patient-government-subsidies';

const AllergyForm = dynamic(() => import('modules/allergy/components/allergy-form'), { ssr: false });
const AddEditPaitientForm = dynamic(() => import('modules/patient/components/AddEditPatient/add-edit-patient-form'), {
  ssr: false,
});
const AddEditImmunisationForm = dynamic(() => import('modules/immunisation/components/immunisation-form'), {
  ssr: false,
});
const EnrollHSGForm = dynamic(() => import('modules/hsg/components/EnrollForm/enroll-hsg-form'), { ssr: false });

interface PatientDetailsActionProps {
  patient: Patient;
  products: Catalog[];
}

const PatientDetailsAction: React.FC<PatientDetailsActionProps> = ({ patient, products }) => {
  const router = useRouter();
  const action = router.query.action?.toString() || '';
  const step = router.query.step || 1;
  const goToPatientDetailPage = useCallback(() => {
    router.push({ pathname: router.pathname, query: { patientUUID: patient.uuid } });
  }, [router, patient.uuid]);

  switch (action) {
    case 'edit':
      return (
        <AddEditPaitientForm type="edit" initData={patient} onCancel={goToPatientDetailPage} initStep={Number(step)} />
      );
    case 'delete':
      return (
        <AvixoDrawerConfirm
          open
          handleClose={goToPatientDetailPage}
          inputProps={{
            name: 'reason',
            label: 'Reason of deletion',
            required: true,
            defaultValues: '',
          }}
          title={`Delete ${patient.fullName} as a patient?`}
          confirmContent="Patient will be deleted from the system. This action cannot be undone."
          confirmContentTitle=""
        />
      );

    case 'add-allergy':
      return <AllergyForm open onCancel={goToPatientDetailPage} patientId={patient?.id} />;

    case 'add-medical-certificate':
      return <MedicalCertificateForm open onCancel={goToPatientDetailPage} />;

    case 'add-invoice':
      return (
        /* NOTE: Move AvixoFixedContainer to Add/Edit Invoice Form Component */
        <AvixoFixedContainer title="Add New Invoice" display onClose={goToPatientDetailPage}>
          {/* Add/Edit Invoice Form */}
        </AvixoFixedContainer>
      );

    case 'add-appointment':
      return (
        /* NOTE: Move AvixoFixedContainer to Add/Edit Appointment Form Component */
        <AvixoFixedContainer title="Add New Appointment" display onClose={goToPatientDetailPage}>
          {/* Add/Edit Appointment Form */}
        </AvixoFixedContainer>
      );

    case 'add-medicine':
      return (
        /* NOTE: Move AvixoFixedContainer to Add/Edit Medicine Form Component */
        <AvixoFixedContainer title="Add New Medicine" display onClose={goToPatientDetailPage}>
          {/* Add Medicine Form */}
        </AvixoFixedContainer>
      );

    case 'add-queue':
      return (
        /* NOTE: Move AvixoFixedContainer to Add/Edit Queue Form Component */
        <AvixoFixedContainer title="Add To Queue" display onClose={goToPatientDetailPage}>
          {/* Add Queue Form */}
        </AvixoFixedContainer>
      );

    case 'add-immunisation':
      return <AddEditImmunisationForm products={products} open onCancel={goToPatientDetailPage} />;

    case 'government-subsidies':
      return <GovernmentSubsidies onClose={goToPatientDetailPage} />;

    case 'enrol-hsg':
    case 'edit-hsg':
      return (
        <EnrollHSGForm
          open
          initData={action === 'edit-hsg' ? { nric: 'JZIHGFEDCBA', enrolled: true } : undefined}
          patient={patient}
        />
      );
    default:
      return null;
  }
};

export default PatientDetailsAction;
