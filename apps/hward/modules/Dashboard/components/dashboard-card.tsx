import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import useIsMobile from 'common/hooks/useIsMobile';

interface DashboardCardProps {
  title: string;
  subtitle?: string;
  Icon: React.FC;
  amount?: number;
}

const CardContainer = styled(Box)(({ theme }) => ({
  minWidth: '23vw',
  height: 166,
  backgroundColor: 'white',
  borderRadius: 16,
  paddingLeft: 24,
  paddingRight: 24,
  paddingTop: 16,
  paddingBottom: 16,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  [theme.breakpoints.down('md')]: {
    minWidth: 200,
    height: 133,
    marginRight: 16,
  },
}));

const DashboardCard: React.FC<DashboardCardProps> = ({ title, subtitle, amount, Icon }) => {
  const isMobile = useIsMobile();
  return (
    <CardContainer>
      <Box>
        <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
          <Typography variant={isMobile ? 'subtitle2' : 'h6'} color="black.main">
            {title}
          </Typography>
          <Icon />
        </Box>
        {subtitle && (
          <Typography variant={isMobile ? 'caption' : 'subtitle2'} color="#6B7280">
            {subtitle}
          </Typography>
        )}
      </Box>
      <Typography variant={isMobile ? 'h5' : 'h3'} color="black.main">
        {amount ?? '-'}
      </Typography>
    </CardContainer>
  );
};

export default DashboardCard;
