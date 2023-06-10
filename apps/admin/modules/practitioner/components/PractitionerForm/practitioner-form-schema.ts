import Yup from 'share-components/src/services/yup';
import { PhaseType } from '../../types/practitioner-form';

const DetailSchema = Yup.object().shape(
  {
    name: Yup.string().required('Required'),
    gender: Yup.string().required('Required'),
    birthDate: Yup.string().required('Required').nullable(),
    language: Yup.string().required('Required'),
    organisation: Yup.string().required('Required'),
    premise: Yup.string().required('Required'),
    status: Yup.string().oneOf(['active', 'suspended', 'inactive']).required('Required'),
    nric: Yup.string()
      .ensure()
      .when('nric', (value?: string) => (value ? Yup.string().isValidNRIC() : Yup.string())),
  },
  [['nric', 'nric']],
);

const ContactSchema = Yup.object().shape({
  phone: Yup.array().of(
    Yup.object().shape({
      number: Yup.string().required('Required'),
      isoNumber: Yup.string().required('Required'),
    }),
  ),
  emails: Yup.array().of(
    Yup.object().shape({
      email: Yup.string().email('Invalid email').required('Required'),
    }),
  ),
  addresses: Yup.array().of(
    Yup.object().shape({
      postal: Yup.string().required('Required'),
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
