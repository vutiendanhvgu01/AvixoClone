import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import { Form, Formik } from 'formik';
import { AvixoFixedContainer, DefaultFormProps } from 'share-components';

const BlockTitle = styled(Typography)(({ theme }) => ({
  marginBottom: '24px',
  display: 'inline-block',
}));
const RadioLabel = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 400,
  color: theme.palette.neutral?.[900],
}));

interface AppointmentAdvancedSearchType {
  uuid: string;
  patientName: string;
  patientMobile: string;
  patientEmail: string;
  time: 'allDay' | 'am' | 'pm' | '';
}

interface AppointmentAdvancedSearchFormProps extends DefaultFormProps {
  initData?: AppointmentAdvancedSearchType;
}

const initialValues: AppointmentAdvancedSearchType = {
  uuid: '',
  patientName: '',
  patientMobile: '',
  patientEmail: '',
  time: '',
};

const AppointmentAdvancedSearchForm: React.FC<AppointmentAdvancedSearchFormProps> = ({
  onCancel,
  initData = {} as AppointmentAdvancedSearchType,
}) => {
  const onSubmit = (values: AppointmentAdvancedSearchType) => {
    console.log(values);
  };
  return (
    <AvixoFixedContainer title="Advanced Search" display onClose={onCancel}>
      <Formik initialValues={{ ...initialValues, ...initData }} onSubmit={onSubmit}>
        {({
          values,
          handleChange,
          isValid,
          resetForm,
          /* and other goodies */
        }) => (
          <Form noValidate style={{ height: '100%' }}>
            <Container
              sx={{
                padding: '0 32px',
                display: 'flex',
                flexDirection: 'column',
                height: 'calc(100% - 100px)',
                overflowY: 'scroll',
              }}
            >
              <Box>
                <BlockTitle variant="overline">Unique Identifier</BlockTitle>
                <FormControl fullWidth>
                  <TextField name="uuid" value={values.uuid} onChange={handleChange} label="Patient ID" />
                </FormControl>
              </Box>

              <Box sx={{ paddingTop: '40px' }}>
                <BlockTitle variant="overline">Appointment detail</BlockTitle>
                <FormControl fullWidth>
                  <TextField
                    name="patientName"
                    value={values.patientName}
                    onChange={handleChange}
                    label="Patient Name"
                  />
                </FormControl>
                <FormControl fullWidth>
                  <TextField
                    name="patientMobile"
                    value={values.patientMobile}
                    onChange={handleChange}
                    label="Patient Mobile"
                  />
                </FormControl>
                <FormControl fullWidth>
                  <TextField
                    name="patientEmail"
                    value={values.patientEmail}
                    onChange={handleChange}
                    label="Patient Email"
                  />
                </FormControl>
              </Box>

              <Box>
                <FormControl sx={{ width: '80%' }}>
                  <RadioGroup
                    row
                    aria-labelledby="appointment-search-time"
                    name="time"
                    value={values.time}
                    sx={{ justifyContent: 'space-between' }}
                    onChange={handleChange}
                  >
                    <FormControlLabel value="allDay" control={<Radio />} label={<RadioLabel>All Day</RadioLabel>} />
                    <FormControlLabel value="am" control={<Radio />} label={<RadioLabel>AM</RadioLabel>} />
                    <FormControlLabel value="pm" control={<Radio />} label={<RadioLabel>PM</RadioLabel>} />
                  </RadioGroup>
                </FormControl>
              </Box>
            </Container>

            <Box
              sx={{
                p: '24px 47px 32px 32px',
                bgcolor: 'background.paper',
                borderTop: '1px solid #E6E8F0',
              }}
            >
              <Button
                variant="text"
                color="primary"
                disabled={!isValid}
                sx={{ mr: 'auto' }}
                onClick={() => resetForm()}
              >
                Clear
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </AvixoFixedContainer>
  );
};

export default AppointmentAdvancedSearchForm;
