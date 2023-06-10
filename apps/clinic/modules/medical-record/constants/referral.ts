import yup from 'share-components/src/services/yup';
import { ReferralAction } from '../types/referral';

export const REFERRAL_ACTION: Record<string, ReferralAction> = {
  ADD: 'add',
  EDIT: 'edit',
  VIEW: 'view',
};

export const REFERRAL_TITLE = 'New Referral';

export const TEMPLATE_NAME = 'Default Template'; // will remove once we implement the dynamic template

export const REFERRAL_TYPES = {
  ROUTINE: 'routine',
  GPFIRST: 'GPFirst',
  FAST_TRACK: 'fast-track',
  AE_UCC: 'A&E/UCC',
};

const PATTERN_TWO_DIGIS_AFTER_COMMA = /^\d+(\.\d{0,2})?$/;

export const REFERRAL_FORM = {
  ROUTINE_COMPONENT_KEYS: [
    'doctor-healthcare-name',
    'chas-visit',
    'requesting-for',
    'diagnosis',
    'reason',
    'treatment',
    'medical-history',
    'drug-allergies',
  ],
  AEUCC_COMPONENT_KEYS: ['diagnosis', 'reason', 'medical-history', 'drug-allergies'],
  GPFIRST_COMPONENT_KEYS: ['gp-charge', 'dummy', 'reason', 'medical-history', 'drug-allergies', 'terms-and-conditions'],
  SCHEMA: yup.object().shape({
    referralTypeId: yup.number().required('Required').nullable(),
    referralTypeName: yup.string().required('Required').nullable(),
    specialtyCode: yup.string().required('Required').nullable(),
    hsgInstitutionCode: yup.string().required('Required').nullable(),
    reason: yup.string().required('Required').max(5000, 'Maximum 5000 character allowed').nullable(),
    drugAllergies: yup.string().required('Required').max(5000, 'Maximum 5000 character allowed').nullable(),
    medicalHistory: yup.string().required('Required').max(5000, 'Maximum 5000 character allowed').nullable(),
    treatmentManagementAlreadyProvidedByGP: yup.string().when('referralTypeName', {
      is: (value: string) => value === REFERRAL_TYPES.ROUTINE || value === REFERRAL_TYPES.FAST_TRACK,
      then: yup.string().max(5000, 'Maximum 5000 character allowed').required('Required').nullable(),
      otherwise: yup.string().nullable(),
    }),
    responsibility: yup.string().when('referralTypeName', {
      is: (value: string) => value === REFERRAL_TYPES.ROUTINE || value === REFERRAL_TYPES.FAST_TRACK,
      then: yup.string().required('Required').nullable(),
      otherwise: yup.string().nullable(),
    }),
    gPChargeBillSize: yup
      .number()
      .positive()
      .test('is-decimal', 'The amount should be a decimal with maximum two digits after comma', (val: any) => {
        if (val !== undefined && val !== null) {
          return PATTERN_TWO_DIGIS_AFTER_COMMA.test(val);
        }
        return true;
      })
      .nullable(),
    termsAndConditions: yup.bool().when('referralTypeName', {
      is: (value: string) => value === REFERRAL_TYPES.GPFIRST,
      then: yup.bool().oneOf([true], 'Required').nullable(),
      otherwise: yup.bool().nullable(),
    }),
  }),
};
