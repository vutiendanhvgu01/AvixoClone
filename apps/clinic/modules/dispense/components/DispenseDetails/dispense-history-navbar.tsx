import { Box, Button, styled, Typography } from '@mui/material';
import { TopBoxLayout } from 'pages/_app';
import { HamburgerIcon, BackIcon } from 'share-components';

interface HistoryNavBarProps {
  checkedDate?: string;
}

const TransparentButton = styled(Button)(() => ({
  background: 'transparent',
  marginLeft: '16px',
  border: '1px solid white',
  '&:hover': {
    background: 'transparent',
    boxShadow: 'none',
  },
  '>.MuiButton-startIcon': {
    marginTop: '1px',
  },
  boxShadow: 'none',
}));

const HistoryDetailBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-end',
  marginTop: -10,
}));

const HistoryButtonBox = styled(Box)(() => ({
  width: '50%',
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
}));

const HistoryGlobalBox = styled(Box)(({ theme }) => ({
  background: theme.palette.chart?.blue4,
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  padding: '16px 32px',
  display: 'flex',
  flexDirection: 'row',
}));

const HistoryNavBar: React.FC<HistoryNavBarProps> & TopBoxLayout = () => (
  <HistoryGlobalBox>
    <Box
      sx={{
        width: '50%',
      }}
    >
      <Typography variant="overline" color="white" sx={{ opacity: 0.6 }}>
        History
      </Typography>
      <HistoryDetailBox>
        <Typography variant="body1" color="white">
          You are currently viewing the edit of:&nbsp;
        </Typography>
        <Typography variant="h6" color="white">
          20/01/23 at 10:47
        </Typography>
      </HistoryDetailBox>
    </Box>
    <HistoryButtonBox>
      <Box>
        <TransparentButton size="small" startIcon={<HamburgerIcon />}>
          Select Other Session
        </TransparentButton>
        <TransparentButton size="small" startIcon={<BackIcon />}>
          Back to Current Session
        </TransparentButton>
      </Box>
    </HistoryButtonBox>
  </HistoryGlobalBox>
);

export default HistoryNavBar;
