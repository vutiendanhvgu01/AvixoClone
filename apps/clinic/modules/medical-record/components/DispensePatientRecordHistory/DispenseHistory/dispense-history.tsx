import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Dispense } from 'modules/dispense/types/dispense';
import DispenseHistoryItem from './dispense-history-item';

const GROUP_BG_COLOR = '#F5F5F5';

interface DispenseHistoryProps {
  dispenseHistory?: {
    year: string;
    dispenses: Dispense[];
  }[];
}

const DispenseHistory: React.FC<DispenseHistoryProps> = ({ dispenseHistory = [] }) => (
  <>
    {dispenseHistory.map(item => (
      <Box key={item.year}>
        <Box sx={{ bgcolor: GROUP_BG_COLOR, px: 1.5, py: 0.5, borderRadius: 0.5, mb: 3 }}>
          <Typography variant="caption" color="primary" fontWeight="500">
            History - {item.year}
          </Typography>
        </Box>
        {item?.dispenses?.map((dispense: Dispense) => (
          <DispenseHistoryItem key={`dispense_${dispense.id}`} dispense={dispense} />
        ))}
      </Box>
    ))}
  </>
);

export default DispenseHistory;
