import {
  AvixoAccount,
  HWardAccount,
  PatientResponseProfile,
  SpeedocPatientAccount,
} from 'modules/patient/api/patient-api-type';
import { formatDate } from 'share-components/src/utils/formatUtils';
import censorNRIC from 'modules/patient/utils/censorNRIC';
import { Patient } from 'common/components/PatientInformationPanel/types';
import getPatientContacts from 'modules/patient/utils/getPhone';

function mapPatientData(patient: PatientResponseProfile): Patient {
  const {
    profile,
    identification,
    contacts: { phones, addresses },
    _id,
    accounts = [],
  } = patient;
  const nricDoc = identification.documents.find(doc => doc.type === 'nric' || doc.type === 'id');
  const hwardAccount = accounts.find(acc => acc.type === 'hward') as HWardAccount;
  const avixoAccount = accounts.find(acc => acc.type === 'avixo') as AvixoAccount;
  const speedocPatientAccount = accounts.find(acc => acc.type === 'speedoc-patient') as SpeedocPatientAccount;

  return {
    uuid: _id,
    enrolmentDate: hwardAccount?.meta?.taggedDate,
    fullName: profile?.fullName,
    dateOfBirth: formatDate(profile?.birthdate, 'MMM dd, yyyy'),
    gender: profile?.gender === 'M' ? 'Male' : 'Female',
    nric: nricDoc ? censorNRIC(nricDoc.id) : '',
    address: addresses?.[0]?.fullAddress ?? '',
    unitNumber: addresses?.[0]?.unit ?? '',
    postcode: addresses?.[0]?.postalCode ?? '',
    avixoUrl: avixoAccount.url,
    speedocPatientRef: speedocPatientAccount.id,
    ...getPatientContacts(phones),
  };
}

export default mapPatientData;
