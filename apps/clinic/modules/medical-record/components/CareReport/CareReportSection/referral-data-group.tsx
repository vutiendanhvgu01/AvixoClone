import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import { FormControl, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useFormikContext } from 'formik';
import { DATE_FORMAT } from 'modules/medical-record/constants/add-care-report';
import { CalendarIcon } from 'share-components';
import MedicalSectionBox from '../../common/medical-section-box';
import MedicalSectionCard from '../../common/medical-section-card';
import MedicalSectionCardItem from '../../common/medical-section-card-item';
import CareReport, { CardItem } from '../care-report-types';
import { publicRefferedDatas } from './mockDatas';

const ReferralDataGroup = () => {
  const { getFieldProps, setFieldValue } = useFormikContext<CareReport>();

  const cardItems: CardItem[] = [
    {
      key: 'referral-number',
      content: (
        <>
          <InputLabel id="referral-number" required>
            Referral Number/Case/Serial Number
          </InputLabel>
          <OutlinedInput
            required
            label="Referral Number/Case/Serial Number"
            {...getFieldProps('referralNumber')}
            placeholder="Free text here"
          />
        </>
      ),
    },
    {
      key: 'date-of-referral',
      content: (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            components={{
              OpenPickerIcon: CalendarIcon,
            }}
            label="Date of Referral"
            {...getFieldProps('dateOfReferral')}
            onChange={value => setFieldValue?.('dateOfReferral', value)}
            inputFormat={DATE_FORMAT}
            renderInput={prop => <TextField {...prop} />}
          />
        </LocalizationProvider>
      ),
    },
    {
      key: 'visit-mode',
      content: (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            {...getFieldProps('visitMode')}
            onChange={value => setFieldValue?.('visitMode', value)}
            renderInput={params => <TextField {...params} />}
            components={{
              OpenPickerIcon: AccessTimeFilledIcon,
            }}
          />
        </LocalizationProvider>
      ),
    },
    {
      key: 'public-referred',
      content: (
        <>
          <InputLabel id="public-referred" required>
            Public Institution Referred To
          </InputLabel>
          <Select
            labelId="public-referred"
            label=" Public Institution Referred To"
            {...getFieldProps('publicReferral')}
          >
            {publicRefferedDatas.map((publicRefferedData: Record<string, any>) => (
              <MenuItem key={`${publicRefferedData?.id}`} value={`${publicRefferedData?.name}`}>
                {publicRefferedData?.name}
              </MenuItem>
            ))}
          </Select>
        </>
      ),
    },
    {
      key: 'hciCodes',
      content: (
        <>
          <InputLabel id="hciCodes" required>
            HCI Codes or HealthcareEstablishmentCode
          </InputLabel>
          <OutlinedInput
            required
            label="HCI Codes or HealthcareEstablishmentCode"
            placeholder="Free text here"
            {...getFieldProps('hciCodes')}
          />
        </>
      ),
    },
    {
      key: 'referral-reason',
      content: (
        <>
          <InputLabel id="referral-reason" required>
            Referral Reason
          </InputLabel>
          <OutlinedInput
            required
            label="Referral Reason"
            placeholder="Free text here"
            {...getFieldProps('referralReason')}
          />
        </>
      ),
    },
  ];

  return (
    <MedicalSectionBox title="Referral Data Group">
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
export default ReferralDataGroup;
