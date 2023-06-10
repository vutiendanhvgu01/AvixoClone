import { Grid } from '@mui/material';
import Information from 'common/components/InformationCard/information-card';
import { ORGANISATION_DETAILS } from 'modules/organisation/constants';
import { useCallback, useState } from 'react';
import { toTitleCase } from 'share-components/src/utils/stringUtils';
import OrganisationForm from '../organisation-form';
import { Organisation, OrganisationFormValues } from '../organisation-types';

interface OrganisationDetailsProps {
  organisation: Organisation;
}

const OrganisationDetails: React.FC<OrganisationDetailsProps> = ({ organisation }) => {
  const [organisationForm, setOrganisationForm] = useState<{
    open: boolean;
    step: number;
  }>({ open: false, step: 0 });

  const { currency } = organisation;

  const toggleOrganisationForm = useCallback(
    (step: number) => {
      setOrganisationForm({ open: !organisationForm.open, step });
    },
    [organisationForm],
  );

  return (
    <>
      <Grid container spacing={4}>
        <Grid item sm={12} md={6} lg={4}>
          <Information
            title="Organisation Information"
            onEdit={() => toggleOrganisationForm(ORGANISATION_DETAILS.ORGANISATION_INFOMATION)}
            informations={[
              {
                title: 'Name',
                value: organisation.name,
              },
              {
                title: 'Company Name',
                value: organisation.companyName,
              },
              {
                title: 'Company Registration No.',
                value: organisation.companyRegNo,
              },
              {
                title: 'Code Name',
                value: organisation.code,
              },
              {
                title: 'Category',
                value: organisation.category?.name,
              },
              {
                title: 'Sub Category',
                value: organisation.subCategory?.name,
              },
              {
                title: 'License Validity',
                value: '-',
              },
              {
                title: 'Part of Organisation',
                value: '-',
              },
              {
                title: 'Status',
                value: toTitleCase(organisation.status),
              },
              {
                title: 'Descriptions',
                value: organisation.description,
              },
            ]}
          />
        </Grid>
        <Grid item sm={12} md={6} lg={4}>
          <Information
            title="Contact Information"
            onEdit={() => toggleOrganisationForm(ORGANISATION_DETAILS.CONTACT_INFOMATION)}
            informations={[
              {
                title: 'Phone Number',
                value: '-',
              },
              {
                title: 'Email Address',
                value: '-',
              },
              {
                title: 'Address',
                value: '-',
              },
            ]}
          />
        </Grid>
        <Grid item sm={12} md={6} lg={4}>
          <Information
            title="Finance Information"
            informations={[
              {
                title: 'GST',
                value: organisation.taxRate ? `${organisation.taxRate} %` : '-',
              },
              {
                title: 'Amount',
                value: '-',
              },
              {
                title: 'Currency',
                value: currency ? `${currency.name} (${currency.code}${currency.symbol})` : '-',
              },
            ]}
            onEdit={() => toggleOrganisationForm(ORGANISATION_DETAILS.FINANCE_INFOMATION)}
          />
        </Grid>
        <Grid item sm={12} md={6} lg={4}>
          <Information
            title="Timezone"
            onEdit={() => toggleOrganisationForm(ORGANISATION_DETAILS.TIMEZONE)}
            informations={[
              {
                title: 'Timezone',
                value: organisation.timezone?.name,
              },
              {
                title: 'Code',
                value: organisation.timezone?.code,
              },
              {
                title: 'Offset',
                value: organisation.timezone?.offset,
              },
            ]}
          />
        </Grid>
        <Grid item sm={12} md={6} lg={4}>
          <Information
            title="Qualification"
            onEdit={() => toggleOrganisationForm(ORGANISATION_DETAILS.QUALIFICATION)}
            informations={[
              {
                title: 'Type',
                value: '-',
              },
              {
                title: 'Code',
                value: '-',
              },
              {
                title: 'Issuer Name',
                value: '-',
              },
              {
                title: 'Issuer Type',
                value: '-',
              },
              {
                title: 'Issuer Country',
                value: '-',
              },
              {
                title: 'Validity',
                value: '-',
              },
            ]}
          />
        </Grid>
      </Grid>
      <OrganisationForm
        // Need convert organisation obj to organisationFormValue obj once do the API Integration
        initData={organisation as unknown as OrganisationFormValues}
        step={organisationForm.step}
        open={organisationForm.open}
        onCancel={() => toggleOrganisationForm(0)}
      />
    </>
  );
};

export default OrganisationDetails;
