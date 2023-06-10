import React, { ReactNode, useRef, useState } from 'react';
import { Typography, Paper, Box, Chip, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import { AvixoListHeader } from 'share-components';
import { Patient } from 'modules/patient/types/patient';
import { formatDate } from 'share-components/src/utils/formatUtils';
import { Dispense } from 'modules/dispense/types/dispense';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Practitioner from 'modules/practitioner/types/practitioner-types';
import Premise from 'modules/organisation/types/premise-types';
import DispenseActionButtons, { DispenseActionProps } from './dispense-details-action-buttons';

export interface DispenseDetailsLayoutProps extends DispenseActionProps {
  children?: ReactNode;
  patient: Patient;
  dispense: Dispense;
  practitioner?: Practitioner;
  premise?: Premise;
}

const SpecialLink = styled(Link)(() => ({
  color: 'white',
  textDecorationColor: 'white',
}));
const DATE_FORMAT = 'MM/dd/yyyy';
const DispenseDetailsLayout: React.FC<DispenseDetailsLayoutProps> = ({ dispense, children, patient, ...props }) => {
  const [value, setValue] = useState<string>(formatDate(dispense?.createdAt, DATE_FORMAT));
  const anchorElRef = useRef(null);
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Box>
      <AvixoListHeader
        subTitle={patient.fullName}
        mainTitleComponent={
          <Typography component="h4" variant="h4" color="white" sx={{ my: 0.5, display: 'flex', alignItems: 'center' }}>
            PS2212-00001 <Chip color="warning" size="small" label="Partially Dispensed" sx={{ ml: 1 }} />
          </Typography>
        }
        detailTextComponent={
          <Box>
            <Typography color="white" variant="subtitle1">
              Ordered by: &nbsp;
              <SpecialLink underline="always">{props?.practitioner?.name}</SpecialLink>
              &nbsp;·&nbsp;
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
              &nbsp;·&nbsp;{props?.premise?.name}
            </Typography>
          </Box>
        }
        buttonListComponent={<DispenseActionButtons dispense={dispense} {...props} />}
      />
      <Paper sx={{ py: 1 }}>{children}</Paper>
    </Box>
  );
};
export default DispenseDetailsLayout;
