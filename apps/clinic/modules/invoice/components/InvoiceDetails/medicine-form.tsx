import { Box, Button, Grid, styled, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { Formik, FormikProps } from 'formik';
import GenericForm from 'modules/prescription/components/PrescriptionForm/components/generic-form';
import { AddMedicationSchema } from 'modules/prescription/schema';
import React, { ReactNode, useCallback, useRef, useState } from 'react';
import { AvixoFixedContainer, AvixoTable, Edit2Icon, TrashIcon } from 'share-components';
import { AvixoTableColumnProps } from 'share-components/src/components/AvixoTable/avixo-table-types';
import { AddMedicineValues } from '../../types/medicine';

export const InputRow = styled(Box)({
  padding: '28px 32px',
  paddingBottom: 0,
});

interface AddEditMedicineFormProps {
  onCloseHandler: () => void;
  patientUUID?: string;
}

const tableColumns: Array<AvixoTableColumnProps<AddMedicineValues>> = [
  {
    id: 'medicine-name',
    field: 'inventory.drug.label',
    label: 'Service name',
    alignLabel: 'left',
    customRender: (value: AddMedicineValues) => (
      <Typography height="fitConetent" variant="subtitle2">
        {value.inventory?.drugGroup?.label}
      </Typography>
    ),
  },
  {
    id: 'clinic-price',
    field: 'medicine.clinicPrice',
    label: 'Clinic price',
    alignLabel: 'left',
    customRender: (value: AddMedicineValues) => (
      <Typography height="fitConetent" variant="subtitle2">
        {value.clinicPrice}
      </Typography>
    ),
  },
  {
    id: 'quantity',
    field: 'medicine.quantity',
    label: 'Quantity',
    alignLabel: 'left',
  },
  {
    id: 'sub-total',
    field: 'medicine.subTotal',
    label: 'Sub. total',
    alignLabel: 'left',
  },
  {
    id: 'action',
    field: 'actions',
    label: 'Actions',
    alignLabel: 'left',
    customRender: () => (
      <Box
        sx={{
          display: 'flex',
          gap: 6,
          svg: {
            color: '#6B7280',
            cursor: 'pointer',
          },
        }}
      >
        <Edit2Icon />
        <TrashIcon />
      </Box>
    ),
  },
];

const SwitchButton = styled(ToggleButton)(() => ({
  width: '50px',
  padding: '6px 16px',
  margin: '3px',
  borderRadius: '4px',
  borderColor: 'transparent',
}));

interface ButtonSwitchProps {
  onChange: (value: string) => void;
}

const ButtonSwitch: React.FC<ButtonSwitchProps> = ({ onChange }) => {
  const [type, setType] = useState<string>('percent');

  const handleChangeInternal = useCallback(
    (event: React.MouseEvent<HTMLElement>, value: string) => {
      onChange(value);
      setType(value);
    },
    [onChange],
  );

  return (
    <ToggleButtonGroup
      color="primary"
      value={type}
      exclusive
      onChange={handleChangeInternal}
      aria-label="Platform"
      sx={{
        border: '1px solid rgba(0, 0, 0, 0.87)',
        // borderColor: 'divider',
        padding: '2px',
        '.MuiToggleButtonGroup-grouped:not(:first-of-type)': {
          borderRadius: '4px',
        },
        '.MuiToggleButtonGroup-grouped:not(:last-of-type)': {
          borderRadius: '4px',
        },
      }}
    >
      <SwitchButton value="percent">%</SwitchButton>
      <SwitchButton value="dollar">S$</SwitchButton>
    </ToggleButtonGroup>
  );
};

const getClinicBoxes = (formikProps: FormikProps<any>): ReactNode[] => {
  const { values, errors, handleChange } = formikProps;
  const changePercentType = (value: string) => formikProps.setFieldValue('discountType', value);

  return [
    <Grid item sm={3} key="clinic-price">
      <InputRow>
        <TextField
          name="clinicPrice"
          required
          fullWidth
          label="Clinic Price"
          value={values?.clinicPrice}
          error={!!errors?.clinicPrice}
          onChange={handleChange}
        />
      </InputRow>
    </Grid>,
    <Grid item sm={3} key="cost-price">
      <InputRow>
        <TextField name="costPrice" disabled fullWidth label="Cost Price" value={values?.costPrice} />
      </InputRow>
    </Grid>,
    <Grid item sm={6} key="description">
      <InputRow>
        <TextField
          name="description"
          fullWidth
          label="Description"
          value={values?.description}
          onChange={handleChange}
        />
      </InputRow>
    </Grid>,
    <Grid item sm={3} key="discount">
      <InputRow>
        <TextField
          name="discount"
          required
          fullWidth
          label="Discount"
          value={values?.discount}
          error={!!errors?.discount}
          onChange={handleChange}
        />
      </InputRow>
    </Grid>,
    <Grid item sm={2} key="discount-type">
      <InputRow>
        <ButtonSwitch onChange={changePercentType} />
      </InputRow>
    </Grid>,
    <Grid item sm={7} key="discount-remark">
      <InputRow>
        <TextField
          name="discountRemark"
          fullWidth
          label="Discount Remark"
          value={values?.discountRemark}
          onChange={handleChange}
        />
      </InputRow>
    </Grid>,
  ];
};

const AddEditMedicineForm: React.FC<AddEditMedicineFormProps> = ({ onCloseHandler, patientUUID }) => {
  const [medicineList, setMedicineList] = useState<AddMedicineValues[]>([]);
  const addNewMedicine = useCallback(
    (formikProps: FormikProps<any>) => {
      const newItem = formikProps.values as AddMedicineValues;
      const newList = [...medicineList, newItem];
      setMedicineList(newList);
      formikProps.setFieldValue('allValues', JSON.stringify(newList));
      formikProps.setFieldValue('addFromName', null);
    },
    [medicineList],
  );
  const formRef = useRef<HTMLFormElement | null>(null);
  const handleSubmit = useCallback(() => {
    formRef?.current?.submit();
  }, [formRef]);

  return (
    <AvixoFixedContainer
      title="Add Medicine"
      display
      onClose={onCloseHandler}
      containerSx={{
        width: '996px',
      }}
    >
      <Box>
        <Formik
          initialValues={{
            discountType: 'percent',
            allValues: '[]',
          }}
          onSubmit={handleSubmit}
          validationSchema={AddMedicationSchema}
          enableReinitialize
        >
          {({ ...formikProps }) => {
            const { values } = formikProps;
            return (
              <form ref={formRef} method="post">
                <input type="hidden" name="allValues" value={values?.allValues} />
                <GenericForm
                  formikProps={formikProps}
                  noOfColumns={2}
                  show
                  patientUUID={patientUUID}
                  bottomNode={getClinicBoxes(formikProps)}
                  actions={[
                    <Button
                      variant="outlined"
                      sx={{ marginRight: 2 }}
                      key="add-new-medication"
                      onClick={() => formikProps.isValid && addNewMedicine(formikProps)}
                    >
                      Add Medication
                    </Button>,
                  ]}
                />
              </form>
            );
          }}
        </Formik>
        <AvixoTable
          columns={tableColumns}
          data={{ records: medicineList || [] }}
          primaryKey="id"
          emptyText="The list you are viewing is empty. Add item from the selection above."
          mode="offline"
          hasCheckBoxHeader={false}
          hasPagination={false}
        />
        <Box sx={{ padding: '28px 26px', display: 'flex', flexDirection: 'row-reverse' }}>
          <Button type="submit" key="submit" onClick={handleSubmit} disabled={medicineList.length === 0}>
            Add to Invoice
          </Button>
          <Button variant="text" sx={{ marginRight: 2 }} key="back">
            Cancel
          </Button>
        </Box>
      </Box>
    </AvixoFixedContainer>
  );
};

export default AddEditMedicineForm;
