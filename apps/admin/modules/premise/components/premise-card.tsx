import React from 'react';
import { CardContent, Typography, Box, CardHeader, Avatar } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { AvixoCard } from 'share-components';
import { getFirstLetters } from 'share-components/src/utils/stringUtils';
import Link from 'next/link';
import { PAGE_URLS } from 'share-components/src/constants';
import Premise from './premise-types';

const Address = styled(Box)(() => ({
  fontWeight: 500,
  fontSize: 14,
  lineHeight: '22px',
}));

interface PremiseCardProps {
  premise: Premise;
}

const PremiseInstantCard: React.FC<PremiseCardProps> = ({ premise }) => {
  const theme = useTheme();

  return (
    <AvixoCard
      bg={theme.palette.card?.main}
      sx={{
        padding: 0,
        minHeight: 'auto',
      }}
      headerComponent={
        <CardHeader
          sx={{ mb: 1 }}
          avatar={
            <Avatar alt={premise.name} src={premise.logo}>
              {getFirstLetters(premise.name)}
            </Avatar>
          }
          action={
            <Link href="/">
              <Typography variant="caption" color="black.main">
                Editor Access
              </Typography>
            </Link>
          }
        />
      }
    >
      <CardContent>
        <Box sx={{ mb: 1 }}>
          <Typography variant="h6" color="primary">
            <Link href={PAGE_URLS.PREMISE_DETAILS(premise.parentOrganisationID, premise.id)}>{premise.name}</Link>
          </Typography>
          <Typography variant="caption">ID: {premise.id}</Typography>
        </Box>
        <Address dangerouslySetInnerHTML={{ __html: '' }} />
      </CardContent>
    </AvixoCard>
  );
};

export default PremiseInstantCard;
