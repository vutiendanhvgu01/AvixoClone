import { DefaultRecord } from 'share-components';

export type VerificationStatus = 'unconfirmed' | 'presumed' | 'confirmed' | 'refuted' | 'entered-in-error';

export type ClinicalStatus = 'active' | 'inactive' | 'resolved';

export type Severity = 'mid' | 'moderate' | 'severe' | 'unknown';

export type Criticality = 'low' | 'high' | 'unable-to-assess' | 'unknown';

export type InformationSource =
  | 'patient'
  | 'practitioner'
  | 'related-person'
  | 'medical-records'
  | 'others'
  | 'unknown';

export type SubType = 'food' | 'medication' | 'environment' | 'biologic' | 'other';

export interface Allergy extends DefaultRecord {
  name: string;
  adrDrug: string | null;
  type: string;
  subType: string;
  adrBrand: string;
  substanceCode: string | null;
  verificationStatus: VerificationStatus | null;
  lastOccurrence: string;
  manifestationSctName: string;
  exposureRouteSct: string | null;
  exposureRouteSctName: string | null;
  clinicalStatus: ClinicalStatus | null;
  severity: Severity;
  criticality: Criticality;
  firstOccurence?: string;
  resolvedOn?: string;
  description?: string;
  updatedAt?: string;
  createdAt?: string;
  reportedAt?: string;
  updateReason?: string | null;
  deleteReason?: string | null;
  nehr?: boolean;
  suspectedDrug: string;
  informationSource: InformationSource;
  createdBy: number;
  reportedBy: number | null;
  practitionerName: string;
  remarks: string;
}

export interface AllergyFormValues
  extends Omit<
    Allergy,
    | 'id'
    | 'validFrom'
    | 'createdBy'
    | 'validTo'
    | 'informationSource'
    | 'severity'
    | 'subType'
    | 'criticality'
    | 'lastOccurrence'
    | 'practitionerName'
  > {
  id?: number;
  validFrom?: string | null;
  validTo?: string | null;
  informationSource: null | InformationSource;
  severity: Severity | null;
  subType: string | null;
  criticality: Criticality | null;
  lastOccurrence: string | null;
  createdBy: number | null;
}
