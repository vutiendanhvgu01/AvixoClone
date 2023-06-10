import { FormControl, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useFormikContext } from 'formik';
import { CalendarIcon } from 'share-components';
import MedicalSectionBox from '../../common/medical-section-box';
import MedicalSectionCard from '../../common/medical-section-card';
import MedicalSectionCardItem from '../../common/medical-section-card-item';
import CareReport, { CardItem } from '../care-report-types';
import { scoreDatas, stateDatas, statusDatas } from './mockDatas';

const SmokingDataGroup = () => {
  const { getFieldProps, setFieldValue } = useFormikContext<CareReport>();

  const cardItems: CardItem[] = [
    {
      key: 'date-of-smoking-assessment',
      content: (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            components={{
              OpenPickerIcon: CalendarIcon,
            }}
            label="Date of smoking assessment"
            {...getFieldProps('dateOfSmokingAssessment')}
            renderInput={prop => <TextField {...prop} />}
            onChange={value => setFieldValue?.('dateOfSmokingAssessment', value)}
          />
        </LocalizationProvider>
      ),
    },
    {
      key: 'year-start-smoking',
      content: (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            views={['year']}
            label="Year Start Smoking"
            disableOpenPicker
            {...getFieldProps('yearStartSmoking')}
            renderInput={params => <TextField {...params} />}
            onChange={value => setFieldValue?.('yearStartSmoking', value)}
          />
        </LocalizationProvider>
      ),
    },
    {
      key: 'smoking-status',
      content: (
        <>
          <InputLabel id="smoking-status" required>
            Smoking Status
          </InputLabel>
          <Select labelId="smoking-status" label=" Smoking Status" {...getFieldProps('smokingStatus')}>
            {statusDatas.map((statusData: Record<string, any>) => (
              <MenuItem key={`${statusData?.id}`} value={`${statusData?.name}`}>
                {statusData?.name}
              </MenuItem>
            ))}
          </Select>
        </>
      ),
    },
    {
      key: 'name',
      content: (
        <>
          <InputLabel id="name" required>
            Name
          </InputLabel>
          <OutlinedInput
            required
            label="Name"
            endAdornment={
              <InputAdornment position="end" style={{ color: 'neutral.700' }}>
                Sticks
              </InputAdornment>
            }
            {...getFieldProps('name')}
          />
        </>
      ),
    },
    {
      key: 'fagerström-test-score',
      content: (
        <>
          <InputLabel id="fagerstrom-test-score">Fagerström Test Score</InputLabel>
          <Select
            labelId="fagerstrom-test-score-label"
            label="Fagerström Test Score"
            {...getFieldProps('fagerstromTestScore')}
          >
            {scoreDatas.map((scoreData: Record<string, any>) => (
              <MenuItem key={`${scoreData?.id}`} value={`${scoreData?.name}`}>
                {scoreData?.name}
              </MenuItem>
            ))}
          </Select>
        </>
      ),
    },
    {
      key: 'state-of-change',
      content: (
        <>
          <InputLabel id="state-of-change">State of Change</InputLabel>
          <Select labelId="state-of-change" label="State of Change" {...getFieldProps('stateOfChange')}>
            {stateDatas.map((stateData: Record<string, any>) => (
              <MenuItem key={`${stateData?.id}`} value={`${stateData?.name}`}>
                {stateData?.name}
              </MenuItem>
            ))}
          </Select>
        </>
      ),
    },
  ];

  return (
    <MedicalSectionBox title="Smoking Data Group">
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
export default SmokingDataGroup;
