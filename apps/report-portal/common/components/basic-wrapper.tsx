import { Box, styled, SxProps } from '@mui/material';

const WhiteContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#fff',
  borderRadius: 10,
  padding: 32,
  width: '594px',
  border: '1px solid rgba(55, 65, 81, 0.12)',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    marginRight: 24,
    marginLeft: 24,
    padding: 24,
  },
}));

const BasicWrapper = ({
  children,
  containerStyle = {},
}: {
  children: React.ReactElement | React.ReactElement[];
  containerStyle?: SxProps;
}) => (
  <Box
    component="div"
    sx={{
      height: '100vh',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <WhiteContainer sx={containerStyle}>{children}</WhiteContainer>
  </Box>
);

export default BasicWrapper;
