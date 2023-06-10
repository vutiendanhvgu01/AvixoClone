import { Chip, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dispense } from 'modules/dispense/types/dispense';
import Premise from 'modules/organisation/types/premise-types';
import { Patient } from 'modules/patient/types/patient';
import Practitioner from 'modules/practitioner/types/practitioner-types';
import { Prescription } from 'modules/prescription/types/prescription';
import Link from 'next/link';
import { ReactNode, useRef, useState } from 'react';
import { AvixoListHeader } from 'share-components';
import { formatDate } from 'share-components/src/utils/formatUtils';
import PrescriptionActionButtons from './prescription-action-buttons';

export interface PrescriptionDetailsLayoutProps {
  children?: ReactNode;
  patient: Patient;
  prescription: Prescription;
  dispense?: Dispense;
  practitioner?: Practitioner;
  premise?: Premise;
}

const SpecialLink = styled(Link)(() => ({
  color: 'white',
  textDecoration: 'underline',
}));

const DATE_FORMAT = 'MM/dd/yyyy';
const PrescriptionDetailsLayout: React.FC<PrescriptionDetailsLayoutProps> = ({
  children,
  patient,
  prescription,
  dispense,
  practitioner,
  premise,
}) => {
  const [value, setValue] = useState(formatDate(prescription?.createdAt, DATE_FORMAT));
  const anchorElRef = useRef(null);
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Box>
      <AvixoListHeader
        subTitle={patient.fullName}
        mainTitleComponent={
          <Typography component="h4" variant="h4" color="white" sx={{ my: 0.5, display: 'flex', alignItems: 'center' }}>
            {prescription.prescriptionId}{' '}
            <Chip color="warning" size="small" label="Partially Dispensed" sx={{ ml: 1 }} />
          </Typography>
        }
        detailTextComponent={
          <Typography component="span" variant="subtitle1" color="white">
            Ordered by: &nbsp;<SpecialLink href="http://example.com">{practitioner?.name}</SpecialLink> ·{' '}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                renderInput={() => (
                  <SpecialLink
                    ref={anchorElRef}
                    href="#"
                    onClick={() => {
                      setOpen(true);
                    }}
                  >
                    {value}
                  </SpecialLink>
                )}
                PopperProps={{
                  anchorEl: anchorElRef.current,
                }}
                value={value}
                onChange={(e: Date | null) => {
                  setValue(formatDate(String(e), DATE_FORMAT));
                }}
                open={open}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
              />
            </LocalizationProvider>
            · {premise?.name}
          </Typography>
        }
        buttonListComponent={
          <PrescriptionActionButtons patient={patient} prescription={prescription} dispense={dispense} />
        }
      />
      <Paper sx={{ py: 1 }}>{children}</Paper>
    </Box>
  );
};
export default PrescriptionDetailsLayout;
