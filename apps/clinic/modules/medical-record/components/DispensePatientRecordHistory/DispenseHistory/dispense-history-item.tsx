import { styled, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Dispense } from 'modules/dispense/types/dispense';
import { Instruction } from 'modules/prescription/types/instruction';
import { Item } from 'modules/prescription/types/item';
import { formatDate } from 'share-components/src/utils/formatUtils';

const FlexBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: 8,
}));

interface DispenseHistoryItemProps {
  dispense: Dispense;
}

interface DispenseItemProps {
  dispense: Dispense;
  item: Item;
}

// Format: <maxDose> <maxDoseUnit> / Take <dose> <doseUnit> / <time Frequency> / <indication> <precaution>
const buildInstructionText = (value: Instruction) =>
  `${value.maxDose} ${value.maxDoseUnit} / Take ${value.dose} ${value.doseUnit} / ${value.timingFrequency}`;

const DispenseItem: React.FC<DispenseItemProps> = ({ dispense, item }) => (
  <Box sx={{ mb: 3 }}>
    <FlexBox>
      <Typography variant="subtitle2" color="black.main">
        {formatDate(dispense.createdAt, 'dd MMM yyyy, hh:mm a')}
      </Typography>
      <Typography variant="caption" color="primary" sx={{ ml: 'auto', pl: 1.5 }}>
        -
      </Typography>
    </FlexBox>
    <FlexBox>
      <Typography variant="caption" color="black.main">
        {item.name}
      </Typography>
      <Typography variant="caption" color="neuter.500" sx={{ ml: 'auto', pl: 1.5 }}>
        Qty: {item.quantity}
      </Typography>
    </FlexBox>
    <Typography variant="caption">
      {item?.instructions?.map(instruction => buildInstructionText(instruction))}
    </Typography>
  </Box>
);

const DispenseHistoryItem: React.FC<DispenseHistoryItemProps> = ({ dispense }) =>
  dispense.items ? (
    <>
      {dispense.items.map(item => (
        <DispenseItem key={`dispense_item_${item.id}`} dispense={dispense} item={item} />
      ))}
    </>
  ) : null;

export default DispenseHistoryItem;
