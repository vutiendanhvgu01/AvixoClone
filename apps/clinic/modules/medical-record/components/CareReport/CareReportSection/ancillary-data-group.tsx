import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import {
  Autocomplete,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useFormikContext } from 'formik';
import { DATE_FORMAT } from 'modules/medical-record/constants/add-care-report';
import { CalendarIcon, CloseIcon } from 'share-components';
import { tableHeader } from 'share-components/theme/default-theme';
import MedicalSectionBox from '../../common/medical-section-box';
import MedicalSectionCard from '../../common/medical-section-card';
import MedicalSectionCardItem from '../../common/medical-section-card-item';
import CareReport, { CardItem } from '../care-report-types';
import { dfsOutcomeDatas, followAction, top100Films } from './mockDatas';

const AncillaryDataGroup = () => {
  const { getFieldProps, setFieldValue } = useFormikContext<CareReport>();

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const cardItems: CardItem[] = [
    {
      key: 'eye-drp',
      content: (
        <FormControl fullWidth>
          <Grid container direction="row" columnSpacing={34.5}>
            <Grid item xs={7}>
              <InputLabel sx={{ color: 'black.main', fontSize: '16px' }} required>
                Eye Assessment / DRP Conducted
              </InputLabel>
            </Grid>
            <Grid item xs={5}>
              <RadioGroup row sx={{ paddingTop: '7px' }} {...getFieldProps('eyeDrp')}>
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </Grid>
          </Grid>
        </FormControl>
      ),
    },
    {
      key: 'drp-visit',
      content: (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            components={{
              OpenPickerIcon: CalendarIcon,
            }}
            label="Date of Eye Assessment / DRP Visit"
            {...getFieldProps('drpVisit')}
            onChange={value => setFieldValue?.('drpVisit', value)}
            renderInput={prop => <TextField {...prop} required />}
            inputFormat={DATE_FORMAT}
          />
        </LocalizationProvider>
      ),
    },
  ];
  const cardItems2 = [
    {
      key: 'follow-up-action',
      content: (
        <>
          <InputLabel id="follow-up-action" required>
            Follow-up actions
          </InputLabel>
          <Select labelId="follow-up-action" label="Follow-up actions" {...getFieldProps('followUpAction')}>
            {followAction.map((actionFollow: Record<string, any>) => (
              <MenuItem key={`${actionFollow?.id}`} value={`${actionFollow?.name}`}>
                {actionFollow?.name}
              </MenuItem>
            ))}
          </Select>
        </>
      ),
    },
    {
      key: 'other-findings',
      content: (
        <>
          <InputLabel id="other-findings">Other findings</InputLabel>
          <OutlinedInput required label="Other findings" name="other-findings" placeholder="Free text here" />
        </>
      ),
    },
    {
      key: 'dfs-conducted',
      content: (
        <FormControl fullWidth>
          <Grid container direction="row" columnSpacing={34.5}>
            <Grid item xs={7}>
              <InputLabel sx={{ color: 'black.main', fontSize: '16px' }} required>
                DFS Conducted
              </InputLabel>
            </Grid>
            <Grid item xs={5}>
              <RadioGroup row sx={{ paddingTop: '7px' }} {...getFieldProps('dfsConducted')}>
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </Grid>
          </Grid>
        </FormControl>
      ),
    },
    {
      key: 'date-of-dfs',
      content: (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            components={{
              OpenPickerIcon: CalendarIcon,
            }}
            label="Date of DFS/visit"
            {...getFieldProps('dateOfDfs')}
            onChange={value => setFieldValue?.('dateOfDfs', value)}
            renderInput={prop => <TextField {...prop} required />}
            inputFormat={DATE_FORMAT}
          />
        </LocalizationProvider>
      ),
    },

    {
      key: 'dfs-outcome',
      content: (
        <>
          <InputLabel id="dfs-outcome" required>
            DFS Outcome
          </InputLabel>
          <Select labelId="dfs-outcome" label="DFS Outcome" {...getFieldProps('dfsOutcome')}>
            {dfsOutcomeDatas.map((dfsOutcomeData: Record<string, any>) => (
              <MenuItem key={`${dfsOutcomeData?.id}`} value={`${dfsOutcomeData?.name}`}>
                {dfsOutcomeData?.name}
              </MenuItem>
            ))}
          </Select>
        </>
      ),
    },
    {
      key: 'date-of-nurse-counseling',
      content: (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            components={{
              OpenPickerIcon: CalendarIcon,
            }}
            label="Date of Nurse counseling"
            {...getFieldProps('dateOfNurseCounseling')}
            onChange={value => setFieldValue?.('dateOfNurseCounseling', value)}
            renderInput={prop => <TextField {...prop} />}
          />
        </LocalizationProvider>
      ),
    },
  ];
  return (
    <MedicalSectionBox title="Ancillary Data Group">
      <MedicalSectionCard
        withBackground={false}
        content={{
          components: cardItems.map((cardItem: CardItem) => (
            <MedicalSectionCardItem
              key={cardItem.key}
              content={<FormControl fullWidth>{cardItem.content}</FormControl>}
            />
          )),
          columns: 2,
        }}
        footer={{
          components: [
            <MedicalSectionCardItem
              key="select-drp-result"
              content={
                <FormControl fullWidth>
                  <Autocomplete
                    multiple
                    id="select-drp-result"
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
                    renderInput={params => <TextField {...params} label="Select DRP Result" required />}
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
      <MedicalSectionCard
        withBackground={false}
        content={{
          components: cardItems2.map((cardItem: CardItem) => (
            <MedicalSectionCardItem
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
export default AncillaryDataGroup;
