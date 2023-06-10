import { Box, Typography } from '@mui/material';

const RenderTag = ({ type }: { type: string }) => {
  const bgColor = () => {
    switch (type) {
      case 'Inventory':
        return { color: 'success.main', bg: '#E7f9F6' };
      case 'Tasks':
        return { color: 'warning.main', bg: '#FCF5E6' };
      default:
        return { color: 'chart.purple3', bg: '#ECEEFF' };
    }
  };
  return (
    <Box
      sx={{
        background: bgColor().bg,
        color: bgColor().color,
        px: 1,
        borderRadius: 100,
        ml: 1,
        maxHeight: 22,
      }}
    >
      <Typography variant="body2">{type}</Typography>
    </Box>
  );
};

export default RenderTag;
