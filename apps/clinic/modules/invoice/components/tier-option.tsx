import React from 'react';
import { AvixoCard, TickCirCleIcon, Info2Icon, RadioCheckedIcon, RadioUnCheckedIcon } from 'share-components';
import { Box, Tooltip, Typography, Divider } from '@mui/material';
import { TierOptionProps } from './tier-select-types';

const TierOption: React.FC<TierOptionProps> = ({
  id,
  title,
  details,
  selected,
  summary,
  tooltip,
  checked,
  onSelectedValue,
}) => (
  <AvixoCard
    action={
      checked ? (
        <RadioCheckedIcon sx={{ color: 'neutral.contrastText' }} />
      ) : (
        <RadioUnCheckedIcon sx={{ color: 'neutral.500' }} />
      )
    }
    onClick={() => onSelectedValue && onSelectedValue(id)}
    customTitle={
      <Typography variant="h6">
        {title}{' '}
        {tooltip && (
          <Tooltip title={tooltip} placement="right">
            <Info2Icon sx={{ color: 'neutral.500' }} />
          </Tooltip>
        )}
      </Typography>
    }
    sx={{
      marginBottom: '24px',
      minHeight: 'auto',
      padding: '24px',
      border: `2px solid ${checked ? '#32358C' : '#E6E8F0'}`,
      background: `${checked ? '#EEEDFC' : '#FFFFFF'}`,
      ':hover': {
        background: `${checked ? '#EEEDFC' : '#FBFBFB'}`,
        cursor: 'pointer',
      },
    }}
  >
    {selected && (
      <Typography
        variant="caption"
        sx={{
          marginTop: '-20px',
          position: 'relative',
        }}
      >
        <TickCirCleIcon sx={{ color: 'secondary.main' }} />{' '}
        <span
          style={{
            position: 'absolute',
            top: '-3px',
            left: '20px',
          }}
        >
          Selected during last visit
        </span>
      </Typography>
    )}
    <Box
      sx={{
        padding: '24px 0 0 0',
      }}
    >
      {details.map(detail => (
        <Box
          key={detail.label}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '16px',
          }}
        >
          <Box>
            <Typography color="neutral.900" variant="subtitle2">
              {detail.label}
            </Typography>
            {detail.moreDesc && <Typography variant="caption">{detail.moreDesc}</Typography>}
          </Box>

          <Typography color="neutral.900" variant="body2">
            {detail.value}
          </Typography>
        </Box>
      ))}
      <Divider sx={{ marginTop: '8px' }} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '27px',
        }}
      >
        <Box>
          <Typography color="neutral.900" variant="subtitle2">
            {summary.label}
          </Typography>
        </Box>

        <Typography color="error" variant="subtitle2">
          {summary.value}
        </Typography>
      </Box>
    </Box>
  </AvixoCard>
);

export default TierOption;
