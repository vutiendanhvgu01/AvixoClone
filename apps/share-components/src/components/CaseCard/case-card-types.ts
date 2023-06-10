interface Case {
  uuid: `C-${string}`;
  ref: string;
  status: string;
  name: string;
  age: number;
  gender: string;
  nric: string;
  enrolmentDate: string;
  lengthOfStay: number;
}
interface CaseCardProps {
  case: Case;
}

export type { Case, CaseCardProps };
