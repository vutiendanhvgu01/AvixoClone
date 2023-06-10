import { Typography, Collapse, styled } from '@mui/material';
import { Box } from '@mui/system';
import type { MedicalNoteType, ConsultNoteType } from 'modules/medical-record/types/medical-note';
import React, { useCallback, useState } from 'react';
import { AngleUpIcon } from 'share-components';
import { formatDate } from 'share-components/src/utils/formatUtils';

const MedicalNoteHeading = styled(Box)<{ open?: boolean }>(({ theme, open }) => ({
  marginBottom: 24,
  paddingBottom: 16,
  cursor: 'pointer',
  borderBottom: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  alignItems: 'center',
  svg: {
    transition: 'all 0.3s',
    transform: open ? 'rotate(180deg)' : '',
  },
}));

const ConsultNoteHeading = styled(Typography)(({ theme }) => ({
  color: theme.palette?.neutral?.[500],
  fontWeight: 700,
}));

const ConsultNoteContent = styled(Typography)(({ theme }) => ({
  color: theme.palette?.neutral?.[500],
  marginBottom: '24px',
  ':last-child': {
    marginBottom: 0,
  },
}));

interface MedicalNoteProps {
  medicalNote: MedicalNoteType;
}

const MedicalNoteItem: React.FC<MedicalNoteProps> = ({ medicalNote }) => {
  const [open, setOpen] = useState<boolean>(false);
  const { consultNotes = [] } = medicalNote || [];

  const handleClick = useCallback(() => {
    setOpen(!open);
  }, [open]);

  return (
    <Box>
      <MedicalNoteHeading onClick={handleClick} open={open}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="overline" color="primary">
            {/* Type will be implement later */}
            {medicalNote?.type || 'medical note'}
          </Typography>
          <Typography variant="subtitle2" color="black.main">
            {formatDate(medicalNote.createdAt, 'dd MMM yyyy hh:mm a')}
          </Typography>
        </Box>
        <AngleUpIcon />
      </MedicalNoteHeading>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <ConsultNoteContent
          variant="caption"
          dangerouslySetInnerHTML={{ __html: medicalNote.generalNarrative ?? '' }}
        />
        {consultNotes.map((consultNote: ConsultNoteType) => (
          <Box key={`patient-record-history-consult-note-${consultNote.id}`} display="flex" flexDirection="column">
            {/* Comment this code, because BE did not complete the logic between case note and consultation note */}
            {/* <ConsultNoteContent variant="caption">{consultNote.generalNarrative}</ConsultNoteContent> */}
            {consultNote?.socialHistory && (
              <>
                <ConsultNoteHeading>Socical History:</ConsultNoteHeading>
                <ConsultNoteContent variant="caption">{consultNote?.socialHistory}</ConsultNoteContent>
              </>
            )}
            {consultNote?.pastMedicalHistory && (
              <>
                <ConsultNoteHeading>Medical / surgical history:</ConsultNoteHeading>
                <ConsultNoteContent variant="caption">{consultNote?.pastMedicalHistory}</ConsultNoteContent>
              </>
            )}
            {consultNote?.treatmentPlan && (
              <>
                <ConsultNoteHeading>Current treatment:</ConsultNoteHeading>
                <ConsultNoteContent variant="caption">{consultNote?.treatmentPlan}</ConsultNoteContent>
              </>
            )}
            {consultNote?.familyHistory && (
              <>
                <ConsultNoteHeading>Family history:</ConsultNoteHeading>
                <Typography variant="caption">{consultNote.familyHistory}</Typography>
              </>
            )}
          </Box>
        ))}
      </Collapse>
    </Box>
  );
};

export default MedicalNoteItem;
