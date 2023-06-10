import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useFormik } from 'formik';
import { FC, useCallback, useRef, useState } from 'react';
import { AvixoTable, Edit2Icon, TrashIcon } from 'share-components';
import { AvixoTableColumnProps } from 'share-components/src/components/AvixoTable/avixo-table-types';
import ServiceSchema from './service-schema';
import Service, { BaseObject } from './service-types';

const MainForm = styled('form')(() => ({
  height: '100%',
  padding: '20px 0 32px 0',
}));

const FormControlComponent = styled(FormControl)(() => ({
  marginBottom: '16px !important',
}));

const FormFieldsContainer = styled(Stack)(() => ({
  padding: '0 32px',
}));

const GridItem = styled(Grid)(() => ({
  height: 'fit-content !important',
}));

const Type = styled(Button)(() => ({
  border: 'none',
  borderRadius: '4px',
  '&.active': {
    background: 'rgba(80, 72, 229, 0.1)',
  },
}));

export interface ServiceFormProps {
  initData?: Service;
  editMode?: boolean;
  onSubmit?: (values: Service) => void;
}

const initialValues: Service = {
  type: 0,
  item: 0,
  clinicPrice: 'S$00.00',
  costPrice: 0,
  description: '',
  discount: 0,
  discountType: 'S$',
  discountRemark: '',
  quantity: 1,
  isRedeem: false,
  id: 0,
};

