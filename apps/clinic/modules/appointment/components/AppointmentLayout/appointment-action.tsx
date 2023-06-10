import { Typography } from '@mui/material';
import format from 'date-fns/format';
import { APPOINTMENT_ACTION } from 'modules/appointment/constants';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { AvixoDrawerConfirm } from 'share-components';
import { PAGE_URLS } from 'share-components/src/constants';
import { Appointment } from '../appointment-types';
import AppointmentAdvancedSearchForm from '../AppointmentList/appointment-advanced-search-form';
import BlackoutForm from '../Blackout/blackout-form';
import DeleteNotice from '../Notice/delete-notice';
import NoticeForm from '../Notice/notice-form';

const AppointmentForm = dynamic(() => import('../appointment-form'), { ssr: false });
interface AppointmentActionProps {
  appointment: Appointment;
}
const AppointmentAction: React.FC<AppointmentActionProps> = ({ appointment }) => {
  const router = useRouter();
  const { action } = router.query;

  const goToMainPage = useCallback(() => {
    router.push({ pathname: router.pathname, query: null });
  }, [router]);

  switch (action) {
    case APPOINTMENT_ACTION.ADD_APPOINTMENT:
      return <AppointmentForm open onCancel={goToMainPage} />;

    case APPOINTMENT_ACTION.EDIT_APPOINTMENT: {
      if (appointment) {
        return (
          <AppointmentForm
            open
            onCancel={goToMainPage}
            initData={appointment as any}
            onDelete={() => router.push(PAGE_URLS.APPOINTMENT_LIST_DELETE(appointment?.id))}
          />
        );
      }
      return null;
    }
    case APPOINTMENT_ACTION.EDIT_APPOINTMENT_CALENDAR: {
      if (appointment) {
        return (
          <AppointmentForm
            open
            onCancel={goToMainPage}
            initData={appointment as any}
            onDelete={() => router.push(PAGE_URLS.APPOINTMENT_DELETE(appointment?.id))}
          />
        );
      }
      return null;
    }
    // Add initial data once do the API integration

    case APPOINTMENT_ACTION.DELETE_APPOINTMENT: {
      if (appointment?.id) {
        return (
          <AvixoDrawerConfirm
            title="Delete Appointment"
            confirmContent={
              <Typography variant="body2">
                This action cannot be undone. Are you sure you want to delete{' '}
                <strong>{appointment?.patient?.fullName}’s</strong> appointment on{' '}
                {format(new Date(), 'EEEE, dd MMMM yyyy')} ?
              </Typography>
            }
            action="delete-appointment"
            id={appointment?.id}
            inputProps={{
              name: 'reason',
              label: 'Reason of deletion',
              required: true,
              defaultValues: 'Patient does not want this anymore.',
              autoFocus: true,
            }}
            moreActions={[
              {
                name: 'patientName',
                value: appointment?.patient?.fullName || '',
              },
            ]}
            open
            handleClose={goToMainPage}
          />
        );
      }
      return null;
    }

    case APPOINTMENT_ACTION.ADD_BLACKOUT:
      return <BlackoutForm open onCancel={goToMainPage} />;

    case APPOINTMENT_ACTION.EDIT_BLACKOUT:
      return <BlackoutForm open initData={{ id: 1, title: '' }} onCancel={goToMainPage} />;

    case APPOINTMENT_ACTION.ADVANCED_SEARCH:
      return <AppointmentAdvancedSearchForm open onCancel={goToMainPage} />;
    case APPOINTMENT_ACTION.ADD_NOTICE:
      return <NoticeForm open onCancel={goToMainPage} />;

    case APPOINTMENT_ACTION.EDIT_NOTICE:
      return <NoticeForm open initData={{ id: 1, title: '' }} onCancel={goToMainPage} />;

    case APPOINTMENT_ACTION.DELETE_NOTICE:
      return <DeleteNotice onCancel={goToMainPage} />;

    default:
      return null;
  }
};

export default AppointmentAction;
