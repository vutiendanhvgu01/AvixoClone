import { DefaultRecord } from 'share-components';
export interface MedicalCertificate extends DefaultRecord {
  mcId?: string;
  visitDate?: string;
  issuedDate?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  type?: string;
}

export interface MedicalCertificateValues extends Omit<MedicalCertificate, 'id'> {
  id?: number;
  dateOfVisit?: string | null;
  startTime?: string;
  endTime?: string;
  dateOfIssue?: string;
  diagnosis?: string[];
  remark?: string;
  practitionerName?: string;
  sendToEmail?: boolean;
  emailto?: string[];
  emailcc?: string[];
  emailbcc?: string[];
  subject?: string;
  message?: string;
}
