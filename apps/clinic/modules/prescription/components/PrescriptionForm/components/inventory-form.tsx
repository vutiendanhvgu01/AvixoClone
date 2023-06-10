import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Divider, FormControl, Grid, InputAdornment, Switch, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Stack } from '@mui/system';
import { Field, FieldArray, FormikProps } from 'formik';
import CatalogProxyService from 'modules/catalog/service/proxy';
import { Item } from 'modules/catalog/types/item';
import InventoryProxyService from 'modules/prescription/service/inventory/proxy';
import { Batch } from 'modules/prescription/types/inventory';
import { toWordsOrdinal } from 'number-to-words';
import React, { FC, useEffect, useState } from 'react';
import { AddSquareIcon, AvixoAutoComplete } from 'share-components';
import CloseIcon from 'share-components/src/components/AvixoIcons/close-icon';
import { DEFAULT_GRID_COLUMNS } from 'share-components/src/constants';
import { formatHexToRGBA } from 'share-components/src/utils/formatUtils';
import { neutral } from 'share-components/theme/default-theme';
import { InputRow } from '../common/components';
import CustomizedDropdownForFormik from '../common/components/customized-dropdown-formik';
import { defaultInstructions } from '../constants/values';
import { drugGroupData } from '../mockData';
import { InstructionTypes, PrescriptionValues } from '../types';
import StepForm from './step-form';

interface InventoryFormProps {
  formikProps: FormikProps<PrescriptionValues>;
  noOfColumns: number;
  bottomNode?: React.ReactNode;
}

const InventoryBox: FC<{
  noOfColumns: number;
  children: React.ReactNode;
}> = ({ noOfColumns, children }) => {
  if (noOfColumns && children) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>;
  }
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {children}
    </Box>
  );
};

