import getPatientContacts from 'modules/patient/utils/getPhone';

describe('getPatientContacts', () => {
  const phones = [
    {
      ext: 65,
      number: 89898989,
      _id: '6423e51b2f2ac0f21045441a',
    },
    {
      ext: 65,
      number: 88888888,
      _id: '6423e51b2f2ac0f21045441b',
    },
  ];

  it('should return patient contacts', () => {
    const contacts = getPatientContacts(phones);

    expect(contacts.contact).toEqual('+65 89898989');
    expect(contacts.alternativeContact).toEqual('+65 88888888');
  });

  it('should return empty alternative contact', () => {
    const contacts = getPatientContacts([phones[0]]);

    expect(contacts.contact).toEqual('+65 89898989');
    expect(contacts.alternativeContact).toEqual('');
  });

  it('should return empty contacts', () => {
    const contacts = getPatientContacts([]);

    expect(contacts.contact).toEqual('');
    expect(contacts.alternativeContact).toEqual('');
  });
});
