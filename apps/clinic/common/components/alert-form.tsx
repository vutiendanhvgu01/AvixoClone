import { Box, Button, Stack, useTheme } from '@mui/material';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { FC } from 'react';
import { AlertIcon, AvixoFixedContainer } from 'share-components';
import AvixoFixedContainerProps from 'share-components/src/components/AvixoFixedContainer/avixo-fixed-container-types';

interface AlertFormProps extends Partial<Omit<AvixoFixedContainerProps, 'children'>> {
  onProceed: () => void;
  onCancel: () => void;
  text?: string;
  alertTitle?: string;
}

const AlertForm: FC<AlertFormProps> = ({
  onProceed,
  onCancel,
  text = '',
  alertTitle = 'Important Note',
  ...restProps
}) => {
  const theme = useTheme();
  return (
    <AvixoFixedContainer
      display
      title=""
      headerComponent={
        <Stack flexDirection="row" alignItems="center">
          <AlertIcon sx={{ color: theme.palette.warning.main }} />{' '}
          <Typography variant="h5" ml={2}>
            {alertTitle}
          </Typography>
        </Stack>
      }
      {...restProps}
    >
      <Stack alignItems="center" height="100%">
        <Typography variant="body2" mt={3} ml={4} mr={4} flex={8}>
          {text}
        </Typography>
        <Divider />
        <Box
          alignSelf="end"
          pr={4}
          pt={3}
          flex={1}
          sx={{
            width: '100%',
            textAlign: 'end',
            borderTop: '1px solid #E6E8F0',
          }}
        >
          <Button
            sx={{ pr: '28px' }}
            variant="text"
            onClick={() => {
              if (onCancel) {
                onCancel();
              }
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              if (onProceed) {
                onProceed();
              }
            }}
          >
            Proceed
          </Button>
        </Box>
      </Stack>
    </AvixoFixedContainer>
  );
};

export default AlertForm;