const InventoryForm: FC<InventoryFormProps> = ({ noOfColumns, formikProps, bottomNode }) => {
  const theme = useTheme();
  const [isMultipleStep, setIsMultipleStep] = useState<boolean>(false);
  const [deleteInstructions, setDeleteInstructions] = useState<Array<number | string>>([]);
  const [data, setData] = React.useState<Record<string, any>[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const fetchData = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const medicationRes = await CatalogProxyService.getListItem({
        type: 'medication',
      });
      const inventoryMedication = medicationRes.data as Item[];
      if (inventoryMedication.length > 0) {
        const itemIds = [...new Set(inventoryMedication.map((item: any) => item.id))] as number[];
        const itemsData = await Promise.all(
          itemIds.map((id: number) => InventoryProxyService.getItemInventory(id as string | number)),
        );
        const quanlityMap = new Map();

        itemsData.forEach(itemRes => {
          const item = itemRes?.data;
          let quantity = 0;
          if (item?.batches && item?.batches.length > 0) {
            item?.batches.forEach((batch: Batch) => {
              quantity += parseInt(batch.quantityCurrent, 10);
            });
          }
          quanlityMap.set(item.id, quantity);
        });

        inventoryMedication.forEach((medication: Item, index: number) => {
          inventoryMedication[index].quantity = quanlityMap.get(medication.id);
        });
      }
      setData(inventoryMedication);
    } catch (error) {
      console.log({ error });
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const inventoryErrors = formikProps?.errors?.inventory as any;
  const inventoryTouched = formikProps?.touched?.inventory as any;
  const inventoryValues = formikProps?.values?.inventory as PrescriptionValues['inventory'];
  const instructions = formikProps?.values?.instructions as PrescriptionValues['instructions'];

  const handleMultipleStep = (arrayHelpers: any) => (e: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setIsMultipleStep(checked);
    if (checked) {
      if (Array.isArray(instructions) && instructions.length === 1) {
        arrayHelpers.push(defaultInstructions);
      }
    } else if (Array.isArray(instructions) && instructions.length > 1) {
      instructions.forEach((step, index) => {
        if (index === 0) {
          formikProps.setFieldValue('instructions', [instructions[index]]);
        }
      });
    }
  };

  useEffect(() => {
    setIsMultipleStep(!Array.isArray(instructions) || instructions.length > 1);
  }, [instructions]);

  const handleChangeDrug = (event: React.SyntheticEvent, newValue: Record<string, any>) => {
    if (formikProps?.values?.addFromName === 'inventory') {
      if (newValue) {
        formikProps?.setFieldValue('inventory.quantity', newValue?.quantity);
        formikProps?.setFieldValue('inventory.name', newValue?.shortName);
      } else {
        formikProps?.setFieldValue('inventory.quantity', null);
      }
    }
  };

  return (
    <InventoryBox noOfColumns={noOfColumns}>
      <Grid item sm={DEFAULT_GRID_COLUMNS / noOfColumns}>
        <InputRow>
          <Field
            name="inventory.drugGroup"
            component={CustomizedDropdownForFormik}
            selectLabel="Drug Group"
            options={drugGroupData}
            value={formikProps?.values?.inventory?.drugGroup}
          />
        </InputRow>
      </Grid>
      <Grid item sm={DEFAULT_GRID_COLUMNS / noOfColumns}>
        <InputRow>
          {inventoryValues?.name !== null && (
            <input type="text" hidden name="inventory.name" value={inventoryValues?.name} />
          )}
          <AvixoAutoComplete
            options={data}
            getOptionLabel={drug => drug.shortName ?? drug}
            disablePortal
            value={inventoryValues?.name}
            onChange={handleChangeDrug}
            loading={isLoading}
            renderInput={params => (
              <>
                <TextField
                  {...params}
                  required
                  label="Drug"
                  error={Boolean(inventoryErrors?.name && inventoryTouched?.name)}
                  multiline
                />
                <input type="text" hidden />
              </>
            )}
            renderOption={(props: React.HTMLAttributes<HTMLLIElement>, option: Record<string, any>) => (
              <li
                {...props}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                {option?.name}
                <Typography color={option?.quantity > 0 ? 'gray' : 'red'} variant="subtitle2">
                  {option?.quantity || 0}
                </Typography>
              </li>
            )}
            noOptionsText={
              <Stack
                sx={{
                  minHeight: 230,
                  background: 'white',
                }}
              >
                <Button
                  size="small"
                  startIcon={
                    <AddSquareIcon
                      sx={{
                        color: theme.palette.chart?.blue5,
                        marginTop: '4px',
                      }}
                    />
                  }
                  sx={{
                    width: '35%',
                    background: 'none',
                    color: theme.palette.chart?.blue5,
                    boxShadow: 'none',
                    padding: '8px',
                    '&:hover': {
                      background: formatHexToRGBA('#1976d200', 0.04),
                      boxShadow: 'none',
                    },
                  }}
                >
                  Add New Item
                </Button>
                <Box>
                  <Typography color="gray" variant="subtitle2" component="span">
                    {/* will handle later */}
                    your drug{' '}
                  </Typography>
                  <Typography color="gray" variant="caption">
                    Can’t be found, add to Inventory.
                  </Typography>
                </Box>
              </Stack>
            }
            disableClearable
          />
        </InputRow>
      </Grid>
      {inventoryValues?.name && (
        <>
          <Grid item sm={DEFAULT_GRID_COLUMNS / noOfColumns}>
            <InputRow>
              <FormControl
                sx={{
                  marginBottom: 0,
                  width: '100%',
                }}
              >
                <TextField
                  name="inventory.quantity"
                  label="Stock Balance"
                  onChange={formikProps.handleChange}
                  // Should fetch info from inventory module, but leave out the mapping for now
                  value={inventoryValues?.quantity || 0}
                  disabled
                  fullWidth
                  sx={{
                    background: theme.palette?.primaryLight?.main,
                  }}
                  InputProps={{
                    endAdornment: <InputAdornment position="start">Tab/s</InputAdornment>,
                  }}
                />
                <input hidden value={inventoryValues?.quantity || 0} name="inventory.quantity" />
              </FormControl>
            </InputRow>
            {noOfColumns === 1 && (
              <Divider
                sx={{
                  marginTop: '8px',
                }}
              />
            )}
          </Grid>
          {bottomNode}
          <FieldArray
            name="instructions"
            render={arrayHelpers => (
              <>
                <InputRow
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    marginY: '32px',
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    component="span"
                    sx={{
                      color: Array.isArray(instructions) && instructions.length >= 2 ? 'inherit' : neutral[500],
                    }}
                  >
                    This medication requires multiple doses
                  </Typography>
                  <Switch
                    checked={isMultipleStep}
                    onChange={handleMultipleStep(arrayHelpers)}
                    inputProps={{ 'aria-label': 'controlled' }}
                    color="primary"
                    sx={{
                      '& .MuiSwitch-switchBase': {
                        color: !isMultipleStep ? 'neutral.500' : 'primary.main',
                      },
                    }}
                  />
                </InputRow>
                {Array.isArray(instructions) && instructions.length >= 2 && (
                  <InputRow
                    sx={{
                      width: '100%',
                    }}
                  >
                    <Field
                      name="inventory.dose"
                      component={CustomizedDropdownForFormik}
                      inputValue={inventoryValues?.dose}
                      selectLabel="Select Dose"
                      options={[
                        {
                          label: 'Variable',
                          value: 'Variables',
                        },
                        {
                          label: 'Step',
                          value: 'Steps',
                        },
                      ]}
                      required
                      formControlProps={{
                        error: inventoryErrors?.dose && inventoryTouched?.dose,
                      }}
                    />
                  </InputRow>
                )}

                {Array.isArray(instructions) &&
                  instructions.map((instruction: InstructionTypes, index: number) => {
                    const key = `${instruction.routeName}-${index}`;
                    return (
                      <>
                        {!!index && (
                          <InputRow
                            sx={{
                              width: '100%',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              paddingTop: '12px',
                              marginBottom: '32px',
                            }}
                          >
                            <Typography
                              variant="h6"
                              component="span"
                              sx={{
                                textTransform: 'capitalize',
                              }}
                            >
                              {toWordsOrdinal(index + 1)}{' '}
                              {(inventoryValues?.dose ?? 'step').charAt(0) + (inventoryValues?.dose ?? 'step').slice(1)}
                            </Typography>
                            <CloseIcon
                              sx={{
                                cursor: 'pointer',
                                color: theme.palette.error.main,
                                fill: theme.palette.error.main,
                              }}
                              onClick={() => {
                                if (instruction?.id) {
                                  setDeleteInstructions([...deleteInstructions, instruction?.id]);
                                }
                                arrayHelpers.remove(index);
                              }}
                            />
                          </InputRow>
                        )}
                        {!!deleteInstructions &&
                          deleteInstructions.map(
                            (deleteInstruction: string | number, deleteInstructionIndex: number) => (
                              <input
                                key={deleteInstruction}
                                hidden
                                name={`deleteInstructions[${deleteInstructionIndex}]`}
                                value={deleteInstruction}
                              />
                            ),
                          )}
                        <StepForm
                          arrayHelpers={arrayHelpers}
                          key={key}
                          instruction={instruction}
                          instructionIndex={index}
                          formikProps={formikProps}
                          noOfColumns={noOfColumns}
                        />
                      </>
                    );
                  })}
                {isMultipleStep && (
                  <Grid item sm={DEFAULT_GRID_COLUMNS / noOfColumns}>
                    <InputRow
                      sx={{
                        paddingTop: 0,
                      }}
                    >
                      <Button
                        sx={{
                          background: 'none',
                          color: theme.palette.chart?.blue5,
                          boxShadow: 'none',
                          paddingX: '8px',
                          marginBottom: '32px',
                          '&:hover': {
                            background: formatHexToRGBA('#1976d200', 0.04),
                            boxShadow: 'none',
                          },
                        }}
                        startIcon={
                          <AddIcon
                            sx={{
                              color: theme.palette.chart?.blue5,
                              marginTop: '4px',
                              transform: 'translateY(-1px)',
                            }}
                          />
                        }
                        onClick={() => {
                          if (isMultipleStep) {
                            arrayHelpers.push(defaultInstructions);
                          }
                        }}
                      >
                        Add {inventoryValues?.dose}
                      </Button>
                    </InputRow>
                  </Grid>
                )}
              </>
            )}
          />
        </>
      )}
    </InventoryBox>
  );
};

export default InventoryForm;
