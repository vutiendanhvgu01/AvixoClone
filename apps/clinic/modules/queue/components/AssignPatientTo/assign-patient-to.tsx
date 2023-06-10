import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  LinearProgress,
  MenuItem,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Practitioner from 'modules/practitioner/types/practitioner-types';
import { BASED_ON, roomOptions, specialityOptions } from 'modules/queue/constants';
import { ShowAssignedToContext } from 'modules/queue/context/assign-to-context';
import { AssignedTo, BasedOnType } from 'modules/queue/types';
import React, { useContext, useState } from 'react';
import { AvixoFixedContainer } from 'share-components';
import AssignPatientToProps from './assign-patient-to-types';

const AssignPatientTo: React.FC<AssignPatientToProps> = ({
  onClose,
  open,
  practitioners,
  handleBasedOnChange,
  assignedTo,
  basedOn,
}) => {
  const [assignTo, setAssignedTo] = useState<AssignedTo>({ ...assignedTo });
  const { handleSetAssignedTo, handleOpenAssignedToSheet } = useContext(ShowAssignedToContext);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.name as BasedOnType) {
      case BASED_ON.speciality:
        setAssignedTo({
          ...assignTo,
          base: event.target.value,
          name: assignedTo.practitioner?.name ?? '',
          basedOn: event.target.name as BasedOnType,
        });
        break;
      case BASED_ON.room:
        setAssignedTo({
          ...assignTo,
          base: 'Room',
          name: event.target.value,
          basedOn: event.target.name as BasedOnType,
        });
        break;
      default: {
        const newAssignPractitioner: Practitioner | undefined = practitioners.find(
          (practitioner: Practitioner) => practitioner?.id === Number(event.target.value),
        );
        if (typeof newAssignPractitioner !== 'undefined') {
          setAssignedTo({
            ...assignTo,
            base: basedOn === BASED_ON.practitioner ? 'Practitioner' : assignTo.base,
            name: (newAssignPractitioner as Practitioner).name ?? '',
            practitioner: newAssignPractitioner,
            basedOn: event.target.name as BasedOnType,
          });
        }

        break;
      }
    }
  };

  return (
    <form
      onSubmit={e => {
        handleOpenAssignedToSheet(false);
        handleSetAssignedTo(assignTo);
        e.preventDefault();
      }}
    >
      <AvixoFixedContainer onClose={onClose} display={open} title="Assigned to">
        <Stack sx={{ height: '100%' }}>
          <LinearProgress value={60} variant="determinate" />
          <Stack spacing={2} sx={{ mx: 4, mt: 3, flex: 1 }}>
            <Typography variant="overline">CHOOSE BASED ON</Typography>
            <FormControl>
              <RadioGroup row value={basedOn} onChange={handleBasedOnChange}>
                <FormControlLabel value={BASED_ON.practitioner} control={<Radio />} label="Practitioner" />
                <FormControlLabel value={BASED_ON.speciality} control={<Radio />} label="Speciality" />
                <FormControlLabel value={BASED_ON.room} control={<Radio />} label="Room" />
              </RadioGroup>
            </FormControl>
            {basedOn === BASED_ON.speciality && (
              <FormControl>
                <TextField
                  select
                  name={BASED_ON.speciality}
                  label="Speciality"
                  required
                  onChange={handleChange}
                  defaultValue={assignedTo.base}
                >
                  {specialityOptions.map(speciality => (
                    <MenuItem key={speciality} value={speciality}>
                      {speciality}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
            )}
            {basedOn === BASED_ON.room && (
              <FormControl>
                <TextField
                  select
                  name={BASED_ON.room}
                  label="Room"
                  required
                  onChange={handleChange}
                  defaultValue={assignTo.name}
                >
                  {roomOptions.map(room => (
                    <MenuItem key={room} value={room}>
                      {room}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
            )}
            {basedOn !== BASED_ON.room && (
              <FormControl>
                <TextField
                  select
                  name={BASED_ON.practitioner}
                  label="Practitioner Name"
                  required
                  defaultValue={assignTo?.practitioner?.id}
                  onChange={handleChange}
                >
                  {practitioners.map((practitioner: Practitioner) => (
                    <MenuItem key={practitioner.id} value={practitioner.id}>
                      {practitioner.name}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
            )}
          </Stack>
          <Divider />
          <Stack flexDirection="row" justifyContent="flex-end" px={4} my={3}>
            <Button variant="text" onClick={() => handleOpenAssignedToSheet(false)}>
              Back
            </Button>
            <Button type="submit">Assign</Button>
          </Stack>
        </Stack>
      </AvixoFixedContainer>
    </form>
  );
};
export default React.memo(AssignPatientTo);
