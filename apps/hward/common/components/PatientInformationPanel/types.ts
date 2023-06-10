export interface Patient {
  uuid: string;
  caseId?: number;
  enrolmentDate: string;
  fullName: string;
  gender: string;
  nric: string;
  dateOfBirth: string;
  contact: string;
  alternativeContact: string;
  address: string;
  unitNumber: string;
  postcode: string;
  avixoUrl: string;
  speedocPatientRef: string;
}
