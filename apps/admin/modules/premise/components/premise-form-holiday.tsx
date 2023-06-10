import { Box, Stack } from '@mui/material';
import { Holiday } from '@ShareComponents/HolidaySection/HolidayForm/holiday-form-type';
import React from 'react';
import { HolidaySection } from 'share-components';
import PremiseFormAction from './premise-form-action';
import { BoxWrapper, FormFieldsContainer, StackTitle } from './premise-form-common-component';
import { PremiseFormDetailProps } from './premise-form-component-types';

const PremiseFormHoliday: React.FC<PremiseFormDetailProps> = props => {
  const { header, values, setFieldValue } = props;
  return (
    <Box>
      <FormFieldsContainer>
        <Stack
          sx={{
            height: 'calc(100vh - 250px)',
          }}
        >
          <StackTitle variant="h6">{header}</StackTitle>

          <BoxWrapper sx={{ paddingBottom: '120px' }}>
            <HolidaySection
              initData={values?.holidays ?? []}
              onChange={(val: Holiday[]) => setFieldValue('holidays', val)}
            />
          </BoxWrapper>
          <PremiseFormAction {...props} btnSubmitText="Add Premise" />
        </Stack>
      </FormFieldsContainer>
    </Box>
  );
};

export default PremiseFormHoliday;
