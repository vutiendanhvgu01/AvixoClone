import { Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useFormikContext } from 'formik';
import { CalendarIcon } from 'share-components';
import MedicalSectionBox from '../../common/medical-section-box';
import MedicalSectionCard from '../../common/medical-section-card';
import MedicalSectionCardItem from '../../common/medical-section-card-item';
import CareReport, { CardItem } from '../care-report-types';
import { codeDatas, typeDatas } from './mockDatas';

const ScreenDataGroup = () => {
  const { getFieldProps, setFieldValue } = useFormikContext<CareReport>();

  const cardItems: CardItem[] = [
    {
      key: 'screening-date',
      content: (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            components={{
              OpenPickerIcon: CalendarIcon,
            }}
            label="Screening Date"
            {...getFieldProps('screeningDate')}
            onChange={value => setFieldValue?.('screeningDate', value)}
            renderInput={prop => <TextField {...prop} />}
          />
        </LocalizationProvider>
      ),
    },
    {
      key: 'screening-type',
      content: (
        <>
          <InputLabel id="screening-type" required>
            Screening Type
          </InputLabel>
          <Select labelId="screening-type" label="Screening Type" {...getFieldProps('screeningType')}>
            {typeDatas.map((typeData: Record<string, any>) => (
              <MenuItem key={`${typeData?.id}`} value={`${typeData?.name}`}>
                {typeData?.name}
              </MenuItem>
            ))}
          </Select>
        </>
      ),
    },
    {
      key: 'follow-up-outcome',
      content: (
        <>
          <InputLabel id="follow-up-outcome">Follow-up Outcome</InputLabel>
          <Select labelId="follow-up-outcome" label="Follow-up Outcome" {...getFieldProps('followUpOutcome')}>
            {typeDatas.map((typeData: Record<string, any>) => (
              <MenuItem key={`${typeData?.id}`} value={`${typeData?.name}`}>
                {typeData?.name}
              </MenuItem>
            ))}
          </Select>
        </>
      ),
    },
    {
      key: 'screening-outcome-code',
      content: (
        <>
          <InputLabel id="screening-outcome-code" required>
            Screening Outcome Code
          </InputLabel>
          <Select
            labelId="screening-outcome-code"
            label="Screening Outcome Code"
            {...getFieldProps('screeningOutcomeCode')}
          >
            {codeDatas.map((codeData: Record<string, any>) => (
              <MenuItem key={`${codeData?.id}`} value={`${codeData?.name}`}>
                {codeData?.name}
              </MenuItem>
            ))}
          </Select>
        </>
      ),
    },
  ];

  return (
    <MedicalSectionBox title="Screen Data Group">
      <MedicalSectionCard
        withBackground={false}
        content={{
          components: cardItems.map((cardItem: CardItem) => (
            <MedicalSectionCardItem
              key={cardItem.key}
              content={<FormControl fullWidth>{cardItem.content}</FormControl>}
            />
          )),
          columns: 4,
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
export default ScreenDataGroup;
