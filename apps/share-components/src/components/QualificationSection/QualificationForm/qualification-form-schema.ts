import * as Yup from 'yup';

const QualificationFormSchema = Yup.object().shape({
  code: Yup.string(),
  type: Yup.string(),
  issuerType: Yup.string(),
  issuerName: Yup.string(),
  issuingCountry: Yup.string(),
  validFrom: Yup.date(),
  validTo: Yup.date(),
});

export default QualificationFormSchema;
