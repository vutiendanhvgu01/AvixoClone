import { Button, Box } from '@mui/material';
import { useCallback, useState } from 'react';
import { AvixoEmailProps } from './avixo-email-type';
import { Email } from './EmailForm/email-form-type';
import PlusIcon from '../AvixoIcons/plus-icon';
import EmailForm from './EmailForm/email-form';

const AvixoEmail = ({ onChange, initData, isShowValidationError }: AvixoEmailProps) => {
  const [emails, setEmails] = useState<Email[]>(initData || []);

  const updateEmail = (data: Email[]) => {
    setEmails(data);
    if (onChange) {
      onChange(data);
    }
  };

  const addNewEmail = useCallback(() => {
    updateEmail([
      ...emails,
      {
        email: '',
      },
    ]);
  }, [emails]);

  const removeEmail = useCallback(
    (index: number) => {
      emails.splice(index, 1);
      updateEmail([...emails]);
    },
    [emails],
  );

  const onEmailChange = useCallback(
    (name: string, value: string, index: number) => {
      emails[index][name] = value;
      updateEmail([...emails]);
    },
    [emails],
  );

  return (
    <Box bgcolor="white">
      <Box>
        {emails.map((item, key) => (
          <EmailForm
            key={item.uuid}
            index={key}
            email={item}
            onRemove={removeEmail}
            onChange={onEmailChange}
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
        onClick={addNewEmail}
      >
        Another Email
      </Button>
    </Box>
  );
};

export default AvixoEmail;
