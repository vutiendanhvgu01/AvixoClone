import { DefaultRecord } from 'share-components';
import type Premise from 'modules/premise/components/premise-types';
import type { Organisation } from 'modules/organisation/components/organisation-types';
import { Address } from 'share-components/src/components/AddressFill/AddressForm/address-form-type';
import { Qualification } from 'share-components/src/components/QualificationSection/QualificationForm/qualification-form-type';

export interface Phone extends DefaultRecord {
  number: string;
  preferred: boolean;
  type: string;
  isVerified?: boolean;
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

export type PractitionerStatus = 'active' | 'suspended' | 'inactive';

export interface Practitioner extends DefaultRecord {
  uuid?: string;
  practitionerId?: string;
  status: PractitionerStatus;
  languages?: Language[];
  name: string | null;
  photo?: string;
  phones?: Phone[];
  description?: string;
  emails: Email[];
  organisations: Organisation[];
  premises: Premise[];
  profession?: {
    category?: string;
    name?: string;
    type?: string;
    code?: string;
    validFrom?: string;
    validTo?: string;
    preferred: boolean;
  };
  practitionerOrganisations: PractitionerOrganisation[];
  practitionerPremises: PractitionerPremise[];
  gender: string;
  birthDate: string;
  addresses: Address[];
  qualifications?: Qualification[];
}

export type ProfessionType = {
  name?: string;
  category?: string;
  type?: string;
  code?: string;
  validFrom?: string;
  validTo?: string;
  preferred: boolean;
};

interface PractitionerListProps {
  practitioners: Practitioner[];
}

export type { PractitionerListProps };
