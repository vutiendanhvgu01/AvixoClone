import Grid from '@mui/material/Grid';
import dynamic from 'next/dynamic';
import { useCallback, useState } from 'react';
import { Typography } from '@mui/material';
import { Holiday } from '@ShareComponents/HolidaySection/HolidayForm/holiday-form-type';
import { formatDate, formatTime } from 'share-components/src/utils/formatUtils';
import { Organisation } from 'modules/organisation/components/organisation-types';
import Information from '../../../common/components/InformationCard/information-card';
import Premise from './premise-types';
import { TABS } from '../constants';

const PremiseForm = dynamic(() => import('modules/premise/components/premise-form'), {
  ssr: false,
});

interface PremiseDetailsProps {
  premise: Premise;
  parentOrganisation?: Organisation;
}

const PremiseDetails: React.FC<PremiseDetailsProps> = ({ premise, parentOrganisation }) => {
  const [premiseForm, setPremiseForm] = useState<{ open: boolean; tab?: number }>({
    tab: TABS.DETAIL,
    open: false,
  });
  const togglePremiseForm = useCallback(
    (tab?: number) => {
      setPremiseForm({ open: !premiseForm.open, tab });
    },
    [premiseForm],
  );
  const contactInformations = [];
  if (premise?.phones?.length) {
    premise.phones.forEach(phone => {
      contactInformations.push({
        title: 'Phone Number',
        value: (
          <>
            <span>{phone.isoNumber}</span>
            {phone.type === 'main' && (
              <>
                <br />
                <Typography color="chart.blue5" variant="subtitle2">
                  Primary
                </Typography>
              </>
            )}
          </>
        ),
      });
    });
  } else {
    contactInformations.push({
      title: 'Phone Number',
      value: '',
    });
  }

  if (premise?.emails?.length > 0) {
    premise.emails.forEach(email => {
      contactInformations.push({
        title: 'Email Adress',
        value: (
          <>
            <span>{email.email}</span>
            {email.type === 'main' && (
              <>
                <br />
                <Typography color="chart.blue5" variant="subtitle2">
                  Primary
                </Typography>
              </>
            )}
          </>
        ),
      });
    });
  } else {
    contactInformations.push({
      title: 'Email Adress',
      value: '',
    });
  }

  if (premise?.addresses?.length > 0) {
    premise.addresses.forEach(address => {
      contactInformations.push({
        title: 'Address',
        value: (
          <>
            <span>{address.text}</span>
            {address.purpose === 'main' && (
              <>
                <br />
                <Typography color="chart.blue5" variant="subtitle2">
                  Primary
                </Typography>
              </>
            )}
          </>
        ),
      });
    });
  } else {
    contactInformations.push({
      title: 'Address',
      value: '',
    });
  }

  const holidayInformations = [];
  if (premise?.holidays?.length) {
    premise?.holidays?.forEach((holiday: Holiday, index: number) => {
      holidayInformations.push(
        {
          title: `Holiday #${index + 1}`,
          value: '',
        },
        {
          title: 'Name',
          value: holiday?.name,
        },
        {
          title: 'Date',
          value: formatDate(holiday?.date, 'MMM dd, yyyy'),
        },
        {
          title: 'Day of Week',
          value: holiday?.timeslots?.length ? holiday?.timeslots[0]?.dayOfWeek : '',
        },
        {
          title: 'Slot Type',
          value: holiday?.timeslots?.length ? holiday?.timeslots[0]?.type : '',
        },
        {
          title: 'Slot Time',
          value: holiday?.timeslots?.length
            ? `${formatTime(holiday?.timeslots[0]?.from ?? '')}-${formatTime(holiday?.timeslots[0]?.to ?? '')}`
            : '-',
        },
        {
          title: 'Description',
          value: holiday?.description,
        },
      );
    });
  } else {
    holidayInformations.push({
      title: `No available holidays`,
      value: '',
    });
  }

  return (
    <>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={4}>
          <Information
            informations={[
              {
                title: 'Name',
                value: premise.name,
              },
              {
                title: 'Alias',
                value: premise.alias,
              },
              {
                title: 'Parent Organisation',
                value: parentOrganisation?.name,
              },
              {
                title: 'Type',
                value: premise.typeCode,
              },
              {
                title: 'Company Name',
                value: premise.companyName,
              },
              {
                title: 'Company Registration No.',
                value: premise.companyRegNo,
              },
              {
                title: 'Part of Premise',
                value: premise.partOfPremise,
              },
              {
                title: 'Mode',
                value: premise.mode,
              },
              {
                title: 'HCI Code',
                value: premise.hciCode,
              },
              {
                title: 'Hospital Code',
                value: premise.heCode,
              },
              {
                title: 'Type Code',
                value: premise.typeCode,
              },
              {
                title: 'Type Name',
                value: premise.typeName,
              },
              {
                title: 'NRIC Code',
                value: premise.nirCode,
              },
              {
                title: 'Form',
                value: premise.form,
              },
              {
                title: 'License From',
                value: formatDate(premise.validFrom),
              },
              {
                title: 'License To',
                value: formatDate(premise.validTo),
              },
              {
                title: 'Operational Status',
                value: premise.operationalStatus,
              },
              {
                title: 'Status',
                value: premise.status,
              },
              {
                title: 'Descriptions',
                value: premise.description,
              },
            ]}
            title="Premise Information"
            onEdit={() => togglePremiseForm(TABS.DETAIL)}
          />
        </Grid>
        <Grid item xs={4}>
          <Information
            informations={contactInformations}
            title="Contact Information"
            onEdit={() => togglePremiseForm(TABS.CONTACT)}
          />
        </Grid>
        <Grid item xs={4}>
          <Information
            informations={[
              {
                title: 'GST',
                value: '',
              },
              {
                title: 'Amount',
                value: '',
              },
              {
                title: 'Currency',
                value: `${premise?.currency?.name} (${premise?.currency?.code}${premise?.currency?.symbol})`,
              },
            ]}
            title="Finance Information"
            onEdit={() => togglePremiseForm(TABS.FINANCE)}
          />
        </Grid>
        <Grid item xs={4}>
          <Information
            informations={[
              {
                title: 'Name',
                value: premise?.timezone?.name,
              },
              {
                title: 'Code',
                value: premise?.timezone?.code,
              },
              {
                title: 'Offset',
                value: premise?.timezone?.offset,
              },
            ]}
            title="Timezone"
            onEdit={() => togglePremiseForm(TABS.TIMEZONE)}
          />
        </Grid>
        <Grid item xs={4}>
          <Information
            informations={[
              {
                title: 'Day of Week',
                value: premise?.timeslots && premise?.timeslots?.length > 0 ? premise?.timeslots[0]?.dayOfWeek : '-',
              },
              {
                title: 'Slot Type',
                value: premise?.timeslots && premise?.timeslots?.length > 0 ? premise?.timeslots[0]?.type : '-',
              },
              {
                title: 'Slot Time',
                value:
                  premise?.timeslots && premise?.timeslots?.length > 0
                    ? `${formatTime(premise?.timeslots[0]?.from ?? '')}-${formatTime(premise?.timeslots[0]?.to ?? '')}`
                    : '',
              },
            ]}
            title="Timeslot"
            onEdit={() => togglePremiseForm(TABS.TIMESLOT)}
          />
        </Grid>
        <Grid item xs={4}>
          <Information
            informations={holidayInformations}
            title="Holiday"
            onEdit={() => togglePremiseForm(TABS.HOLIDAY)}
          />
        </Grid>
      </Grid>
      <PremiseForm initData={premise} open={premiseForm.open} tab={premiseForm.tab} onCancel={togglePremiseForm} />
    </>
  );
};

export default PremiseDetails;
