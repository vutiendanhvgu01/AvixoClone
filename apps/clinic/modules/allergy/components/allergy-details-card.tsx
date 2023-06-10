import React, { FC, ReactNode } from 'react';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { formatDate } from 'share-components/src/utils/formatUtils';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { Stack, Box } from '@mui/material';
import Chip from '@mui/material/Chip';
import Link from 'next/link';
import { PAGE_URLS } from 'share-components/src/constants';
import { useRouter } from 'next/router';
import Logo from 'share-components/assets/logo/logo-NEHR.png';
import Image from 'next/image';
import {
  ALLERGY_INFORMATION_SOURCE,
  ALLERGY_SUB_TYPE,
  ALLERGY_TYPE,
  CRITICALITY_COLOR,
  SEVERITY_COLOR,
} from '../constants';
import { Allergy } from './allergy-types';

interface AllergyDetailsCardProps {
  allergy: Allergy;
}

interface RowProps {
  label: string;
  content: ReactNode;
}

const StyledCard = styled(Card)({
  borderRadius: '12px',
  width: '100%',
  background: '#FBFBFB',
  display: 'inline-block',
});

const CardTitle = styled(Box)(() => ({
  padding: '24px 32px',
}));

const Drug = styled(Typography)(({ theme }) => ({
  fontSize: 18,
  fontWeight: 600,
  color: theme.palette.black.main,
}));

const Type = styled(Typography)(({ theme }) => ({
  fontSize: 12,
  fontWeight: 600,
  textTransform: 'uppercase',
  color: theme.palette.error.main,
}));

const Row: FC<RowProps> = ({ label, content }) => (
  <Stack direction="row" spacing={2} py={2}>
    <Typography flex="0 0 50%" color="neutral.500" fontSize={14}>
      {label}
    </Typography>
    {content}
  </Stack>
);

const Content = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  fontWeight: 500,
  color: theme.palette.black.main,
  textTransform: 'capitalize',
}));

const Severity = styled(Chip)(({ theme }) => ({
  marginLeft: 'auto',
  '&.MuiChip-colorDefault': {
    color: theme.palette.black.main,
  },
}));

const AllergyDetailsCard: FC<AllergyDetailsCardProps> = ({ allergy }) => {
  const router = useRouter();
  const patientUUID = router.query.patientUUID?.toString() || '';
  const fromPractitioner = allergy.informationSource === 'practitioner';

  return (
    <StyledCard>
      <CardTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Type>{ALLERGY_TYPE[allergy.type]}</Type>
          {!fromPractitioner && (
            <Typography variant="overline">{ALLERGY_INFORMATION_SOURCE[allergy.informationSource]}</Typography>
          )}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Drug>{allergy.name}</Drug>
          {fromPractitioner && (
            <Box sx={{ textAlign: 'right', marginLeft: '20px' }}>
              <Severity size="small" label={allergy.severity} color={SEVERITY_COLOR[allergy.severity]} />
              <Box sx={{ display: 'flex', marginTop: '8px' }}>
                <Typography variant="caption" sx={{ marginRight: '6px', whiteSpace: 'nowrap' }}>
                  Submitted to
                </Typography>
                <Image src={Logo.src} width={33} height={19} alt="Submitted to NEHR" />
              </Box>
            </Box>
          )}
        </Box>
      </CardTitle>
      <Box px={4}>
        {!fromPractitioner && (
          <>
            <Row label="Sub Type" content={<Content>{ALLERGY_SUB_TYPE[allergy.subType]}</Content>} />
            <Row
              label="First Occurred"
              content={<Content>{formatDate(allergy.validFrom, 'dd MMM yyyy') || '-'}</Content>}
            />
            <Row label="Created by" content={<Content>{allergy.practitionerName || '-'}</Content>} />
          </>
        )}
        {fromPractitioner && (
          <>
            <Row label="Clinical Status" content={<Content>{allergy.clinicalStatus}</Content>} />
            <Row
              label="Risk of Harm"
              content={
                <Content sx={{ color: `${CRITICALITY_COLOR[allergy.criticality]}.main` }}>
                  {allergy.criticality}
                </Content>
              }
            />
            <Row label="Manifestation" content={<Content>{allergy.manifestationSctName || '-'}</Content>} />
            <Row label="Description of Event" content={<Content>{allergy.remarks || '-'}</Content>} />
            <Row label="Route of Exposure" content={<Content>{allergy.exposureRouteSctName || '-'}</Content>} />
            <Row
              label="Last Occurred"
              content={<Content>{formatDate(allergy.lastOccurrence, 'dd MMM yyyy')}</Content>}
            />
            <Row label="Verification Status" content={<Content>{allergy.verificationStatus}</Content>} />
            <Row
              label="Reported by"
              content={
                <Box>
                  <Content>{allergy.practitionerName || '-'}</Content>
                  <Content sx={{ color: 'neutral.500' }}>{formatDate(allergy.createdAt)}</Content>
                </Box>
              }
            />
            <Row
              label="Last Updated"
              content={<Content>{allergy.updatedAt && formatDate(allergy.updatedAt, 'dd MMM yyyy')}</Content>}
            />
          </>
        )}
      </Box>
      <Box textAlign="right" px={4} pb={4} pt={3}>
        <Link href={PAGE_URLS.PATIENT_ALLERGY_EDIT(patientUUID, allergy.id)} scroll={false}>
          <Button variant="outlined" sx={{ fontSize: 16, borderColor: 'primary.main' }}>
            Edit
          </Button>
        </Link>
      </Box>
    </StyledCard>
  );
};

export default AllergyDetailsCard;
