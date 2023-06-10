import React from 'react';
import { AvixoCard, Edit2Icon } from 'share-components';
import { Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { TierInfoProps } from './tier-select-types';

const TierDetail = styled(Paper)({
  ':hover': {
    background: 'rgba(80, 72, 229, 0.04)',
  },
});

const TierCard: React.FC<TierInfoProps> = ({ label, detail, onEdit }) => {
  const tierLabel = label ?? 'Nothing is selected';
  const tierDetail = detail ?? 'There are 2 available tier to select';
  const selected = !!label;

  return (
    <AvixoCard
      action={<Edit2Icon onClick={onEdit} />}
      customTitle={<Typography variant="h6">Tier</Typography>}
      sx={{
        minHeight: 'auto',
      }}
    >
      <TierDetail
        elevation={0}
        sx={{
          background: selected ? 'rgba(16, 185, 129, 0.08)' : 'white',
          padding: selected ? 1.5 : 0,
        }}
      >
        <Typography variant="body2">{tierLabel}</Typography>
        <Typography variant="subtitle2" color={selected ? 'secondary.main' : 'chart.blue5'}>
          {tierDetail}
        </Typography>
      </TierDetail>
    </AvixoCard>
  );
};

export default TierCard;
