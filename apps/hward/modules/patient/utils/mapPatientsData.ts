import { formatDate } from 'share-components/src/utils/formatUtils';
import { HWardAccount, PatientResponseProfile } from '../api/patient-api-type';
import calculateAge from './calculateAge';
import censorNRIC, { CensoredNRIC } from './censorNRIC';

export interface FormattedPatientData {
  uuid: string;
  fullname: string;
  censoredNRIC: CensoredNRIC | '';
  enrolmentDate: string;
  age: number;
  gender: 'Male' | 'Female';
}

/**
 *
 * @param patients List of patient data grabbed from the API
 * @returns Filtered patient data that the table in /patients need
 */
function mapPatientsData(patients: PatientResponseProfile[]) {
  const result = patients.map(patient => {
    const nricDoc = patient.identification.documents.find(doc => doc.type === 'nric' || doc.type === 'id');
    const hwardAccount = patient.accounts.find(acc => acc.type === 'hward') as HWardAccount;
    const age = calculateAge(patient.profile.birthdate);
    const data: FormattedPatientData = {
      // eslint-disable-next-line no-underscore-dangle
      uuid: patient._id,
      fullname: patient.profile.fullName,
      censoredNRIC: nricDoc ? censorNRIC(nricDoc.id) : '',
      gender: patient.profile.gender === 'M' ? 'Male' : 'Female',
      age,
      enrolmentDate: formatDate(hwardAccount.meta.taggedDate, 'dd MMM yyyy'),
    };

    return data;
  });

  return result;
}

export default mapPatientsData;
