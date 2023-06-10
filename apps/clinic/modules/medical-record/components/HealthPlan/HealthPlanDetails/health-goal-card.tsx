import React from 'react';
import { Box, Typography, Grid, Card } from '@mui/material';

interface HealthGoalCardProps {
  title: string;
  subTitle: string;
  goalContent: string;
  goalTarget: string;
  goalTime: string;
}

const HeathGoalCard: React.FC<HealthGoalCardProps> = ({
  title,
  goalTime,
  goalTarget,
  goalContent,
  subTitle,
}: HealthGoalCardProps) => (
  <Card
    sx={{
      display: 'flex',
      flexDirection: 'column',
      padding: '24px 32px 32px',
      borderRadius: '16px',
      border: '1px solid',
      borderColor: 'divider',
      width: '100%',
      minHeight: '223px',
      justifyContent: 'space-between',
      backgroundColor: '#FBFBFB',
    }}
  >
    <Box>
      <Typography variant="overline" display="block">
        {subTitle}
      </Typography>
      <Typography variant="h6" display="block">
        {title}
      </Typography>
    </Box>
    <Grid container justifyContent="space-between">
      <Grid item maxWidth="200px">
        <Typography variant="subtitle2">{goalContent}</Typography>
      </Grid>
      <Grid item>
        <Typography variant="h6">{goalTarget}</Typography>
        <Typography variant="caption">{goalTime}</Typography>
      </Grid>
    </Grid>
  </Card>
);
export default HeathGoalCard;
