import Yup from 'share-components/src/services/yup';
import { DISEASE_ITEMS } from '../mockData';

const CdLensSchema = Yup.object().shape({
  diseaseName: Yup.string().oneOf(DISEASE_ITEMS).required('Disease name Empty'),
  followUpAction: Yup.string()
    .oneOf(['outpatient-treatment', 'cdc-referral', 'hospitalisation', 'death'])
    .required('Follow Up Empty'),
  dateOfDiagnosis: Yup.string().required('Date of Diagnosis Empty'),
  dateOfNotification: Yup.string().required('Date of Notification Empty'),
  dateOfOnset: Yup.string().required('Date On Set Empty'),
  confirmationMethod: Yup.string().oneOf(['clinical', 'laboratory', 'both']).required('confirmationMethod Up Empty'),
});

export default CdLensSchema;
