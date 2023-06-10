import { VitalFormPayload, VitalFormValues } from '../components/vital-form-schema';
import bodyCalculator from './bodyCalculator';

const formatBody = (body: VitalFormValues): Omit<VitalFormPayload, 'patient_id'> => {
  const weight = Number.parseInt(body.weight, 10);
  const height = Number.parseInt(body.height, 10);
  const [systolic, diastolic] = body.bloodPressure.split('/');
  // Optional fields
  const bsa = bodyCalculator.bsa(weight, height);
  const bmi = bodyCalculator.bmi(weight, height);

  return {
    vital_data: {
      pulse: String(body.pulse),
      BPSystolic: systolic,
      BPDiastolic: diastolic,
      bsa: String(bsa),
      bmi: String(bmi),
      body_temp: String(body.bodyTemp),
      spo_2: String(body.spo2),
      weight: String(body.weight),
      height: String(body.height),
    },
  };
};

export default formatBody;
