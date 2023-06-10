import {
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useFormikContext } from 'formik';
import { CalendarIcon } from 'share-components';
import MedicalSectionBox from '../../common/medical-section-box';
import MedicalSectionCard from '../../common/medical-section-card';
import MedicalSectionCardItem from '../../common/medical-section-card-item';
import CareReport, { CardItem } from '../care-report-types';
import { unitDatas } from './mockDatas';

const MeasurementDataGroup = () => {
  const { getFieldProps, setFieldValue } = useFormikContext<CareReport>();

  const cardItems: CardItem[] = [
    {
      key: 'bp-data-group',
      title: 'BP DATA GROUP',
      content: (
        <Grid container columnSpacing={4}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  components={{
                    OpenPickerIcon: CalendarIcon,
                  }}
                  {...getFieldProps(`dateOfBlood`)}
                  label="Date of Blood Pressure Measurement"
                  renderInput={prop => <TextField {...prop} required />}
                  onChange={value => setFieldValue?.('dateOfBlood', value)}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <Grid container columnSpacing={2}>
              <Grid item xs={6}>
                <FormControl>
                  <InputLabel id="systolic-bp" required>
                    Systolic BP
                  </InputLabel>
                  <OutlinedInput label="Systolic BP" {...getFieldProps('systolicBp')} />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl>
                  <InputLabel id="diastolic-bp" required>
                    Diastolic BP
                  </InputLabel>
                  <OutlinedInput label="Diastolic BP" {...getFieldProps('diastolicBp')} />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ),
    },
    {
      key: 'act-data-group',
      title: 'ACT DATA GROUP',
      content: (
        <Grid container columnSpacing={4}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  components={{
                    OpenPickerIcon: CalendarIcon,
                  }}
                  label="Date of ACT Score Assessment"
                  {...getFieldProps(`dateOfAct`)}
                  renderInput={prop => <TextField {...prop} />}
                  onChange={value => setFieldValue?.('dateOfAct', value)}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="act-score">ACT Score</InputLabel>
              <OutlinedInput label="ACT Score" {...getFieldProps('actScore')} />
            </FormControl>
          </Grid>
        </Grid>
      ),
    },
    {
      key: 'hba1c',
      title: 'HBA1C',
      content: (
        <Grid container columnSpacing={4}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  components={{
                    OpenPickerIcon: CalendarIcon,
                  }}
                  label="Date of HbA1c"
                  {...getFieldProps(`dateOfHba1c`)}
                  renderInput={prop => <TextField {...prop} required />}
                  onChange={value => setFieldValue?.('dateOfHba1c', value)}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="hba1c" required>
                HbA1c
              </InputLabel>
              <OutlinedInput
                required
                label="HbA1c"
                {...getFieldProps('act-score')}
                endAdornment={
                  <InputAdornment position="end" style={{ color: 'neutral.700' }}>
                    %
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
        </Grid>
      ),
    },
    {
      key: 'gina-data-group',
      title: 'GINA DATA GROUP',
      content: (
        <Grid container columnSpacing={4}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  components={{
                    OpenPickerIcon: CalendarIcon,
                  }}
                  label="Date of GINA Score Assessment"
                  {...getFieldProps(`dateOfGina`)}
                  renderInput={prop => <TextField {...prop} />}
                  onChange={value => setFieldValue?.('dateOfGina', value)}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="act-score">ACT Score</InputLabel>
              <OutlinedInput label="ACT Score" {...getFieldProps('actScore')} />
            </FormControl>
          </Grid>
        </Grid>
      ),
    },
    {
      key: 'fpg-data-group',
      title: 'FPG data group (Fasting Plasma Glucose)',
      content: (
        <Grid container columnSpacing={4}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  components={{
                    OpenPickerIcon: CalendarIcon,
                  }}
                  label="Date of Fasting Plasma Glucose (FPG)"
                  {...getFieldProps(`dateOfFasting`)}
                  renderInput={prop => <TextField {...prop} />}
                  onChange={value => setFieldValue?.('dateOfFasting', value)}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <Grid container>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <TextField
                    label="Fasting Plasma Glucose (FPG)"
                    sx={{
                      '.MuiOutlinedInput-root fieldset': {
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                      },
                    }}
                    {...getFieldProps('fastingPlasmaGlucoso')}
                    required
                  >
                    Fasting Plasma Glucose (FPG)
                  </TextField>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel id="unit">Unit</InputLabel>
                  <Select
                    labelId="unit-options"
                    id="unit-options-select"
                    label="Unit"
                    sx={{
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                    }}
                    {...getFieldProps('unitFastingPlasma')}
                  >
                    {unitDatas?.map((unitData: Record<string, any>) => (
                      <MenuItem key={`unitData-item-${unitData.id}`} value={unitData.id}>
                        {unitData.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ),
    },
    {
      key: 'serum-data-group',
      title: 'Serum DATA GROUP',
      content: (
        <Grid container columnSpacing={4}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  components={{
                    OpenPickerIcon: CalendarIcon,
                  }}
                  label="Date of Serum Creatinine"
                  {...getFieldProps(`dateOfSerum`)}
                  renderInput={prop => <TextField {...prop} />}
                  onChange={value => setFieldValue?.('dateOfSerum', value)}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <Grid container>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <TextField
                    label="Serum Creatinine "
                    sx={{
                      '.MuiOutlinedInput-root fieldset': {
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                      },
                    }}
                    {...getFieldProps('serumCreatinine')}
                  >
                    Serum Creatinine
                  </TextField>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel id="unit">Unit</InputLabel>
                  <Select
                    labelId="unit-options"
                    id="unit-options-select"
                    label="Unit"
                    sx={{
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                    }}
                    {...getFieldProps('unitSerum')}
                  >
                    {unitDatas?.map((unitData: Record<string, any>) => (
                      <MenuItem key={`unitData-item-${unitData.id}`} value={unitData.id}>
                        {unitData.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ),
    },
    {
      key: 'ogtt-data-group',
      title: 'OGTT data group',
      content: (
        <Grid container columnSpacing={4}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  components={{
                    OpenPickerIcon: CalendarIcon,
                  }}
                  label="Date of Oral Glucose Tolerance Test"
                  {...getFieldProps(`dateOfOral`)}
                  renderInput={prop => <TextField {...prop} required />}
                  onChange={value => setFieldValue?.('dateOfOral', value)}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <Grid container>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <TextField
                    label="Oral Glucose Tolerance Test"
                    sx={{
                      '.MuiOutlinedInput-root fieldset': {
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                      },
                    }}
                    {...getFieldProps('oralGlucosoToleranceTest')}
                    required
                  >
                    Oral Glucose Tolerance Test
                  </TextField>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel id="unit">Unit</InputLabel>
                  <Select
                    labelId="unit-options"
                    id="unit-options-select"
                    label="Unit"
                    sx={{
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                    }}
                    {...getFieldProps('unitOralGlucozo')}
                  >
                    {unitDatas?.map((unitData: Record<string, any>) => (
                      <MenuItem key={`unitData-item-${unitData.id}`} value={unitData.id}>
                        {unitData.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ),
    },
    {
      key: 'egfr-data-group',
      title: 'eGFR data group',
      content: (
        <Grid container columnSpacing={4}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  components={{
                    OpenPickerIcon: CalendarIcon,
                  }}
                  label="Date of eGFR*"
                  {...getFieldProps(`dateOfEgfr`)}
                  renderInput={prop => <TextField {...prop} />}
                  onChange={value => setFieldValue?.('dateOfEgfr', value)}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <Grid container>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <TextField
                    label="eGFR"
                    sx={{
                      '.MuiOutlinedInput-root fieldset': {
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                      },
                    }}
                    {...getFieldProps('egfr')}
                    required
                  >
                    eGFR
                  </TextField>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel id="unit">Unit</InputLabel>
                  <Select
                    labelId="unit-options"
                    id="unit-options-select"
                    label="Unit"
                    sx={{
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                    }}
                    {...getFieldProps('unitEgfr')}
                  >
                    {unitDatas?.map((unitData: Record<string, any>) => (
                      <MenuItem key={`unitData-item-${unitData.id}`} value={unitData.id}>
                        {unitData.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ),
    },
    {
      key: 'ldlc-data-group',
      title: 'LDL-C data group',
      content: (
        <Grid container columnSpacing={4}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  components={{
                    OpenPickerIcon: CalendarIcon,
                  }}
                  label="Date of LDL-C"
                  {...getFieldProps(`dateOfLdlc`)}
                  renderInput={prop => <TextField {...prop} required />}
                  onChange={value => setFieldValue?.('dateOfLdlc', value)}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <Grid container>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <TextField
                    label="LDL-C"
                    sx={{
                      '.MuiOutlinedInput-root fieldset': {
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                      },
                    }}
                    {...getFieldProps('ldlc')}
                    required
                  >
                    LDL-C
                  </TextField>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel id="unit">Unit</InputLabel>
                  <Select
                    labelId="unit-options"
                    id="unit-options-select"
                    label="Unit"
                    sx={{
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                    }}
                    {...getFieldProps('unitLdlc')}
                  >
                    {unitDatas?.map((unitData: Record<string, any>) => (
                      <MenuItem key={`unitData-item-${unitData.id}`} value={unitData.id}>
                        {unitData.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ),
    },
    {
      key: 'uacr-data-group',
      title: 'UACR data group',
      content: (
        <Grid container columnSpacing={4}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  components={{
                    OpenPickerIcon: CalendarIcon,
                  }}
                  label="Date of Urine ACR"
                  {...getFieldProps(`dateOfUrine`)}
                  renderInput={prop => <TextField {...prop} required />}
                  onChange={value => setFieldValue?.('dateOfUrine', value)}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <Grid container>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <TextField
                    label="Urine ACR"
                    sx={{
                      '.MuiOutlinedInput-root fieldset': {
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                      },
                    }}
                    {...getFieldProps('urineAcr')}
                    required
                  >
                    Urine ACR
                  </TextField>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel id="unit">Unit</InputLabel>
                  <Select
                    labelId="unit-options"
                    id="unit-options-select"
                    label="Unit"
                    sx={{
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                    }}
                    {...getFieldProps('unitUrineAcr')}
                  >
                    {unitDatas?.map((unitData: Record<string, any>) => (
                      <MenuItem key={`unitData-item-${unitData.id}`} value={unitData.id}>
                        {unitData.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ),
    },
    {
      key: 'hdlc-data-group',
      title: 'HDL-C data group',
      content: (
        <Grid container columnSpacing={4}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  components={{
                    OpenPickerIcon: CalendarIcon,
                  }}
                  label="Date of HDL-C"
                  {...getFieldProps(`dateOfHdlc`)}
                  renderInput={prop => <TextField {...prop} required />}
                  onChange={value => setFieldValue?.('dateOfHdlc', value)}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <Grid container>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <TextField
                    label="HDL-C"
                    sx={{
                      '.MuiOutlinedInput-root fieldset': {
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                      },
                    }}
                    {...getFieldProps('hdlc')}
                    required
                  >
                    HDL-C
                  </TextField>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel id="unit">Unit</InputLabel>
                  <Select
                    labelId="unit-options"
                    id="unit-options-select"
                    label="Unit"
                    sx={{
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                    }}
                    {...getFieldProps('unitHdlc')}
                  >
                    {unitDatas?.map((unitData: Record<string, any>) => (
                      <MenuItem key={`unitData-item-${unitData.id}`} value={unitData.id}>
                        {unitData.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ),
    },
    {
      key: 'upcr-data-group',
      title: 'UPCR data group',
      content: (
        <Grid container columnSpacing={4}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  components={{
                    OpenPickerIcon: CalendarIcon,
                  }}
                  label="Date of Urine PCR"
                  {...getFieldProps(`dateOfUrinePcr`)}
                  renderInput={prop => <TextField {...prop} required />}
                  onChange={value => setFieldValue?.('dateOfUrinePcr', value)}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <Grid container>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <TextField
                    label="Urine PCR"
                    sx={{
                      '.MuiOutlinedInput-root fieldset': {
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                      },
                    }}
                    {...getFieldProps('urinePcr')}
                    required
                  >
                    Urine PCR
                  </TextField>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel id="unit">Unit</InputLabel>
                  <Select
                    labelId="unit-options"
                    id="unit-options-select"
                    label="Unit"
                    sx={{
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                    }}
                    {...getFieldProps('unitUrinePcr')}
                  >
                    {unitDatas?.map((unitData: Record<string, any>) => (
                      <MenuItem key={`unitData-item-${unitData.id}`} value={unitData.id}>
                        {unitData.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ),
    },
    {
      key: 'triglycerides-data-group',
      title: 'Triglycerides data group',
      content: (
        <Grid container columnSpacing={4}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  components={{
                    OpenPickerIcon: CalendarIcon,
                  }}
                  label="Date of Triglycerides"
                  {...getFieldProps(`dateOfTriglycerides`)}
                  renderInput={prop => <TextField {...prop} />}
                  onChange={value => setFieldValue?.('dateOfTriglycerides', value)}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <Grid container>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <TextField
                    label="Triglycerides"
                    sx={{
                      '.MuiOutlinedInput-root fieldset': {
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                      },
                    }}
                    {...getFieldProps('triglycerides')}
                    required
                  >
                    Triglycerides
                  </TextField>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel id="unit">Unit</InputLabel>
                  <Select
                    labelId="unit-options"
                    id="unit-options-select"
                    label="Unit"
                    sx={{
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                    }}
                    {...getFieldProps('unitTriglicerides')}
                  >
                    {unitDatas?.map((unitData: Record<string, any>) => (
                      <MenuItem key={`unitData-item-${unitData.id}`} value={unitData.id}>
                        {unitData.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ),
    },
    {
      key: 'copd-data-group',
      title: 'COPD data group',
      content: (
        <Grid container columnSpacing={4}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  components={{
                    OpenPickerIcon: CalendarIcon,
                  }}
                  label="Date of COPD Assessment Test"
                  {...getFieldProps(`dateOfCopd`)}
                  renderInput={prop => <TextField {...prop} />}
                  onChange={value => setFieldValue?.('dateOfCopd', value)}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="copd-assessment-test">COPD Assessment Test (CAT)</InputLabel>
              <OutlinedInput label="COPD Assessment Test (CAT)" {...getFieldProps('copdAssessmentTest')} />
            </FormControl>
          </Grid>
        </Grid>
      ),
    },
    {
      key: 'cholesterol-data-group',
      title: 'Cholesterol data group',
      content: (
        <Grid container columnSpacing={4}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  components={{
                    OpenPickerIcon: CalendarIcon,
                  }}
                  label="Date of Cholesterol"
                  {...getFieldProps(`dateOfCholesterol`)}
                  renderInput={prop => <TextField {...prop} required />}
                  onChange={value => setFieldValue?.('dateOfCholesterol', value)}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <Grid container>
              <Grid item xs={8}>
                <FormControl fullWidth>
                  <TextField
                    label="Total Cholesterol"
                    sx={{
                      '.MuiOutlinedInput-root fieldset': {
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                      },
                    }}
                    {...getFieldProps('totalCholesterol')}
                    required
                  >
                    Total Cholesterol
                  </TextField>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel id="unit">Unit</InputLabel>
                  <Select
                    labelId="unit-options"
                    id="unit-options-select"
                    label="Unit"
                    sx={{
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                    }}
                    {...getFieldProps('unitToTalCholesterol')}
                  >
                    {unitDatas?.map((unitData: Record<string, any>) => (
                      <MenuItem key={`unitData-item-${unitData.id}`} value={unitData.id}>
                        {unitData.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ),
    },
    {
      key: 'spirometry-data-group',
      title: 'Spirometry data group',
      content: (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            components={{
              OpenPickerIcon: CalendarIcon,
            }}
            label="Spirometry"
            {...getFieldProps(`spirometry`)}
            renderInput={prop => <TextField {...prop} />}
            onChange={value => setFieldValue?.('spirometry', value)}
          />
        </LocalizationProvider>
      ),
    },
  ];

  return (
    <MedicalSectionBox title="Measurement Data Group">
      <MedicalSectionCard
        withBackground={false}
        content={{
          components: cardItems.map((cardItem: CardItem) => (
            <MedicalSectionCardItem
              title={cardItem.title}
              key={cardItem.key}
              content={<FormControl fullWidth>{cardItem.content}</FormControl>}
            />
          )),
          columns: 2,
        }}
      />
    </MedicalSectionBox>
  );
};

export default MeasurementDataGroup;
