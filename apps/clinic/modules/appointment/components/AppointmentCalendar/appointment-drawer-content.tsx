import { EventApi } from '@fullcalendar/core';
import { Box, Typography, Button, Container, Grid, Chip, List, ListItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import { AvixoFixedContainer } from 'share-components';
import { formatDate } from 'share-components/src/utils/formatUtils';
import { AppointmentDrawerProps, FullCalendarTimeFormat } from './types';

const FooterWrapper = styled(Box)(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.divider}`,
  position: 'sticky',
  bottom: 0,
  textAlign: 'end',
  padding: '32px 48px 40px 0',
  background: '#FFF',
}));

const AppointmentDrawer: React.FC<AppointmentDrawerProps> = ({ display, onClose, events }) => {
  const formatEventTimeSlot = (start: string, end: string): string => {
    const timeStart = formatDate(start, FullCalendarTimeFormat.DRAWER_TIME_TEXT);
    const timeEnd = formatDate(end, FullCalendarTimeFormat.DRAWER_TIME_TEXT);
    return `${timeStart} - ${timeEnd}`;
  };

  return (
    <AvixoFixedContainer
      title="Appointments"
      display={display}
      onClose={onClose}
      linearProgressProps={{
        value: 65,
      }}
    >
      <Container>
        <Box sx={{ pt: 2, pl: 4, pr: 4 }}>
          <Typography component="span" variant="overline">
            Select appointment
          </Typography>
        </Box>
        <List disablePadding>
          {!!events?.length &&
            events?.map((event: EventApi) => {
              const { id, extendedProps = {}, startStr, endStr } = event;
              return (
                <ListItem key={id} disablePadding>
                  <Grid
                    container
                    flexDirection="column"
                    padding="16px 32px"
                    sx={{
                      borderBottom: `1px solid`,
                      borderBottomColor: 'divider',
                      '&:hover': {
                        backgroundColor: 'primary.states.hoverBackground',
                      },
                    }}
                  >
                    <Grid item display="flex">
                      <Typography variant="body2" component="span">
                        {extendedProps?.eventType}
                      </Typography>
                      <Chip
                        size="small"
                        label={extendedProps?.doctorName}
                        sx={{
                          marginLeft: 'auto',
                          fontSize: 12,
                          fontWeight: 500,
                          lineHeight: 18,
                          border: '1px solid #FFF',
                          backgroundColor: 'info.main',
                        }}
                      />
                    </Grid>
                    <Grid item display="flex" mb="24px">
                      <Typography variant="subtitle2">{formatEventTimeSlot(startStr, endStr)}</Typography>
                      <Typography variant="subtitle2" color="neutral.500" ml="auto">
                        {formatDate(startStr, FullCalendarTimeFormat.DRAWER_APPOINTMENT_DATE)}
                      </Typography>
                    </Grid>
                    <Grid item mb="16px">
                      <Typography variant="h6">{extendedProps?.patientName}</Typography>
                      <Typography variant="body2" color="neutral.500">
                        {extendedProps?.patientPhoneNumber}
                      </Typography>
                    </Grid>
                    <Grid item mb="16px">
                      <Typography variant="body2" color="neutral.500">
                        {extendedProps?.description}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
              );
            })}
        </List>
        <FooterWrapper>
          <Button variant="text" onClick={onClose}>
            Cancel
          </Button>
        </FooterWrapper>
      </Container>
    </AvixoFixedContainer>
  );
};

export default AppointmentDrawer;
