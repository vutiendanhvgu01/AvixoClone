import { Address } from 'share-components/src/components/AddressFill/AddressForm/address-form-type';
import type { OrganisationFormPostValues, Email } from '../components/organisation-types';

interface PostFormatAddress extends Partial<Address> {
  name: string;
  floorNo: string;
  line1: string;
}

interface PostFormatPhone {
  number: string;
  isoNumber: string;
}

const formatOrganisationForm = (organisation: OrganisationFormPostValues) => {
  const {
    postal = '',
    email = '',
    phoneValue = '',
    countryCode = '',
    unitNo = '',
    label = '',
    blockNo = '',
    address = '',
  } = organisation;

  let addresses: PostFormatAddress[] = [];
  let emails: Email[] = [];
  let phones: PostFormatPhone[] = [];

  if (Array.isArray(postal) && postal) {
    addresses = postal?.map((item: string, index: number) => ({
      postal: item,
      unitNo: unitNo?.[index],
      name: label?.[index],
      floorNo: blockNo?.[index],
      line1: address?.[index],
    }));
  } else {
    addresses = [
      {
        postal,
        unitNo: unitNo?.[0],
        name: label?.[0],
        floorNo: blockNo?.[0],
        line1: address?.[0],
      },
    ];
  }

  if (Array.isArray(email) && email) {
    emails = email?.map((item: string) => ({
      mail: item,
      isPrimary: false,
    }));
  } else {
    emails = [
      {
        mail: email,
        isPrimary: false,
      },
    ];
  }

  if (Array.isArray(phoneValue) && phoneValue) {
    phones = phoneValue?.map((item: string, index: number) => ({
      isoNumber: countryCode?.[index],
      number: item,
    }));
  } else {
    phones = [
      {
        isoNumber: countryCode?.[0],
        number: phoneValue,
      },
    ];
  }

  return {
    organisationId: organisation?.parentOrganisation ?? '',
    isParent: !organisation?.parentOrganisation,
    name: organisation?.name,
    companyName: organisation?.companyName,
    category: organisation?.category,
    companyRegNo: organisation?.companyRegNo,
    description: organisation?.description,
    taxRate: Number.parseFloat((organisation?.taxRate || 0).toString()),
    currencyId: 1, // Will implement after BE done about get list API
    timezoneId: 1, // Will implement after BE done about get list API
    categoryId: 1, // Will implement after BE done about get list API
    subCategoryId: 1, // Will implement after BE done about get list API
    addresses,
    emails,
    phones,
  };
};

export default formatOrganisationForm;
