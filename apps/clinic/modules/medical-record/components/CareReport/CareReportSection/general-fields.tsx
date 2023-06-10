import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { Autocomplete, Checkbox, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useFormikContext } from 'formik';
import { CalendarIcon, CloseIcon } from 'share-components';
import { tableHeader } from 'share-components/theme/default-theme';
import MedicalSectionBox from '../../common/medical-section-box';
import MedicalSectionCard from '../../common/medical-section-card';
import MedicalSectionCardItem from '../../common/medical-section-card-item';
import { CardItem } from '../care-report-types';
import { enrolleeDatas, top100Films, visitModeDatas } from './mockDatas';

const GENERAL_DATE_FORMAT = 'DD/MM/YYYY';

const GeneralFields = () => {
  const { getFieldProps, setFieldValue } = useFormikContext<Record<string, any>>();

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const cardItems: CardItem[] = [
    {
      key: 'visit-day',
      content: (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            components={{
              OpenPickerIcon: CalendarIcon,
            }}
            label="Visit Date"
            inputFormat={GENERAL_DATE_FORMAT}
            {...getFieldProps('visitDate')}
            renderInput={prop => <TextField {...prop} />}
            onChange={value => setFieldValue?.('visitDate', value)}
          />
        </LocalizationProvider>
      ),
    },
    {
      key: 'patient-an-enrollee',
      content: (
        <>
          <InputLabel id="patient-an-enrollee">Patient an Enrollee</InputLabel>
          <Select labelId="patient-an-enrolee" label="Patient an Enrollee" {...getFieldProps('patienAnEnrolleeP')}>
            {enrolleeDatas.map((enrolleeData: Record<string, any>) => (
              <MenuItem key={`${enrolleeData?.id}`} value={`${enrolleeData?.name}`}>
                {enrolleeData?.name}
              </MenuItem>
            ))}
          </Select>
        </>
      ),
    },
    {
      key: 'visit-mode',
      content: (
        <>
          <InputLabel id="visit-mode" required>
            Visit Mode
          </InputLabel>
          <Select labelId="visit-mode" label="Visit Mode" {...getFieldProps('visitMode')}>
            {visitModeDatas.map((visitModeData: Record<string, any>) => (
              <MenuItem key={`${visitModeData?.id}`} value={`${visitModeData?.name}`}>
                {visitModeData?.name}
              </MenuItem>
            ))}
          </Select>
        </>
      ),
    },
    {
      key: 'health-plan-submission',
      content: (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Health Plan Submission Date"
            inputFormat={GENERAL_DATE_FORMAT}
            components={{
              OpenPickerIcon: CalendarIcon,
            }}
            {...getFieldProps('healthPlan')}
            renderInput={prop => <TextField required {...prop} />}
            onChange={value => setFieldValue?.('healthPlan', value)}
          />
        </LocalizationProvider>
      ),
    },
    {
      key: 'date-of-first-health',
      content: (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            components={{
              OpenPickerIcon: CalendarIcon,
            }}
            label="Date of First Health Plan Discussion"
            inputFormat={GENERAL_DATE_FORMAT}
            {...getFieldProps('dateOfFirstHealth')}
            renderInput={prop => <TextField required {...prop} />}
            onChange={value => setFieldValue?.('dateOfFirstHealth', value)}
          />
        </LocalizationProvider>
      ),
    },
    {
      key: 'date-of-chronic-consult',
      content: (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            components={{
              OpenPickerIcon: CalendarIcon,
            }}
            label="Date of Chronic Consult"
            inputFormat={GENERAL_DATE_FORMAT}
            {...getFieldProps('dateOfChronicConsult')}
            renderInput={prop => <TextField required {...prop} />}
            onChange={value => setFieldValue?.('dateOfChronicConsult', value)}
          />
        </LocalizationProvider>
      ),
    },
  ];

  return (
    <MedicalSectionBox title="General Fields">
      <MedicalSectionCard
        withBackground={false}
        withFooterDivider={false}
        content={{
          components: cardItems.map((cardItem: CardItem) => (
            <MedicalSectionCardItem
              key={cardItem.key}
              content={<FormControl fullWidth>{cardItem.content}</FormControl>}
            />
          )),
          columns: 3,
        }}
        footer={{
          components: [
            <MedicalSectionCardItem
              sx={{ mt: '40px' }}
              key="select-cdmp-condition"
              content={
                <FormControl fullWidth>
                  <Autocomplete
                    multiple
                    id="select-cdmp-condition"
                    options={top100Films}
                    disableCloseOnSelect
                    getOptionLabel={option => option.title}
                    renderOption={(props, option, { selected }) => (
                      <li {...props}>
                        <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
                        {option.title}
                      </li>
                    )}
                    style={{ color: 'black.main' }}
                    renderInput={params => <TextField {...params} label="Select CDMP Condition(s)" />}
                    ChipProps={{
                      deleteIcon: (
                        <CloseIcon style={{ color: 'black.main', background: '#FFFFFF', borderRadius: '50%' }} />
                      ),
                      sx: {
                        fontSize: '13px',
                        height: '32px',
                        background: tableHeader,
                        color: 'neutral.900',
                        '.MuiChip-deleteIcon': {
                          color: 'neutral.500',
                        },
                      },
                    }}
                  />
                </FormControl>
              }
            />,
          ],
          columns: 1,
        }}
      />
    </MedicalSectionBox>
  );
};
export default GeneralFields;
