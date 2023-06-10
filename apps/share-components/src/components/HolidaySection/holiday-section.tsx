import { Button, Box, Typography, Divider, IconButton } from '@mui/material';
import { useCallback, useState } from 'react';
import { styled } from '@mui/material/styles';
import PLusIcon from '../AvixoIcons/plus-icon';
import CloseIcon from '../AvixoIcons/close-icon';
import { HolidaySectionProps } from './holiday-section-type';
import HolidayForm from './HolidayForm/holiday-form';
import { Holiday } from './HolidayForm/holiday-form-type';

const DeleteButton = styled(IconButton)(() => ({
  padding: 0,
  float: 'right',
}));

const HolidaySection = ({ onChange, initData, isShowValidationError }: HolidaySectionProps) => {
  const [holidays, setHolidays] = useState<Holiday[]>(initData || []);

  const updateHolidayList = useCallback(
    (data: Holiday[]) => {
      setHolidays(data);
      if (onChange) {
        onChange(data);
      }
    },
    [onChange],
  );

  const addNewHoliday = useCallback(() => {
    updateHolidayList([
      ...holidays,
      {
        name: '',
        date: new Date().toISOString(),
        dayOfWeek: 'Sun',
        slotType: 'operating',
        slotFrom: new Date().toISOString(),
        slotTo: new Date().toISOString(),
        description: '',
      },
    ]);
  }, [holidays, updateHolidayList]);

  const removeHoliday = useCallback(
    (index: number) => {
      holidays.splice(index, 1);
      updateHolidayList([...holidays]);
    },
    [holidays, updateHolidayList],
  );

  const onHolidayChange = useCallback(
    (name: string, value: string | boolean | null, index: number) => {
      holidays[index][name] = value ?? undefined;
      updateHolidayList(holidays);
    },
    [holidays, updateHolidayList],
  );

  return (
    <Box bgcolor="white">
      <Box>
        {holidays.map((holiday, key) => (
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
                  Holiday {key + 1}
                  <DeleteButton onClick={() => removeHoliday(key)}>
                    <CloseIcon />
                  </DeleteButton>
                </Typography>
              </>
            )}
            <HolidayForm
              key={holiday.name}
              index={key}
              holiday={holiday}
              onChange={onHolidayChange}
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
        onClick={addNewHoliday}
      >
        Another Holiday
      </Button>
    </Box>
  );
};

export default HolidaySection;
