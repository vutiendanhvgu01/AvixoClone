import { Button, Box } from '@mui/material';
import { useCallback, useState } from 'react';
import { EmailFillProps } from './email-fill-types';
import { Email } from './EmailForm/email-form-type';
import PLusIcon from '../AvixoIcons/plus-icon';
import EmailForm from './EmailForm/email-form';

const EmailFill = ({ onChange, initData, isShowValidationError }: EmailFillProps) => {
  const [emails, setEmails] = useState<Email[]>(initData || []);

  const updateEmailList = useCallback(
    (data: Email[]) => {
      setEmails(data);
      if (onChange) {
        onChange(data);
      }
    },
    [onChange],
  );

  const addNewEmail = useCallback(() => {
    updateEmailList([
      ...emails,
      {
        email: '',
        isPrimary: false,
      },
    ]);
  }, [emails, updateEmailList]);

  const removeEmail = useCallback(
    (index: number) => {
      emails.splice(index, 1);
      updateEmailList([...emails]);
    },
    [emails, updateEmailList],
  );

  const onEmailChange = useCallback(
    (name: string, value: string | boolean, index: number) => {
      const newEmailsList: Email[] = emails.map(record => ({
        ...record,
        isPrimary: false,
      }));
      newEmailsList[index][name] = value;
      updateEmailList(newEmailsList);
    },
    [emails, updateEmailList],
  );

  return (
    <Box bgcolor="white">
      <Box>
        {emails.map((email, key) => (
          // eslint-disable-next-line react/no-array-index-key
          <Box key={key}>
            <EmailForm
              index={key}
              email={email}
              onRemove={removeEmail}
              onChange={onEmailChange}
              isShowValidationError={isShowValidationError}
              deleteButtonProps={{
                disabled: emails.length <= 1,
              }}
              allowCheckMarkAsPrimary={emails.length > 1}
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
        onClick={addNewEmail}
      >
        Another Email
      </Button>
    </Box>
  );
};

export default EmailFill;
