import { Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useFormikContext } from 'formik';
import { CalendarIcon } from 'share-components';
import MedicalSectionBox from '../../common/medical-section-box';
import MedicalSectionCard from '../../common/medical-section-card';
import MedicalSectionCardItem from '../../common/medical-section-card-item';
import CareReport, { CardItem } from '../care-report-types';
import { codeDatas } from './mockDatas';

const VaccinationDataGroup = () => {
  const { getFieldProps, setFieldValue } = useFormikContext<CareReport>();

  const cardItems: CardItem[] = [
    {
      key: 'date-vaccination',
      content: (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            components={{
              OpenPickerIcon: CalendarIcon,
            }}
            label="Date Vaccination"
            {...getFieldProps('dateVaccination')}
            renderInput={prop => <TextField {...prop} />}
            onChange={value => setFieldValue?.('dateVaccination', value)}
          />
        </LocalizationProvider>
      ),
    },
    {
      key: 'ssd-code',
      content: (
        <>
          <InputLabel id="ssd-code">SSD Code</InputLabel>
          <Select labelId="ssd-code" label="SSD Code" {...getFieldProps('ssdCode')}>
            {codeDatas.map((codeData: Record<string, any>) => (
              <MenuItem key={`${codeData?.id}`} value={`${codeData?.name}`}>
                {codeData?.name}
              </MenuItem>
            ))}
          </Select>
        </>
      ),
    },

    {
      key: 'due-to-next-dose',
      content: (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            components={{
              OpenPickerIcon: CalendarIcon,
            }}
            label="Due to Next Dose"
            {...getFieldProps('nextDose')}
            renderInput={prop => <TextField required {...prop} />}
            onChange={value => setFieldValue?.('nextDose', value)}
          />
        </LocalizationProvider>
      ),
    },
  ];

  return (
    <MedicalSectionBox title="Vaccination Data Group">
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
        footer={{
          components: [
            <MedicalSectionCardItem
              key="check-box"
              content={
                <FormControlLabel
                  sx={{
                    paddingBottom: '30px',
                  }}
                  control={<Checkbox />}
                  label="I acknowledge that I have reviewed the results and care delivery provided, that the vaccinations done are clinically indicated as per MOH's prevailing guidelines "
                />
              }
            />,
          ],
          columns: 1,
        }}
      />
    </MedicalSectionBox>
  );
};
export default VaccinationDataGroup;
