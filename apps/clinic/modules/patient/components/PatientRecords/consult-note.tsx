import { Typography, styled } from '@mui/material';
import { Stack } from '@mui/system';
import type { ConsultNoteType } from 'modules/medical-record/types/medical-note';

const ConsultNoteHeading = styled(Typography)(({ theme }) => ({
  color: theme.palette?.neutral?.[900],
  fontWeight: 700,
}));

const ConsultNoteContent = styled(Typography)(({ theme }) => ({
  color: theme.palette?.neutral?.[900],
  marginBottom: '24px',
  ':last-child': {
    marginBottom: 0,
  },
}));

interface ConsultNoteProps {
  consultNote: ConsultNoteType;
}

const ConsultNote: React.FC<ConsultNoteProps> = ({ consultNote }) => (
  <Stack>
    <ConsultNoteContent variant="body2">{consultNote.generalNarrative}</ConsultNoteContent>
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
        <Typography variant="caption">{consultNote?.familyHistory}</Typography>
      </>
    )}
  </Stack>
);

export default ConsultNote;
