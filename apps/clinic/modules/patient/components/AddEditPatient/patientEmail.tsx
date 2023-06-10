import { TextField, Box, Stack, InputBase, Button, FormControlLabel, Checkbox } from '@mui/material';
import React, { useCallback } from 'react';
import { styled } from '@mui/material/styles';
import CloseIcon from 'share-components/src/components/AvixoIcons/close-icon';
import { useFormikContext } from 'formik';
import { PlusIcon } from 'share-components';
import { AddPatientEmailType, AddPatientInitialValuesType } from './add-edit-patient-form-types';
import ErrorText from './error-text';

const InputBox = styled(Box)(() => ({
  height: 53,
  display: 'flex',
}));

const CloseBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid #ccc',
  borderLeftWidth: 0,
  borderStartEndRadius: 10,
  borderEndEndRadius: 10,
  color: theme.palette.error.main,
}));

interface PatientEmailProps {
  emailArray: AddPatientEmailType[];
}

const PatientEmail: React.FC<PatientEmailProps> = ({ emailArray }) => {
  const {
    values: { emails },
    setFieldValue,
    errors,
    touched,
  } = useFormikContext<AddPatientInitialValuesType>();

  type EmailKeys = 'email';
  type HandleChangeType = (name: EmailKeys, value: string, index: number) => void;

  const handleChange: HandleChangeType = useCallback(
    (name, value, index) => {
      emails[index][name] = value;
      setFieldValue('emails', [...emails]);
    },
    [emails, setFieldValue],
  );

  const addNewEmail = () => {
    const prevEmails = emails;
    prevEmails.push({ email: '', preferred: false });
    setFieldValue('emails', prevEmails);
  };

  type RemoveEmailType = (index: number) => void;

  const removeEmail: RemoveEmailType = index => {
    if (emails.length === 1) return;
    const prevEmails = emails;
    prevEmails.splice(index, 1);
    setFieldValue('emails', prevEmails);
  };

  const handlePreferred = (index: number) => {
    const prevEmails = emails;
    emails.forEach((email, i) => {
      prevEmails[i].preferred = i === index;
    });
    setFieldValue('emails', prevEmails);
  };

  return (
    <Stack gap={2}>
      <InputBase value={JSON.stringify(emails)} name="emails" type="hidden" />
      {emailArray.map((email, index) => (
        <>
          <InputBox key={`patient-emails-${index.toString()}`}>
            <Box>
              <TextField
                InputProps={{
                  style: { borderRadius: 0, borderEndStartRadius: 10, borderStartStartRadius: 10, height: 53 },
                }}
                sx={{ width: 400 }}
                fullWidth
                label="Email"
                onChange={e => handleChange('email', e.target.value, index)}
                value={emails[index].email}
              />
            </Box>
            <CloseBox>
              <CloseIcon sx={{ cursor: 'pointer' }} onClick={() => removeEmail(index)} />
            </CloseBox>
          </InputBox>
          {Array.isArray(emailArray) && emailArray?.length > 1 && (
            <FormControlLabel
              control={
                <Checkbox
                  value={`email-checkbox${index}`}
                  checked={emails[index].preferred}
                  onClick={() => handlePreferred(index)}
                />
              }
              label="Mark as Primary"
              sx={{ mx: 1 }}
            />
          )}
          <ErrorText>
            {errors.emails &&
              errors.emails[index] &&
              touched.emails &&
              touched.emails[index]?.email &&
              (errors.emails[index] as unknown as AddPatientEmailType).email}
          </ErrorText>
        </>
      ))}
      <Box sx={{ display: 'flex' }}>
        <Button startIcon={<PlusIcon />} variant="text" onClick={addNewEmail} color="info">
          Another Email
        </Button>
      </Box>
    </Stack>
  );
};
export default PatientEmail;
