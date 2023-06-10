import { FormControl, Stack, Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const FormControlComponent = styled(FormControl)(() => ({
  marginBottom: '24px',
}));

export const StackTitle = styled(Typography)(() => ({
  marginBottom: '32px',
}));

export const FooterText = styled(Typography)(() => ({
  fontWeight: 500,
  fontSize: 14,
}));

export const BoxWrapper = styled(Box)(() => ({
  padding: '20px 32px',
  margin: '0 -32px',
  borderBottomWidth: '2px',
  borderBottomColor: '#E6E8F0',
  borderBottomStyle: 'solid',
}));

export const CenterBox = styled(Box)(() => ({
  alignSelf: 'center',
}));

export const BottomBox = styled(Box)(() => ({
  bottom: 0,
  display: 'flex',
  position: 'absolute',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  height: 90,
  marginLeft: '-32px',
  padding: '32px',
  width: '100%',
  zIndex: 10,
  background: 'white',
  borderTop: '1px solid #E6E8F0',
}));

export const FlexBox = styled(Box)(() => ({
  display: 'flex',
}));

export const FormFieldsContainer = styled(Stack)(() => ({
  height: 'calc(100% - 100px)',
  padding: '32px 32px 100px 32px',
  '*::-webkit-scrollbar': {
    width: '0.4em',
  },
  '*::-webkit-scrollbar-track': {
    '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
  },
  '*::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgba(0,0,0,.1)',
    outline: '1px solid slategrey',
  },
}));

export const SaveUpdateButton = () => (
  <CenterBox>
    <Button type="submit">Save Changes</Button>
  </CenterBox>
);
