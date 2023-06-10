import { yup } from 'share-components';

const AppointmentSchema = yup.object().shape({
  caseId: yup.string(),
  startTime: yup.date().required('Required'),
  type: yup.string().required('Required'),
  patientId: yup.string().when('patientType', {
    is: 'existing',
    then: yup.string().required('Required'),
  }),
  patientName: yup.string().required('Required'),
  patientEmail: yup.string().email(),
  countryCode: yup.string().required('Required'),
  phoneNumber: yup.string().required('Required'),
  idType: yup.string(),
  idNumber: yup.string(),
  practitionerId: yup.string(),
  practitionerName: yup.string(),
  practitionerType: yup.string(),
  serviceType: yup.string(),
  reason: yup.string().required('Required'),
  comments: yup.string(),
  isSendNotification: yup.boolean(),
  sendVia: yup.string().when('isSendNotification', {
    is: true,
    then: yup.string().required('Required'),
  }),
  remiderType: yup.string().when('isSendNotification', {
    is: true,
    then: yup.string().required('Required'),
  }),
  status: yup.string(),
  action: yup.string().required('Required'),
  organisationId: yup.string().required('Required'),
});

export default AppointmentSchema;
