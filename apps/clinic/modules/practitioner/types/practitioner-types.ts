import { DefaultRecord } from 'share-components';
import { Address } from 'share-components/src/components/AddressFill/AddressForm/address-form-type';
import { Organisation } from 'modules/organisation/types/organisation-types';
import Premise from 'modules/organisation/types/premise-types';
import { Role } from 'modules/auth/types';
import { SxProps } from '@mui/material';

export interface PractitionerQualification extends DefaultRecord {
  id: number;
  type: string;
  code: string;
  issuerName: string;
  issuerType: string;
  issuingCountry: string;
}

interface Qualification {
  Practitioners: string;
  code: string;
  id: number;
  issuerCountry: string;
  issuerName: string;
  issuerType: string;
  type: string;
  validFrom: string;
  validTo: string;
}

export interface Phone extends DefaultRecord {
  number: string;
  preferred: boolean;
  type: string;
  isVerified: boolean;
  isPrimary?: boolean;
  phoneValue?: string;
  countryCode?: string;
  isoNumber?: string;
}

export interface Email extends DefaultRecord {
  email: string;
  practitionerId: number;
  isVerified: boolean;
  isPrimary?: boolean;
}

export interface Language extends DefaultRecord {
  code: string;
  name: string;
  preferred: boolean;
  proficiency: string;
}

export interface PractitionerOrganisation {
  practitionerId: number;
  organisationId: number;
}

export interface PractitionerPremise {
  practitionerId: number;
  premiseUuid: string;
  premiseId: number;
}

type ProfessionType = {
  name?: string;
  category?: string;
  type?: string;
  code?: string;
  validFrom?: string;
  validTo?: string;
  isPrimary: boolean;
};

export type CommonStatus = 'active' | 'suspended' | 'inactive';

interface Practitioner extends DefaultRecord {
  id: number;
  uuid: string;
  practitionerId: string;
  status: CommonStatus;
  name: string;
  gender: string;
  birthDate: string;
  deceased: boolean;
  deceasedOn: string;
  description: string;
  photo: string;
  qualifications: Qualification[];
  practitionerPremises: PractitionerPremise[];
  practitionerOrganisations?: PractitionerOrganisation[];
  profession?: {
    category?: string;
    name?: string;
    type?: string;
    code?: string;
    validFrom?: string;
    validTo?: string;
  };
  emails?: Email[];
  addresses?: Address[];
  phones?: Phone[];
  organisations?: Organisation[];
  premises?: Premise[];
  languages?: Language[];
  roleId?: number;
  credentialId?: number;
}

export interface PractitionerFormPostValues {
  practitionerId?: string;
  profession?: ProfessionType;
  qualifications?: Qualification[];
  email?: string[] | string;
  phoneValue?: string[] | string;
  countryCode?: string[] | string;
  postal?: string[] | string;
  address?: string[] | string;
  blockNo?: string[] | string;
  unitNo?: string[] | string;
  label?: string[] | string;
  organisation?: string;
  premise?: string;
  enrole?: string;
  qualificationPrimaryPosition?: number;
  language?: string;
  practitionerBody?: string;
  roleId?: number;
  credentialId?: number;
}

export interface InformationLineProps {
  title: string;
  value: React.ReactNode;
  sx?: SxProps;
}

export interface PractitionerDetailsProps {
  practitioner: Practitioner;
  organisation: Organisation;
  premise: Premise;
  roles?: Role[];
  credentialId?: number;
}

export interface PractitionerInformationProps {
  informations: InformationLineProps[];
  title: string;
  onEdit: () => void;
}

export default Practitioner;
