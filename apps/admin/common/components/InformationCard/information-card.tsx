import { Box, Typography, Button, Collapse, IconButton, useTheme, Stack } from '@mui/material';
import React, { useState } from 'react';
import { AvixoCard, Edit2Icon } from 'share-components';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import InformationProps, { InformationLineProps } from './information-card-types';

const InformationLine: React.FC<InformationLineProps> = ({ title, value }) => (
  <Box
    sx={{
      display: 'flex',
      py: 1,
    }}
  >
    <Box
      sx={{
        mr: 1,
        width: '170px',
      }}
    >
      <Typography color="neutral.500" variant="caption">
        {title}
      </Typography>
    </Box>
    <Box
      sx={{
        flex: 1,
      }}
    >
      <Typography color="neutral.900" variant="body2" data-cy={title}>
        {value}
      </Typography>
    </Box>
  </Box>
);

const MIN_DISPLAY_INFORMATIONS = 7;

const Information: React.FC<InformationProps> = ({ informations, title, onEdit }) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const theme = useTheme();

  const handleShowMore = () => {
    setExpanded(!expanded);
  };
  return (
    <AvixoCard
      title={title}
      fullHeight
      sx={{
        boxShadow: '0px 5px 12px rgba(100, 116, 139, 0.12)',
        border: `1px solid ${theme.palette.divider}`,
        background: theme.palette.card?.main,
      }}
      action={
        <IconButton onClick={onEdit}>
          <Edit2Icon />
        </IconButton>
      }
      bg="card.main"
      footerAction={
        informations?.length > MIN_DISPLAY_INFORMATIONS && (
          <Stack
            sx={{
              pt: '16px',
            }}
          >
            <Button variant="text" onClick={handleShowMore} color="primary">
              {expanded ? (
                <>
                  <KeyboardArrowUpIcon /> Show Less
                </>
              ) : (
                <>
                  <KeyboardArrowDownIcon /> Show More
                </>
              )}
            </Button>
          </Stack>
        )
      }
    >
      {informations?.slice(0, MIN_DISPLAY_INFORMATIONS).map((information: InformationLineProps) => (
        <InformationLine key={information.title} title={information.title} value={information.value || '-'} />
      ))}
      {informations?.length > MIN_DISPLAY_INFORMATIONS && (
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          {informations
            .slice(MIN_DISPLAY_INFORMATIONS + 1, informations.length)
            .map((information: InformationLineProps) => (
              <InformationLine key={information.title} title={information.title} value={information.value || '-'} />
            ))}
        </Collapse>
      )}
    </AvixoCard>
  );
};

export default Information;
