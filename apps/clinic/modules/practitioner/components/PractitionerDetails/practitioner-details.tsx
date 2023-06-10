import { useCallback, useState } from 'react';
import { Grid, Box, Typography, Button, IconButton } from '@mui/material';
import { AvixoCard, Edit2Icon, CollapseIcon, ExpandedIcon } from 'share-components';
import { styled } from '@mui/material/styles';
import { formatDate, capitaliseFirstCharacter } from 'share-components/src/utils/formatUtils';
import { Address } from 'share-components/src/components/AddressFill/AddressForm/address-form-type';
import dynamic from 'next/dynamic';
import {
  Email,
  Language,
  Phone,
  InformationLineProps,
  PractitionerDetailsProps,
  PractitionerInformationProps,
} from '../../types/practitioner-types';
import { PhaseType } from '../PractitionerForm/practitioner-form-types';

const PractitionerForm = dynamic(() => import('modules/practitioner/components/PractitionerForm/practitioner-form'), {
  ssr: false,
});

const InfoLine = styled(Box)({
  display: 'flex',
  paddingBottom: '16px',
});

const InfoTitle = styled(Box)({
  marginRight: 1,
  flex: '0 40%',
});

const InfoValue = styled(Box)({
  marginLeft: 1,
  flex: '1   60%',
});

const EditIcon = styled(Edit2Icon)(({ theme }) => ({
  ':hover': {
    color: theme.palette.primary.main,
    borderRadius: '100%',
  },
}));

const DATE_FORMAT = 'MMM dd, yyyy';
const MAXIMUM_FIELD_DISPLAY_ON_CARD = 10;

const PractitionerInformation: React.FC<PractitionerInformationProps> = ({ informations, title, onEdit }) => {
  const [isShowMore, setIsShowMore] = useState<boolean>(false);
  const informationLineDisplay = isShowMore ? informations : informations.slice(0, 10);

  const handleShowMore = useCallback(() => {
    setIsShowMore(!isShowMore);
  }, [isShowMore]);

  return (
    <AvixoCard
      title={title}
      action={
        <IconButton onClick={onEdit}>
          <EditIcon />
        </IconButton>
      }
      bg="#FBFBFB"
      sx={{ height: isShowMore ? 'auto' : 580, boxShadow: 1 }}
    >
      {informationLineDisplay.map((information: InformationLineProps) => (
        <InfoLine key={`${title}-${information.title}`} sx={information?.sx}>
          <InfoTitle>
            <Typography color="neutral.400" variant="caption">
              {information.title}
            </Typography>
          </InfoTitle>
          <InfoValue>
            <Typography color="neutral.900" variant="body2">
              {information.value || '-'}
            </Typography>
          </InfoValue>
        </InfoLine>
      ))}
      {informations.length > MAXIMUM_FIELD_DISPLAY_ON_CARD && (
        <Box display="flex" justifyContent="center">
          <Button variant="text" onClick={handleShowMore}>
            {isShowMore ? <ExpandedIcon /> : <CollapseIcon />}
            {isShowMore ? 'Show Less' : 'Show More'}
          </Button>
        </Box>
      )}
    </AvixoCard>
  );
};

