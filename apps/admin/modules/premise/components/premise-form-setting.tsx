import { Box, Stack } from '@mui/material';
import React from 'react';
import { AvixoTimeZone } from 'share-components';
import PremiseFormAction from './premise-form-action';
import { FormControlComponent, FormFieldsContainer, StackTitle } from './premise-form-common-component';
import { PremiseFormDetailProps } from './premise-form-component-types';

const PremiseFormSetting: React.FC<PremiseFormDetailProps> = props => {
  const { header, setFieldValue, values } = props;

  return (
    <Box>
      <FormFieldsContainer>
        <Stack>
          <StackTitle variant="h6">{header}</StackTitle>
          <FormControlComponent fullWidth>
            <AvixoTimeZone
              label="Time Zone"
              timeZone={values.timezoneID}
              onChange={timeZone => {
                setFieldValue('timezone', timeZone?.id);
              }}
            />
          </FormControlComponent>
          <PremiseFormAction {...props} title="5. Timeslot" />
        </Stack>
      </FormFieldsContainer>
    </Box>
  );
};

export default PremiseFormSetting;
