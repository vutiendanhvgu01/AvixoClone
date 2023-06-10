import AppointmentForm from 'modules/appointment/components/appointment-form';
import { AppointmentFormValues } from 'modules/appointment/components/appointment-types';
import AddInvoiceForm from 'modules/invoice/components/AddInvoiceForm/add-invoice-form';
import { getPatientEmail, getPatientIdentity, getPatientPhoneNumber } from 'modules/patient/services';
import { Patient } from 'modules/patient/types/patient';

interface PatientManagementActionProps {
  patient: Patient;
  action: string;
  onCancel: () => void;
}

const PatientManagementAction: React.FC<PatientManagementActionProps> = ({ action, patient, onCancel }) => {
  switch (action) {
    case 'add-invoice':
      // category = 1 - Patient
      return <AddInvoiceForm initData={{ category: { value: 1 }, patient }} currentStep={2} open onCancel={onCancel} />;
    case 'add-appointment': {
      const initData = {
        patientId: patient.id,
        patientName: patient.fullName,
        patientEmail: getPatientEmail(patient.emails),
        phoneNumber: getPatientPhoneNumber(patient.phones),
        idType: getPatientIdentity(patient.identities)?.idType,
        idNumber: getPatientIdentity(patient.identities)?.idNumber,
        isNewPatient: false,
        patientType: 'existing',
      } as unknown as AppointmentFormValues;
      return <AppointmentForm open initData={initData} onCancel={onCancel} />;
    }

    case 'add-patient-to-queue':
      return null;
    default:
      return null;
  }
};

export default PatientManagementAction;
