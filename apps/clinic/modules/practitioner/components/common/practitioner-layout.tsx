import { Box, styled, Avatar, Typography, Paper } from '@mui/material';
import { ReactNode } from 'react';
import type { CommonStatus } from 'modules/practitioner/types/practitioner-types';

const Photo = styled(Avatar)(({ theme }) => ({
  width: 80,
  height: 80,
  border: `2px solid ${theme.palette.primary.contrastText}`,
  marginRight: 16,
}));

const Layout = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'flex-end',
  width: '100%',
  paddingBottom: 24,
  justifyContent: 'space-between',
}));

const Info = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
}));

export interface PractitionerLayoutProps {
  children?: ReactNode;
  title: string;
  subTitle?: string;
  image?: string;
  actionButtons?: ReactNode;
  isDetailPage?: boolean;
  organisationStatus?: CommonStatus;
  premiseStatus?: CommonStatus;
  practitionerStatus?: CommonStatus;
}

const PractitionerLayout: React.FC<PractitionerLayoutProps> = ({
  children,
  image,
  title,
  subTitle,
  organisationStatus,
  premiseStatus,
  practitionerStatus,
}) => (
  <>
    <Layout>
      <Info>
        <Photo src={image} alt={title} />
        <Box>
          <Typography variant="h5" color="white" sx={{ mb: 0.5 }} data-cy="organisation-title">
            {title}
          </Typography>
          {subTitle ? (
            <Typography variant="subtitle1" color="white" sx={{ opacity: 0.5 }} data-cy="organisation-sub-title">
              {subTitle}
            </Typography>
          ) : null}
        </Box>
      </Info>
    </Layout>
    <Paper sx={{ pb: 4 }}>{children}</Paper>
  </>
);
export default PractitionerLayout;
