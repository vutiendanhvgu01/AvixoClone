// eslint-disable-next-line import/prefer-default-export
export const getSpecificDataFromSummary = (
  summary: string,
  field:
    | 'drugAllergies'
    | 'medicalHistory'
    | 'gPChargeBillSize'
    | 'treatmentManagementAlreadyProvidedByGP'
    | 'diagnosis'
    | 'responsibility'
    | 'CHASSFLVCDSSVisit'
    | 'patientIsRequestingFor',
) => {
  if (!summary) return '';

  switch (field) {
    case 'drugAllergies':
      return summary.match(/(?<=<span data-drug-allergies>).*?(?=<\/span>)/g)?.toString() ?? '';
    case 'medicalHistory':
      return summary.match(/(?<=<span data-medical-history>).*?(?=<\/span>)/g)?.toString() ?? '';
    case 'gPChargeBillSize':
      return summary.match(/(?<=<span data-gp-change-bill-size>).*?(?=<\/span>)/g)?.toString() ?? '';
    case 'treatmentManagementAlreadyProvidedByGP':
      return summary.match(/(?<=<span data-treatment-management>).*?(?=<\/span>)/g)?.toString() ?? '';
    case 'CHASSFLVCDSSVisit':
      return summary.match(/(?<=<span data-chas-sfl-vcdss-visit>).*?(?=<\/span>)/g)?.toString() ?? '';
    case 'diagnosis':
      return summary.match(/(?<=<span data-diagnosis>).*?(?=<\/span>)/g)?.toString() ?? '';
    case 'responsibility':
      return summary.match(/(?<=<span data-assign-responsibility>).*?(?=<\/span>)/g)?.toString() ?? '';
    case 'patientIsRequestingFor':
      return summary.match(/(?<=<span data-patient-is-requesting-for>).*?(?=<\/span>)/g)?.toString() ?? '';
    default:
      return '';
  }
};