const ServiceForm = (props: ServiceFormProps) => {
  const { initData, onSubmit, editMode } = props;
  const form = useRef<HTMLFormElement | null>(null);
  const formik = useFormik({
    initialValues: initData || initialValues,
    validationSchema: ServiceSchema,
    enableReinitialize: true,
    onSubmit: (values: Service, { resetForm }) => {
      if (onSubmit) {
        onSubmit(values);
        resetForm();
      }
    },
  });
  const { touched, errors, handleBlur, handleChange, values, setFieldValue, isValid } = formik;
  const types: BaseObject[] = [{ id: 0, name: 'All' }];
  const serviceItems: BaseObject[] = [
    { id: 0, name: 'Nurse Visit' },
    { id: 1, name: 'Private Room' },
    { id: 3, name: 'Provide food in room' },
  ];

  const handleChangeDiscountTypeToPercent = useCallback(() => setFieldValue('discountType', '%'), [setFieldValue]);
  const handleChangeDiscountTypeToUnit = useCallback(() => setFieldValue('discountType', 'S$'), [setFieldValue]);
  const theme = useTheme();
  return (
    <MainForm ref={form} noValidate method="post" onSubmit={formik.handleSubmit}>
      <FormFieldsContainer>
        <Grid container spacing={2}>
          <GridItem item xs={6}>
            <FormControlComponent fullWidth error={!!(touched.type && errors.type)}>
              <InputLabel id="types">Service Type *</InputLabel>
              <Select
                labelId="types"
                id="types-select"
                name="type"
                label="Service Type"
                value={values.type}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                {types.map((type: BaseObject) => (
                  <MenuItem key={`type-item-${type.id}`} value={type.name}>
                    {type.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControlComponent>
          </GridItem>
          <GridItem item xs={6}>
            <FormControlComponent fullWidth error={!!(touched.item && errors.item)}>
              <InputLabel id="services">Service *</InputLabel>
              <Select
                labelId="services"
                id="services-select"
                name="item"
                label="Service"
                value={values.item}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                {serviceItems.map((item: BaseObject) => (
                  <MenuItem key={`product-item-${item.id}`} value={item.name}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControlComponent>
          </GridItem>
          {/* <hr /> */}
          <GridItem item xs={3}>
            <FormControlComponent fullWidth required>
              <InputLabel id="clinic-price-field">Clinic Price</InputLabel>
              <OutlinedInput
                label="Clinic Price"
                id="clinic-price"
                onChange={handleChange}
                onBlur={handleBlur}
                required
                value={values.clinicPrice}
                name="clinicPrice"
                error={!!(touched.clinicPrice && errors.clinicPrice)}
              />
            </FormControlComponent>
          </GridItem>
          <GridItem item xs={3}>
            <FormControlComponent fullWidth required>
              <TextField
                required
                type="number"
                name="costPrice"
                label="Cost Price"
                error={!!(touched.costPrice && errors.costPrice)}
                onChange={handleChange}
                value={values.costPrice}
                onBlur={handleBlur}
              />
            </FormControlComponent>
          </GridItem>
          <GridItem item xs={6}>
            <FormControlComponent fullWidth>
              <InputLabel id="description-field">Description</InputLabel>
              <OutlinedInput
                label="Description"
                id="description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                name="description"
              />
            </FormControlComponent>
          </GridItem>
          <GridItem item xs={3}>
            <FormControlComponent fullWidth required>
              <TextField
                required
                type="number"
                name="discount"
                label="Discount"
                error={!!(touched.discount && errors.discount)}
                onChange={handleChange}
                value={values.discount}
                onBlur={handleBlur}
              />
            </FormControlComponent>
          </GridItem>
          <GridItem item xs={2}>
            <Box
              sx={{
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: '8px',
                padding: '6px',
                width: 'fit-content',
              }}
            >
              {values.discountType === '%' ? (
                <ButtonGroup aria-label="outlined button group">
                  <Type className="active">%</Type>
                  <Type onClick={handleChangeDiscountTypeToUnit}>S$</Type>
                </ButtonGroup>
              ) : (
                <ButtonGroup aria-label="outlined button group">
                  <Type onClick={handleChangeDiscountTypeToPercent}>%</Type>
                  <Type className="active">S$</Type>
                </ButtonGroup>
              )}
            </Box>
          </GridItem>
          <GridItem item xs={7}>
            <FormControlComponent fullWidth>
              <InputLabel id="discount-remark-field">Discount Remark</InputLabel>
              <OutlinedInput
                label="Discount Remark"
                id="discount-remark"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.discountRemark}
                name="discountRemark"
              />
            </FormControlComponent>
          </GridItem>
          <GridItem item xs={12}>
            <FormControlComponent fullWidth required>
              <TextField
                required
                type="number"
                name="quantity"
                label="Quantity"
                error={!!(touched.quantity && errors.quantity)}
                onChange={handleChange}
                value={values.quantity}
                onBlur={handleBlur}
              />
            </FormControlComponent>
            {/* The form control has a margin-bottom is 24px in the default theme, I need to overwrite it here to be suitable for the design */}
            <FormControl fullWidth sx={{ marginBottom: '0px !important' }}>
              <FormControlLabel
                control={<Checkbox name="isRedeem" checked={values.isRedeem} onChange={handleChange} />}
                label="Redeem from existing package "
              />
            </FormControl>
          </GridItem>
        </Grid>
      </FormFieldsContainer>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          p: '17px 32px 0 32px',
        }}
      >
        <Box
          sx={{
            alignSelf: 'flex-end',
          }}
        >
          <Button type="submit" disabled={!isValid} variant="outlined">
            {editMode ? 'Save Service' : 'Add Service'}
          </Button>
        </Box>
      </Box>
    </MainForm>
  );
};

const tableColumns = (
  handleEditService: (...args: any[]) => void,
  handleRemoveService: (...args: any[]) => void,
): Array<AvixoTableColumnProps<Service>> => [
  {
    id: 'item',
    field: 'item',
    label: 'Service Name',
    alignLabel: 'left',
    tableCellBaseProps: {
      sx: {
        width: 120,
      },
    },
  },
  {
    id: 'clinicPrice',
    field: 'clinicPrice',
    label: 'Clinic Price',
    alignLabel: 'left',
  },
  {
    id: 'quantity',
    field: 'quantity',
    label: 'Quantity',
    alignLabel: 'left',
  },
  {
    id: 'subTotal',
    field: 'subTotal',
    label: 'Sub. total',
    alignLabel: 'left',
    customRender: (values: Service) => <span>{values.clinicPrice}</span>,
  },
  {
    id: 'id',
    field: 'id',
    label: 'Actions',
    alignLabel: 'left',
    customRender: (values: Service, index: number) => (
      <Box
        sx={{
          display: 'flex',
          gap: 6,
        }}
      >
        <Edit2Icon onClick={() => handleEditService(values, index)} style={{ color: '#6B7280', cursor: 'pointer' }} />
        <TrashIcon onClick={() => handleRemoveService(values, index)} style={{ color: '#6B7280', cursor: 'pointer' }} />
      </Box>
    ),
  },
];

const ServiceComponent: FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [currentRecord, setCurrentRecord] = useState<Service>(initialValues);
  const [editMode, setEditMode] = useState(false);
  const [iEditRecord, setIEditRecord] = useState(-1);

  const onSave = useCallback(
    (values: Service) => {
      if (iEditRecord > -1 && editMode) {
        services[iEditRecord] = values;
        setEditMode(false);
        setIEditRecord(-1);
      } else {
        services.push(values);
      }
      setServices([...services]);
      setCurrentRecord(initialValues);
    },
    [editMode, iEditRecord, services],
  );

  const handleEditService = useCallback((values: Service, index: number) => {
    setEditMode(true);
    setIEditRecord(index);
    setCurrentRecord(values);
  }, []);

  const handleRemoveService = useCallback(
    (values: Service, index: number) => {
      services.splice(index, 1);
      setServices([...services]);
    },
    [services],
  );

  return (
    <Stack>
      <ServiceForm onSubmit={onSave} initData={currentRecord} editMode={editMode} />
      <AvixoTable
        columns={tableColumns(handleEditService, handleRemoveService)}
        data={{ records: services }}
        primaryKey="id"
        emptyText="The list you are viewing is empty. Add item from the selection above."
        mode="offline"
        hasCheckBoxHeader={false}
        hasPagination={false}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'end',
          p: '24px 47px 32px 32px',
          bgcolor: 'background.paper',
        }}
      >
        <Button variant="text">Cancel</Button>
        <Button type="button">Add to Invoice</Button>
      </Box>
    </Stack>
  );
};

export default ServiceComponent;
