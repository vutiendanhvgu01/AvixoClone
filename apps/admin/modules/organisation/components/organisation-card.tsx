import { Avatar, CardContent, Typography, CardActions, CardHeader, Chip, Box } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import Link from 'next/link';
import { AvixoCard } from 'share-components';
import { PAGE_URLS } from 'share-components/src/constants';
import { getFirstLetters } from 'share-components/src/utils/stringUtils';
import { ORGANISATION_STATUS_COLOR } from '../constants';
import type { OrganisationCardProps } from './organisation-types';

const Status = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.neutral?.[100],
}));

const Info = styled(Typography)(({ theme }) => ({
  backgroundColor: theme.palette.neutral?.[100],
  borderRadius: 100,
  padding: '4px 8px',
}));

const Address = styled(Box)(() => ({
  fontWeight: 500,
  fontSize: 14,
  lineHeight: '22px',
}));

const OrganisationCard: React.FC<OrganisationCardProps> = ({ organisation }) => {
  const theme = useTheme();
  const { name, status, currency, id, taxRate, logo, companyName, companyRegNo, description } = organisation;

  // const onDeleteBtnClick = useCallback(() => {
  //   router.push({
  //     pathname: router.pathname,
  //     query: {
  //       ...router.query,
  //       organisationId: id,
  //       action: 'delete-organisation',
  //     },
  //   });
  // }, [router, id]);

  return (
    <AvixoCard
      bg={theme.palette.card?.main}
      sx={{
        padding: 0,
        minHeight: 'auto',
      }}
      fullHeight
      headerComponent={
        <CardHeader
          avatar={
            <Avatar alt={name} src={logo} sx={{ bgcolor: '#BB2795' }}>
              {getFirstLetters(name)}
            </Avatar>
          }
          action={
            <>
              <Typography variant="caption" color="black.main" sx={{ mr: 1.5 }}>
                Editor Access
              </Typography>
              <Status
                size="small"
                label={status}
                sx={{
                  color: theme.palette[ORGANISATION_STATUS_COLOR[status]]?.main,
                }}
              />
            </>
          }
        />
      }
    >
      <CardContent data-cy="organisation-card">
        <Box>
          <Link href={PAGE_URLS.ORGANISATION_DETAILS(id)}>
            <Typography variant="h6" color="primary">
              {name}
            </Typography>
          </Link>
          <Typography variant="caption" sx={{ mb: 2.5 }} component="p">
            ID: {companyRegNo} · {companyName}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2.5 }}>
            {description}
          </Typography>
        </Box>
        <Address dangerouslySetInnerHTML={{ __html: '' }} />
      </CardContent>
      <CardActions disableSpacing>
        <Info variant="body2">
          {currency?.symbol}({currency?.code}) · {taxRate}% Tax
        </Info>
        {/* <IconButton aria-label="delete" onClick={onDeleteBtnClick} sx={{ marginLeft: 'auto' }}>
          <TrashIcon />
        </IconButton> */}
      </CardActions>
    </AvixoCard>
  );
};

export default OrganisationCard;
