import { DefaultRecord } from 'share-components';

interface ReferralType extends DefaultRecord {
  name: string;
  type: string;
}

export interface Referral extends DefaultRecord {
  uuid?: string;
  title: string;
  referralTypeId: number;
  subTitle?: string;
  reason?: string;
  reasonCode?: string;
  summary?: string;
  description?: string;
  patientId?: number;
  caseId?: number;
  visitId?: number;
  documentType?: string;
  documentCategory?: string;
  documentStatus?: string;
  referralStatus?: string;
  requestedService?: string;
  requestedServiceCode?: string;
  specialty?: string;
  specialtyCode?: string;
  requestingPractitioner?: string;
  requestingEntity?: string;
  recipientPractitioner?: string;
  recipientEntity?: string;
  recipientType?: string;
  hsgInstitutionHciCode?: string;
  hsgClusterCode?: string;
  hsgInstitutionCode?: string;
  hsgInstitutionName?: string;
  hsgOutboundEmail?: string;
  requestedAt?: string;
  receivedAt?: string;
  sentAt?: string;
  ownerId?: number;
  authoredBy?: number;
  authoredAt?: string;
  premiseId?: number;
  organisationId?: number;
  referralType?: ReferralType;
}

export interface ReferralDestination extends DefaultRecord {
  status: string;
  category: string;
  type: string;
  institutionHciCode: string;
  clusterCode: string;
  institutionCode: string;
  institutionName: string;
  specialty: string;
  hsgOutboundEmail: boolean;
  specialtyCode: string;
  referralTypeId: number;
  referralTypeName: string;
  premiseId: number;
  organisationId: number;
}

export interface ReferralFormValues extends Omit<Referral, 'id'> {
  id?: number;
}

export type ReferralAction = 'add' | 'edit' | 'view';
