import * as Yup from 'yup';

const medicalCertificateFormSchema = Yup.object().shape({
  dateOfVisit: Yup.date().required('Required').nullable(),
  startDate: Yup.date().required('Required').nullable(),
  endDate: Yup.date().required('Required').nullable(),
  startTime: Yup.string().required('Required').nullable(),
  endTime: Yup.string().required('Required').nullable(),
  dateOfIssue: Yup.date().required('Required').nullable(),
  type: Yup.string(),
  description: Yup.string(),
  diagnosis: Yup.array().of(Yup.string()).default([]),
  remark: Yup.string(),
  practitionerName: Yup.string().required('Required'),
  sendToEmail: Yup.boolean().default(false),
  emailto: Yup.array()
    .of(Yup.string())
    .when('sendToEmail', {
      is: true,
      then: Yup.array().of(Yup.string()).required('Required'),
    }),
  emailcc: Yup.array().of(Yup.string()).default([]),
  emailbcc: Yup.array().of(Yup.string()).default([]),
  subject: Yup.string()
    .nullable()
    .when('sendToEmail', {
      is: true,
      then: Yup.string().required('Required'),
    }),
  message: Yup.string()
    .nullable()
    .when('sendToEmail', {
      is: true,
      then: Yup.string().required('Required'),
    }),
});

export default medicalCertificateFormSchema;
