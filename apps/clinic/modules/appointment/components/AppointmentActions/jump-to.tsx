import React, { useCallback } from 'react';
import { yup } from 'share-components';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  LinearProgress,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  styled,
} from '@mui/material';
import { useFormik } from 'formik';

interface JumpToProps {
  onCancel: () => void;
  onJump: (type: string, value: number) => void;
}
interface JumpToFormProps {
  value: number;
  jumpType: 'Day' | 'Week' | 'Month';
  mode: 'behind' | 'ahead';
}

const initialValues: JumpToFormProps = {
  value: 1,
  jumpType: 'Week',
  mode: 'ahead',
};

const JumpToSchema = yup.object().shape({
  value: yup.number().required('Required').min(1, "Can't smaller than 1"),
  jumpType: yup.string().required('Required'),
  mode: yup.string().required('Required'),
});

const JUMP_TYPES = ['Day', 'Week', 'Month'];

const Form = styled('form')(() => ({
  height: '100%',
  padding: '20px 0 32px 0',
}));

const JumpToForm: React.FC<JumpToProps> = ({ onCancel, onJump }) => {
  const formik = useFormik({
    initialValues,
    validationSchema: JumpToSchema,
    onSubmit: () => {
      // do nothing
    },
  });
  const { getFieldProps, values, touched, errors, isSubmitting, handleChange } = formik;
  const handleJump = useCallback(() => {
    onJump(values.jumpType, (values.mode === 'behind' ? -1 : 1) * values.value);
    onCancel();
  }, [onJump, onCancel, values]);
  return (
    <Form>
      <LinearProgress variant="determinate" value={0} />
      <Container
        sx={{
          padding: '32px',
          display: 'flex',
          flexDirection: 'column',
          height: 'calc(100% - 100px)',
        }}
      >
        <FormControl fullWidth>
          <TextField
            required
            label="Jump"
            {...getFieldProps('value')}
            error={!!(touched.value && errors.value)}
            helperText={touched.value && errors.value}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            required
            select
            label="Type"
            {...getFieldProps('jumpType')}
            helperText={touched.jumpType && errors.jumpType}
          >
            {JUMP_TYPES.map(type => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
        <FormControl fullWidth>
          <RadioGroup row aria-labelledby="mode-label" name="mode" onChange={handleChange} value={values?.mode}>
            <FormControlLabel value="ahead" control={<Radio />} label="Ahead" />
            <FormControlLabel value="behind" control={<Radio />} label="Behind" />
          </RadioGroup>
        </FormControl>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: '24px 47px 32px 32px',
            bgcolor: 'background.paper',
            position: 'absolute',
            bottom: '0',
            right: '0',
            borderTop: '1px solid #E6E8F0',
            width: '100%',
          }}
        >
          <Button variant="text" disabled={isSubmitting} onClick={onCancel}>
            Cancel
          </Button>
          <Button
            color="primary"
            disabled={Boolean(isSubmitting || Object.keys(errors).length > 0)}
            sx={{
              marginLeft: '20px',
            }}
            onClick={handleJump}
          >
            Proceed
          </Button>
        </Box>
      </Container>
    </Form>
  );
};

export default JumpToForm;
