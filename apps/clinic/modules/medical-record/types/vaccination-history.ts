import { DefaultRecord } from 'share-components';

export interface Condition {
  // COND001
  ConditionCode?: string;
  // None required
  ConditionDesc?: string;
}

export interface EligibleVaccine {
  // 3339641000133109
  SDDCode?: string;
  Conditions: Condition[];
  // 35
  PreSubsidyFeeCap?: string;
  // 0
  OOPCap?: string;
  // 35
  FixedSubsidy?: string;
}
export interface Vaccination {
  //  Vaccination Claim Code
  VaccinationClaimCode: string;
  // 1
  ClaimDosageStep: string;
  // OP
  ClaimIsEligibleStatusCode: string;
  EligibleVaccines: EligibleVaccine[];
  // "2023-03-24"
  DosageEligibilityDate?: string;
  // "2021-06-21T16:34:15.436+08:00"
  OldestQueriedInfoTimestamp?: string;
}

export interface VaccinationHistory extends DefaultRecord {
  uuid?: string;
  //   S1614005H
  PatientIDNum?: string;
  //   VSS018
  VaccinationClaimCodeEnquired: string;
  //   2000001
  HCICode?: string;
  //    "2023-03-24"
  EligibilityDate?: string;
  MCRNo?: string;
  SourceID?: string;
  SystemUserID?: string;
  vaccinations: Vaccination[];
  //   SC05-000
  QueryStatus?: string;
}
