import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import { useRef, useState, useEffect } from 'react';
import { AvixoCard, AvixoCardProps } from 'share-components';

const PatientDetailCard = ({ children, ...rest }: AvixoCardProps) => {
  const [showMore, setShowMore] = useState(false);
  const [boxHeight, setBoxHeight] = useState<number | null>(null);
  const detailBox = useRef<HTMLElement>();

  useEffect(() => {
    setBoxHeight(detailBox.current?.clientHeight || null);
  }, []);

  return (
    <AvixoCard {...rest}>
      <Box position="relative">
        <Box
          sx={{
            overflow: 'hidden',
            maxHeight: showMore ? 'auto' : '410px',
          }}
          ref={detailBox}
        >
          {children}
        </Box>
        {boxHeight && boxHeight >= 410 && (
          <Button
            variant="text"
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => setShowMore(!showMore)}
            startIcon={showMore ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          >
            Show {showMore ? 'less' : 'more'}
          </Button>
        )}
      </Box>
    </AvixoCard>
  );
};

export default PatientDetailCard;