const PractitionerDetails: React.FC<PractitionerDetailsProps> = ({
  practitioner,
  organisation,
  premise,
  roles,
  credentialId,
}) => {
  const [practitionerForm, setPractitionerForm] = useState<{ open: boolean; tab: PhaseType }>({
    open: false,
    tab: 'detail',
  });

  const handleValidity = (validFrom?: string, validTo?: string) =>
    `${validFrom ? formatDate(validFrom, DATE_FORMAT) : '-'} to ${validTo ? formatDate(validTo, DATE_FORMAT) : '-'}`;

  const renderPhoneAndEmailValue = useCallback((value = [], primaryValue = 'number') => {
    if (value?.length) {
      return value.map((item, key: number) => (
        <Box key={`${primaryValue}-${(item as Phone | Email)?.id}`} display="flex">
          <span>{item?.[primaryValue]}</span>
          {key === 0 && ( // Incase BE do not return primary field, get first value as the primary value
            <Typography component="span" color="chart.purple3" fontSize="12px" marginLeft="auto">
              Primary
            </Typography>
          )}
        </Box>
      ));
    }

    return '-';
  }, []);

  const renderAddressesValue = useCallback((value: Address[] = []) => {
    if (value?.length) {
      return value.map((item: Address, key: number) => (
        <Box key={`pratitioner-addresses-${item?.id}`} display="flex">
          <Box>
            <Typography variant="body2">{item.name}</Typography>
            <Typography variant="body2" color="neutral.500">
              {/* Dummy address structure for now */}
              {item.line1}, #{item.blockNo}-{item.unitNo}
              <br />
              {item.city} {item.country || 'Singapore'} {item.postal}
            </Typography>
          </Box>
          {key === 0 && ( // Incase BE do not return primary field, get first value as the primary value
            <Typography component="span" color="chart.purple3" fontSize="12px" marginLeft="auto">
              Primary
            </Typography>
          )}
        </Box>
      ));
    }

    return '-';
  }, []);

  const handleQualificationInformation = useCallback(() => {
    const { qualifications = [] } = practitioner;

    const result = qualifications.map(qualification => [
      {
        title: 'Type',
        value: qualification.type,
      },
      {
        title: 'Code',
        value: qualification.code,
      },
      {
        title: 'Issuer Name ',
        value: qualification.issuerName,
      },
      {
        title: 'Issuer Country',
        value: qualification.issuerCountry,
      },
      {
        title: 'Validity',
        value: handleValidity(qualification.validFrom, qualification.validTo),
        sx: {
          marginBottom: '16px',
        },
      },
    ]);

    return result.reduce((total, value) => total.concat(value), []);
  }, [practitioner]);

  const findPrimaryLanguages = useCallback(() => {
    const { languages = [] } = practitioner;
    return languages.find((language: Language) => !!language?.preferred);
  }, [practitioner]);

  const togglePractitionerForm = useCallback(
    (tab?: PhaseType) => {
      setPractitionerForm({
        open: !practitionerForm.open,
        tab: tab ?? 'detail',
      });
    },
    [practitionerForm],
  );

  return (
    <div>
      <Grid container rowSpacing={8} columnSpacing={{ xs: 1, sm: 3, md: 4 }}>
        <Grid item xs={4}>
          <PractitionerInformation
            onEdit={() => togglePractitionerForm('detail')}
            informations={[
              {
                title: 'Practitioner ID',
                value: practitioner.practitionerId,
              },
              {
                title: 'Full Name',
                value: practitioner.name,
              },
              {
                title: 'Date of Birth',
                value: formatDate(practitioner.birthDate, DATE_FORMAT),
              },
              {
                title: 'Gender',
                value: capitaliseFirstCharacter(practitioner.gender),
              },
              {
                title: 'Language',
                value: findPrimaryLanguages()?.name,
              },
              {
                title: 'Status',
                value: capitaliseFirstCharacter(practitioner.status),
              },
              {
                title: 'Validity',
                value: handleValidity(practitioner.validFrom, practitioner.validTo),
              },
              {
                title: 'Organisation',
                value: organisation?.name,
              },
              {
                title: 'Premise',
                value: premise.name,
              },
              {
                title: 'Description',
                value: practitioner.description,
              },
            ]}
            title="Practitioner Information"
          />
        </Grid>
        <Grid item xs={4}>
          <PractitionerInformation
            onEdit={() => togglePractitionerForm('contact')}
            informations={[
              {
                title: 'Phone Number',
                value: <>{renderPhoneAndEmailValue(practitioner.phones as [])}</>,
              },
              {
                title: 'Email Address',
                value: <>{renderPhoneAndEmailValue(practitioner.emails as [], 'email')}</>,
              },
              {
                title: 'Address',
                value: <>{renderAddressesValue(practitioner.addresses as [])}</>,
              },
            ]}
            title="Contact Information"
          />
        </Grid>
        <Grid item xs={4}>
          <PractitionerInformation
            onEdit={() => togglePractitionerForm('profession')}
            informations={[
              {
                title: 'Name',
                value: practitioner?.profession?.name,
              },
              {
                title: 'Category',
                value: capitaliseFirstCharacter(practitioner?.profession?.category),
              },
              {
                title: 'Type',
                value: practitioner?.profession?.type,
              },
              {
                title: 'Code',
                value: practitioner?.profession?.code,
              },
              {
                title: 'Validity',
                value: handleValidity(practitioner?.profession?.validFrom, practitioner?.profession?.validTo),
              },
            ]}
            title="Profession"
          />
        </Grid>
        <Grid item xs={4}>
          <PractitionerInformation
            onEdit={() => togglePractitionerForm('qualification')}
            informations={handleQualificationInformation()}
            title="Qualification"
          />
        </Grid>
        <Grid item xs={4}>
          <PractitionerInformation
            onEdit={() => togglePractitionerForm('role')}
            informations={[
              {
                title: 'Role',
                value: roles?.[0]?.name,
              },
            ]}
            title="Role Configuration"
          />
        </Grid>
      </Grid>
      {practitionerForm.open && (
        <PractitionerForm
          onCancel={togglePractitionerForm}
          open={practitionerForm.open}
          tab={practitionerForm.tab}
          initData={{ ...practitioner, roleId: roles?.[0]?.id, credentialId }}
        />
      )}
    </div>
  );
};

export default PractitionerDetails;
