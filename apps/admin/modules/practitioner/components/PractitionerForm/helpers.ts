import cloneDeep from 'lodash/cloneDeep';
import { PractitionerFormValues, PhaseType } from '../../types/practitioner-form';

// eslint-disable-next-line import/prefer-default-export
export const formatPractitionerFormData = (data: PractitionerFormValues, isEdit: boolean, section: PhaseType) => {
  const practitioner = cloneDeep(data);
  const phoneNumbers = cloneDeep(practitioner.phoneNumbers);
  const { addresses, emails } = practitioner;

  delete practitioner.qualificationPrimaryPosition;
  delete practitioner.premise;
  delete practitioner.organisation;
  delete practitioner.phoneNumbers;

  const detailSectionData = {
    name: practitioner.name,
    nric: practitioner.nric,
    birthDate: practitioner.birthDate,
    gender: practitioner.gender,
    status: practitioner.status,
    description: practitioner.description,
    practitionerOrganisations: [
      {
        organisationId: data.organisation,
      },
    ],
    practitionerPremises: [
      {
        premiseId: data.premise,
      },
    ],
    languages: [
      {
        id: data.language,
      },
    ],
  };

  const contactSectionData = {
    emails: emails.map(email => ({
      email: email?.email,
      preferred: email?.isPrimary,
    })),
    phones: phoneNumbers?.length
      ? phoneNumbers.map(phone => ({
          number: phone.phoneValue,
          countryCode: phone.countryCode,
          preferred: phone.isPrimary,
        }))
      : [],
    addresses: addresses.map(address => ({
      ...address,
      preferred: address?.isPrimary,
    })),
  };

  const professionSectionData = {
    profession: {
      ...data.profession,
      preferred: Boolean(data.profession?.preferred),
    },
  };

  const qualificationSectionData = {
    qualifications: data.qualifications?.map((qualification, index: number) => ({
      ...qualification,
      preferred: data?.qualificationPrimaryPosition === index,
    })),
  };

  const roleSectionData = {
    enrole: practitioner.enrole,
  };

  if (isEdit) {
    let payload;
    switch (section) {
      case 'detail':
        payload = detailSectionData;
        break;
      case 'contact':
        payload = contactSectionData;
        break;
      case 'profession':
        payload = professionSectionData;
        break;
      case 'qualification':
        payload = qualificationSectionData;
        break;
      case 'role':
        payload = roleSectionData;
        break;
      default:
    }

    return {
      id: practitioner.id,
      ...payload,
    };
  }

  return {
    ...detailSectionData,
    ...contactSectionData,
    ...professionSectionData,
    ...qualificationSectionData,
    ...roleSectionData,
  };
};
