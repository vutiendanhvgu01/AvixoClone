import { Button, Box } from '@mui/material';
import { useCallback, useState } from 'react';
import { PhoneNumberFillProps } from './phone-fill-types';
import { PhoneNumber } from './PhoneForm/phone-form-type';
import PLusIcon from '../AvixoIcons/plus-icon';
import PhoneNumberForm from './PhoneForm/phone-form';

const PhoneNumberFill = ({ onChange, initData, isShowValidationError }: PhoneNumberFillProps) => {
  const [phoneNumbers, setPhoneNumbers] = useState<PhoneNumber[]>(initData || []);

  const updatePhoneNumberList = useCallback(
    (data: PhoneNumber[]) => {
      setPhoneNumbers(data);
      if (onChange) {
        onChange(data);
      }
    },
    [onChange],
  );

  const addNewPhoneNumber = useCallback(() => {
    updatePhoneNumberList([
      ...phoneNumbers,
      {
        phoneValue: '',
        countryCode: '',
        isPrimary: false,
      },
    ]);
  }, [phoneNumbers, updatePhoneNumberList]);

  const removePhoneNumber = useCallback(
    (index: number) => {
      phoneNumbers.splice(index, 1);
      updatePhoneNumberList([...phoneNumbers]);
    },
    [phoneNumbers, updatePhoneNumberList],
  );

  const onPhoneNumberChange = useCallback(
    (name: string, value: string | boolean, index: number) => {
      const newPhoneNumbersList: PhoneNumber[] = phoneNumbers.map(record => ({
        ...record,
        isPrimary: false,
      }));
      newPhoneNumbersList[index][name] = value;
      updatePhoneNumberList(newPhoneNumbersList);
    },
    [phoneNumbers, updatePhoneNumberList],
  );

  return (
    <Box bgcolor="white">
      <Box>
        {phoneNumbers.map((phoneNumber, key) => (
          // eslint-disable-next-line react/no-array-index-key
          <Box key={key}>
            <PhoneNumberForm
              phoneNumbers={phoneNumbers}
              index={key}
              phoneNumber={phoneNumber}
              onRemove={removePhoneNumber}
              onChange={onPhoneNumberChange}
              isShowValidationError={isShowValidationError}
            />
          </Box>
        ))}
      </Box>
      <Button
        size="small"
        variant="text"
        color="info"
        sx={{
          color: 'chart.blue5',
          padding: 0,
          '&:hover': {
            background: 'none',
          },
        }}
        startIcon={<PLusIcon />}
        onClick={addNewPhoneNumber}
      >
        Another Number
      </Button>
    </Box>
  );
};

export default PhoneNumberFill;
