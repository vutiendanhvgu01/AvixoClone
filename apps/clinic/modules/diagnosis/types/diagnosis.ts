import { DefaultRecord } from 'share-components';

export interface Diagnosis extends DefaultRecord {
  // snomed diagnosis code
  code?: string;
  // icd10 diagnosis code
  definition: string;
}
