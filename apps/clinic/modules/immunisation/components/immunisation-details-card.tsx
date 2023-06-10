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
import LogoNEHR from 'share-components/assets/logo/logo-NEHR.png';
import Image from 'next/image';
import { Immunisation } from './immunisation-types';
import { IMMUNISATION_STATUS_COLOR, IMMUNISATION_STATUS_TEXT } from '../constants';

interface ImmunisationCardProps {
  immunisation: Immunisation;
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

const CardTitle = styled(Box)(({ theme }) => ({
  padding: '24px 32px',
  borderBottom: '1px solid',
  borderBottomColor: theme.palette.divider,
  display: 'flex',
  justifyContent: 'space-between',
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: 18,
  fontWeight: 600,
  color: theme.palette.black.main,
}));

const SubTitle = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  fontWeight: 500,
  color: theme.palette.neutral?.[500],
}));

const Row: FC<RowProps> = ({ label, content }) => (
  <Stack direction="row" spacing={2} py={2} borderBottom={1} borderColor="divider">
    <Typography flex="0 0 50%" color="neutral.500" fontSize={14}>
      {label}
    </Typography>
    {content}
  </Stack>
);

const Status = styled(Chip)({
  marginLeft: 'auto',
});

const ImmunisationDetailsCard: FC<ImmunisationCardProps> = ({ immunisation }) => {
  const router = useRouter();
  const { patientUUID } = router.query;

  return (
    <StyledCard>
      <CardTitle>
        <Box>
          <Title>{immunisation.name || ''}</Title>
          <SubTitle>
            {immunisation.batchNo} · {immunisation.manufacturer}
          </SubTitle>
        </Box>
        <Box sx={{ marginLeft: '20px', textAlign: 'right' }}>
          <Status
            size="small"
            label={IMMUNISATION_STATUS_TEXT[immunisation.status]}
            color={IMMUNISATION_STATUS_COLOR[immunisation.status]}
          />
          {
            // TODO: conditional rendering based on reponse data.
            <Box sx={{ display: 'flex', marginTop: '8px' }}>
              <Typography variant="caption" sx={{ marginRight: '6px', whiteSpace: 'nowrap' }}>
                Submitted to
              </Typography>
              <Image src={LogoNEHR.src} width={33} height={19} alt="Submitted to NEHR" />
            </Box>
          }
        </Box>
      </CardTitle>
      <Box px={4}>
        <Row
          label="Dose"
          content={
            <Typography color="black.main" fontSize={14}>
              {immunisation.doseQuantity} mg
            </Typography>
          }
        />
        <Row
          label="Site"
          content={
            <Typography color="black.main" fontSize={14}>
              {immunisation.site}
            </Typography>
          }
        />
        <Row
          label="Route"
          content={
            <Typography color="black.main" fontSize={14}>
              {immunisation.route}
            </Typography>
          }
        />
        <Row
          label="Given by"
          content={
            <Stack>
              <Typography fontSize={14} color="primary.main">
                {immunisation.administeredBy}
              </Typography>
              <Typography fontSize={14} color="neutral.500">
                {formatDate(immunisation.dateOfAdministration)}
              </Typography>
            </Stack>
          }
        />
        <Row
          label="Ordered by"
          content={
            <Stack>
              <Typography fontSize={14} color="primary.main">
                {immunisation.requestedBy}
              </Typography>
              <Typography fontSize={14} color="neutral.500">
                {immunisation.createdAt && formatDate(immunisation.createdAt, 'dd MMM yyyy')}
              </Typography>
            </Stack>
          }
        />
        <Row
          label="Expiry Date"
          content={
            <Typography color="black.main">
              {immunisation.expiryDate && formatDate(immunisation.expiryDate, 'dd MMM yyyy')}
            </Typography>
          }
        />
        <Row label="Comment" content={<Typography color="black.main">{immunisation.notes || '-'}</Typography>} />
      </Box>
      <Box textAlign="right" px={4} pb={4} pt={3}>
        <Link href={PAGE_URLS.PATIENT_IMMUNISATION_EDIT(patientUUID?.toString() || '', immunisation.id)} scroll={false}>
          <Button variant="outlined" sx={{ fontSize: 16, borderColor: 'primary.main' }}>
            Edit
          </Button>
        </Link>
      </Box>
    </StyledCard>
  );
};

export default ImmunisationDetailsCard;
