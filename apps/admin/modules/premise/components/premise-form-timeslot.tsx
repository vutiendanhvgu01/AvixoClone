import { Box, Stack } from '@mui/material';
import React, { useCallback } from 'react';
import { AvixoTimeSlot } from 'share-components';
import PremiseFormAction from './premise-form-action';
import { FormFieldsContainer, StackTitle } from './premise-form-common-component';
import { PremiseFormDetailProps } from './premise-form-component-types';

const PremiseFormTimeslot: React.FC<PremiseFormDetailProps> = props => {
  const { header, values, setFieldValue } = props;
  const onTimeSlotChange = useCallback(
    (fieldName: string, fieldValue: string | null) => {
      const timeslot = values?.timeslots?.length ? values?.timeslots[0] : {};
      timeslot[fieldName] = fieldValue ?? '';
      setFieldValue('timeslot', timeslot);
    },
    [setFieldValue, values?.timeslots],
  );

  return (
    <Box
      sx={{
        '.MuiFormControl-fullWidth.MuiFormControl-fullWidth': {
          mb: 0,
        },
      }}
    >
      <FormFieldsContainer>
        <Stack
          sx={{
            height: 'calc(100vh - 250px)',
          }}
        >
          <StackTitle variant="h6">{header}</StackTitle>
          <AvixoTimeSlot
            timeSlot={
              values?.timeslots?.length
                ? {
                    dayOfWeek: values?.timeslots[0]?.dayOfWeek,
                    slotType: values?.timeslots[0]?.slotType,
                    fromTime: values?.timeslots[0]?.from,
                    toTime: values?.timeslots[0]?.to,
                  }
                : {}
            }
            onChange={onTimeSlotChange}
          />
          <PremiseFormAction {...props} title="6. Holiday" />
        </Stack>
      </FormFieldsContainer>
    </Box>
  );
};

export default PremiseFormTimeslot;
