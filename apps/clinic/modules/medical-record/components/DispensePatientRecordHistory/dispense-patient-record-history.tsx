import { useCallback } from 'react';
import { useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { AvixoTabs } from 'share-components';
import { Dispense } from 'modules/dispense/types/dispense';
import getYear from 'date-fns/getYear';
import type { MedicalNoteType } from 'modules/medical-record/types/medical-note';
import DispenseHistory from './DispenseHistory/dispense-history';
import PatientRecordHitory from './PatientRecordHistory/patient-record-history';

interface DispensePatientRecordHistoryProps {
  dispenses: Dispense[];
  medicalNotes: MedicalNoteType[];
}

const DispensePatientRecordHistory: React.FC<DispensePatientRecordHistoryProps> = ({ dispenses, medicalNotes }) => {
  const theme = useTheme();

  const getDispenseHistory = useCallback(() => {
    const result: any = {};
    dispenses.forEach((dispense: Dispense) => {
      const year = dispense?.createdAt ? getYear(new Date(dispense?.createdAt)) : getYear(new Date());
      if (result[year]) {
        result[year].push(dispense);
      } else {
        result[year] = [dispense];
      }
    });

    return Object.keys(result).map(key => ({
      year: key,
      dispenses: result[key],
    }));
  }, [dispenses]);

  return (
    <Box sx={{ bgcolor: 'white', p: 4, borderRadius: 2 }}>
      <AvixoTabs
        tabsData={[
          {
            label: 'Dispense History',
            component: <DispenseHistory dispenseHistory={getDispenseHistory()} />,
          },
          {
            label: 'Patient Record',
            component: <PatientRecordHitory medicalNotes={medicalNotes} />,
          },
        ]}
        sxProps={{
          container: {
            '> .MuiBox-root': {
              border: 'none',
            },
            '> div > div': {
              padding: 0,
            },
            '.MuiTabs-root': {
              minHeight: '38px',
            },
            '.MuiTabs-flexContainer': {
              alignItems: 'center',
              padding: '6px',
            },
          },
          tabs: {
            mb: 3,
            borderRadius: 3,
            background: 'rgba(80, 72, 229, 0.04)',
            button: {
              height: '26px',
              minHeight: '26px',
              fontSize: '14px',
              margin: 0,
              padding: '2px 12px',
              borderRadius: 3,
              color: theme.palette.neutral?.[500],
              display: 'inline-flex',
              '&.Mui-selected': {
                background: theme.palette.primary.main,
                color: 'white',
              },
            },
            '.MuiTabs-indicator': {
              display: 'none',
            },
          },
        }}
      />
    </Box>
  );
};

export default DispensePatientRecordHistory;
