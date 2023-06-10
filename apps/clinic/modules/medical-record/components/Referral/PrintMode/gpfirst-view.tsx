import { Checkbox, FormControl, FormControlLabel, List, ListItem, ListItemText, Typography } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';
import ReferralInternalBox from '../common/referral-internal-box';
import { renderComponents } from './routine-view';
import MedicalSectionCard from '../../common/medical-section-card';

const OrderedListItem = styled(ListItem)(() => ({
  display: 'list-item',
  padding: 0,
  '& span': {
    fontSize: '14px',
    fontWeight: 400,
  },
}));

const patientInformation = [
  {
    title: 'Full Name',
    content: 'Patient Zero One',
  },
  {
    title: 'NRIC',
    content: 'S6500001B',
  },
  {
    title: 'Gender',
    content: 'Male',
  },
  {
    title: 'Contact Number',
    content: '90000000',
  },
  {
    title: 'Medical History',
    content: 'No prior injury',
  },
  {
    title: 'Drug Allergies',
    content: 'Paracetamol',
  },
];

const clinicianInformation = [
  {
    title: 'Name',
    content: 'Doctor Joan Ng',
  },
  {
    title: 'MCR',
    content: 'M00000F',
  },
  {
    title: 'Clinic Name',
    content: 'Medical Centre Zero',
  },
  {
    title: 'Clinic Address',
    content: 'Clementi Ave 0, #00-00 Block 000, Singapore 120000',
  },
  {
    title: 'Clinic Type',
    content: 'CHAS',
  },
  {
    title: 'GP Charge / Bill Size',
    content: '$80',
  },
];

const referralInformation = {
  content: [
    {
      title: 'Referral Date & Time',
      content: '20 Jan 2023 at 13:00 AM',
    },
    {
      title: 'Institution Referred to',
      content: 'Changi General Hospital',
    },
    {
      title: 'Speciality/Service',
      content: 'A&E',
    },
    {
      title: 'Reasons for Referral',
      content: 'Requires specialist and urgent attention.',
    },
  ],
  footer: [
    {
      title: '',
      content: (
        <>
          <Typography sx={{ marginBottom: '16px', textTransform: 'uppercase' }} variant="subtitle2" component="h6">
            Terms & Conditions
          </Typography>
          <List component="ol" sx={{ listStyle: 'decimal', paddingLeft: '20px', marginBottom: '24px' }}>
            <OrderedListItem>
              <ListItemText>
                This GPFirst Referral Form is applicable only to the A7E / Emergency Department or Urgent Care Centre
                indicated in this form.
              </ListItemText>
            </OrderedListItem>
            <OrderedListItem>
              <ListItemText>
                The original referral form is{' '}
                <Typography component="span" sx={{ color: 'error.main' }}>
                  only valid on the day of issue, and up to 0200hrs of the following day if the referral form is issued
                  close to midnight. Patient s are advised to visit the A&E without delay.
                </Typography>
              </ListItemText>
            </OrderedListItem>
            <OrderedListItem>
              <ListItemText>
                For GPFirst Programme to be valid, the original referral form must be fully completed and produced
                together with the NRIC/passport/work pass, at the point of registration at the A&E / ED or UCC.
              </ListItemText>
            </OrderedListItem>
            <OrderedListItem>
              <ListItemText>
                Patient will pay the prevailing A&E / ED or UCC fees less S$50 if referred through GPFirst Programme.
              </ListItemText>
            </OrderedListItem>
            <OrderedListItem>
              <ListItemText>
                Specialised investigations required and/or non-standardised medication prescribed at the A&E / ED or UCC
                will be separately charged.
              </ListItemText>
            </OrderedListItem>
            <OrderedListItem>
              <ListItemText>
                The Hospitals reserve the right to change the terms and conditions of this programme, or withdraw from
                this Programme without prior notice, which shall be deemed effective immediately upon such change or
                withdrawal and such change/withdrawal shall be without liability toward participating clinic and
                patient.
              </ListItemText>
            </OrderedListItem>
          </List>
          <FormControl fullWidth>
            <FormControlLabel
              control={<Checkbox defaultChecked disabled />}
              label="As the referring doctor, I acknowledge that I have decided on the appropriate venue of A&E treatment for the patient as indicated above, and have discussed and agreed upon it with the patient."
              sx={{
                '& .MuiCheckbox-root.Mui-disabled': {
                  color: '#37415142',
                },
              }}
            />
          </FormControl>
        </>
      ),
    },
  ],
};

const GPFirstView: React.FC = () => (
  <>
    <ReferralInternalBox
      title="Patient Information"
      content={
        <MedicalSectionCard
          content={{
            components: renderComponents(patientInformation),
          }}
        />
      }
    />
    <ReferralInternalBox
      title="Clinician Information"
      content={
        <MedicalSectionCard
          content={{
            components: renderComponents(clinicianInformation),
          }}
        />
      }
    />
    <ReferralInternalBox
      title="Referral Information"
      content={
        <MedicalSectionCard
          content={{
            components: renderComponents(referralInformation.content),
          }}
          footer={{
            components: renderComponents(referralInformation.footer),
            columns: 1,
          }}
        />
      }
    />
  </>
);

export default GPFirstView;
