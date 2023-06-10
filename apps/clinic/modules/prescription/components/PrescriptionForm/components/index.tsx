import { Box, Button, Grid, LinearProgress, styled } from '@mui/material';
import { Formik } from 'formik';
import { Patient } from 'modules/patient/types/patient';
import React, { FC, useCallback, useRef } from 'react';
import { AvixoPatientAutoComplete } from 'share-components';
import { PatientOption } from 'share-components/src/components/AvixoPatientAutocomplete/avixo-patient-autocomplete';
import { DEFAULT_GRID_COLUMNS } from 'share-components/src/constants';
import { formatHexToRGBA } from 'share-components/src/utils/formatUtils';
import { AddPrescriptionSchema } from '../../../schema';
import { InputRow } from '../common/components';
import { PrescriptionFormAction, PrescriptionValues } from '../types';
import GenericForm from './generic-form';

const DEFAULT_INVENTORY: Partial<PrescriptionValues['inventory']> = {
  dose: 'Variables',
};
interface PrescriptionFormFieldsProps {
  handleClose?: () => void;
  patient?: Patient;
  initialData?: unknown;
  action: PrescriptionFormAction;
  type?: string;
  typeId?: string;
  onDelete?: () => void;
}

const Form = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
});

const PrescriptionFormFields: FC<PrescriptionFormFieldsProps> = ({
  handleClose,
  patient,
  initialData,
  action,
  type,
  typeId,
  onDelete,
}) => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const initialValues = (
    initialData
      ? {
          ...initialData,
          inventory: { ...DEFAULT_INVENTORY, ...(initialData as PrescriptionValues)?.inventory },
        }
      : {
          addFromName: null,
          patientId: patient ? patient.id : null,
          inventory: { ...DEFAULT_INVENTORY },
        }
  ) as PrescriptionValues;

  const handleBack = useCallback(() => {
    if (handleClose) handleClose();
  }, [handleClose]);

  let actions = [
    <Button type="submit" key="submit">
      Add to Prescription
    </Button>,
    <Button variant="text" sx={{ marginRight: 2 }} key="back" onClick={handleBack}>
      Back
    </Button>,
  ];
  if (initialData) {
    actions = [
      <Button
        key="delete"
        sx={{
          background: formatHexToRGBA('#5048E5', 0.04),
          position: 'absolute',
          left: '16px',
        }}
        color="error"
        variant="text"
        onClick={() => {
          if (onDelete) {
            onDelete();
          }
        }}
      >
        Delete
      </Button>,
      <Button type="submit" key="submit">
        Save
      </Button>,
    ];
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values: any, { setSubmitting }) => {
        setSubmitting(true);
        if (formRef.current) {
          formRef.current.submit();
        }
      }}
      validationSchema={AddPrescriptionSchema}
      enableReinitialize
    >
      {({ ...formikProps }) => (
        <>
          <LinearProgress
            variant="determinate"
            value={100}
            sx={{
              width: '100%',
            }}
          />
          <Form ref={formRef} method="post" onSubmit={formikProps.handleSubmit} noValidate>
            <GenericForm
              patient={patient}
              formikProps={formikProps}
              noOfColumns={1}
              show={!!formikProps?.values?.patientId}
              actions={actions}
            >
              <Box>
                {typeof patient === 'undefined' && (
                  <Grid item sm={DEFAULT_GRID_COLUMNS}>
                    <InputRow>
                      <AvixoPatientAutoComplete
                        options={[
                          { label: 'Patient 1', value: '1', nric: 'S1234567D' },
                          { label: 'Patient 2', value: '2', nric: 'S1236512H' },
                        ]}
                        onChange={(event: React.SyntheticEvent, newValue: PatientOption | null) => {
                          if (newValue) {
                            formikProps.setFieldValue('patientId', newValue?.value);
                          }
                        }}
                      />
                      <input type="text" hidden name="patientId" value={formikProps?.values?.patientId} />
                    </InputRow>
                  </Grid>
                )}
              </Box>
            </GenericForm>
            {patient?.id && <input type="text" hidden name="patientId" value={patient?.id} />}
            <input type="text" hidden name="action" value={action} />
            {initialValues?.id && <input type="text" hidden name="itemId" value={initialValues?.id} />}
            {typeId && <input type="text" hidden name={type} value={typeId} />}
          </Form>
        </>
      )}
    </Formik>
  );
};

export default PrescriptionFormFields;
