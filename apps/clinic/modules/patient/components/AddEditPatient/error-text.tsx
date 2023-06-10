import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const ErrorText = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
  paddingLeft: 15,
  fontWeight: 400,
  fontSize: 12,
}));

const ErrorTypography = ({ children }: { children: any }) => <ErrorText>{children}</ErrorText>;

export default ErrorTypography;
