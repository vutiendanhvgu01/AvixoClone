import { Button, Box } from '@mui/material';
import { useCallback, useState } from 'react';
import { AvixoPhoneNumberProps } from './avixo-phone-number-type';
import { PhoneNumber } from './PhoneNumberForm/phone-number-form-type';
import PlusIcon from '../AvixoIcons/plus-icon';
import PhoneForm from './PhoneNumberForm/phone-number-form';

const AvixoPhoneNumber = ({ onChange, initData, isShowValidationError }: AvixoPhoneNumberProps) => {
  const [phoneNumbers, setPhoneNumbers] = useState<PhoneNumber[]>(initData || []);

  const updatePhoneNumber = (data: PhoneNumber[]) => {
    setPhoneNumbers(data);
    if (onChange) {
      onChange(data);
    }
  };

  const addNewPhoneNumber = useCallback(() => {
    updatePhoneNumber([
      ...phoneNumbers,
      {
        countryCode: '',
        number: '',
      },
    ]);
  }, [phoneNumbers]);

  const removePhoneNumber = useCallback(
    (index: number) => {
      phoneNumbers.splice(index, 1);
      updatePhoneNumber([...phoneNumbers]);
    },
    [phoneNumbers],
  );

  const onPhoneNumberChange = useCallback(
    (name: string, value: string, index: number) => {
      phoneNumbers[index][name] = value;
      updatePhoneNumber([...phoneNumbers]);
    },
    [phoneNumbers],
  );

  return (
    <Box bgcolor="white">
      <Box>
        {phoneNumbers.map((item, key) => (
          <PhoneForm
            key={item.uuid}
            index={key}
            phoneNumber={item}
            onRemove={removePhoneNumber}
            onChange={onPhoneNumberChange}
            isShowValidationError={isShowValidationError}
          />
        ))}
      </Box>
      <Button
        size="small"
        variant="text"
        color="info"
        sx={{
          padding: 0,
          '&:hover': {
            background: 'none',
          },
        }}
        startIcon={<PlusIcon />}
        onClick={addNewPhoneNumber}
      >
        Another Number
      </Button>
    </Box>
  );
};

export default AvixoPhoneNumber;
