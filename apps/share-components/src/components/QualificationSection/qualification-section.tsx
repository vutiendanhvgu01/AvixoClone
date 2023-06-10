import { Button, Box, Typography, Divider, IconButton } from '@mui/material';
import { useCallback, useState } from 'react';
import { styled } from '@mui/material/styles';
import PLusIcon from '../AvixoIcons/plus-icon';
import { QualificationSectionProps } from './qualification-section-type';
import QualificationForm from './QualificationForm/qualification-form';
import { Qualification } from './QualificationForm/qualification-form-type';
import CloseIcon from '../AvixoIcons/close-icon';

const DeleteButton = styled(IconButton)(() => ({
  padding: 0,
  float: 'right',
}));

const QualificationSection = ({ onChange, initData, isShowValidationError }: QualificationSectionProps) => {
  const [qualifications, setQualifications] = useState<Qualification[]>(initData || []);

  const updateQualificationList = useCallback(
    (data: Qualification[]) => {
      setQualifications(data);
      if (onChange) {
        onChange(data);
      }
    },
    [onChange],
  );

  const addNewQualification = useCallback(() => {
    updateQualificationList([
      ...qualifications,
      {
        code: '',
        issuerName: '',
        issuerType: 'organisation',
        issuingCountry: '',
        type: 'certification',
        validFrom: new Date().toISOString(),
        validTo: new Date().toISOString(),
        isPrimary: false,
      },
    ]);
  }, [qualifications, updateQualificationList]);

  const removeQualification = useCallback(
    (index: number) => {
      qualifications.splice(index, 1);
      updateQualificationList([...qualifications]);
    },
    [qualifications, updateQualificationList],
  );

  const onQualificationChange = useCallback(
    (name: string, value: string | boolean, index: number) => {
      const newQualificationsList: Qualification[] = qualifications.map(record => ({
        ...record,
        isPrimary: false,
      }));
      newQualificationsList[index][name] = value;
      updateQualificationList(newQualificationsList);
    },
    [qualifications, updateQualificationList],
  );

  return (
    <Box bgcolor="white">
      <Box>
        {qualifications.map((qualification, key) => (
          <>
            {key > 0 && (
              <>
                <Divider
                  sx={{
                    margin: '32px -32px',
                  }}
                />
                <Typography
                  color="neutral.900"
                  variant="subtitle1"
                  sx={{
                    marginBottom: '23px',
                  }}
                >
                  Qualification {key + 1}
                  <DeleteButton onClick={() => removeQualification(key)}>
                    <CloseIcon />
                  </DeleteButton>
                </Typography>
              </>
            )}
            <QualificationForm
              // eslint-disable-next-line react/no-array-index-key
              key={qualification.code}
              index={key}
              qualification={qualification}
              onChange={onQualificationChange}
              isShowValidationError={isShowValidationError}
            />
          </>
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
        onClick={addNewQualification}
      >
        Another Qualification
      </Button>
    </Box>
  );
};

export default QualificationSection;
