import Yup from 'share-components/src/services/yup';

const VitalFormSchema = Yup.object().shape({
  weight: Yup.number().moreThan(0, 'Weight must be positive number'),
  height: Yup.number().moreThan(0, 'Height must be positive number'),
  bodyTemp: Yup.number().moreThan(0, 'Body temperature must be positive number'),
  pulse: Yup.number().moreThan(0, 'Pulse must be positive number'),
  spo2: Yup.number().moreThan(0, 'SpO2 must be positive number'),
  bloodPressure: Yup.string().matches(/^\d+\/\d+$/, 'Blood pressure must be in format 120/80'),
});

export const initialVitalValues = {
  weight: '',
  height: '',
  bodyTemp: '',
  pulse: '',
  spo2: '',
  bloodPressure: '',
};

export type VitalFormValues = typeof initialVitalValues;

export type VitalFormPayload = {
  patient_id: number;
  vital_data: {
    pulse: string;
    BPSystolic: string;
    BPDiastolic: string;
    bsa?: string;
    bmi?: string;
    body_temp: string;
    spo_2: string;
    weight: string;
    height: string;
  };
};

export default VitalFormSchema;
