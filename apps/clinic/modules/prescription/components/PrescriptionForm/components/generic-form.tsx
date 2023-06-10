import { Box, Grid, useTheme } from '@mui/material';
import { Field, FormikProps } from 'formik';
import { Patient } from 'modules/patient/types/patient';
import React, { useEffect, useState } from 'react';
import { DEFAULT_GRID_COLUMNS } from 'share-components/src/constants';
import { InputRow } from '../common/components';
import CustomizedAutocompleteForFormik from '../common/components/customized-autocomplete-formik';
import { addFromData } from '../mockData';
import { OptionDefault } from '../types';
import InventoryForm from './inventory-form';

interface GenericFormProps<T> {
  show: boolean;
  noOfColumns: number;
  children?: React.ReactNode;
  formikProps: FormikProps<any>;
  bottomNode?: React.ReactNode;
  actions?: React.ReactNode[];
  patient?: Patient;
  patientUUID?: string;
}

const GenericForm = <T,>({
  children,
  formikProps,
  show,
  bottomNode,
  actions,
  noOfColumns = 1,
  patient,
  patientUUID,
}: GenericFormProps<T>) => {
  const theme = useTheme();
  const [randomKey, setRamdomKey] = useState<number>(new Date().getTime());

  useEffect(() => {
    if (!formikProps?.values?.addFromName) {
      setRamdomKey(new Date().getTime());
    }
  }, [formikProps]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'space-between',
      }}
    >
      <Grid
        height="100%"
        sx={{
          overflowY: 'scroll',
        }}
      >
        {children && <Box width="100%">{children}</Box>}
        {show && (
          <Grid container>
            <Grid item sm={DEFAULT_GRID_COLUMNS / noOfColumns}>
              {(formikProps?.values?.patientId || patient || patientUUID) && (
                <InputRow
                  sx={{
                    marginTop: '32px',
                  }}
                >
                  <Field
                    key={randomKey}
                    name="addFromName"
                    component={CustomizedAutocompleteForFormik}
                    selectLabel="Add From"
                    options={addFromData}
                    onChange={(field: string, value: OptionDefault) =>
                      formikProps.setFieldValue('addFromName', value?.value)
                    }
                  />
                </InputRow>
              )}
            </Grid>
            {formikProps?.values?.addFromName === 'inventory' && (
              <InventoryForm formikProps={formikProps} noOfColumns={noOfColumns} bottomNode={bottomNode} />
            )}
          </Grid>
        )}
      </Grid>
      <Box
        sx={{
          padding: '28px 26px',
          display: 'flex',
          flexDirection: 'row-reverse',
          borderTop: `1px solid ${theme.palette.divider}`,
          position: 'relative',
        }}
      >
        {actions}
      </Box>
    </Box>
  );
};

export default GenericForm;
