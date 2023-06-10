import Yup from 'share-components/src/services/yup';
import { PhaseType } from './practitioner-form-types';

const DetailSchema = Yup.object().shape(
  {
    name: Yup.string().required('Full name Empty'),
    gender: Yup.string().required('Gender Empty'),
    birthDate: Yup.string().required('Date of birth Empty'),
    language: Yup.string().required('Language Empty'),
    organisation: Yup.string().required('Organisation Empty'),
    premise: Yup.string().required('Premise Empty'),
    status: Yup.string().oneOf(['active', 'suspended', 'inactive']).required('Status Empty'),
    nric: Yup.string()
      .ensure()
      .when('nric', (value?: string) => (value ? Yup.string().isValidNRIC() : Yup.string())),
  },
  [['nric', 'nric']],
);

const ContactSchema = Yup.object().shape({
  phone: Yup.array().of(
    Yup.object().shape({
      number: Yup.string().required('number empty'),
      isoNumber: Yup.string().required('isoNumber empty'),
    }),
  ),
  emails: Yup.array().of(
    Yup.object().shape({
      email: Yup.string().email('Invalid email').required('email empty'),
    }),
  ),
  addresses: Yup.array().of(
    Yup.object().shape({
      postal: Yup.string().required('postal empty'),
    }),
  ),
});

const ProfessionSchema = Yup.object().shape({
  name: Yup.string(),
  gender: Yup.string(),
  type: Yup.string(),
  code: Yup.string(),
  validFrom: Yup.string(),
  validTo: Yup.string(),
  isPrimary: Yup.bool(),
});

const QualificationSchema = Yup.array().of(
  Yup.object().shape({
    type: Yup.string(),
    code: Yup.string(),
    issuerName: Yup.string(),
    issuerType: Yup.string(),
    issuerCountry: Yup.string(),
    validFrom: Yup.string(),
    validTo: Yup.string(),
  }),
);

const RoleSchema = Yup.object().shape({
  enrole: Yup.string().required('Role empty'),
});

const PractitionerByStepSchema: Record<PhaseType, any> = {
  detail: DetailSchema,
  contact: ContactSchema,
  profession: ProfessionSchema,
  qualification: QualificationSchema,
  role: RoleSchema,
};
export default PractitionerByStepSchema;
