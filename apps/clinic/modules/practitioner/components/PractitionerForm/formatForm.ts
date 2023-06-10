import { Address } from 'share-components/src/components/AddressFill/AddressForm/address-form-type';
import { Email, Phone, PractitionerFormPostValues } from '../../types/practitioner-types';

// eslint-disable-next-line import/prefer-default-export
export const formatAddPractitioner = (body: PractitionerFormPostValues) => {
  const formattedBody = JSON.parse(body?.practitionerBody ?? '');
  const { addresses, emails, phoneNumbers } = formattedBody ?? {};

  return {
    ...body,
    practitionerRoleId: formattedBody.roleId,
    practitionerCredentialId: formattedBody?.credentialId,
    id: formattedBody?.id,
    profession: {
      ...body.profession,
      isPrimary: body?.profession?.isPrimary.toString() === 'true',
    },
    languages: [
      {
        id: Number(body.language),
      },
    ],
    emails: emails.map((email: Email) => ({
      email: email?.email || email,
      preferred: !!email?.isPrimary,
    })),
    phones: phoneNumbers.map((phone: Phone) => ({
      name: phone?.phoneValue,
      isoCode: phone?.countryCode,
      preferred: phone?.isPrimary,
    })),
    addresses: addresses.map((address: Address) => ({
      preferred: address?.isPrimary,
      floorNo: '', // It wil be handle later when BE have done
      ...address,
    })),
    practitionerOrganisations: [
      {
        organisationId: parseInt(body?.organisation ?? '', 10),
      },
    ],
    practitionerPremises: [
      {
        premiseId: parseInt(body?.premise ?? '', 10),
      },
    ],
    qualifications: body.qualifications?.map((qualification, index: number) => ({
      ...qualification,
      isPrimary: body?.qualificationPrimaryPosition === index,
    })),
  };
};
