import * as Yup from 'yup';

const OrganizationSchema = [
  Yup.object().shape({
    includeParentOrg: Yup.boolean(),
    parentOrganisation: Yup.string().when('includeParentOrg', {
      is: true,
      then: Yup.string().required('Required'),
    }),
    name: Yup.string().required('Required'),
    companyName: Yup.string().required('Required'),
    code: Yup.string().required('Required'),
    categoryId: Yup.string(),
    subCategoryId: Yup.string(),
    licenseFrom: Yup.date().required('Required'),
    licenseTo: Yup.date(),
    status: Yup.string().required('Required'),
    companyRegNo: Yup.string().required('Required'),
  }),
  Yup.object().shape({}),
  Yup.object().shape({
    currency: Yup.string().required('Required'),
    taxRate: Yup.number().min(0).max(100).required('Required'),
    amount: Yup.number().min(0).required('Required'),
  }),
  Yup.object().shape({
    timeZone: Yup.string().nullable(),
  }),
  Yup.object().shape({}),
];

export default OrganizationSchema;
