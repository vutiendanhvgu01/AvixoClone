import { OneMapSuggestion } from 'common/services/getOneMap';
import * as Yup from 'yup';
import { PatientFormSchema } from '../components/patient-types';

export default function addressFormatter(
  address: OneMapSuggestion,
  initialValue: Yup.InferType<typeof PatientFormSchema>['address'],
): Yup.InferType<typeof PatientFormSchema>['address'] {
  return {
    fullAddress: address.ADDRESS,
    unit: initialValue.unit,
    city: 'Singapore',
    postalCode: address.POSTAL === 'NIL' ? '' : address.POSTAL,
    country: 'SG',
    coordinates: {
      lat: parseFloat(address.LATITUDE),
      lng: parseFloat(address.LONGITUDE),
    },
  };
}
