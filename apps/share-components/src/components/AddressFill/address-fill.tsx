import { Button, Box } from '@mui/material';
import { useCallback, useState } from 'react';
import { uuid } from 'uuidv4';
import { AddressFillProps } from './address-fill-type';
import { Address } from './AddressForm/address-form-type';
import PlusIcon from '../AvixoIcons/plus-icon';
import AddressForm from './AddressForm/address-form';

const AddressFill = ({ onChange, initData, isShowValidationError }: AddressFillProps) => {
  const [addresses, setAddresses] = useState<Address[]>(initData || []);

  const updateAddressList = useCallback(
    (data: Address[]) => {
      setAddresses(data);
      if (onChange) {
        onChange(data);
      }
    },
    [onChange],
  );

  const addNewAddress = useCallback(() => {
    updateAddressList([
      ...addresses,
      {
        uuid: uuid(),
        postal: '',
        line1: '',
        line2: '',
        unitNo: '',
        city: '',
        country: '',
        isPrimary: false,
        floorNo: '',
      },
    ]);
  }, [addresses, updateAddressList]);

  const removeAddress = useCallback(
    (index: number) => {
      addresses.splice(index, 1);
      updateAddressList([...addresses]);
    },
    [addresses, updateAddressList],
  );

  const onAddressChange = useCallback(
    (name: string, value: string | boolean, index: number) => {
      const newAddressesList: Address[] = addresses.map(record => ({
        ...record,
        isPrimary: false,
      }));
      newAddressesList[index][name] = value;
      updateAddressList([...newAddressesList]);
    },
    [addresses, updateAddressList],
  );

  return (
    <Box bgcolor="white">
      <Box>
        {addresses.map((address: Address, key) => (
          // eslint-disable-next-line react/no-array-index-key
          <Box key={`${address.uuid}`}>
            <AddressForm
              index={key}
              address={address}
              onRemove={removeAddress}
              onChange={onAddressChange}
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
        startIcon={<PlusIcon />}
        onClick={addNewAddress}
      >
        Another Address
      </Button>
    </Box>
  );
};

export default AddressFill;
