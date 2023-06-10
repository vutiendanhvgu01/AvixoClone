interface BlankCaseBody {
  country: string;
  businessRef: string;
  patientRef: string;
}

interface BlankCaseResponse {
  id: number;
  ref: string;
  status: string;
  createdAt: string;
}

// eslint-disable-next-line import/prefer-default-export
export { type BlankCaseBody, type BlankCaseResponse };
