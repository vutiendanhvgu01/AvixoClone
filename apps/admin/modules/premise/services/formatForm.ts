import { PhoneNumber } from '@ShareComponents/PhoneFill/PhoneForm/phone-form-type';
import Premise from '../components/premise-types';

const formatPremiseForm = (body: any): Partial<Premise> => {
  const premise = JSON.parse(body.premiseBody);

  const phones = premise.phones.map((phone: PhoneNumber) => ({
    ...phone,
    isoNumber: phone.countryCode.toString(),
    number: phone.phoneValue,
  }));

  return {
    ...premise,
    phones,
    currencyID: 1,
    timezoneID: 1,
    status: 'active',
  };
};

export default formatPremiseForm;
