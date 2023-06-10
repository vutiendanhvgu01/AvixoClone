import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useFormikContext } from 'formik';
import { CalendarIcon } from 'share-components';
import MedicalSectionBox from '../../common/medical-section-box';
import MedicalSectionCard from '../../common/medical-section-card';
import MedicalSectionCardItem from '../../common/medical-section-card-item';
import CareReport, { CardItem } from '../care-report-types';
import { complicationCodes, diagnosisCodes } from './mockDatas';

const DiagnosisAndComplication = () => {
  const { getFieldProps, setFieldValue } = useFormikContext<CareReport>();

  const cardItems: CardItem[] = [
    {
      key: 'diagnosis-code',
      content: (
        <>
          <InputLabel id="diagnosis-code" required>
            Diagnosis Code
          </InputLabel>
          <Select labelId="diagnosis-code" label="Diagnosis Code" {...getFieldProps('diagnosisCode')}>
            {diagnosisCodes.map((diagnosisCode: Record<string, any>) => (
              <MenuItem key={`${diagnosisCode?.id}`} value={`${diagnosisCode.name}`}>
                {diagnosisCode?.name}
              </MenuItem>
            ))}
          </Select>
        </>
      ),
    },
    {
      key: 'diagnosis-year',
      content: (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Diagnosis Year"
            components={{
              OpenPickerIcon: CalendarIcon,
            }}
            {...getFieldProps('diagnosisYear')}
            onChange={value => setFieldValue?.('diagnosisYear', value)}
            renderInput={prop => <TextField {...prop} required />}
          />
        </LocalizationProvider>
      ),
    },
    {
      key: 'complication-code',
      content: (
        <>
          <InputLabel id="complication-code" required>
            Complication Code
          </InputLabel>
          <Select labelId="complication-code" label="Complication Code" {...getFieldProps('complicationCode')}>
            {complicationCodes.map((complicationCode: Record<string, any>) => (
              <MenuItem key={`${complicationCode?.id}`} value={`${complicationCode.name}`}>
                {complicationCode?.name}
              </MenuItem>
            ))}
          </Select>
        </>
      ),
    },
  ];
  return (
    <MedicalSectionBox title="Diagnosis and Complication">
      <MedicalSectionCard
        withBackground={false}
        content={{
          components: cardItems.map((cardItem: CardItem) => (
            <MedicalSectionCardItem
              key={cardItem.key}
              content={<FormControl fullWidth>{cardItem.content}</FormControl>}
            />
          )),
          columns: 3,
        }}
      />
    </MedicalSectionBox>
  );
};

export default DiagnosisAndComplication;
