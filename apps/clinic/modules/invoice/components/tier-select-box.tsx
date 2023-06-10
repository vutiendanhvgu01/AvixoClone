import { Box, Divider, Button, LinearProgress, Container } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { AvixoFixedContainer } from 'share-components';
import TierOption from './tier-option';
import TierSelect, { TierOptionProps } from './tier-select-types';

const TierSelectBox: React.FC<TierSelect> = props => {
  const { open, onClose, onSelect, options, value } = props;
  const currentValue = options.filter(option => option.id === value.id)[0] ?? {};
  const [selectedValue, setSelectedValue] = useState(currentValue);
  const isSelected = (option: TierOptionProps) => value.id === option.id;
  const isChecked = (option: TierOptionProps) => selectedValue.id === option.id;
  const onSelectedValue = (id: number | string | undefined) => {
    if (!id) {
      return;
    }
    const newValue = options.filter(option => option.id === id);
    if (newValue) {
      setSelectedValue(newValue[0]);
    }
  };
  const onSubmit = useCallback(() => onSelect(selectedValue), [onSelect, selectedValue]);

  return (
    <AvixoFixedContainer title="Tier" display={open} onClose={onClose}>
      <LinearProgress variant="determinate" value={100} />
      <Container
        sx={{
          padding: '32px',
          display: 'flex',
          flexDirection: 'column',
          height: 'calc(100% - 100px)',
          overflowY: 'scroll',
        }}
      >
        <Box>
          {options.map((option: TierOptionProps) => (
            <TierOption
              key={option.id}
              title={option.title}
              tooltip={option.tooltip}
              checked={isChecked(option)}
              selected={isSelected(option)}
              details={option.details}
              summary={option.summary}
              id={option.id}
              onSelectedValue={onSelectedValue}
            />
          ))}
        </Box>

        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: '100%',
          }}
        >
          <Divider />
          <Box
            sx={{
              padding: '32px 26px',
              display: 'flex',
              flexDirection: 'row-reverse',
              background: 'white',
            }}
          >
            {selectedValue.id ? (
              <Button variant="contained" type="button" size="medium" onClick={onSubmit}>
                Select Tier
              </Button>
            ) : (
              <Button
                disabled
                size="medium"
                sx={{
                  color: 'rgba(55, 65, 81, 0.48) !important',
                  background: 'rgba(55, 65, 81, 0.12)',
                  border: 'none',
                  cursor: 'initial',
                }}
              >
                Select Tier
              </Button>
            )}
            <Button size="medium" variant="text" sx={{ marginRight: 2 }} onClick={onClose}>
              Back
            </Button>
          </Box>
        </Box>
      </Container>
    </AvixoFixedContainer>
  );
};

export default TierSelectBox;
